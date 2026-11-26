// Where the Prop Board's markets and trades live: the trip's Firebase project
// (the same one the golf app, draft board and home page use). Collections:
//   marketPlayers/{trip}_{player}  which phone is which player (like the draft's captain link)
//   markets/{id}                   a question, its answers, close time, and how it ended
//   marketTrades/{id}              one buy: who, which answer, how many Bogey Bucks
// Trades are never changed or deleted by players; prices and balances are worked
// out from them (engine.js). The rules are in the TournamentApp repo's firestore.rules.
//
// ?demo opens a practice board kept on this phone only (nothing is shared).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDoc, getDocs, onSnapshot, query, where, setDoc, addDoc, updateDoc,
  serverTimestamp, Timestamp,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

// Naples Invitational 2027; ?trip=<id> opens another trip's board (e.g. Naples TEST for trying things out)
export const TRIP_ID = new URLSearchParams(location.search).get('trip') || 'Qzidv9FRVnFu11y4jdhG';
const ADMIN_UID = 'GknZy04hB2V8xQdnMmKqy2x24Qu2';

const ms = x => (x?.toMillis ? x.toMillis() : typeof x === 'number' ? x : null);
const shortDay = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

export function openStore({ demo, onChange, onError }) {
  return demo ? demoStore(onChange) : firebaseStore(onChange, onError);
}

// ---------- The real board ----------

function firebaseStore(onChange, onError) {
  const app = initializeApp({ apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0', authDomain: 'golf-tournament-app-e2390.firebaseapp.com', projectId: 'golf-tournament-app-e2390' }, 'prop-board');
  const auth = getAuth(app);
  const db = getFirestore(app);
  const state = { ready: false, uid: null, email: null, isOrganizer: false, roster: [], days: [], markets: [], trades: [], claims: {} };
  const emit = () => onChange(state);
  const unsubs = [];

  async function loadTrip() {
    const ids = (await getDoc(doc(db, 'tournaments', TRIP_ID))).data()?.players || [];
    const people = await Promise.all(ids.map(async id => {
      const p = (await getDoc(doc(db, 'players', id))).data() || {};
      return { id, name: p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Player' };
    }));
    state.roster = people.sort((a, b) => a.name.localeCompare(b.name));
    const rounds = (await getDocs(collection(db, 'tournaments', TRIP_ID, 'rounds'))).docs
      .map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
    state.days = rounds.map((r, i) => {
      const date = r.date ? new Date(`${r.date.slice(0, 10)}T12:00:00`) : null;
      return { id: r.id, n: i + 1, course: r.clubName || r.courseName || `Round ${i + 1}`, date: date ? +date : null, label: date ? shortDay(date) : `Day ${i + 1}` };
    });
  }

  function watch() {
    unsubs.splice(0).forEach(u => u());
    const live = (name, set) => unsubs.push(onSnapshot(query(collection(db, name), where('tournamentId', '==', TRIP_ID)), snap => {
      set(snap.docs.map(d => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) })));
      emit();
    }, onError));
    live('markets', rows => { state.markets = rows.map(m => ({ ...m, closeAt: ms(m.closeAt), createdAt: ms(m.createdAt), resolvedAt: ms(m.resolvedAt) })); });
    live('marketTrades', rows => { state.trades = rows.map(t => ({ ...t, createdAt: ms(t.createdAt) })); });
    live('marketPlayers', rows => { state.claims = Object.fromEntries(rows.map(c => [c.playerId, c])); });
  }

  async function organizerCheck(user) {
    if (user.isAnonymous) return false;
    if (user.uid === ADMIN_UID) return true;
    try { return (await getDoc(doc(db, 'tripSetup', TRIP_ID))).data()?.backupOrganizer?.uid === user.uid; } catch { return false; }
  }

  onAuthStateChanged(auth, async user => {
    if (!user) { signInAnonymously(auth).catch(onError); return; }
    state.uid = user.uid;
    state.email = user.email || null;
    state.isOrganizer = await organizerCheck(user);
    try {
      if (!state.roster.length) await loadTrip();
      watch();
      state.ready = true;
      emit();
    } catch (e) { onError(e); }
  });

  const claimRef = pid => doc(db, 'marketPlayers', `${TRIP_ID}_${pid}`);
  return {
    get state() { return state; },
    async claim(pid) {
      const name = state.roster.find(p => p.id === pid)?.name || '';
      const had = state.claims[pid];
      if (had) await updateDoc(claimRef(pid), { uid: state.uid, name, linkedAt: serverTimestamp() });
      else await setDoc(claimRef(pid), { tournamentId: TRIP_ID, playerId: pid, uid: state.uid, name, linkedAt: serverTimestamp() });
    },
    release: pid => updateDoc(claimRef(pid), { uid: null, linkedAt: serverTimestamp() }),
    createMarket: f => addDoc(collection(db, 'markets'), {
      tournamentId: TRIP_ID, question: f.question, details: f.details || '', outcomes: f.outcomes,
      roundId: f.roundId || null, closeAt: Timestamp.fromMillis(f.closeAt),
      createdBy: f.createdBy, createdByName: f.createdByName, createdAt: serverTimestamp(),
      status: 'open', winner: null, resolvedAt: null, resolvedBy: null,
    }),
    trade: (m, outcome, spend, pid) => addDoc(collection(db, 'marketTrades'), {
      tournamentId: TRIP_ID, marketId: m, playerId: pid, uid: state.uid, outcome, spend, createdAt: serverTimestamp(),
    }),
    settle: (m, status, winner, by) => updateDoc(doc(db, 'markets', m), { status, winner, resolvedBy: by, resolvedAt: status === 'open' ? null : serverTimestamp() }),
    signIn: (email, pw) => signInWithEmailAndPassword(auth, email, pw),
    signOut: () => signOut(auth),
  };
}

// ---------- Practice board (this phone only) ----------

function demoStore(onChange) {
  const KEY = 'propboard-demo-v1';
  const names = ['Dan', 'Mike', 'Tom', 'Chris', 'Jeff', 'Brian', 'Kevin', 'Steve', 'Matt', 'Rob', 'Pat', 'Greg'];
  const roster = names.map((name, i) => ({ id: `p${i}`, name }));
  const day0 = +new Date('2027-01-06T12:00:00');
  const days = ['The Forest', 'Palmira', 'Old Cypress', 'The Colony'].map((course, i) => {
    const date = day0 + i * 864e5;
    return { id: `r${i + 1}`, n: i + 1, course, date, label: shortDay(new Date(date)) };
  });
  const now = Date.now(), h = 36e5;
  const seed = () => {
    const markets = [
      { id: 'm1', question: 'Will anyone break 80 at Old Cypress?', details: 'Any gross 79 or lower on the Day 3 card.', outcomes: ['Yes', 'No'], roundId: 'r3', createdBy: 'p1', createdByName: 'Mike', createdAt: now - 50 * h, closeAt: now + 40 * h, status: 'open' },
      { id: 'm2', question: 'Most shanks on the trip: Mike or Tom?', details: 'Counted from the shank reports in the golf app.', outcomes: ['Mike', 'Tom', 'Tied'], roundId: null, createdBy: 'p3', createdByName: 'Chris', createdAt: now - 46 * h, closeAt: now + 90 * h, status: 'open' },
      { id: 'm3', question: 'Will the winning team stroke score at The Forest be under par?', details: '', outcomes: ['Yes', 'No'], roundId: 'r1', createdBy: 'p0', createdByName: 'Dan', createdAt: now - 30 * h, closeAt: now + 8 * h, status: 'open' },
      { id: 'm4', question: 'Who wins the Palmira long drive?', details: 'Hole 9, the organizer measures.', outcomes: ['Jeff', 'Brian', 'Kevin', 'Steve', 'Field'], roundId: 'r2', createdBy: 'p4', createdByName: 'Jeff', createdAt: now - 20 * h, closeAt: now + 30 * h, status: 'open' },
      { id: 'm5', question: 'Will it rain on any round?', details: 'Play stopped or rain gear on for 3+ holes.', outcomes: ['Yes', 'No'], roundId: null, createdBy: 'p5', createdByName: 'Brian', createdAt: now - 60 * h, closeAt: now - 2 * h, status: 'resolved', winner: 1, resolvedAt: now - h, resolvedBy: 'Brian' },
    ];
    const trades = [];
    const add = (m, p, o, s, t) => trades.push({ id: `t${trades.length}`, marketId: m, playerId: p, outcome: o, spend: s, createdAt: now - t * h });
    add('m1', 'p1', 0, 50, 48); add('m1', 'p2', 1, 100, 44); add('m1', 'p6', 0, 25, 40); add('m1', 'p7', 0, 75, 30); add('m1', 'p9', 1, 40, 20); add('m1', 'p4', 0, 60, 10); add('m1', 'p10', 0, 30, 3);
    add('m2', 'p3', 0, 80, 45); add('m2', 'p1', 1, 120, 41); add('m2', 'p8', 0, 50, 26); add('m2', 'p11', 2, 20, 12); add('m2', 'p5', 0, 40, 5);
    add('m3', 'p0', 0, 30, 29); add('m3', 'p6', 1, 60, 22); add('m3', 'p2', 1, 25, 6);
    add('m4', 'p4', 0, 100, 19); add('m4', 'p5', 1, 50, 15); add('m4', 'p6', 2, 30, 9); add('m4', 'p9', 4, 45, 4);
    add('m5', 'p5', 0, 50, 58); add('m5', 'p0', 1, 80, 52); add('m5', 'p7', 1, 40, 30); add('m5', 'p3', 0, 20, 12);
    return { markets, trades, claims: { p0: { playerId: 'p0', uid: 'demo-me', name: 'Dan' } } };
  };
  let data;
  try { data = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { data = seed(); }
  const state = { ready: true, demo: true, uid: 'demo-me', email: null, isOrganizer: false, roster, days, ...data };
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify({ markets: state.markets, trades: state.trades, claims: state.claims })); } catch { /* private window */ }
    setTimeout(() => onChange(state), 120);   // like a round trip to the server
    return Promise.resolve();
  };
  setTimeout(() => onChange(state), 0);
  let n = Date.now();
  return {
    get state() { return state; },
    claim(pid) { state.claims = { ...state.claims, [pid]: { playerId: pid, uid: state.uid, name: roster.find(p => p.id === pid)?.name } }; return save(); },
    release(pid) { state.claims = { ...state.claims, [pid]: { ...state.claims[pid], uid: null } }; return save(); },
    createMarket(f) { state.markets = [...state.markets, { id: `m${n++}`, ...f, createdAt: Date.now(), status: 'open', winner: null }]; return save(); },
    trade(m, outcome, spend, pid) { state.trades = [...state.trades, { id: `t${n++}`, marketId: m, playerId: pid, outcome, spend, createdAt: Date.now() }]; return save(); },
    settle(m, status, winner, by) { state.markets = state.markets.map(x => x.id === m ? { ...x, status, winner, resolvedBy: by, resolvedAt: status === 'open' ? null : Date.now() } : x); return save(); },
    reset() { Object.assign(state, seed()); return save(); },
    signIn: () => Promise.reject(new Error('Not in practice mode')),
    signOut: () => Promise.resolve(),
  };
}
