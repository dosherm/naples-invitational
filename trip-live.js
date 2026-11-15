// Keeps the home page's schedule, course cards, day-by-day formats and
// countdown in step with the golf app (the same data the Purse & Payouts page
// reads): each day's date, course and team game come from the tournament's
// rounds and games. The players' handicaps and flights come from the trip's
// players in the app (players/{id}.handicapIndex, the one copy of everyone's
// index, which the 6 am GHIN run updates); each card is matched by data-ghin. The text already in the page stays if this
// can't load.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const NAPLES = 'Qzidv9FRVnFu11y4jdhG';
// Same names as purse/app.js
const MAIN = { teamstroke: 'Team Stroke Play', thirtyfourty: '30/40 Ball', teamstableford: 'Team Stableford', rydercup: 'Ryder Cup Fourball', bestball: 'Best Ball', nassau: 'Nassau', lowgross: 'Low Gross' };
const ADD_ONS = new Set(['ctp', 'grossskins', 'skins', 'lownet']);

const app = initializeApp({ apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0', authDomain: 'golf-tournament-app-e2390.firebaseapp.com', projectId: 'golf-tournament-app-e2390' }, 'trip-live');
const auth = getAuth(app);
const db = getFirestore(app);

const set = (el, text) => { if (el && text && el.textContent !== text) el.textContent = text; };

async function update() {
  const rounds = (await getDocs(collection(db, 'tournaments', NAPLES, 'rounds'))).docs
    .map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
  const games = (await getDocs(query(collection(db, 'games'), where('tournamentId', '==', NAPLES)))).docs.map(d => d.data());
  const days = rounds.map(r => {
    const date = r.date ? new Date(`${r.date.slice(0, 10)}T12:00:00`) : null;
    const main = games.filter(g => (g.roundIds || [g.roundId]).includes(r.id) && !ADD_ONS.has(g.gameType) && g.status !== 'cancelled')
      .map(g => MAIN[g.gameType] || g.gameName).join(' + ');
    return {
      weekday: date?.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      course: r.clubName || r.courseName || '',
      main,
    };
  });
  const sched = document.querySelectorAll('#schedule .sched-card');
  const cards = document.querySelectorAll('#courses .course-card');
  const formats = document.querySelectorAll('#formats .day-card');
  days.forEach((d, i) => {
    set(sched[i]?.querySelector('.sched-day'), d.weekday);
    set(sched[i]?.querySelector('.sched-date'), d.date);
    set(sched[i]?.querySelector('.sched-course'), d.course);
    if (d.weekday && d.date) set(cards[i]?.querySelector('.course-day-badge'), `${d.weekday} · ${d.date}`);
    set(cards[i]?.querySelector('.course-name'), d.course);
    if (d.weekday && d.date) set(formats[i]?.querySelector('.day-name-tag'), `${d.weekday} · ${d.date}`);
    set(formats[i]?.querySelector('.day-format-title'), d.main);
    set(formats[i]?.querySelector('.day-course-ref'), d.course);
  });
  if (days[0]?.course) set(document.querySelector('.countdown-label'), `First Tee · ${days[0].course}`);
}

// The field: each card's HCP from the Naples list, then cards re-sorted lowest
// first and flights relabelled A1-D4 (four to a flight), as the draft page does
async function updatePlayers() {
  const index = {};
  const ids = (await getDoc(doc(db, 'tournaments', NAPLES))).data()?.players || [];
  await Promise.all(ids.map(async id => {
    const p = (await getDoc(doc(db, 'players', id))).data();
    if (p?.ghin && typeof p.handicapIndex === 'number') index[String(p.ghin)] = p.handicapIndex;
  }));
  const grid = document.querySelector('.players-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.player-card')].map(card => {
    const hcp = card.querySelector('.player-hcp');
    const shown = parseFloat(hcp?.lastChild?.textContent);
    const hi = index[card.dataset.ghin] ?? shown;
    if (hcp && hi !== shown) hcp.lastChild.textContent = String(hi);
    return { card, hi };
  });
  cards.sort((a, b) => a.hi - b.hi).forEach(({ card }, i) => {
    set(card.querySelector('.player-flight'), 'ABCD'[Math.floor(i / 4)] + (i % 4 + 1));
    grid.appendChild(card);
  });
}

onAuthStateChanged(auth, user => {
  if (!user) { signInAnonymously(auth).catch(e => console.error(e)); return; }
  update().catch(e => console.error('Trip details not refreshed:', e));
  updatePlayers().catch(e => console.error('Handicaps not refreshed:', e));
});
