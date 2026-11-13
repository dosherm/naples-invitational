// Whack-a-Gopher on the captains' phones. Each phone signs in anonymously, claims
// one captain (drafts/{id}/shootout/{captainId}.uid), plays one practice run, then
// plays each round the admin starts from the draft board. The draft board shows
// the standings and turns them into the pick order.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDoc, getDocs, onSnapshot, query, orderBy, limit, runTransaction, updateDoc,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';
import {
  GAME_MS, PRACTICE_SEED, makeSchedule, rounds, currentRound, runScore, teamScore, inRound, waitingOn, boardRows,
  gopherAt, tapCounts, scoreTaps, packTaps, officialShots, checking,
} from './shootout.js?v=20261113b';
import { now, syncClock } from './clock.js?v=20261113a';

const app = initializeApp({
  apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0',
  authDomain: 'golf-tournament-app-e2390.firebaseapp.com',
  projectId: 'golf-tournament-app-e2390',
});
const auth = getAuth(app);
const db = getFirestore(app);

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const AUTO_START_GRACE = 4000; // a phone that sees Go this late still starts by itself

let uid = null;
let draft = null;   // the draft doc
let shots = {};     // captainId -> shootout doc (what each phone saved)
let verified = {};  // captainId -> server-checked runs (what counts)
let unsubVerified = null;
let game = null;    // the run in progress
let muted = false;
let unsubDraft = null;
let unsubShots = null;
let autoTimer = null;
let autoKey = '';   // round + goAt the auto start is armed for

// Only touch the DOM when the markup changes, so the once-a-second refresh never
// swaps a button out from under a finger mid-tap
const setHTML = (el, html) => { if (el.dataset.html !== html) { el.innerHTML = html; el.dataset.html = html; } };

const fail = e => { console.error(e); $('err').textContent = e?.message || String(e); };

// ---------- Who am I ----------

const captainIds = () => (draft?.teams || []).flatMap(t => t.captainIds);
const nameOf = id => draft?.players?.[id]?.name || 'Captain';
const myCaptain = () => captainIds().find(id => shots[id]?.uid && shots[id].uid === uid) || null;
const myTeam = () => draft?.teams.find(t => t.captainIds.includes(myCaptain()));

async function claim(captainId) {
  try {
    await runTransaction(db, async tx => {
      const ref = doc(db, 'drafts', draft.id, 'shootout', captainId);
      const snap = await tx.get(ref);
      const cur = snap.data();
      if (cur?.uid && cur.uid !== uid) throw new Error(`${nameOf(captainId)} is already playing on another phone. Ask the organizer to unlink it.`);
      if (snap.exists()) tx.update(ref, { uid, name: nameOf(captainId) });
      else tx.set(ref, { uid, name: nameOf(captainId), practice: null, runs: {} });
    });
    ensureAudio();
  } catch (e) { fail(e); }
}

$('whoList').addEventListener('click', e => {
  const b = e.target.closest('[data-claim]');
  if (b) claim(b.dataset.claim);
});

// ---------- Board drawing ----------

const FACE =
 '<ellipse cx="21" cy="34" rx="10" ry="11" fill="#8a5a2b"/><ellipse cx="21" cy="35" rx="5" ry="6" fill="#e9a3a3"/>' +
 '<ellipse cx="79" cy="34" rx="10" ry="11" fill="#8a5a2b"/><ellipse cx="79" cy="35" rx="5" ry="6" fill="#e9a3a3"/>' +
 '<path d="M11 74 C9 42 28 24 50 24 C72 24 91 42 89 74 L89 130 L11 130 Z" fill="#a9733a"/>' +
 '<ellipse cx="50" cy="74" rx="27" ry="21" fill="#ecd0a2"/>' +
 '<g class="eyes-n"><circle cx="36" cy="50" r="10" fill="#fff" stroke="#3b2417" stroke-width="2.5"/><circle cx="64" cy="50" r="10" fill="#fff" stroke="#3b2417" stroke-width="2.5"/>' +
 '<circle cx="38" cy="52" r="4.6" fill="#1b1b1b"/><circle cx="62" cy="52" r="4.6" fill="#1b1b1b"/>' +
 '<circle cx="39.6" cy="50.2" r="1.4" fill="#fff"/><circle cx="63.6" cy="50.2" r="1.4" fill="#fff"/></g>' +
 '<g class="eyes-d" stroke="#3b2417" stroke-width="4" stroke-linecap="round"><path d="M29 43 L43 57 M43 43 L29 57"/><path d="M57 43 L71 57 M71 43 L57 57"/></g>' +
 '<path d="M26 38 Q35 32 45 38 M55 38 Q65 32 74 38" stroke="#3b2417" stroke-width="3" fill="none" stroke-linecap="round"/>' +
 '<ellipse cx="50" cy="64" rx="7" ry="5" fill="#3b2417"/>' +
 '<path d="M37 74 Q50 83 63 74" stroke="#3b2417" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
 '<rect x="43" y="74" width="7" height="15" rx="2.5" fill="#fff" stroke="#3b2417" stroke-width="2"/>' +
 '<rect x="50" y="74" width="7" height="15" rx="2.5" fill="#fff" stroke="#3b2417" stroke-width="2"/>' +
 '<circle cx="25" cy="66" r="5" fill="#ff8f9c" opacity=".6"/><circle cx="75" cy="66" r="5" fill="#ff8f9c" opacity=".6"/>';

// One hole: dirt mound, dark pit, and a gopher clipped so it rises out of the pit's front edge
const holeSvg = i => '<svg class="hs" viewBox="0 0 100 96" aria-hidden="true">' +
  `<defs><clipPath id="clip${i}"><path d="M-10 -40 H110 V68 H87 A37 15 0 0 1 13 68 H-10 Z"/></clipPath>` +
  `<radialGradient id="pit${i}" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#3a2110"/><stop offset="1" stop-color="#0e0602"/></radialGradient></defs>` +
  '<ellipse cx="50" cy="74" rx="46" ry="21" fill="#5e3818"/><ellipse cx="50" cy="69" rx="46" ry="21" fill="#946030"/>' +
  `<ellipse cx="50" cy="68" rx="37" ry="15" fill="url(#pit${i})"/>` +
  `<g clip-path="url(#clip${i})"><g class="gg"><svg x="18" y="6" width="64" height="83.2" viewBox="0 0 100 130">${FACE}</svg></g></g></svg>`;

const holes = [];
for (let i = 0; i < 9; i++) {
  const h = document.createElement('div');
  h.className = 'hole';
  h.dataset.i = i;
  h.innerHTML = holeSvg(i);
  $('grid').appendChild(h);
  holes.push(h);
}

// ---------- Sound ----------

let ac = null;
function ensureAudio() {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
  } catch {}
}
function beep(freq, dur, type, vol) {
  if (muted || !ac) return;
  try {
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = type || 'square'; o.frequency.value = freq; g.gain.value = vol || 0.05;
    o.connect(g); g.connect(ac.destination);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur);
  } catch {}
}
const sfxHit = () => { beep(520, 0.07); setTimeout(() => beep(820, 0.09), 55); };
const sfxEnd = () => { beep(660, 0.14, 'triangle', 0.08); setTimeout(() => beep(520, 0.14, 'triangle', 0.08), 150); setTimeout(() => beep(390, 0.3, 'triangle', 0.08), 300); };
const sfxTick = () => beep(440, 0.06, 'triangle', 0.06);
$('snd').addEventListener('click', () => {
  muted = !muted;
  $('snd').textContent = `Sound: ${muted ? 'off' : 'on'}`;
  if (!muted) { ensureAudio(); beep(660, 0.08); }
});

// ---------- Playing ----------

// kind: 'practice' or a round number
function startRun(kind) {
  if (game) return;
  const captainId = myCaptain();
  if (!captainId) return;
  ensureAudio();
  clearTimeout(autoTimer);
  $('countdown').hidden = true;
  $('result').hidden = true;
  const seed = kind === 'practice' ? PRACTICE_SEED : rounds(draft)[kind].seed;
  // taps: every tap as [ms since the start, hole], saved with the score so the server can check it
  game = { kind, captainId, sched: makeSchedule(seed), idx: 0, active: new Map(), hit: new Set(), taps: [], score: 0, t0: performance.now() };
  $('score').textContent = '0';
  render();
  // Bring the whole cabinet (timer, score and lawn) into view for the round
  $('cab').scrollIntoView({ behavior: 'smooth', block: 'start' });
  requestAnimationFrame(frame);
  // Backup clock: animation frames stop when the screen dims or the tab is hidden,
  // and the round must still end on time and save
  game.backup = setInterval(() => frame(performance.now(), true), 250);
}

function frame(now, fromBackup) {
  if (!game) return;
  const el = now - game.t0;
  while (game.idx < game.sched.length && game.sched[game.idx].t <= el) {
    const s = game.sched[game.idx++];
    game.active.set(s.hole, s.t + s.dur);
    holes[s.hole].classList.add('up');
  }
  game.active.forEach((until, hi) => {
    if (el >= until) { holes[hi].classList.remove('up'); game.active.delete(hi); }
  });
  $('time').textContent = String(Math.max(0, Math.ceil((GAME_MS - el) / 1000)));
  if (el >= GAME_MS) return endRun();
  if (!fromBackup) requestAnimationFrame(t => frame(t));
}

$('grid').addEventListener('pointerdown', e => {
  const h = e.target.closest('.hole');
  if (!h || !game) return;
  const i = Number(h.dataset.i);
  const ms = Math.round(performance.now() - game.t0);
  game.taps.push([ms, i]);
  // Scored by the gophers' timing (the same rule the server checks with), not by what's drawn
  const g = gopherAt(game.sched, i, ms, game.hit);
  if (!tapCounts(game.sched, g, ms)) return;
  game.hit.add(g);
  game.active.delete(i);
  game.score++;
  h.classList.remove('up');
  h.classList.add('hit');
  setTimeout(() => h.classList.remove('hit'), 400);
  const fx = document.createElement('span');
  fx.className = 'fx';
  fx.textContent = '+1';
  h.appendChild(fx);
  setTimeout(() => fx.remove(), 700);
  sfxHit();
  $('score').textContent = String(game.score);
});

// Scores not yet saved survive a reload or a dropped connection
const pendingKey = () => `gopher:${draft?.id}:pending`;
const readPending = () => { try { return JSON.parse(localStorage.getItem(pendingKey()) || 'null'); } catch { return null; } };
const writePending = p => { try { p ? localStorage.setItem(pendingKey(), JSON.stringify(p)) : localStorage.removeItem(pendingKey()); } catch {} };

function endRun() {
  const g = game;
  game = null;
  clearInterval(g.backup);
  holes.forEach(h => h.classList.remove('up'));
  sfxEnd();
  $('time').textContent = '0';
  const p = { captainId: g.captainId, kind: g.kind, s: scoreTaps(g.sched, g.taps), taps: packTaps(g.taps), t: now() };
  writePending(p);
  $('rTitle').textContent = 'Time!';
  $('rScore').textContent = g.score;
  $('rMsg').textContent = 'Saving your score…';
  $('result').hidden = false;
  savePending();
}

let saving = false;
async function savePending() {
  const p = readPending();
  if (!p || saving || !draft) return;
  saving = true;
  $('retry').hidden = true;
  try {
    const ref = doc(db, 'drafts', draft.id, 'shootout', p.captainId);
    await updateDoc(ref, p.kind === 'practice'
      ? { practice: p.s, practiceTaps: p.taps || [] }
      : { [`runs.${p.kind}`]: { s: p.s, t: p.t, taps: p.taps || [] } });
    writePending(null);
    $('rMsg').textContent = p.kind === 'practice'
      ? 'Practice done. That one doesn\'t count. Wait here for the real round.'
      : 'Saved. The server checks your run, then it counts. Watch the board below.';
  } catch (e) {
    console.error(e);
    $('rMsg').textContent = 'Couldn\'t save your score. Check your signal and tap Try again. It\'s kept on this phone until it saves.';
    $('retry').hidden = false;
  } finally {
    saving = false;
    render();
  }
}
$('retry').addEventListener('click', savePending);
window.addEventListener('online', savePending);

$('play').addEventListener('click', () => {
  const a = action();
  if (a.run !== undefined) startRun(a.run);
});

// ---------- What this phone should do now ----------

// { label, run?, status?, sub? } for the main button and status ribbon
function action() {
  if (!draft) return { label: 'Waiting', status: 'No shootout yet', sub: 'This page updates when the organizer starts one.' };
  const captainId = myCaptain();
  const pending = readPending();
  if (!captainId) return { label: 'Pick your name above', status: 'Pick your name to play' };
  if (game) return { label: 'Whack!', status: 'Playing' };
  if (pending) return { label: 'Saving your score', status: 'Saving your score' };
  const r = currentRound(draft);
  if (r < 0) {
    if (shots[captainId]?.practice == null) return { label: 'Start practice run', run: 'practice', status: 'Practice time', sub: 'One practice run. It doesn\'t count.' };
    return { label: 'Practice done', status: 'Waiting for the real round', sub: 'The organizer starts it for everyone at once.' };
  }
  const team = myTeam();
  if (!inRound(draft, team?.teamId, r)) {
    return waitingOn(draft, officialShots(shots, verified), r).length
      ? { label: 'Watching', status: 'Sudden death round', sub: 'You\'re through. Watch the tie get settled.' }
      : { label: 'Watching', status: 'Round finished', sub: 'Sudden death or the draft starts on its own.' };
  }
  const mine = runScore(shots, captainId, r);
  if (mine != null) {
    const official = runScore(verified, captainId, r);
    const left = waitingOn(draft, officialShots(shots, verified), r).length;
    const sub = official == null ? 'Checking your run…'
      : official !== mine ? `Official score after the server's check: ${official}` : left ? '' : 'Sudden death or the draft starts on its own.';
    return { label: `You scored ${official ?? mine}`, status: left ? `Waiting on ${left} more` : 'Round finished', sub };
  }
  const goAt = rounds(draft)[r].goAt;
  if (now() < goAt) return { label: 'Get ready', status: r === 0 ? 'Real round starting' : 'Sudden death starting' };
  return { label: r === 0 ? 'Play my round' : 'Play sudden death', run: r, status: r === 0 ? 'Real round is on' : 'Sudden death is on', sub: 'Tap to play your one try.' };
}

// Start the countdown on every phone in the round when the organizer hits Go
function armAutoStart() {
  const r = currentRound(draft);
  const captainId = myCaptain();
  if (r < 0 || !captainId || game || readPending()) return hideCountdown();
  const round = rounds(draft)[r];
  if (!inRound(draft, myTeam()?.teamId, r) || runScore(shots, captainId, r) != null) return hideCountdown();
  const key = `${r}:${round.goAt}`;
  const wait = round.goAt - now();
  if (wait < -AUTO_START_GRACE) return hideCountdown(); // too late to start by itself; the button plays
  if (autoKey === key) return;
  autoKey = key;
  $('result').hidden = true;
  const tick = () => {
    const left = round.goAt - now();
    if (autoKey !== key) return;
    if (left <= 0) { hideCountdown(); startRun(r); return; }
    $('countdown').hidden = false;
    $('cdTitle').textContent = r === 0 ? 'Real round' : 'Sudden death';
    const n = Math.ceil(left / 1000);
    if ($('cdNum').textContent !== String(n)) { $('cdNum').textContent = String(n); if (n <= 3) sfxTick(); }
    autoTimer = setTimeout(tick, Math.min(250, left));
  };
  tick();
}
function hideCountdown() { clearTimeout(autoTimer); autoKey = ''; $('countdown').hidden = true; }

// ---------- Rendering ----------

function render() {
  const a = action();
  const r = draft ? currentRound(draft) : -1;
  const chip = $('chip');
  const done = draft && draft.status !== 'shootout';
  chip.className = `chip${done ? ' final' : r >= 0 ? ' live' : ''}`;
  chip.textContent = !draft ? 'WAIT' : done ? 'FINAL' : r < 0 ? 'PRACTICE' : r === 0 ? 'LIVE' : 'SUDDEN';
  $('stline').textContent = done ? 'Draft order is set' : a.status || '';
  $('stsub').textContent = done ? 'Head to the draft board.' : a.sub || '';
  $('tag').textContent = draft ? `${draft.roundName} draft order` : 'Captains\' shootout for draft order';

  // Pick a captain
  const captainId = myCaptain();
  const choosing = draft && !done && !captainId;
  $('who').hidden = !choosing;
  if (choosing) {
    setHTML($('whoList'), captainIds().map(id => {
      const taken = shots[id]?.uid && shots[id].uid !== uid;
      return `<button type="button" data-claim="${id}" ${taken ? 'disabled' : ''}>${esc(nameOf(id))}
        <small>${taken ? 'Playing on another phone' : 'Tap if this is you'}</small></button>`;
    }).join(''));
  }
  $('me').hidden = !captainId;
  $('me').textContent = captainId ? `Playing as ${nameOf(captainId)}` : '';
  $('mode').textContent = game ? (game.kind === 'practice' ? 'PRAC' : game.kind === 0 ? 'LIVE' : 'SD') : r < 0 ? 'PRAC' : r === 0 ? 'LIVE' : 'SD';
  $('play').textContent = done ? 'Shootout over' : a.label;
  $('play').disabled = done || a.run === undefined || !!game;
  $('cab').hidden = !draft || (!captainId && !done);

  if (draft && !done) armAutoStart(); else hideCountdown();
  renderBoard();
}

function renderBoard() {
  if (!draft) { setHTML($('rows'), '<p class="empty">Nothing yet.</p>'); $('bSub').textContent = ''; return; }
  const r = currentRound(draft);
  const done = draft.status !== 'shootout';
  const off = officialShots(shots, verified);
  const rows = done && draft.shootout?.order
    ? draft.shootout.order.map((teamId, i) => ({ teamId, place: i + 1 }))
    : boardRows(draft, off);
  $('bTitle').textContent = done ? 'Draft order' : r < 0 ? 'Captains' : 'Shootout';
  $('bSub').textContent = done ? 'Pick 1 chooses first.'
    : r < 0 ? 'Everyone gets one practice run, then the real round starts together.'
      : 'Highest score picks first. Ties play sudden death.';
  const mineTeam = myTeam()?.teamId;
  setHTML($('rows'), rows.map(({ teamId, place, tied, provisional }) => {
    const t = draft.teams.find(x => x.teamId === teamId);
    const pair = t.captainIds.length > 1;
    const scores = rounds(draft).map((_, i) => teamScore(t, off, i));
    const notes = t.captainIds.map(id => {
      const nm = pair ? `${nameOf(id).split(' ')[0]} ` : '';
      if (r < 0) return nm + (shots[id]?.uid ? (shots[id].practice != null ? 'practised' : 'ready to practise') : 'not here yet');
      if (!inRound(draft, teamId, r)) return '';
      const s = runScore(off, id, r);
      if (s == null) return checking(shots, verified, id, r) ? `${nm}checking…` : `${nm}playing…`;
      return pair ? `${nm}${s}` : '';
    }).filter(Boolean);
    const main = r < 0 ? '' : scores[0] ?? '—';
    const sd = scores.slice(1).map((s, i) => inRound(draft, teamId, i + 1) ? `SD${i + 1}: ${s ?? '…'}` : '').filter(Boolean).join(' · ');
    const label = r < 0 ? (t.captainIds.every(id => shots[id]?.practice != null) ? 'READY' : '…')
      : provisional ? '…' : tied ? `TIED ${place}` : `PICK ${place}`;
    const cls = `row${teamId === mineTeam ? ' mine' : ''}${place === 1 && !tied && !provisional && r >= 0 ? ' first' : ''}${tied ? ' tie' : ''}`;
    return `<li class="${cls}"><span class="pick">${label}</span>
      <span class="nm">${esc(t.captainIds.map(nameOf).join(' & '))}<small>${esc(notes.join(pair ? ' + ' : ', '))}</small></span>
      <span class="pts">${main}${sd ? `<small>${esc(sd)}</small>` : ''}</span></li>`;
  }).join(''));
}

// Countdown/status text depends on the clock
setInterval(() => { if (!game) render(); }, 1000);

// ---------- Connecting ----------

function watch() {
  const id = new URLSearchParams(location.search).get('draft');
  const onDraft = d => {
    const changed = d?.id !== draft?.id;
    draft = d;
    if (changed) {
      if (unsubShots) unsubShots();
      if (unsubVerified) unsubVerified();
      shots = {};
      verified = {};
      if (d) {
        unsubVerified = onSnapshot(collection(db, 'drafts', d.id, 'verified'), snap => {
          verified = Object.fromEntries(snap.docs.map(s => [s.id, s.data()]));
          render();
        }, fail);
        unsubShots = onSnapshot(collection(db, 'drafts', d.id, 'shootout'), snap => {
          shots = Object.fromEntries(snap.docs.map(s => [s.id, s.data()]));
          if (readPending()) savePending();
          render();
        }, fail);
        $('boardLink').href = `./?draft=${d.id}`;
      }
    }
    render();
  };
  // Backup to the live listeners: on a phone the live connection can drop without
  // any error (seen in iOS Safari), which would leave a captain waiting through Go.
  // So re-read the draft every few seconds during the shootout and whenever the
  // page comes back into view or the network returns.
  const refresh = async () => {
    if (game) return;
    try {
      if (id || draft?.id) {
        const snap = await getDoc(doc(db, 'drafts', id || draft.id));
        const d = snap.exists() ? { id: snap.id, ...snap.data() } : null;
        if (!id && d && !(d.shootout || d.status === 'shootout')) return;
        if (d && draft && d.id === draft.id) {
          const [fresh, checked] = await Promise.all([
            getDocs(collection(db, 'drafts', d.id, 'shootout')),
            getDocs(collection(db, 'drafts', d.id, 'verified')),
          ]);
          shots = Object.fromEntries(fresh.docs.map(x => [x.id, x.data()]));
          verified = Object.fromEntries(checked.docs.map(x => [x.id, x.data()]));
        }
        onDraft(d);
      } else {
        const snap = await getDocs(query(collection(db, 'drafts'), orderBy('createdAt', 'desc'), limit(1)));
        const d = snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
        if (d && (d.shootout || d.status === 'shootout')) onDraft(d);
      }
    } catch (e) { console.error('Refresh failed:', e); }
  };
  setInterval(() => { if (!draft || draft.status === 'shootout') refresh(); }, 4000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  window.addEventListener('focus', refresh);
  window.addEventListener('online', refresh);
  if (id) {
    unsubDraft = onSnapshot(doc(db, 'drafts', id), s => onDraft(s.exists() ? { id: s.id, ...s.data() } : null), fail);
  } else {
    // The newest draft: the one being set up right now
    unsubDraft = onSnapshot(query(collection(db, 'drafts'), orderBy('createdAt', 'desc'), limit(1)), snap => {
      const d = snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
      onDraft(d && (d.shootout || d.status === 'shootout') ? d : null);
    }, fail);
  }
}

onAuthStateChanged(auth, user => {
  if (!user) { signInAnonymously(auth).catch(fail); return; }
  uid = user.uid;
  if (!unsubDraft) {
    watch();
    // Google's clock for Go; again every few minutes in case the phone's clock drifts
    syncClock(db, uid).then(render);
    setInterval(() => syncClock(db, uid), 5 * 60 * 1000);
  }
  render();
});
