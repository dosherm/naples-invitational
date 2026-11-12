// Purse & Payouts, built every time from what's allocated in the database:
// each day's games and their money (games/), the days and courses (rounds/),
// and the cost per player and Overall Low Net (tournament.purse).
// ?t=<tournamentId> shows another tournament (e.g. Naples TEST).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const NAPLES = 'Qzidv9FRVnFu11y4jdhG';
const app = initializeApp({
  apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0',
  authDomain: 'golf-tournament-app-e2390.firebaseapp.com',
  projectId: 'golf-tournament-app-e2390',
});
const auth = getAuth(app);
const db = getFirestore(app);

const ADD_ONS = { ctp: 'Closest to the pin', grossskins: 'Gross skins', skins: 'Net skins', lownet: 'Low net of the day' };
const MAIN = { teamstroke: 'Team Stroke Play', thirtyfourty: '30/40 Ball', teamstableford: 'Team Stableford', rydercup: 'Ryder Cup Fourball', bestball: 'Best Ball', nassau: 'Nassau', lowgross: 'Low Gross' };
const ORDER = ['main', 'ctp', 'grossskins', 'skins', 'lownet'];
const COLORS = ['#3d5240', '#b8943f', '#243450', '#7a6e5f', '#8a5a00', '#4b3f80'];

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $$ = n => `$${(Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2, maximumFractionDigits: 2 })}`;
const ord = n => ['1st', '2nd', '3rd', '4th', '5th'][n - 1] || `${n}th`;
const placesText = (places, perTeam) => places.map((a, i) => `${ord(i + 1)} ${$$(a)}${perTeam ? ` (${$$(a / perTeam)} each)` : ''}`).join(', ');

function describe(g, players, par3s) {
  const c = g.config || {};
  const places = (c.payoutStructure?.places || []).map(p => p.amount || 0).filter(a => a > 0);
  if (g.gameType === 'ctp') return par3s ? `${$$((c.pot || 0) / par3s)} for each of the ${par3s} par 3s` : 'Split across the par 3s';
  if (g.gameType === 'grossskins') return 'Split by skins won (no handicap)';
  if (g.gameType === 'skins') return 'Split by skins won (with handicap)';
  if (g.gameType === 'lownet') return places.length ? placesText(places) : 'Winner takes the pot';
  if (g.gameType === 'rydercup') return `Winning side shares the pot (${$$((c.betAmount || 0) * players / (players / 2))} each); a 2–2 tie returns everyone's money`;
  const teamSize = g.gameType === 'thirtyfourty' || g.gameType === 'teamstroke' || g.gameType === 'teamstableford' ? 4 : 0;
  if (c.payoutMethod === 'multiPlace' && places.length) return placesText(places.map((a, i) => a), teamSize) + (teamSize ? ' per team' : '');
  return 'Winner takes the pot';
}

function render(t, days) {
  const purse = t.purse || {};
  const players = (t.players || []).length;
  const cost = Number(purse.costPerPlayer) || 0;
  const pool = cost * players;
  const tripDaily = days.reduce((s, d) => s + d.total, 0);
  const remaining = pool - tripDaily;
  const overall = purse.overall || {};
  const overallPlaces = (overall.places || []).filter(a => a > 0);
  const overallTotal = overallPlaces.reduce((s, a) => s + a, 0);
  const sameEveryDay = days.length > 1 && days.every(d => JSON.stringify(d.games.map(g => [g.key, g.pot])) === JSON.stringify(days[0].games.map(g => [g.key, g.pot])));
  // The most common day stands for "every day" (Day 1 may be the odd one out)
  const sample = days[0];

  const table = d => `
    <table>
      <thead><tr><th>Game</th><th class="num">Pot</th><th class="num">Per player</th></tr></thead>
      <tbody>
        ${d.games.map(g => `<tr><td>${esc(sameEveryDay && g.key === 'main' ? 'Team game' : g.label)}<span class="how">${esc(g.how)}</span></td><td class="num">${$$(g.pot)}</td><td class="num">${$$(g.pot / players)}</td></tr>`).join('')}
        <tr class="total"><td>${sameEveryDay ? 'Each day' : 'Day total'}</td><td class="num">${$$(d.total)}</td><td class="num">${$$(d.total / players)}</td></tr>
      </tbody>
    </table>
    <div class="bar">${d.games.map((g, i) => `<div style="width:${(g.pot / (d.total || 1)) * 100}%;background:${COLORS[i % COLORS.length]}"></div>`).join('')}</div>
    <div class="legend">${d.games.map((g, i) => `<span style="--c:${COLORS[i % COLORS.length]}">${esc(g.short)} ${Math.round((g.pot / (d.total || 1)) * 100)}%</span>`).join('')}</div>`;

  const leftover = remaining - overallTotal;
  document.getElementById('main').innerHTML = `
    <h2>What each player pays</h2>
    <div class="card">
      ${cost ? `<div class="eq">
        <div><div class="n big">${$$(cost)}</div><div class="l">per player</div></div><div class="op">×</div>
        <div><div class="n big">${players}</div><div class="l">players</div></div><div class="op">=</div>
        <div><div class="n big">${$$(pool)}</div><div class="l">prize pool</div></div>
      </div>
      <p class="note">Every dollar goes back out as prizes. Your ${$$(cost)} covers ${days.length} days of games${sameEveryDay ? ` (${$$(sample.total / players)} a day)` : ''}${overallTotal ? ` plus a share of the ${esc(overall.name || 'trip-long prize')}` : ''}.</p>`
      : '<p class="note">No cost per player set yet.</p>'}
    </div>

    ${sameEveryDay ? `<h2>Every day: ${$$(sample.total)}</h2><div class="card">${table(sample)}</div>` : ''}

    <h2>The ${days.length} days</h2>
    <div class="card days">
      ${days.map(d => {
        // Where a day pays differently from the table above (e.g. the Ryder Cup), say how
        const odd = sameEveryDay ? d.games.filter(g => g.how !== sample.games.find(x => x.key === g.key)?.how) : [];
        return `<div class="day"><div><b>${esc(d.name)}</b><small>${esc(d.course)}${d.main ? ` · ${esc(d.main)}` : ''}${odd.map(g => `<br><span class="pill">${esc(g.how)}</span>`).join('')}</small></div><div class="num"><b>${$$(d.total)}</b></div></div>
        ${sameEveryDay ? '' : `<div class="daydetail">${table(d)}</div>`}`;
      }).join('')}
    </div>

    <h2>How it balances</h2>
    <div class="card">
      <table class="ledger"><tbody>
        <tr><td>Prize pool (${players} × ${$$(cost)})</td><td class="num">${$$(pool)}</td></tr>
        ${days.map(d => `<tr><td>${esc(d.short)}</td><td class="num">− ${$$(d.total)}</td></tr>`).join('')}
        <tr class="remaining"><td><b>Remaining: ${esc(overall.name || 'not allocated')}</b><span class="how">${esc(overall.comment || '')}${overallPlaces.length ? `. ${placesText(overallPlaces)}` : ''}</span></td><td class="num"><b>${$$(remaining)}</b></td></tr>
        <tr class="balance"><td>${Math.abs(leftover) < 0.005 ? 'Balanced' : leftover > 0 ? 'Not yet allocated' : 'Over-allocated'}</td>
          <td class="num ${Math.abs(leftover) < 0.005 ? 'ok' : 'warn'}">${Math.abs(leftover) < 0.005 ? '$0 ✓' : $$(leftover)}</td></tr>
      </tbody></table>
      ${Math.abs(leftover) >= 0.005 ? `<p class="note warn">The ${esc(overall.name || 'remaining prize')} pays ${$$(overallTotal)}, so ${$$(Math.abs(leftover))} ${leftover > 0 ? 'is left unallocated' : 'more is paid out than comes in'}.</p>` : ''}
      <p class="note">Per player: ${days.length} days of games ${$$(tripDaily / players)} + ${$$(remaining / players)} toward the ${esc(overall.name || 'remaining prize')} = ${$$(cost)}.</p>
    </div>
    <p class="note" style="text-align:center">Built from the amounts set in the golf app · ${new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>`;
}

async function load() {
  const id = new URLSearchParams(location.search).get('t') || NAPLES;
  const t = (await getDoc(doc(db, 'tournaments', id))).data();
  if (!t) throw new Error('Tournament not found');
  const players = (t.players || []).length;
  const rounds = (await getDocs(collection(db, 'tournaments', id, 'rounds'))).docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
  const games = (await getDocs(query(collection(db, 'games'), where('tournamentId', '==', id)))).docs.map(d => d.data());
  const par3sOf = {};
  for (const cid of [...new Set(rounds.map(r => r.courseId).filter(Boolean))]) {
    const c = (await getDoc(doc(db, 'courses', cid))).data();
    const holes = (c?.tees?.male || c?.tees?.female || [])[0]?.holes || c?.holes || [];
    par3sOf[cid] = holes.filter(h => h.par === 3).length;
  }
  const days = rounds.map(r => {
    const list = games.filter(g => (g.roundIds || [g.roundId]).includes(r.id) && g.status !== 'cancelled').map(g => {
      const addOn = !!ADD_ONS[g.gameType];
      const pot = addOn ? Number(g.config?.pot) || 0 : (Number(g.config?.betAmount) || 0) * ((g.playerIds || []).length || players);
      const label = addOn ? ADD_ONS[g.gameType] : `Team game: ${MAIN[g.gameType] || g.gameName || g.gameType}`;
      return { key: addOn ? g.gameType : 'main', label, short: addOn ? ADD_ONS[g.gameType] : 'Team game', pot, how: describe(g, players, par3sOf[r.courseId]) };
    }).sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));
    const date = r.date ? new Date(`${r.date.slice(0, 10)}T12:00:00`) : null;
    return {
      name: date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : r.name,
      short: `Day ${r.roundNumber}${date ? ` (${date.toLocaleDateString('en-US', { weekday: 'short' })})` : ''}`,
      course: r.clubName || r.courseName || '',
      main: list.filter(g => g.key === 'main').map(g => g.label.replace('Team game: ', '')).join(' + '),
      games: list,
      total: list.reduce((s, g) => s + g.pot, 0),
    };
  });
  document.title = `Purse & Payouts · ${t.name}`;
  render(t, days);
}

onAuthStateChanged(auth, user => {
  if (!user) { signInAnonymously(auth).catch(fail); return; }
  load().catch(fail);
});
function fail(e) {
  console.error(e);
  document.getElementById('main').innerHTML = `<div class="card">Couldn't load the purse: ${esc(e.message || e)}</div>`;
}
