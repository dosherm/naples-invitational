// Keeps the home page's schedule, course cards, day-by-day formats and
// countdown in step with the golf app (the same data the Purse & Payouts page
// reads): each day's date, course and team game come from the tournament's
// rounds and games. The text already in the page stays if this can't load.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

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

onAuthStateChanged(auth, user => {
  if (!user) { signInAnonymously(auth).catch(e => console.error(e)); return; }
  update().catch(e => console.error('Trip details not refreshed:', e));
});
