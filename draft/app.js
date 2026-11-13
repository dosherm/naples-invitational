// Team draft page. Phones sign in anonymously and watch; the laptop signs in with
// the admin account and runs the draft. Writes are limited to the admin by
// firestore.rules (drafts, and the round's groups when the teams are saved).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDoc, getDocs, onSnapshot, query, orderBy, limit, where,
  setDoc, updateDoc, deleteDoc, runTransaction, serverTimestamp, deleteField, writeBatch,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';
import {
  FLIGHTS, FORMATS, teamMembers, perFlight, totalPicks, isComplete, teamOnClock, takenIds,
  pickProblem, setupProblems, groupsFromDraft, flightsByHandicap,
} from './draftLogic.js?v=20261111a';
import { netHoles, openSystem, ryderCaptains } from './flights.js?v=20261111a';
import {
  COUNTDOWN_MS, newSeed, rounds, currentRound, runScore, teamScore, waitingOn, standings, nextTie, isSettled, boardRows,
  officialShots, checking,
} from './shootout.js?v=20261113b';
import { now, syncClock } from './clock.js?v=20261113a';
import { playReplay } from './replay.js?v=20261113b';

// The Firebase web key is public by design; access is controlled by firestore.rules.
const app = initializeApp({
  apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0',
  authDomain: 'golf-tournament-app-e2390.firebaseapp.com',
  projectId: 'golf-tournament-app-e2390',
});
const auth = getAuth(app);
const db = getFirestore(app);

// Same account firestore.rules treats as admin; used here only to show the controls.
const ADMIN_UID = 'GknZy04hB2V8xQdnMmKqy2x24Qu2';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const show = (el, on) => el.classList.toggle('hidden', !on);
const newId = () => doc(collection(db, 'drafts')).id;

let isAdmin = false;
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

onAuthStateChanged(auth, async user => {
  if (!user) {
    signInAnonymously(auth).catch(fail);
    return;
  }
  isAdmin = !user.isAnonymous && user.uid === ADMIN_UID;
  $('adminButton').textContent = isAdmin ? 'Sign out' : 'Run draft';
  $('adminWho').textContent = isAdmin ? `Signed in as ${user.email}` : '';
  show($('signIn'), false);
  show($('adminBar'), isAdmin);
  show($('setup'), false);
  show($('endRound'), false);
  // Google's clock, so the organizer's Go means the same moment on every phone
  syncClock(db, user.uid);
  watchRecords();
  renderRecords();
  if (isAdmin) await loadDraftPicker();
  watchDraft(new URLSearchParams(location.search).get('draft'));
  watchFlights(new URLSearchParams(location.search).get('t') || NAPLES_TOURNAMENT_ID);
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

// A specific draft (?draft=id or the admin's picker), or else the newest one.
function watchDraft(draftId) {
  if (unsubscribe) unsubscribe();
  lastPickCount = 0;
  const onError = error => fail(error);
  if (draftId) {
    unsubscribe = onSnapshot(doc(db, 'drafts', draftId), snap => {
      render(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    }, onError);
  } else {
    unsubscribe = onSnapshot(query(collection(db, 'drafts'), orderBy('createdAt', 'desc'), limit(1)), snap => {
      render(snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() });
    }, onError);
  }
}

async function loadDraftPicker(selectedId) {
  const snap = await getDocs(query(collection(db, 'drafts'), orderBy('createdAt', 'desc'), limit(20)));
  const options = snap.docs.map(d => {
    const x = d.data();
    return `<option value="${d.id}">${esc(x.tournamentName)} · ${esc(x.roundName)} · ${esc(statusLabel(x))}</option>`;
  });
  $('draftPicker').innerHTML = `<option value="">Newest draft</option>${options.join('')}`;
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
  const id = d?.shootout ? d.id : null;
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

  const inShootout = d.status === 'shootout';
  show($('shootoutCard'), inShootout);
  show($('teams'), !inShootout);
  show($('pool').closest('.card'), !inShootout);
  show($('log').closest('.card'), !inShootout);
  if (inShootout) {
    $('status').classList.add('clock');
    $('status').textContent = 'Captains are playing Whack-a-Gopher for the pick order';
    show($('adminActions'), isAdmin);
    $('undoButton').disabled = true;
    show($('saveBar'), false);
    renderShootout(d);
    return;
  }

  const onClock = teamOnClock(d);
  const done = isComplete(d);
  const pickNo = d.picks.length + 1;
  const status = $('status');
  status.classList.toggle('clock', !done);
  if (d.status === 'saved') status.textContent = 'Draft complete · teams saved to the round';
  else if (done) status.textContent = 'Draft complete';
  else status.textContent = `On the clock: ${onClock.name} · pick ${pickNo} of ${totalPicks(d)}`;

  show($('adminActions'), isAdmin);
  $('undoButton').disabled = busy || d.picks.length === 0 || d.status === 'saved';
  show($('saveBar'), isAdmin && done);
  $('saveButton').disabled = busy || !done;
  $('saveButton').textContent = d.status === 'saved' ? 'Save teams to round again' : 'Save teams to round';
  $('saveNote').textContent = d.status === 'saved'
    ? `Saved to ${d.roundName}${d.savedBy ? ` by ${d.savedBy}` : ''}.`
    : `Saving makes these teams ${d.roundName}'s playing groups.`;

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
    return `<div class="team${clock ? ' clock' : ''}"><h3><span>${esc(t.name)}</span>${clock ? '<span class="muted">picking</span>' : ''}</h3>${slots.join('')}</div>`;
  }).join('');

  const taken = takenIds(d);
  $('pool').innerHTML = FLIGHTS.map(f => {
    const left = Object.entries(d.players)
      .filter(([id, p]) => p.flight === f && !taken.has(id))
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
    const chips = left.map(([id, p]) => {
      const problem = onClock ? pickProblem(d, onClock.teamId, id) : 'Draft complete';
      if (!isAdmin) return `<div class="chip">${esc(p.name)}</div>`;
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

// ---------- Admin: picking ----------

$('pool').addEventListener('click', e => {
  const button = e.target.closest('[data-pick]');
  if (button && isAdmin) pick(button.dataset.pick);
});

async function withBusy(fn) {
  if (busy) return;
  busy = true;
  render(draft);
  try { await fn(); } catch (error) { fail(error); } finally { busy = false; render(draft); }
}

// In a transaction, so a double click or a second laptop can't pick twice.
function pick(playerId) {
  const expected = draft.picks.length;
  return withBusy(() => runTransaction(db, async tx => {
    const ref = doc(db, 'drafts', draft.id);
    const current = { id: ref.id, ...(await tx.get(ref)).data() };
    if (current.picks.length !== expected) throw new Error('The draft changed; try again.');
    const team = teamOnClock(current);
    if (!team) throw new Error('The draft is already complete.');
    const problem = pickProblem(current, team.teamId, playerId);
    if (problem) throw new Error(problem);
    const picks = [...current.picks, { teamId: team.teamId, playerId }];
    tx.update(ref, {
      picks,
      status: picks.length >= totalPicks(current) ? 'complete' : 'live',
      updatedAt: serverTimestamp(),
    });
  }));
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

$('saveButton').addEventListener('click', () => withBusy(async () => {
  const roundRef = doc(db, 'tournaments', draft.tournamentId, 'rounds', draft.roundId);
  const round = (await getDoc(roundRef)).data();
  // Always ask: this changes the round the app plays from
  const question = round?.groups?.length
    ? `${draft.roundName} already has ${round.groups.length} groups. Replace them with these ${draft.teams.length} teams?`
    : `Save these ${draft.teams.length} teams as ${draft.roundName}'s groups?`;
  if (!confirm(question)) return;
  const groups = groupsFromDraft(draft, newId);
  const savedBy = auth.currentUser?.email || auth.currentUser?.uid || 'unknown';
  const savedAt = new Date().toISOString();
  await updateDoc(roundRef, {
    groups,
    // Ryder Cup: the two sides' names, for the app's Ryder Cup scoreboard
    ...(draft.format === 'ryder' ? { ryderTeams: draft.teams.map(t => ({ teamId: t.teamId, name: t.name })) } : {}),
    draftId: draft.id,
    draftSavedBy: savedBy,
    draftSavedAt: savedAt,
    updatedAt: savedAt,
  });

  // Team games on this round (30/40 Ball) play the drafted teams
  let teamGames = 0;
  if (draft.format === 'teams') {
    const games = await getDocs(query(collection(db, 'games'), where('roundIds', 'array-contains', draft.roundId)));
    for (const g of games.docs.filter(g => g.data().gameType === 'thirtyfourty')) {
      const teams = draft.teams.map(t => {
        const players = groups.find(gr => gr.name === t.name)?.players || teamMembers(draft, t.teamId);
        return { teamId: t.teamId, teamName: t.name, players, teamSize: players.length };
      });
      await updateDoc(g.ref, { teams, playerIds: teams.flatMap(t => t.players) });
      teamGames++;
    }
  }
  await updateDoc(doc(db, 'drafts', draft.id), { status: 'saved', savedBy, savedAt: serverTimestamp(), updatedAt: serverTimestamp() });
  alert(`Saved ${groups.length} groups to ${draft.roundName}${teamGames ? ` and the teams for its 30/40 game` : ''}. Set tee times and tees in the app.`);
}));

$('deleteButton').addEventListener('click', () => {
  if (!confirm(`Delete this draft for ${draft.roundName}? Teams already saved to the round stay.`)) return;
  const id = draft.id;
  withBusy(async () => {
    // Its shootout scores go with it
    for (const shot of (await getDocs(collection(db, 'drafts', id, 'shootout'))).docs) await deleteDoc(shot.ref);
    await deleteDoc(doc(db, 'drafts', id));
    await loadDraftPicker();
    watchDraft(null);
  });
});

// ---------- Admin: setting up a new draft ----------

const setup = { tournaments: [], rounds: [], players: {}, flights: {}, defaultFlights: {}, captains: [] };

$('newDraftButton').addEventListener('click', async () => {
  try {
    show($('setup'), true);
    show($('board'), false);
    show($('empty'), false);
    $('formatSelect').innerHTML = Object.entries(FORMATS).map(([k, f]) => `<option value="${k}">${esc(f.label)}</option>`).join('');
    const snap = await getDocs(collection(db, 'tournaments'));
    setup.tournaments = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => String(b.startDate || b.date || '').localeCompare(String(a.startDate || a.date || '')));
    $('tournamentSelect').innerHTML = setup.tournaments.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join('');
    await loadTournament();
  } catch (error) { fail(error); }
});

$('cancelSetup').addEventListener('click', () => {
  show($('setup'), false);
  render(draft);
});

$('tournamentSelect').addEventListener('change', () => loadTournament().catch(fail));
$('formatSelect').addEventListener('change', () => { resetCaptains(); renderSetup(); });
$('roundSelect').addEventListener('change', () => {
  const round = setup.rounds.find(r => r.id === $('roundSelect').value);
  // Day 4 (Ryder Cup) is the last round; suggest the format to match.
  const last = setup.rounds[setup.rounds.length - 1];
  if (setup.rounds.length > 1) $('formatSelect').value = round?.id === last.id ? 'ryder' : 'teams';
  // Flights and captains set by "End of round" for this round, if any
  setup.flights = {};
  Object.keys(setup.players).forEach(id => {
    setup.flights[id] = round?.flights?.[id] || setup.defaultFlights[id];
  });
  resetCaptains();
  (round?.draftCaptains || []).forEach((team, i) => {
    if (setup.captains[i]) team.captainIds.forEach((id, j) => { if (j < setup.captains[i].length) setup.captains[i][j] = id; });
  });
  renderSetup();
});

async function loadTournament() {
  const tournament = setup.tournaments.find(t => t.id === $('tournamentSelect').value);
  if (!tournament) return;
  const roundsSnap = await getDocs(collection(db, 'tournaments', tournament.id, 'rounds'));
  setup.rounds = roundsSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
  $('roundSelect').innerHTML = setup.rounds.map(r => `<option value="${r.id}">${esc(r.name || `Round ${r.roundNumber}`)}</option>`).join('');

  // Handicaps: the Naples list is refreshed from GHIN daily, so prefer it.
  const naples = {};
  (await getDocs(collection(db, 'naples_players'))).docs.forEach(d => {
    const p = d.data();
    if (p.ghin) naples[String(p.ghin)] = p.handicap_index;
  });
  setup.players = {};
  await Promise.all((tournament.players || []).map(async id => {
    const p = (await getDoc(doc(db, 'players', id))).data() || {};
    setup.players[id] = {
      name: p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || id,
      lastName: p.lastName || '',
      handicapIndex: naples[String(p.ghin)] ?? p.handicapIndex ?? null,
    };
  }));

  // Flights from this tournament's latest draft, else by handicap.
  const previous = (await getDocs(query(collection(db, 'drafts'), where('tournamentId', '==', tournament.id)))).docs
    .map(d => d.data())
    .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))[0];
  // (A round's own flights, set by "End of round", take precedence; see roundSelect.)
  const byHandicap = flightsByHandicap(Object.keys(setup.players), id => setup.players[id].handicapIndex);
  setup.defaultFlights = {};
  Object.keys(setup.players).forEach(id => { setup.defaultFlights[id] = previous?.players?.[id]?.flight || byHandicap[id]; });

  $('roundSelect').dispatchEvent(new Event('change'));
}

function resetCaptains() {
  const { teamCount, captainsPerTeam } = FORMATS[$('formatSelect').value];
  setup.captains = Array.from({ length: teamCount }, () => Array(captainsPerTeam).fill(''));
}

const sortedIds = () => Object.keys(setup.players).sort((a, b) =>
  FLIGHTS.indexOf(setup.flights[a]) - FLIGHTS.indexOf(setup.flights[b])
  || (setup.players[a].handicapIndex ?? 99) - (setup.players[b].handicapIndex ?? 99));

function draftPlayers() {
  const players = {};
  Object.entries(setup.players).forEach(([id, p]) => {
    players[id] = { name: p.name, flight: setup.flights[id], handicapIndex: p.handicapIndex };
  });
  return players;
}

function renderSetup() {
  const ids = sortedIds();
  $('flightCounts').innerHTML = FLIGHTS.map(f =>
    `<span><span class="flight flight-${f}">${f}</span> ${ids.filter(id => setup.flights[id] === f).length}</span>`).join('');
  $('flightRows').innerHTML = ids.map(id => {
    const p = setup.players[id];
    const seg = FLIGHTS.map(f =>
      `<button type="button" class="${f}${setup.flights[id] === f ? ' on' : ''}" data-flight="${f}" data-player="${id}">${f}</button>`).join('');
    return `<tr><td>${esc(p.name)}</td><td>${p.handicapIndex ?? '—'}</td><td><span class="seg">${seg}</span></td></tr>`;
  }).join('');

  const options = selected => `<option value="">Choose…</option>` + ids.map(id =>
    `<option value="${id}" ${id === selected ? 'selected' : ''}>${setup.flights[id]} · ${esc(setup.players[id].name)}</option>`).join('');
  $('captainRows').innerHTML = setup.captains.map((captains, t) =>
    `<div class="row" style="margin-bottom:8px"><strong style="width:70px">Team ${t + 1}</strong>${captains.map((c, i) =>
      `<select data-team="${t}" data-slot="${i}">${options(c)}</select>`).join('')}</div>`).join('');

  const problems = setupProblems(draftPlayers(), $('formatSelect').value, setup.captains);
  $('setupProblems').innerHTML = problems.map(p => `<li>${esc(p)}</li>`).join('');
  $('startButton').disabled = problems.length > 0 || setup.rounds.length === 0;
  $('shootoutButton').disabled = $('startButton').disabled;
}

$('flightRows').addEventListener('click', e => {
  const button = e.target.closest('[data-flight]');
  if (!button) return;
  setup.flights[button.dataset.player] = button.dataset.flight;
  renderSetup();
});

$('captainRows').addEventListener('change', e => {
  const select = e.target.closest('select[data-team]');
  if (!select) return;
  setup.captains[select.dataset.team][select.dataset.slot] = select.value;
  renderSetup();
});

$('startButton').addEventListener('click', () => startDraft(false));
$('shootoutButton').addEventListener('click', () => startDraft(true));

async function startDraft(withShootout) {
  const tournament = setup.tournaments.find(t => t.id === $('tournamentSelect').value);
  const round = setup.rounds.find(r => r.id === $('roundSelect').value);
  const format = $('formatSelect').value;
  const players = draftPlayers();
  if (setupProblems(players, format, setup.captains).length) return;
  // "Team Hanger", or "Team J. Hanger" when two captains share a last name
  const lastNames = setup.captains.flat().map(id => setup.players[id].lastName);
  const label = id => {
    const p = setup.players[id];
    if (!p.lastName) return p.name;
    return lastNames.filter(n => n === p.lastName).length > 1 ? `${p.name[0]}. ${p.lastName}` : p.lastName;
  };
  const teams = setup.captains.map((captainIds, i) => ({
    teamId: `team-${'abcd'[i]}`,
    name: `Team ${captainIds.map(label).join(' & ')}`,
    captainIds,
  }));
  try {
    $('startButton').disabled = true;
    $('shootoutButton').disabled = true;
    const ref = doc(collection(db, 'drafts'));
    await setDoc(ref, {
      tournamentId: tournament.id,
      tournamentName: tournament.name || '',
      roundId: round.id,
      roundName: round.name || `Round ${round.roundNumber}`,
      format,
      players,
      teams,
      picks: [],
      status: withShootout ? 'shootout' : 'live',
      ...(withShootout ? { shootout: { stage: 'practice', rounds: [] } } : {}),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    // The flights this round is played in; "End of round" ranks them afterwards
    const flights = Object.fromEntries(Object.entries(players).map(([id, p]) => [id, p.flight]));
    await updateDoc(doc(db, 'tournaments', tournament.id, 'rounds', round.id), { flights, updatedAt: new Date().toISOString() });
    show($('setup'), false);
    await loadDraftPicker(ref.id);
    watchDraft(ref.id);
  } catch (error) {
    fail(error);
    $('startButton').disabled = false;
    $('shootoutButton').disabled = false;
  }
}

// ---------- Admin: end of round (promotion and relegation) ----------

const end = { tournaments: [], rounds: [], round: null, next: null, data: null, result: null, chosen: {} };
const playerName = id => end.names?.[id] || id;
const MOVE_KEYS = [['up', 'B'], ['up', 'C'], ['up', 'D'], ['down', 'A'], ['down', 'B'], ['down', 'C']];

$('endRoundButton').addEventListener('click', async () => {
  try {
    ['setup', 'board', 'empty'].forEach(id => show($(id), false));
    show($('endRound'), true);
    const snap = await getDocs(collection(db, 'tournaments'));
    end.tournaments = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => String(b.startDate || b.date || '').localeCompare(String(a.startDate || a.date || '')));
    $('endTournament').innerHTML = end.tournaments.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join('');
    await loadEndTournament();
  } catch (error) { fail(error); }
});
$('cancelEndRound').addEventListener('click', () => { show($('endRound'), false); render(draft); });
$('endTournament').addEventListener('change', () => loadEndTournament().catch(fail));
$('endRoundSelect').addEventListener('change', () => computeEnd().catch(fail));

async function loadEndTournament() {
  const t = end.tournaments.find(x => x.id === $('endTournament').value);
  const snap = await getDocs(collection(db, 'tournaments', t.id, 'rounds'));
  end.rounds = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
  end.names = {};
  await Promise.all((t.players || []).map(async id => {
    const p = (await getDoc(doc(db, 'players', id))).data() || {};
    end.names[id] = p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || id;
  }));
  $('endRoundSelect').innerHTML = end.rounds.map(r =>
    `<option value="${r.id}">${esc(r.name || `Round ${r.roundNumber}`)}${r.flightResults ? ' (done)' : ''}</option>`).join('');
  // Default: the first round with flights that hasn't been closed yet
  const open = end.rounds.find(r => r.flights && !r.flightResults) || end.rounds.find(r => r.flights) || end.rounds[0];
  if (open) $('endRoundSelect').value = open.id;
  await computeEnd();
}

// Gross and net per hole for everyone in the round's flights.
async function roundScores(round) {
  const course = (await getDoc(doc(db, 'courses', round.courseId))).data() || {};
  const holes = await Promise.all(Array.from({ length: 18 }, async (_, i) =>
    (await getDoc(doc(db, 'scores', `${round.id}-hole-${i + 1}`))).data()?.playerScores || {}));
  const players = {};
  const missing = [];
  Object.keys(round.flights).forEach(id => {
    const a = round.playerAssignments?.[id];
    const tee = a && (course.tees?.[a.teeGender || 'male'] || [])[a.teeIndex || 0];
    if (!a || a.courseHandicap == null || !tee?.holes?.length) {
      missing.push(`${playerName(id)}: no tee / course handicap`);
      return;
    }
    const gross = holes.map(h => h[id] || 0);
    const empty = gross.map((g, i) => (g > 0 ? null : i + 1)).filter(Boolean);
    if (empty.length) {
      missing.push(`${playerName(id)}: no score on ${empty.length === 18 ? 'any hole' : `hole${empty.length > 1 ? 's' : ''} ${empty.join(', ')}`}`);
      return;
    }
    players[id] = { gross, net: netHoles(gross, a.courseHandicap, tee.holes.map(h => h.handicap)) };
  });
  return { players, missing };
}

async function computeEnd() {
  end.round = end.rounds.find(r => r.id === $('endRoundSelect').value);
  end.next = end.rounds[end.rounds.indexOf(end.round) + 1] || null;
  end.result = null;
  $('confirmEndRound').disabled = true;
  $('confirmEndRound').textContent = end.next ? `Save flights for ${end.next.name || 'next round'}` : 'Save results';
  if (!end.round?.flights) {
    $('endRoundBody').innerHTML = `<p class="muted">No flights are saved for this round yet. They're saved when the round's draft starts.</p>`;
    return;
  }
  $('endRoundBody').innerHTML = '<p class="muted">Loading scores…</p>';
  end.data = await roundScores(end.round);
  if (end.data.missing.length) {
    $('endRoundBody').innerHTML = `<p><strong>Every player needs a full card first.</strong></p>
      <ul class="problems">${end.data.missing.map(m => `<li>${esc(m)}</li>`).join('')}</ul>`;
    return;
  }
  const net = Object.fromEntries(Object.entries(end.data.players).map(([id, p]) => [id, p.net]));
  end.result = openSystem(end.round.flights, net);
  end.chosen = {};
  end.result.moves.forEach(m => { end.chosen[`${m.reason.startsWith('best') ? 'up' : 'down'}-${m.from}`] = m.playerId; });
  end.chosen['last-D'] = end.result.captains[3];
  renderEnd();
}

// Flights, captains and moves from the current choices (the computed ones unless changed).
function endOutcome() {
  const flights = end.round.flights;
  const nextFlights = { ...flights };
  const problems = [];
  const moves = MOVE_KEYS.map(([dir, f]) => {
    const playerId = end.chosen[`${dir}-${f}`];
    const to = FLIGHTS[FLIGHTS.indexOf(f) + (dir === 'up' ? -1 : 1)];
    return { playerId, from: f, to, reason: `${dir === 'up' ? 'best' : 'worst'} net in ${f}`, net: end.data.players[playerId] ? end.data.players[playerId].net.reduce((s, x) => s + x, 0) : null };
  });
  FLIGHTS.forEach(f => {
    if (end.chosen[`up-${f}`] && end.chosen[`up-${f}`] === end.chosen[`down-${f}`]) problems.push(`The same player can't move up and down from ${f}`);
  });
  moves.forEach(m => { nextFlights[m.playerId] = m.to; });
  const relegated = ['A', 'B', 'C'].map(f => end.chosen[`down-${f}`]);
  let draftCaptains;
  let ryder = null;
  const nextIsLast = end.next && end.next.id === end.rounds[end.rounds.length - 1].id && end.rounds.length > 1;
  if (nextIsLast) {
    const net = Object.fromEntries(Object.entries(end.data.players).map(([id, p]) => [id, p.net]));
    ryder = ryderCaptains(nextFlights, net);
    draftCaptains = ryder.pairs.map(captainIds => ({ captainIds }));
  } else {
    draftCaptains = [...relegated, end.chosen['last-D']].map(id => ({ captainIds: [id] }));
  }
  return { nextFlights, moves, draftCaptains, ryder, problems };
}

function renderEnd() {
  const r = end.result;
  const out = endOutcome();
  const total = a => a.reduce((s, x) => s + x, 0);
  const arrow = id => (out.moves.find(m => m.playerId === id && m.to < m.from) ? '↑' : out.moves.find(m => m.playerId === id) ? '↓' : '');
  const tables = FLIGHTS.map(f => `
    <div><h4><span class="flight flight-${f}">${f}</span> Flight ${f}</h4>
    <table><thead><tr><th>#</th><th>Player</th><th>Net</th><th>Gross</th><th></th></tr></thead><tbody>
    ${r.standings[f].map((s, i) => `<tr><td>${i + 1}</td><td>${esc(playerName(s.playerId))}</td><td><strong>${s.total}</strong></td>
      <td>${total(end.data.players[s.playerId].gross)}</td>
      <td>${arrow(s.playerId)} <span class="muted">${s.tiedWith.length ? 'tied after countback' : esc(s.decidedBy)}</span></td></tr>`).join('')}
    </tbody></table></div>`).join('');
  const select = (key, f) => `<select data-move="${key}">${r.standings[f].map(s =>
    `<option value="${s.playerId}" ${end.chosen[key] === s.playerId ? 'selected' : ''}>${esc(playerName(s.playerId))}</option>`).join('')}</select>`;
  const overrides = `
    <h4>Moves</h4>
    <p class="muted">Worked out from the scores; change one only if you need to.</p>
    ${MOVE_KEYS.map(([dir, f]) => `<div class="row" style="margin-bottom:6px"><span style="width:150px">${dir === 'up' ? '↑ Up' : '↓ Down'} from ${f} to ${FLIGHTS[FLIGHTS.indexOf(f) + (dir === 'up' ? -1 : 1)]}</span>${select(`${dir}-${f}`, f)}</div>`).join('')}
    ${out.ryder ? '' : `<div class="row" style="margin-bottom:6px"><span style="width:150px">Last in D (captain)</span>${select('last-D', 'D')}</div>`}`;
  const nextLabel = end.next ? esc(end.next.name || `Round ${end.next.roundNumber}`) : '';
  const captains = !end.next ? '<p class="muted">This is the last round, so there are no moves to save.</p>'
    : out.ryder
      ? `<h4>${nextLabel} Ryder Cup captains</h4>
         <p class="muted">Flight B after today's moves, by net score today: ${out.ryder.ranked.map((x, i) => `${i + 1}. ${esc(playerName(x.playerId))} (${x.total})`).join(', ')}</p>
         <ul>${out.draftCaptains.map((t, i) => `<li>Side ${i + 1}: ${t.captainIds.map(id => esc(playerName(id))).join(' & ')}</li>`).join('')}</ul>`
      : `<h4>${nextLabel} captains</h4><ul>${out.draftCaptains.map(t => `<li>${esc(playerName(t.captainIds[0]))} (now ${out.nextFlights[t.captainIds[0]]})</li>`).join('')}</ul>`;
  $('endRoundBody').innerHTML = `
    ${r.unresolved.length ? `<p class="error">Countback couldn't separate: ${esc(r.unresolved.join(', '))}. Choose below.</p>` : ''}
    <div class="pool">${tables}</div>
    ${end.next ? overrides : ''}
    ${captains}
    <ul class="problems">${out.problems.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
  $('confirmEndRound').textContent = end.next ? `Save flights for ${end.next.name || 'next round'}` : 'Save results';
  $('confirmEndRound').disabled = out.problems.length > 0;
}

$('endRoundBody').addEventListener('change', e => {
  const select = e.target.closest('select[data-move]');
  if (!select) return;
  end.chosen[select.dataset.move] = select.value;
  renderEnd();
});

$('confirmEndRound').addEventListener('click', async () => {
  const out = endOutcome();
  if (out.problems.length) return;
  const t = $('endTournament').value;
  const roundName = end.round.name || `Round ${end.round.roundNumber}`;
  const question = end.next
    ? `Save ${roundName} results and set ${end.next.name || 'the next round'}'s flights and captains?${end.next.flights ? ' This replaces the flights already saved for it.' : ''}`
    : `Save ${roundName} results?`;
  if (!confirm(question)) return;
  try {
    $('confirmEndRound').disabled = true;
    const by = auth.currentUser?.email || auth.currentUser?.uid || 'unknown';
    const at = new Date().toISOString();
    const standings = {};
    FLIGHTS.forEach(f => {
      standings[f] = end.result.standings[f].map(s => ({ playerId: s.playerId, net: s.total, gross: end.data.players[s.playerId].gross.reduce((a, x) => a + x, 0) }));
    });
    await updateDoc(doc(db, 'tournaments', t, 'rounds', end.round.id), {
      flightResults: { flights: end.round.flights, standings, moves: end.next ? out.moves : [], confirmedBy: by, confirmedAt: at },
      updatedAt: at,
    });
    if (end.next) {
      await updateDoc(doc(db, 'tournaments', t, 'rounds', end.next.id), {
        flights: out.nextFlights, draftCaptains: out.draftCaptains, flightsFrom: end.round.id, flightsSetBy: by, flightsSetAt: at, updatedAt: at,
      });
    }
    alert(end.next ? `Saved. ${end.next.name || 'The next round'}'s draft will start with these flights and captains.` : 'Saved.');
    await loadEndTournament();
  } catch (error) {
    fail(error);
    $('confirmEndRound').disabled = false;
  }
});

// ---------- Everyone: flights by day ----------

const NAPLES_TOURNAMENT_ID = 'Qzidv9FRVnFu11y4jdhG';
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
