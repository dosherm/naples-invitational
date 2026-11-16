// Team draft board. Phones sign in anonymously and watch; a captain's phone, linked
// to their name, makes that team's picks (through the server, which checks whose
// turn it is). The organizer signs in with the admin account to run the shootout,
// pick for anyone, undo and delete. Flights, captains and the draft itself are made
// by the server: Day 1 by prepareFirstDraft, every later day when its day is
// published in the app (TournamentApp functions/triggers/dayClose.js).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDoc, getDocs, onSnapshot, query, where,
  setDoc, updateDoc, deleteDoc, runTransaction, serverTimestamp, deleteField, writeBatch,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-functions.js';
import {
  FLIGHTS, FORMATS, teamMembers, perFlight, totalPicks, isComplete, teamOnClock, takenIds,
  pickProblem,
} from './draftLogic.js?v=d4f512d8da';
import {
  COUNTDOWN_MS, newSeed, rounds, currentRound, runScore, teamScore, waitingOn, standings, nextTie, isSettled, boardRows,
  officialShots, checking,
} from './shootout.js?v=d4f512d8da';
import { now, syncClock } from './clock.js?v=d4f512d8da';
import { playReplay } from './replay.js?v=d4f512d8da';

// The Firebase web key is public by design; access is controlled by firestore.rules.
const app = initializeApp({
  apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0',
  authDomain: 'golf-tournament-app-e2390.firebaseapp.com',
  projectId: 'golf-tournament-app-e2390',
});
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, 'us-central1');
const makeDraftPick = httpsCallable(functions, 'makeDraftPick');
const saveDraftTeamsNow = httpsCallable(functions, 'saveDraftTeamsNow');

// The trip this board is for (?t= for another trip, such as the test copy)
const NAPLES_TOURNAMENT_ID = 'Qzidv9FRVnFu11y4jdhG';
const TRIP_ID = new URLSearchParams(location.search).get('t') || NAPLES_TOURNAMENT_ID;

// The organizer's account (as firestore.rules), or this trip's backup organizer
// (tripSetup/{trip}.backupOrganizer, which only they and the organizer can read).
// Used here only to show the controls; the rules and the server do the checking.
const ADMIN_UID = 'GknZy04hB2V8xQdnMmKqy2x24Qu2';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const show = (el, on) => el.classList.toggle('hidden', !on);

let isAdmin = false;
let uid = null;             // this phone's sign-in, which a captain's name is linked to
let draft = null;           // the draft on screen
let unsubscribe = null;     // its listener
let shots = {};             // its shootout docs, captainId -> { uid, practice, runs } (what phones saved)
let verified = {};          // server-checked runs, captainId -> { runs } (what counts)
let unsubVerified = null;
let unsubShots = null;
let shotsFor = null;        // the draft id shots belong to
let lastPickCount = 0;      // to highlight the newest pick
let busy = false;
let records = null;         // Gopher Hall of Fame (stats/gopher, kept by the server)
const ACCEPT_AFTER_MS = 20000; // offer to accept a phone's score if the server hasn't checked it by then

function fail(error) {
  console.error(error);
  $('pageError').textContent = error?.message || String(error);
}

// ---------- Auth ----------

async function isBackupOrganizer(user) {
  try {
    const setup = (await getDoc(doc(db, 'tripSetup', TRIP_ID))).data();
    return setup?.backupOrganizer?.uid === user.uid;
  } catch {
    return false; // anyone else can't read the trip's setup
  }
}

onAuthStateChanged(auth, async user => {
  if (!user) {
    signInAnonymously(auth).catch(fail);
    return;
  }
  isAdmin = !user.isAnonymous && (user.uid === ADMIN_UID || await isBackupOrganizer(user));
  uid = user.uid;
  $('adminButton').textContent = isAdmin ? 'Sign out' : 'Run draft';
  $('adminWho').textContent = isAdmin ? `Signed in as ${user.email}` : '';
  show($('signIn'), false);
  show($('adminBar'), isAdmin);
  // Google's clock, so the organizer's Go means the same moment on every phone
  syncClock(db, user.uid);
  watchRecords();
  renderRecords();
  if (isAdmin) await loadDraftPicker();
  watchDraft(new URLSearchParams(location.search).get('draft'));
  watchFlights(TRIP_ID);
});

$('adminButton').addEventListener('click', () => {
  if (isAdmin) {
    signOut(auth).catch(fail);
  } else {
    show($('signIn'), true);
    $('email').focus();
  }
});
$('cancelSignIn').addEventListener('click', () => show($('signIn'), false));
$('signInForm').addEventListener('submit', async e => {
  e.preventDefault();
  $('signInError').textContent = '';
  try {
    await signInWithEmailAndPassword(auth, $('email').value, $('password').value);
    $('password').value = '';
  } catch {
    $('signInError').textContent = 'Sign-in failed. Check the email and password.';
  }
});

// ---------- Watching a draft ----------

// A specific draft (?draft=id or the admin's picker), or else this trip's newest one.
function watchDraft(draftId) {
  if (unsubscribe) unsubscribe();
  lastPickCount = 0;
  const onError = error => fail(error);
  if (draftId) {
    unsubscribe = onSnapshot(doc(db, 'drafts', draftId), snap => {
      render(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    }, onError);
  } else {
    unsubscribe = onSnapshot(query(collection(db, 'drafts'), where('tournamentId', '==', TRIP_ID)), snap => {
      const newest = snap.docs.map(x => ({ id: x.id, ...x.data() }))
        .sort((a, b) => (b.createdAt?.toMillis?.() ?? Infinity) - (a.createdAt?.toMillis?.() ?? Infinity))[0];
      render(newest || null);
    }, onError);
  }
}

async function loadDraftPicker(selectedId) {
  // This trip's drafts, newest first
  const snap = await getDocs(query(collection(db, 'drafts'), where('tournamentId', '==', TRIP_ID)));
  const newestFirst = [...snap.docs].sort((a, b) => (b.data().createdAt?.toMillis?.() ?? Infinity) - (a.data().createdAt?.toMillis?.() ?? Infinity));
  const options = newestFirst.map(d => {
    const x = d.data();
    return `<option value="${d.id}">${esc(x.tournamentName)} · ${esc(x.roundName)} · ${esc(statusLabel(x))}</option>`;
  });
  $('draftPicker').innerHTML = `<option value="">This trip's newest draft</option>${options.join('')}`;
  $('draftPicker').value = selectedId || '';
}

$('draftPicker').addEventListener('change', e => watchDraft(e.target.value || null));

function statusLabel(d) {
  if (d.status === 'shootout') return 'shootout';
  if (d.status === 'saved') return 'saved to round';
  if (d.status === 'complete') return 'complete';
  return 'live';
}

// ---------- Rendering the board ----------

function watchShots(d) {
  const id = d?.id || null;
  if (id === shotsFor) return;
  if (unsubShots) unsubShots();
  if (unsubVerified) unsubVerified();
  unsubShots = null;
  unsubVerified = null;
  shots = {};
  verified = {};
  shotsFor = id;
  if (id) {
    unsubVerified = onSnapshot(collection(db, 'drafts', id, 'verified'), snap => {
      verified = Object.fromEntries(snap.docs.map(x => [x.id, x.data()]));
      render(draft);
    }, fail);
    unsubShots = onSnapshot(collection(db, 'drafts', id, 'shootout'), snap => {
      shots = Object.fromEntries(snap.docs.map(x => [x.id, x.data()]));
      render(draft);
    }, fail);
  }
}

function render(d) {
  draft = d;
  watchShots(d);
  $('pageError').textContent = '';
  show($('empty'), !d);
  show($('board'), !!d);
  $('title').textContent = d ? d.roundName : 'Team Draft';
  $('subtitle').textContent = d ? `${d.tournamentName} · ${FORMATS[d.format].label}` : 'Waiting for the draft';
  if (!d) return;

  // The flights and captains show from the moment the draft exists; picks start
  // once the shootout has set the order
  const inShootout = d.status === 'shootout';
  show($('shootoutCard'), inShootout);
  show($('log').closest('.card'), !inShootout);
  $('poolTitle').textContent = inShootout ? 'Flights' : 'Available';
  const onClock = inShootout ? null : teamOnClock(d);
  const done = !inShootout && isComplete(d);
  const mine = myCaptains(d);
  const myTurn = !!onClock && onClock.captainIds.some(id => mine.includes(id));
  const canPick = !!onClock && (isAdmin || myTurn);
  const pickNo = d.picks.length + 1;
  const status = $('status');
  status.classList.toggle('clock', !done);
  if (inShootout) status.textContent = 'Captains are playing Whack-a-Gopher for the pick order';
  else if (d.status === 'saved') status.textContent = 'Draft complete · teams saved to the round';
  else if (done) status.textContent = 'Draft complete';
  else status.textContent = `${myTurn ? 'Your pick' : 'On the clock'}: ${onClock.name} · pick ${pickNo} of ${totalPicks(d)}`;
  if (inShootout) renderShootout(d);
  renderCaptainLink(d, inShootout, done, mine);

  show($('adminActions'), isAdmin);
  // Undo works after the teams are saved too (a slip on the last pick); they are saved again when it's re-picked
  $('undoButton').disabled = busy || inShootout || d.picks.length === 0;
  show($('saveBar'), isAdmin && done);
  $('saveButton').disabled = busy || !done;
  $('saveButton').textContent = d.status === 'saved' ? 'Save teams to round again' : 'Save teams to round';
  $('saveNote').textContent = d.status === 'saved'
    ? `Saved to ${d.roundName}${d.savedBy ? ` by ${d.savedBy === 'server' ? 'the server' : d.savedBy}` : ''}.`
    : d.saveError ? `The teams were not saved by themselves: ${d.saveError}.`
      : `The server saves these teams as ${d.roundName}'s playing groups by itself. If it hasn't within a few seconds, save them here.`;

  const fresh = d.picks.length > lastPickCount && lastPickCount > 0 ? d.picks[d.picks.length - 1].playerId : null;
  lastPickCount = d.picks.length;
  const quota = perFlight(d);
  const captains = new Set(d.teams.flatMap(t => t.captainIds));

  $('teams').innerHTML = d.teams.map(t => {
    const members = teamMembers(d, t.teamId);
    const slots = FLIGHTS.flatMap(f => {
      const inFlight = members.filter(id => d.players[id].flight === f);
      return Array.from({ length: quota }, (_, i) => {
        const id = inFlight[i];
        if (!id) return `<div class="slot empty"><span class="flight flight-${f}">${f}</span><span class="name">—</span></div>`;
        return `<div class="slot${id === fresh ? ' fresh' : ''}"><span class="flight flight-${f}">${f}</span>
          <span class="name">${esc(d.players[id].name)}</span>${captains.has(id) ? '<span class="tag">CAPT</span>' : ''}</div>`;
      });
    });
    const clock = onClock && onClock.teamId === t.teamId;
    const why = t.reason ? `<p class="muted why">Captain${t.captainIds.length > 1 ? 's' : ''}: ${esc(t.reason)}</p>` : '';
    return `<div class="team${clock ? ' clock' : ''}"><h3><span>${esc(t.name)}</span>${clock ? '<span class="muted">picking</span>' : ''}</h3>${why}${slots.join('')}</div>`;
  }).join('');

  const taken = takenIds(d);
  $('pool').innerHTML = FLIGHTS.map(f => {
    // Before the picks start, the whole flight shows (captains marked); then only who is left
    const left = Object.entries(d.players)
      .filter(([id, p]) => p.flight === f && (inShootout || !taken.has(id)))
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
    const chips = left.map(([id, p]) => {
      const problem = onClock ? pickProblem(d, onClock.teamId, id) : 'Draft complete';
      if (!canPick) return `<div class="chip">${esc(p.name)}${inShootout && captains.has(id) ? ' <span class="tag">CAPT</span>' : ''}</div>`;
      return `<button type="button" class="chip${problem ? '' : ' pickable'}" data-pick="${id}"
        ${problem || busy ? 'disabled' : ''} aria-label="${esc(problem ? `${p.name}: ${problem}` : p.name)}"
        title="${esc(problem || `Pick for ${onClock.name}`)}">${esc(p.name)}</button>`;
    });
    return `<div><h4><span class="flight flight-${f}">${f}</span> Flight ${f}</h4>${chips.join('') || '<p class="muted">All picked</p>'}</div>`;
  }).join('');

  renderRecap(d, done);

  $('log').innerHTML = d.picks.map(p => {
    const team = d.teams.find(t => t.teamId === p.teamId);
    const player = d.players[p.playerId];
    return `<li>${esc(team?.name)} — ${esc(player?.name)} (${player?.flight})</li>`;
  }).join('') || '<li class="muted">No picks yet</li>';
}

// ---------- Shootout for pick order ----------

const setHTML = (el, html) => { if (el.dataset.html !== html) { el.innerHTML = html; el.dataset.html = html; } };
const capName = id => draft?.players?.[id]?.name || id;
const teamName = teamId => draft.teams.find(t => t.teamId === teamId)?.name || teamId;
const names = ids => ids.map(capName).join(', ');

function renderShootout(d) {
  const off = officialShots(shots, verified);
  const r = currentRound(d);
  const waiting = r >= 0 ? waitingOn(d, off, r) : [];
  const tie = nextTie(d, off);
  const settled = isSettled(d, off);
  const ryder = d.teams.some(t => t.captainIds.length > 1);

  const link = new URL(`gopher.html?draft=${d.id}`, location.href).href;
  $('gopherLink').href = link;
  $('gopherLink').textContent = link.replace(/^https?:\/\//, '').replace(/\?.*$/, ''); // short to type; it opens the newest shootout
  $('shootoutHelp').textContent = r < 0
    ? 'Each captain picks their name on their phone and gets one practice run. When everyone is ready, Go starts the real round on every phone at once.'
    : waiting.length ? `${r === 0 ? 'Real round' : `Sudden death ${r}`} is on. Waiting on ${names(waiting)}.`
      : tie ? `${tie.map(teamName).join(' and ')} are tied. Sudden death starts on its own in a moment.`
        : 'Every place is settled. The draft opens in this order on its own.';
  $('shootoutRoundHead').textContent = ryder ? 'Score (side total)' : 'Score';
  document.querySelectorAll('.adminCol').forEach(el => show(el, isAdmin));

  setHTML($('shootoutRows'), boardRows(d, off).map(({ teamId, place, tied, provisional }) => {
    const team = d.teams.find(t => t.teamId === teamId);
    const total = r >= 0 ? rounds(d).map((_, i) => teamScore(team, off, i)) : [];
    return team.captainIds.map((id, i) => {
      const shot = shots[id];
      const runs = rounds(d).map((round, k) => {
        if (!round.teamIds.includes(teamId)) return '';
        const sc = runScore(off, id, k);
        const label = sc ?? (checking(shots, verified, id, k) ? '<span class="muted">checking…</span>' : k === r ? '…' : '—');
        // Anyone can watch a checked run back
        const watch = verified[id]?.runs?.[k]?.taps ? ` <button type="button" class="link mini" data-watch="${id}" data-round="${k}" aria-label="Watch ${esc(capName(id))}'s run">▶</button>` : '';
        return `${k ? `SD${k} ` : ''}${label}${watch}`;
      }).filter(Boolean).join(' · ');
      const first = i === 0;
      const stuck = r >= 0 && checking(shots, verified, id, r) && now() - (shot?.runs?.[r]?.t || 0) > ACCEPT_AFTER_MS;
      const buttons = !isAdmin || !shot ? '' : [
        stuck ? `<button type="button" class="mini" data-cap-action="accept" data-cap="${id}">Accept phone score (${shot.runs[r].s})</button>` : '',
        r >= 0 && (runScore(off, id, r) != null || shot?.runs?.[r] != null) ? `<button type="button" class="secondary mini" data-cap-action="replay" data-cap="${id}">Redo</button>` : '',
        r < 0 && shot.practice != null ? `<button type="button" class="secondary mini" data-cap-action="practice" data-cap="${id}">Practice again</button>` : '',
        shot.uid ? `<button type="button" class="danger mini" data-cap-action="unlink" data-cap="${id}">Unlink phone</button>` : '',
      ].join('');
      const placeText = r < 0 || provisional ? '' : tied ? `Tied ${place}` : `Pick ${place}`;
      return `<tr class="${tied ? 'tie' : ''}">
        <td class="place">${first ? placeText : ''}</td>
        <td>${first ? `${esc(team.name)}${ryder && total.some(x => x != null) ? `<div class="muted">Total ${total.map((x, k) => x == null ? '' : `${k ? `SD${k} ` : ''}${x}`).filter(Boolean).join(' · ')}</div>` : ''}` : ''}</td>
        <td>${esc(capName(id))}</td>
        <td>${shot?.uid ? '✓ linked' : '<span class="muted">not yet</span>'}</td>
        <td>${shot?.practice ?? '<span class="muted">—</span>'}</td>
        <td class="score">${runs}</td>
        <td class="adminCol${isAdmin ? '' : ' hidden'}">${buttons}</td></tr>`;
    }).join('');
  }).join(''));

  show($('shootoutAdmin'), isAdmin);
  if (!isAdmin) return;
  const linked = d.teams.flatMap(t => t.captainIds).filter(id => shots[id]?.uid).length;
  const all = d.teams.flatMap(t => t.captainIds).length;
  setHTML($('shootoutMain'), r < 0
    ? `<button type="button" data-shootout="go" ${busy ? 'disabled' : ''}>Go! Start the real round</button><span class="muted">${linked} of ${all} captains linked</span>`
    : waiting.length ? `<span class="muted">Waiting on ${esc(names(waiting))}. A captain whose phone missed the start can tap Play on it.</span>`
      : tie ? `<span class="muted">The server starts sudden death by itself. If it hasn't within a few seconds:</span><button type="button" data-shootout="sudden" ${busy ? 'disabled' : ''}>Sudden death: ${esc(tie.map(teamName).join(' vs '))}</button>`
        : settled ? `<span class="muted">The server opens the draft by itself. If it hasn't within a few seconds:</span><button type="button" data-shootout="draft" ${busy ? 'disabled' : ''}>Start draft in this order</button>` : '');
}

const roundFor = teamIds => ({ teamIds, seed: newSeed(), goAt: now() + COUNTDOWN_MS });
const shotRef = id => doc(db, 'drafts', draft.id, 'shootout', id);

// Clear `field` on every shootout doc in this draft (and optionally only for some captains)
async function clearShots(fields, captainIds = Object.keys(shots)) {
  const batch = writeBatch(db);
  captainIds.filter(id => shots[id]).forEach(id => batch.update(shotRef(id), fields));
  // The server's checked copies go too (fields here only ever touch runs and practice)
  const runFields = Object.fromEntries(Object.entries(fields).filter(([k]) => k.startsWith('runs')));
  if (Object.keys(runFields).length) captainIds.filter(id => verified[id]).forEach(id => batch.update(verifiedRef(id), runFields));
  await batch.commit();
}
const verifiedRef = id => doc(db, 'drafts', draft.id, 'verified', id);

async function finishShootout() {
  const order = standings(draft, officialShots(shots, verified)).flat();
  await updateDoc(doc(db, 'drafts', draft.id), {
    teams: order.map(id => draft.teams.find(t => t.teamId === id)),
    status: 'live',
    'shootout.stage': 'done',
    'shootout.order': order,
    updatedAt: serverTimestamp(),
  });
}

$('shootoutCard').addEventListener('click', e => {
  if (!isAdmin || !draft) return;
  const cap = e.target.closest('[data-cap-action]');
  const act = e.target.closest('[data-shootout]');
  const r = currentRound(draft);
  const draftRef = doc(db, 'drafts', draft.id);

  if (cap) {
    const id = cap.dataset.cap;
    const action = cap.dataset.capAction;
    if (action === 'replay' && confirm(`Clear ${capName(id)}'s score for this round so they can play it again?`)) {
      withBusy(() => clearShots({ [`runs.${r}`]: deleteField() }, [id]));
    } else if (action === 'accept') {
      // Backup if the server can't check a run: take the phone's own score
      const run = shots[id]?.runs?.[r];
      if (run && confirm(`The server hasn't checked ${capName(id)}'s run. Accept the phone's score of ${run.s}?`)) {
        withBusy(() => setDoc(verifiedRef(id), { runs: { [r]: { s: run.s, claimed: run.s, t: run.t, taps: run.taps || [], acceptedBy: 'organizer' } } }, { merge: true }));
      }
    } else if (action === 'practice') {
      withBusy(() => updateDoc(shotRef(id), { practice: null }));
    } else if (action === 'unlink' && confirm(`Unlink ${capName(id)}'s phone? Their scores stay, and they can pick their name again on any phone.`)) {
      withBusy(() => updateDoc(shotRef(id), { uid: null }));
    }
    return;
  }
  if (!act) return;
  const allTeams = draft.teams.map(t => t.teamId);
  switch (act.dataset.shootout) {
    case 'go': {
      const missing = draft.teams.flatMap(t => t.captainIds).filter(id => !shots[id]?.uid);
      if (missing.length && !confirm(`${names(missing)} ${missing.length === 1 ? 'hasn\'t' : 'haven\'t'} linked a phone yet. Start anyway? They can still play late.`)) return;
      return withBusy(() => updateDoc(draftRef, { 'shootout.stage': 'live', 'shootout.rounds': [roundFor(allTeams)], updatedAt: serverTimestamp() }));
    }
    case 'sudden': {
      const tie = nextTie(draft, officialShots(shots, verified));
      if (!tie) return;
      return withBusy(() => updateDoc(draftRef, { 'shootout.rounds': [...rounds(draft), roundFor(tie)], updatedAt: serverTimestamp() }));
    }
    case 'draft':
      return withBusy(finishShootout);
    case 'restart': {
      if (r < 0) return alert('The real round hasn\'t started yet.');
      if (!confirm(`Restart ${r === 0 ? 'the real round' : `sudden death ${r}`}? Scores from it are cleared and everyone in it plays again from a new countdown.`)) return;
      const round = rounds(draft)[r];
      const ids = draft.teams.filter(t => round.teamIds.includes(t.teamId)).flatMap(t => t.captainIds);
      return withBusy(async () => {
        await clearShots({ [`runs.${r}`]: deleteField() }, ids);
        await updateDoc(draftRef, { 'shootout.rounds': [...rounds(draft).slice(0, r), roundFor(round.teamIds)], updatedAt: serverTimestamp() });
      });
    }
    case 'practice':
      if (!confirm('Go back to practice? All real-round and sudden-death scores are cleared. Practice scores and phone links stay.')) return;
      return withBusy(async () => {
        await clearShots({ runs: {} });
        await updateDoc(draftRef, { 'shootout.stage': 'practice', 'shootout.rounds': [], updatedAt: serverTimestamp() });
      });
    case 'over':
      if (!confirm('Start the shootout over? Every score, practice included, is cleared. Phones stay linked.')) return;
      return withBusy(async () => {
        await clearShots({ runs: {}, practice: null });
        await updateDoc(draftRef, { 'shootout.stage': 'practice', 'shootout.rounds': [], updatedAt: serverTimestamp() });
      });
    case 'skip':
      if (!confirm('Skip the rest of the shootout and draft in the order shown? Teams still tied keep their setup order.')) return;
      return withBusy(finishShootout);
  }
});

// ---------- Picking (the captain whose turn it is, or the organizer) ----------

// The captains this phone is linked to (drafts/{id}/shootout/{captain}.uid)
const myCaptains = d => (d?.teams || []).flatMap(t => t.captainIds).filter(id => uid && shots[id]?.uid === uid);

// A captain who hasn't linked this phone yet (no shootout, or a different phone) picks their name here
function renderCaptainLink(d, inShootout, done, mine) {
  const el = $('captainLink');
  const offer = !isAdmin && !inShootout && !done;
  show(el, offer);
  if (!offer) return;
  if (mine.length) return setHTML(el, `<p class="muted">You pick for ${esc(mine.map(capName).join(' & '))}'s team from this phone.</p>`);
  const buttons = d.teams.flatMap(t => t.captainIds).map(id => {
    const taken = !!shots[id]?.uid;
    return `<button type="button" class="secondary mini" data-link="${id}" ${taken ? 'disabled' : ''}>${esc(capName(id))}${taken ? ' (on another phone)' : ''}</button>`;
  }).join('');
  setHTML(el, `<p class="muted">Captain? Tap your name to pick from this phone. On another phone already? Ask the organizer to unlink it.</p><div class="row">${buttons}</div>`);
}

$('captainLink').addEventListener('click', e => {
  const b = e.target.closest('[data-link]');
  if (!b || !draft || !confirm(`Are you ${capName(b.dataset.link)}? This phone will make their team's picks.`)) return;
  const captainId = b.dataset.link;
  withBusy(() => runTransaction(db, async tx => {
    const ref = doc(db, 'drafts', draft.id, 'shootout', captainId);
    const snap = await tx.get(ref);
    if (snap.data()?.uid && snap.data().uid !== uid) throw new Error(`${capName(captainId)} is already on another phone. Ask the organizer to unlink it.`);
    if (snap.exists()) tx.update(ref, { uid, name: capName(captainId) });
    else tx.set(ref, { uid, name: capName(captainId), practice: null, runs: {} });
  }));
});

$('pool').addEventListener('click', e => {
  const button = e.target.closest('[data-pick]');
  if (button && !button.disabled) pick(button.dataset.pick);
});

async function withBusy(fn) {
  if (busy) return;
  busy = true;
  render(draft);
  try { await fn(); } catch (error) { fail(error); } finally { busy = false; render(draft); }
}

// The server makes the pick: it checks whose turn it is and that the player can be
// taken, and the pick number stops a double tap or a stale screen picking twice.
function pick(playerId) {
  const team = teamOnClock(draft);
  if (!team || !confirm(`Pick ${draft.players[playerId]?.name} for ${team.name}?`)) return;
  const pickNumber = draft.picks.length + 1;
  return withBusy(() => makeDraftPick({ draftId: draft.id, playerId, pickNumber }));
}

$('undoButton').addEventListener('click', () => {
  const last = draft.picks[draft.picks.length - 1];
  if (!last || !confirm(`Undo ${draft.players[last.playerId].name}?`)) return;
  const expected = draft.picks.length;
  withBusy(() => runTransaction(db, async tx => {
    const ref = doc(db, 'drafts', draft.id);
    const current = (await tx.get(ref)).data();
    if (current.picks.length !== expected) throw new Error('The draft changed; try again.');
    // The recap no longer matches the picks; it's rewritten when the draft completes again
    tx.update(ref, { picks: current.picks.slice(0, -1), status: 'live', recap: deleteField(), recapError: deleteField(), recapStartedAt: deleteField(), updatedAt: serverTimestamp() });
  }));
});

// ---------- Draft recap by Claude (written by the server) ----------

const WHATSAPP_FOOTER = '\n\n📋 Full draft board: naples.bourbonbogeys.com/draft/';
// *bold* is WhatsApp's bold; show it the same way here
const recapHTML = text => esc(text).replace(/\*([^*\n]+)\*/g, '<b>$1</b>').replace(/\n/g, '<br>');

// The server writes drafts/{id}.recap once the last pick is in (or recapError if Claude
// couldn't); clearing both asks it to write a new one.
function renderRecap(d, done) {
  const text = d.recap?.text || '';
  show($('recapCard'), !!text || done);
  setHTML($('recapText'), text ? recapHTML(text) : '');
  show($('recapShare'), !!text);
  show($('recapAgain'), isAdmin && done && (!!text || !!d.recapError));
  $('recapAgain').textContent = text ? 'Write it again' : 'Try again';
  $('recapStatus').textContent = text ? ''
    : d.recapError ? (isAdmin ? `Claude couldn't write it: ${d.recapError}` : 'The recap is on its way.')
      : 'Claude is writing the recap…';
}

$('recapAgain').addEventListener('click', () => {
  if (!draft || !isAdmin) return;
  withBusy(() => updateDoc(doc(db, 'drafts', draft.id), { recap: deleteField(), recapError: deleteField(), recapStartedAt: deleteField(), updatedAt: serverTimestamp() }));
});
$('recapShare').addEventListener('click', () => {
  if (!draft?.recap?.text) return;
  // WhatsApp asks which chat (pick the trip group), then the text is ready to send
  window.open(`https://wa.me/?text=${encodeURIComponent(draft.recap.text + WHATSAPP_FOOTER)}`, '_blank');
});

// ---------- Watching a run back ----------

let stopReplay = null;
let replaying = null; // { id, round }

function openReplay(id, round, speed = 1) {
  const run = verified[id]?.runs?.[round];
  const seed = rounds(draft)[round]?.seed;
  if (!run?.taps || !seed) return;
  replaying = { id, round };
  $('replayTitle').textContent = `${capName(id)} · ${round ? `sudden death ${round}` : 'real round'} · scored ${run.s}`;
  if (stopReplay) stopReplay();
  stopReplay = playReplay($('replayBody'), { seed, taps: run.taps, speed });
  if (!$('replayDialog').open) $('replayDialog').showModal();
}

$('shootoutRows').addEventListener('click', e => {
  const b = e.target.closest('[data-watch]');
  if (b) openReplay(b.dataset.watch, Number(b.dataset.round));
});
$('replayDialog').addEventListener('click', e => {
  const sp = e.target.closest('[data-speed]');
  if (sp && replaying) openReplay(replaying.id, replaying.round, Number(sp.dataset.speed));
  if (e.target.closest('[data-close]') || e.target === $('replayDialog')) $('replayDialog').close();
});
$('replayDialog').addEventListener('close', () => { if (stopReplay) stopReplay(); stopReplay = null; replaying = null; });

// ---------- Gopher Hall of Fame (kept by the server in stats/gopher) ----------

let unsubRecords = null;
function watchRecords() {
  if (unsubRecords) return;
  unsubRecords = onSnapshot(doc(db, 'stats', 'gopher'), snap => { records = snap.data() || null; renderRecords(); }, fail);
}

// The board otherwise redraws only when something changes; during the shootout it
// also needs the clock (the organizer's "Accept phone score" backup appears after a wait)
setInterval(() => { if (draft?.status === 'shootout') render(draft); }, 5000);

function renderRecords() {
  const top = records?.top || [];
  show($('recordsCard'), top.length > 0 || !!records?.worstPractice);
  const line = (e, i) => `<li><b>${e.s}</b> ${esc(e.name)} <span class="muted">· ${esc(e.roundName || '')}${e.round ? ` · sudden death ${e.round}` : ''}</span>${i === 0 ? ' 👑' : ''}</li>`;
  setHTML($('recordsTop'), top.slice(0, 5).map(line).join('') || '<li class="muted">No real rounds yet</li>');
  const sd = records?.bestSuddenDeath;
  const wp = records?.worstPractice;
  $('recordsMore').innerHTML = [
    sd ? `Clutch: <b>${sd.s}</b> by ${esc(sd.name)} in sudden death` : '',
    wp ? `Worst practice run: <b>${wp.s}</b> by ${esc(wp.name)} 🙈` : '',
  ].filter(Boolean).join('<br>');
  show($('recordsClear'), isAdmin);
}

$('recordsClear').addEventListener('click', () => {
  if (!isAdmin || !confirm('Clear the Gopher Hall of Fame? Use this after testing. Real scores played later start it again.')) return;
  withBusy(() => deleteDoc(doc(db, 'stats', 'gopher')));
});

// ---------- Admin: saving to the round ----------

// Backup to the server saving the teams by itself once the last pick is in
$('saveButton').addEventListener('click', () => withBusy(async () => {
  const question = draft.status === 'saved'
    ? `Save these ${draft.teams.length} teams to ${draft.roundName} again?`
    : `Save these ${draft.teams.length} teams as ${draft.roundName}'s playing groups (and its team games' teams)?`;
  if (!confirm(question)) return;
  try {
    await saveDraftTeamsNow({ draftId: draft.id });
  } catch (error) {
    // The day already has scores or locked groups: only on purpose
    if (!/Scores|locked/.test(error?.message || '')) throw error;
    if (!confirm(`${error.message}. Save the teams over it anyway?`)) return;
    await saveDraftTeamsNow({ draftId: draft.id, force: true });
  }
  alert(`Saved to ${draft.roundName}. Set tee times and tees in the app.`);
}));

$('deleteButton').addEventListener('click', () => {
  if (!confirm(`Delete this draft for ${draft.roundName}? Teams already saved to the round stay.`)) return;
  const id = draft.id;
  withBusy(async () => {
    // Its shootout scores go with it
    for (const sub of ['shootout', 'verified']) {
      for (const x of (await getDocs(collection(db, 'drafts', id, sub))).docs) await deleteDoc(x.ref);
    }
    await deleteDoc(doc(db, 'drafts', id));
    await loadDraftPicker();
    watchDraft(null);
  });
});

// ---------- Everyone: flights by day ----------

let unsubscribeFlights = null;
const flightNames = {};

function watchFlights(tournamentId) {
  if (unsubscribeFlights) unsubscribeFlights();
  unsubscribeFlights = onSnapshot(collection(db, 'tournaments', tournamentId, 'rounds'), async snap => {
    const rounds = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(r => r.flights)
      .sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
    show($('flightsCard'), rounds.length > 0);
    if (!rounds.length) return;
    const ids = Object.keys(rounds[rounds.length - 1].flights);
    await Promise.all(ids.filter(id => !flightNames[id]).map(async id => {
      const p = (await getDoc(doc(db, 'players', id))).data() || {};
      flightNames[id] = p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || id;
    }));
    const latest = rounds[rounds.length - 1].flights;
    ids.sort((a, b) => FLIGHTS.indexOf(latest[a]) - FLIGHTS.indexOf(latest[b]) || flightNames[a].localeCompare(flightNames[b]));
    const cell = (r, i, id) => {
      const f = r.flights[id];
      const before = i > 0 ? rounds[i - 1].flights[id] : null;
      const move = before && f !== before ? (f < before ? '<span class="up">↑</span>' : '<span class="down">↓</span>') : '';
      return `<td>${f ? `<span class="flight flight-${f}">${f}</span>${move}` : '—'}</td>`;
    };
    $('flightsTable').innerHTML = `<thead><tr><th>Player</th>${rounds.map(r => `<th>${esc(r.shortName || `R${r.roundNumber}`)}</th>`).join('')}</tr></thead>
      <tbody>${ids.map(id => `<tr><td>${esc(flightNames[id])}</td>${rounds.map((r, i) => cell(r, i, id)).join('')}</tr>`).join('')}</tbody>`;
  }, fail);
}
