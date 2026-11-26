// The Prop Board: play-money prediction markets for the trip. Anyone links their
// phone to their name, makes markets, and buys answers; prices and balances come
// from replaying every trade (engine.js), so they're the same on every phone.
import { replay, quote, START, MAX_TRADE } from './engine.js?v=20261125c';
import { openStore } from './store.js?v=20261125c';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const params = new URLSearchParams(location.search);
const DEMO = params.has('demo');
const FROM_APP = params.get('p');          // the golf app can pass the player
const COLORS = ['#0d1b2b', '#b8943f', '#3d5240', '#b0412e', '#4f7ea8', '#8a6d9e'];

const bucks = (n, sign) => `${sign && n > 0.5 ? '+' : sign && n < -0.5 ? '−' : ''}B$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;
const cents = p => `${Math.max(1, Math.min(99, Math.round(p * 100)))}¢`;
const pct = p => `${Math.max(p > 0 ? 1 : 0, Math.min(p < 1 ? 99 : 100, Math.round(p * 100)))}%`;
const isBinary = m => m.outcomes.length === 2 && m.outcomes[0] === 'Yes' && m.outcomes[1] === 'No';
const shortCourse = c => { const s = c.replace(/\s+(Golf\s*(&|and)\s*)?(Country|Golf|Yacht)?\s*Club.*$/i, '').trim(); return s.length > 3 ? s : c; };
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

let S = null;        // store state
let R = null;        // replay result
let tab = 'board';
let filter = 'all';
let askedWho = false;
let sheet = null;    // { kind: 'market', id, outcome, amount } | { kind: 'create', ... } | { kind: 'who' }

const store = openStore({ demo: DEMO, onChange: s => { S = s; render(); }, onError: e => { console.error(e); toast(friendly(e), true); } });

function friendly(e) {
  const m = String(e?.code || e?.message || e);
  if (m.includes('permission')) return 'The board said no. If you just linked your name, try again in a moment.';
  if (m.includes('unavailable') || m.includes('network')) return 'No signal. Try again when you have a connection.';
  return 'Something went wrong. Try again.';
}

// ---------- Who's who ----------

const myId = () => S && Object.values(S.claims).find(c => c.uid && c.uid === S.uid)?.playerId;
const nameOf = id => S.roster.find(p => p.id === id)?.name || S.claims[id]?.name || 'Someone';
const walletOf = id => R.players[id] || { cash: START, open: 0, total: START, settled: 0, wins: 0, trades: 0 };
const dayOf = m => S.days.find(d => d.id === m.roundId);
const closed = m => m.status !== 'open' || (m.closeAt && m.closeAt <= Date.now());
const canSettle = m => S.isOrganizer || (myId() && m.createdBy === myId());

// ---------- Rendering ----------

function render() {
  if (!S?.ready) return;
  R = replay(S.markets, S.trades);
  $('demoBar').classList.toggle('hidden', !S.demo);
  $('org').classList.toggle('hidden', !!S.demo);
  renderMe();
  renderFilters();
  renderBoard();
  if (tab === 'mine') renderMine();
  if (tab === 'leaders') renderLeaders();
  if (sheet?.kind === 'market') renderMarketLive();
  if (sheet?.kind === 'who') renderWho();
  $('newBtn').classList.toggle('hidden', tab !== 'board');
  syncOrg();
  if (FROM_APP && !myId() && !askedWho && S.roster.some(p => p.id === FROM_APP)) { askedWho = true; openWho(); }
}

function renderMe() {
  const id = myId();
  if (!id) {
    $('me').innerHTML = `<button class="cta" id="pickMe"><span>Pick your name to start trading</span><b>Who are you? ›</b></button>`;
    $('pickMe').onclick = openWho;
    return;
  }
  const w = walletOf(id);
  const gain = w.total - START;
  $('me').innerHTML = `
    <div class="avatar">${esc(initials(nameOf(id)))}</div>
    <div class="who"><b>${esc(nameOf(id))}</b><span>${bucks(w.cash)} to spend · <button class="linkbtn" id="switchMe">not you?</button></span></div>
    <div class="bal num"><b>${bucks(w.total)}</b><span class="${gain > 0.5 ? 'up' : gain < -0.5 ? 'down' : 'flat'}">${gain > 0.5 ? '▲ ' : gain < -0.5 ? '▼ ' : ''}${bucks(gain)}</span></div>`;
  $('switchMe').onclick = openWho;
}

function renderFilters() {
  const open = S.markets.filter(m => m.status === 'open');
  const count = f => open.filter(f).length;
  const list = [
    ['all', 'All', open.length],
    ['trip', 'Whole trip', count(m => !m.roundId)],
    ...S.days.map(d => [d.id, `${d.label.split(',')[0]} · ${shortCourse(d.course)}`, count(m => m.roundId === d.id)]),
    ['settled', 'Settled', S.markets.length - open.length],
  ];
  $('filters').innerHTML = list.map(([k, l, n]) => `<button class="chip" data-f="${k}" aria-pressed="${filter === k}">${esc(l)}<small>${n}</small></button>`).join('');
}
$('filters').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) { filter = b.dataset.f; renderFilters(); renderBoard(); } });

function boardMarkets() {
  const ms = S.markets.filter(m => filter === 'settled' ? m.status !== 'open'
    : m.status === 'open' && (filter === 'all' || (filter === 'trip' ? !m.roundId : m.roundId === filter)));
  // Open first, soonest to close; then ones waiting to be settled; settled newest first
  return ms.sort((a, b) => filter === 'settled' ? (b.resolvedAt || 0) - (a.resolvedAt || 0)
    : (closed(a) - closed(b)) || (a.closeAt || 0) - (b.closeAt || 0));
}

function renderBoard() {
  const ms = boardMarkets();
  $('board').innerHTML = ms.length ? ms.map(m => cardHTML(m, R.markets[m.id])).join('') : `<div class="empty"><b>${filter === 'settled' ? 'Nothing settled yet' : 'No markets here yet'}</b>
    ${filter === 'settled' ? 'Markets show here once their question is decided.' : 'Think anyone breaks 80? Tom shanks the most? Make a market and let the group set the odds.'}</div>`;
}
$('board').addEventListener('click', e => {
  const card = e.target.closest('.mkt[data-id]');
  if (!card) return;
  const b = e.target.closest('[data-o]');
  openMarket(card.dataset.id, b ? +b.dataset.o : undefined);
});

function closesText(m) {
  if (m.status === 'resolved') return 'Settled';
  if (m.status === 'void') return 'Called off';
  const left = (m.closeAt || 0) - Date.now();
  if (left <= 0) return 'Closed';
  const mins = Math.max(1, Math.floor(left / 6e4));
  if (mins < 60) return `Closes in ${mins}m`;
  if (mins < 24 * 60) return `Closes in ${Math.floor(mins / 60)}h ${mins % 60}m`;
  const d = new Date(m.closeAt);
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(':00', '');
  return `Closes ${left < 6 * 864e5 ? d.toLocaleDateString('en-US', { weekday: 'short' }) : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${time}`;
}
const soon = m => m.status === 'open' && m.closeAt - Date.now() > 0 && m.closeAt - Date.now() < 3 * 36e5;
function tagText(m) {
  const d = dayOf(m);
  return d ? `Day ${d.n} · ${shortCourse(d.course)}` : 'Whole trip';
}

function sparkSVG(hist, i, w = 170, h = 40, color = 'var(--yes)') {
  const pts = hist.length > 1 ? hist : [...hist, { ...hist[0], t: hist[0].t + 1 }];
  const t0 = pts[0].t, t1 = Math.max(pts[pts.length - 1].t, t0 + 1);
  const xy = pts.map(p => [((p.t - t0) / (t1 - t0)) * w, h - 3 - p.p[i] * (h - 6)]);
  // Step line: a price holds until the next trade
  let d = `M${xy[0][0].toFixed(1)},${xy[0][1].toFixed(1)}`;
  for (let k = 1; k < xy.length; k++) d += `H${xy[k][0].toFixed(1)}V${xy[k][1].toFixed(1)}`;
  d += `H${w}`;
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <line x1="0" x2="${w}" y1="${h / 2}" y2="${h / 2}" stroke="var(--linen-deep)" stroke-dasharray="2 3" vector-effect="non-scaling-stroke"/>
    <path d="${d}V${h}H0Z" fill="${color}" opacity=".08"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;
}

function myStake(mid) {
  const h = R.markets[mid]?.holders[myId()];
  return h ? h.spent.reduce((a, x) => a + x, 0) : 0;
}

function cardHTML(m, st, preview = false) {
  const p = st.p;
  const top = `<div class="mkt-top"><span class="tag"><i></i>${esc(tagText(m))}</span><span class="closes ${soon(m) ? 'soon' : ''}">${esc(closesText(m))}</span></div>
    <h3 class="q">${esc(m.question || 'Your question')}</h3>`;
  let body;
  if (m.status === 'resolved' || m.status === 'void') {
    body = resultHTML(m, st);
  } else if (isBinary(m)) {
    const first = st.history[0].p[0], chg = Math.round((p[0] - first) * 100);
    body = `<div class="odds"><div class="big num">${pct(p[0])}<small>chance</small></div>
        <span class="chg ${chg > 0 ? 'up' : chg < 0 ? 'down' : 'flat'}">${chg > 0 ? '▲' : chg < 0 ? '▼' : ''}${chg ? Math.abs(chg) : ''}</span>
        ${sparkSVG(st.history, 0)}</div>
      ${closed(m) ? waitingHTML(m) : `<div class="buy2"><button class="b yes" data-o="0" type="button">Yes <span class="c num">${cents(p[0])}</span></button>
        <button class="b no" data-o="1" type="button">No <span class="c num">${cents(p[1])}</span></button></div>`}`;
  } else {
    const order = p.map((x, i) => i).sort((a, b) => p[b] - p[a]);
    const shown = order.slice(0, 4);
    body = `<ul class="outs">${shown.map(i => `<li class="out"><div class="lbl"><div class="fill" style="width:${(p[i] * 100).toFixed(1)}%"></div>
        <span>${esc(m.outcomes[i] || `Answer ${i + 1}`)}</span><span class="p num">${pct(p[i])}</span></div>
        ${closed(m) ? '' : `<button class="b yes" data-o="${i}" type="button">Yes <span class="c num">${cents(p[i])}</span></button>`}</li>`).join('')}</ul>
      ${order.length > 4 ? `<div class="more">+${order.length - 4} more answer${order.length > 5 ? 's' : ''}</div>` : ''}
      ${closed(m) ? waitingHTML(m) : ''}`;
  }
  const stake = preview ? 0 : myStake(m.id);
  return `<article class="mkt" ${preview ? '' : `data-id="${esc(m.id)}"`}>${top}${body}
    <div class="mkt-foot num"><span>${bucks(st.volume)} traded</span><span>${st.traders} ${st.traders === 1 ? 'player' : 'players'}</span><span>by ${esc(m.createdByName || nameOf(m.createdBy))}</span>
    ${stake ? `<span class="mine">You: ${bucks(stake)}</span>` : ''}</div></article>`;
}
function resultHTML(m, st) {
  const won = m.status === 'resolved' ? m.outcomes[m.winner] : null;
  const h = st.holders[myId()];
  const mine = h && won ? (h.shares[m.winner] || 0) - h.spent.reduce((a, x) => a + x, 0) : null;
  return `<div class="result"><div class="seal">${won ? '✓' : '↺'}</div><div style="flex:1"><small>${won ? 'Winning answer' : 'Called off · everyone refunded'}</small><b>${esc(won || '—')}</b></div>
    ${mine !== null ? `<div class="pill ${mine >= 0 ? 'yes' : 'no'}">${bucks(mine, true)}</div>` : ''}</div>`;
}
const waitingHTML = m => `<div class="waiting">Trading's closed. Waiting for ${esc(m.createdBy === myId() ? 'you' : (m.createdByName || 'the maker'))} to mark the answer.</div>`;

// ---------- My bets ----------

function renderMine() {
  const id = myId();
  const el = $('tab-mine');
  if (!id) { el.innerHTML = `<div class="empty"><b>Pick your name first</b>Then your bets and balance show here.</div>`; return; }
  const w = walletOf(id);
  const rows = S.markets.map(m => ({ m, st: R.markets[m.id], h: R.markets[m.id].holders[id] })).filter(x => x.h);
  const open = rows.filter(x => x.m.status === 'open'), done = rows.filter(x => x.m.status !== 'open');
  const posHTML = ({ m, st, h }) => h.shares.map((sh, i) => {
    if (!h.spent[i]) return '';
    const spent = h.spent[i];
    const label = isBinary(m) ? `<span class="pill ${i ? 'no' : 'yes'}">${m.outcomes[i]}</span>` : `<span class="pill gold">${esc(m.outcomes[i])}</span>`;
    let right;
    if (m.status === 'open') right = `<span>Now ${bucks(sh * st.p[i])} · pays ${bucks(sh)}</span>`;
    else if (m.status === 'void') right = `<span>Refunded ${bucks(spent)}</span>`;
    else { const back = m.winner === i ? sh : 0; right = `<span class="${back > spent ? 'up' : 'down'}"><b>${bucks(back - spent, true)}</b></span>`; }
    return `<div class="pos" data-id="${esc(m.id)}"><div class="pq">${esc(m.question)}</div>
      <div class="pl num"><span>${label} ${Math.round(sh)} shares · cost ${bucks(spent)} · avg ${cents(spent / sh)}</span></div>
      <div class="pl num"><span>${esc(closesText(m))}</span>${right}</div></div>`;
  }).join('');
  el.innerHTML = `
    <div class="card"><div class="stats3 num">
      <div><div class="n">${bucks(w.cash)}</div><div class="l">To spend</div></div>
      <div><div class="n">${bucks(w.open)}</div><div class="l">In play</div></div>
      <div><div class="n ${w.total - START > 0.5 ? 'up' : w.total - START < -0.5 ? 'down' : ''}">${bucks(w.total - START, true)}</div><div class="l">Up / down</div></div>
    </div></div>
    <h2>Open bets</h2>
    ${open.length ? `<div class="card">${open.map(posHTML).join('')}</div>` : `<div class="empty">No open bets. Find a market you have a feeling about.</div>`}
    ${done.length ? `<h2>Settled</h2><div class="card">${done.map(posHTML).join('')}</div>` : ''}`;
}
$('tab-mine').addEventListener('click', e => { const p = e.target.closest('.pos[data-id]'); if (p) openMarket(p.dataset.id); });

// ---------- Standings ----------

function renderLeaders() {
  const me = myId();
  const people = S.roster.map(p => ({ ...p, w: walletOf(p.id) })).sort((a, b) => b.w.total - a.w.total || a.name.localeCompare(b.name));
  const max = Math.max(...people.map(p => p.w.total), START);
  const active = people.filter(p => p.w.trades);
  const volume = Object.values(R.markets).reduce((a, s) => a + s.volume, 0);
  $('tab-leaders').innerHTML = `
    <div class="card"><div class="stats3 num">
      <div><div class="n">${S.markets.length}</div><div class="l">Markets</div></div>
      <div><div class="n">${bucks(volume)}</div><div class="l">Traded</div></div>
      <div><div class="n">${active.length}</div><div class="l">Players in</div></div>
    </div></div>
    <h2>Standings</h2>
    <div class="card">${people.map((p, i) => {
      const g = p.w.total - START;
      return `<div class="row ${p.id === me ? 'me-row' : ''}"><div class="rank ${i === 0 && g > 0 ? 'r1' : ''}">${i + 1}</div>
        <div class="nm"><b>${esc(p.name)}</b><small>${p.w.trades ? `${p.w.trades} trade${p.w.trades === 1 ? '' : 's'}${p.w.open > 0.5 ? ` · ${bucks(p.w.open)} in play` : ''}` : 'No trades yet'}</small>
          <div class="lbar"><i style="width:${(p.w.total / max * 100).toFixed(1)}%"></i></div></div>
        <div class="tot num"><b>${bucks(p.w.total)}</b><small class="${g > 0.5 ? 'up' : g < -0.5 ? 'down' : 'flat'}">${bucks(g, true)}</small></div></div>`;
    }).join('')}</div>
    <p class="note">Open bets count at today's prices, so the order can change until every market is settled. It's for bragging rights:
      if the group wants a side bet on the final standings, settle it among yourselves.</p>`;
}

// ---------- Sheets ----------

function openSheet(html) {
  $('sheet').innerHTML = `<div class="grab"></div>${html}`;
  $('scrim').classList.remove('hidden'); $('sheet').classList.remove('hidden');
  document.body.classList.add('locked');
  requestAnimationFrame(() => { $('scrim').classList.add('open'); $('sheet').classList.add('open'); });
  $('sheet').scrollTop = 0;
}
function closeSheet() {
  sheet = null;
  $('scrim').classList.remove('open'); $('sheet').classList.remove('open');
  document.body.classList.remove('locked');
  setTimeout(() => { if (!sheet) { $('scrim').classList.add('hidden'); $('sheet').classList.add('hidden'); } }, 260);
}
$('scrim').addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet) closeSheet(); });
$('sheet').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });

// Who are you
function openWho() { sheet = { kind: 'who' }; openSheet(`<div id="whoBody"></div>`); renderWho(); }
function renderWho() {
  const mine = myId();
  $('whoBody').innerHTML = `<div class="sheet-head"><h3 class="q">Who are you?</h3><button class="x" data-close aria-label="Close">×</button></div>
    <p class="details">Pick your name once and this phone remembers you. Each name works on one phone; on a new phone, ask the organizer to unlink the old one.</p>
    <div class="people">${S.roster.map(p => {
      const c = S.claims[p.id];
      const taken = c?.uid && c.uid !== S.uid;
      return `<button class="person ${p.id === mine ? 'mine' : ''}" data-pid="${esc(p.id)}" ${taken && !S.isOrganizer ? 'disabled' : ''}>
        <span>${esc(p.name)}</span><small>${p.id === mine ? 'You ✓' : taken ? (S.isOrganizer ? 'Unlink' : 'On a phone') : ''}</small></button>`;
    }).join('')}</div>
    ${mine ? `<button class="ghost" id="unlinkMe">I'm not ${esc(nameOf(mine))} — unlink this phone</button>` : ''}
    <p class="err" id="whoErr"></p>`;
  $('whoBody').querySelectorAll('[data-pid]').forEach(b => b.onclick = () => pickPerson(b.dataset.pid));
  if (mine) $('unlinkMe').onclick = () => busy(store.release(mine), 'Unlinked');
}
async function pickPerson(pid) {
  const c = S.claims[pid];
  if (pid === myId()) return closeSheet();
  if (c?.uid && c.uid !== S.uid) {
    if (S.isOrganizer && confirm(`Unlink ${nameOf(pid)} from their phone? They can pick their name again on any phone.`)) busy(store.release(pid), 'Unlinked');
    return;
  }
  const mine = myId();
  try {
    if (mine) await store.release(mine);
    await store.claim(pid);
    closeSheet();
    toast(`Welcome, ${nameOf(pid).split(' ')[0]}. You have ${bucks(walletOf(pid).cash)} to spend.`);
  } catch (e) { $('whoErr').textContent = friendly(e); }
}

// Market detail + trading
function openMarket(id, outcome) {
  const m = S.markets.find(x => x.id === id);
  if (!m) return;
  sheet = { kind: 'market', id, outcome: outcome ?? (isBinary(m) ? 0 : R.markets[id].p.indexOf(Math.max(...R.markets[id].p))), amount: 25, settling: false };
  openSheet(`<div class="sheet-head"><div style="flex:1"><div class="mkt-top"><span class="tag"><i></i>${esc(tagText(m))}</span></div>
      <h3 class="q" style="margin-top:6px">${esc(m.question)}</h3></div><button class="x" data-close aria-label="Close">×</button></div>
    ${m.details ? `<p class="details"><b>How it's decided:</b> ${esc(m.details)}</p>` : ''}
    <div id="mLive"></div>
    <div id="mTrade"></div>
    <div id="mPos"></div>
    <div id="mSettle"></div>
    <div class="sec"><h3>Activity</h3><div id="mAct"></div></div>`);
  renderMarketLive();
}

function chartSVG(m, st) {
  const W = 320, H = 150, L = 4, Rr = 34, T = 8, B = 18;
  const hist = st.history.length > 1 ? st.history : [...st.history, { ...st.history[0], t: Date.now() }];
  const t0 = hist[0].t, t1 = Math.max(closed(m) ? hist[hist.length - 1].t : Date.now(), t0 + 1);
  const x = t => L + ((t - t0) / (t1 - t0)) * (W - L - Rr), y = p => T + (1 - p) * (H - T - B);
  const lines = (isBinary(m) ? [0] : m.outcomes.map((_, i) => i)).map(i => {
    let d = `M${x(hist[0].t).toFixed(1)},${y(hist[0].p[i]).toFixed(1)}`;
    for (const h of hist.slice(1)) d += `H${x(h.t).toFixed(1)}V${y(h.p[i]).toFixed(1)}`;
    d += `H${x(t1).toFixed(1)}`;
    const c = isBinary(m) ? 'var(--yes)' : COLORS[i % COLORS.length];
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="${x(t1).toFixed(1)}" cy="${y(st.p[i]).toFixed(1)}" r="3.5" fill="${c}"/>`;
  }).join('');
  const grid = [0, .5, 1].map(p => `<line x1="${L}" x2="${W - Rr}" y1="${y(p)}" y2="${y(p)}" stroke="var(--linen-deep)" ${p === .5 ? 'stroke-dasharray="3 4"' : ''}/>
    <text x="${W - Rr + 6}" y="${y(p) + 4}" font-size="11" fill="var(--taupe)">${p * 100}%</text>`).join('');
  const fmt = t => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Price history">${grid}${lines}
    <text x="${L}" y="${H - 3}" font-size="11" fill="var(--taupe)">${fmt(t0)}</text>
    <text x="${W - Rr}" y="${H - 3}" font-size="11" fill="var(--taupe)" text-anchor="end">${closed(m) ? fmt(t1) : 'Now'}</text></svg>`;
}

function renderMarketLive() {
  const m = S.markets.find(x => x.id === sheet.id);
  if (!m) return closeSheet();
  const st = R.markets[m.id];
  const bin = isBinary(m);
  $('mLive').innerHTML = `<div class="sec">
    ${bin ? `<div class="odds" style="margin-bottom:6px"><div class="big num">${pct(st.p[0])}<small>chance of Yes</small></div></div>`
      : `<div class="legend">${m.outcomes.map((o, i) => `<span style="--c:${COLORS[i % COLORS.length]}">${esc(o)} <b class="num">${pct(st.p[i])}</b></span>`).join('')}</div>`}
    ${chartSVG(m, st)}
    <div class="meta num"><span>${bucks(st.volume)} traded</span><span>${st.traders} ${st.traders === 1 ? 'player' : 'players'}</span><span>${esc(closesText(m))}</span><span>Made by ${esc(m.createdByName || nameOf(m.createdBy))}</span></div></div>`;

  // Trading panel: built once per open so the amount box keeps focus; prices refresh in place
  if (!closed(m)) {
    if (!$('mTrade').dataset.built) buildTrade(m);
    refreshTrade(m, st);
  } else $('mTrade').innerHTML = m.status === 'open' ? `<div class="sec">${waitingHTML(m)}</div>` : `<div class="sec">${resultHTML(m, st)}</div>`;

  // This player's shares
  const h = st.holders[myId()];
  $('mPos').innerHTML = h ? `<div class="sec"><h3>Your position</h3>${h.shares.map((sh, i) => h.spent[i] ? `<div class="act num">
      <span><span class="pill ${bin ? (i ? 'no' : 'yes') : 'gold'}">${esc(m.outcomes[i])}</span> ${Math.round(sh)} shares · cost ${bucks(h.spent[i])}</span>
      <span>${m.status === 'open' ? `now ${bucks(sh * st.p[i])}` : m.status === 'void' ? 'refunded' : m.winner === i ? `won ${bucks(sh)}` : 'lost'}</span></div>` : '').join('')}</div>` : '';

  // Settling: the maker or the organizer
  const sEl = $('mSettle');
  if (canSettle(m) && m.status === 'open') {
    sEl.innerHTML = `<div class="sec"><h3>${m.createdBy === myId() ? 'You made this market' : 'Organizer'}</h3>
      ${sheet.settling ? `<p class="details" style="margin:0 0 10px">Which answer won? Everyone holding it gets B$1 a share. This can't be undone.</p>
        <div class="settle">${m.outcomes.map((o, i) => `<button class="ghost" style="margin:0" data-win="${i}">${esc(o)} won</button>`).join('')}
        <button class="ghost danger" style="margin:0" data-win="void">Call it off and refund everyone</button>
        <button class="linkbtn" data-win="cancel">Not yet</button></div>`
      : `<button class="go ink" data-win="start">Mark the answer</button>`}</div>`;
  } else if (S.isOrganizer && m.status !== 'open') {
    sEl.innerHTML = `<div class="sec"><h3>Organizer</h3><button class="ghost" style="margin:0" data-win="reopen">Undo the result and reopen</button></div>`;
  } else sEl.innerHTML = '';
  // The organizer can take a market off the board altogether (its bets go with it, so nobody wins or loses on it)
  if (S.isOrganizer) sEl.insertAdjacentHTML('beforeend', `<button class="ghost danger" data-win="delete">Delete this market</button>`);
  sEl.querySelectorAll('[data-win]').forEach(b => b.onclick = () => settleClick(m, b.dataset.win));

  // Activity, newest first
  const acts = st.trades.slice().reverse();
  $('mAct').innerHTML = acts.length ? acts.slice(0, 30).map(t => `<div class="act num"><span><b>${esc(nameOf(t.playerId))}</b> bought ${esc(m.outcomes[t.outcome])} · ${bucks(t.spend)} at ${cents(t.avg)}</span><span>${ago(t.createdAt)}</span></div>`).join('')
    : `<p class="details" style="margin:0">No trades yet. Be the first to set the odds.</p>`;
}

function buildTrade(m) {
  const bin = isBinary(m);
  $('mTrade').dataset.built = '1';
  $('mTrade').innerHTML = `<div class="sec"><h3>Buy</h3>
    <div class="pick ${bin ? '' : 'multi'}" id="tPick"></div>
    <div class="amts" id="tAmts">${[10, 25, 50, 100, 250].map(a => `<button class="chip" data-a="${a}" type="button">B$${a}</button>`).join('')}</div>
    <div class="amt"><span class="cur">B$</span><input id="tAmt" inputmode="numeric" pattern="[0-9]*" value="${sheet.amount}" aria-label="Bogey Bucks to spend"><span class="have" id="tHave"></span></div>
    <div class="quote num" id="tQuote"></div>
    <button class="go" id="tGo" type="button"></button>
    <p class="err" id="tErr"></p></div>`;
  $('tPick').onclick = e => { const b = e.target.closest('[data-o]'); if (b) { sheet.outcome = +b.dataset.o; refreshTrade(m, R.markets[m.id]); } };
  $('tAmts').onclick = e => { const b = e.target.closest('[data-a]'); if (b) { sheet.amount = +b.dataset.a; $('tAmt').value = sheet.amount; refreshTrade(m, R.markets[m.id]); } };
  $('tAmt').oninput = () => { sheet.amount = parseInt($('tAmt').value.replace(/\D/g, ''), 10) || 0; refreshTrade(m, R.markets[m.id]); };
  $('tGo').onclick = () => doTrade(m);
}

function refreshTrade(m, st) {
  if (!$('tPick')) return;
  const bin = isBinary(m), i = sheet.outcome, a = sheet.amount;
  $('tPick').innerHTML = m.outcomes.map((o, k) => `<button class="b ${bin ? (k ? 'no' : 'yes') : ''}" data-o="${k}" aria-pressed="${k === i}" type="button">
    <span>${esc(o)}</span><span class="c num">${cents(st.p[k])}</span></button>`).join('');
  $('tAmts').querySelectorAll('[data-a]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.a === a));
  const me = myId(), cash = me ? walletOf(me).cash : START;
  $('tHave').textContent = me ? `of ${bucks(cash)}` : '';
  const go = $('tGo');
  go.className = `go ${bin && i === 1 ? 'no' : ''}`;
  if (a > 0) {
    const qt = quote(st.q, i, a);
    $('tQuote').innerHTML = `<span>Average price</span><span>${cents(qt.avg)}</span>
      <span>Shares</span><span>${Math.round(qt.shares)}</span>
      <span>Odds after you buy</span><span>${pct(st.p[i])} → ${pct(qt.after)}</span>
      <span class="win">If ${esc(m.outcomes[i])} wins</span><span class="win">${bucks(qt.payout)} (${bucks(qt.payout - a, true)})</span>`;
  } else $('tQuote').innerHTML = '';
  const problem = !me ? '' : a < 1 ? 'Enter an amount' : a > MAX_TRADE ? `Up to B$${MAX_TRADE} a trade` : a > cash + 1e-9 ? `You have ${bucks(cash)}` : '';
  go.disabled = !!problem || !!sheet.sending;
  go.textContent = !me ? 'Pick your name to trade' : problem || (sheet.sending ? 'Buying…' : `Buy ${m.outcomes[i]} · B$${a}`);
  if (!me) go.disabled = false;
}

async function doTrade(m) {
  const me = myId();
  if (!me) return openWho();
  if (closed(m)) return toast('This market just closed.', true);
  const { outcome, amount } = sheet;
  sheet.sending = true; refreshTrade(m, R.markets[m.id]);
  try {
    await store.trade(m.id, outcome, amount, me);
    toast(`Bought ${m.outcomes[outcome]} for B$${amount}`);
  } catch (e) { const el = $('tErr'); if (el) el.textContent = friendly(e); }
  if (sheet?.kind === 'market') { sheet.sending = false; refreshTrade(m, R.markets[m.id]); }
}

async function settleClick(m, v) {
  if (v === 'start' || v === 'cancel') { sheet.settling = v === 'start'; return renderMarketLive(); }
  const by = S.isOrganizer ? 'organizer' : nameOf(myId());
  if (v === 'delete') {
    const n = R.markets[m.id].trades.length;
    if (!confirm(`Delete "${m.question}"? It comes off the board for everyone${n ? ` and its ${n} bet${n === 1 ? '' : 's'} are cancelled (everyone gets their Bogey Bucks back)` : ''}. This can't be undone.`)) return;
    try { await store.deleteMarket(m.id); closeSheet(); toast('Market deleted'); } catch (e) { toast(friendly(e), true); }
    return;
  }
  if (v === 'reopen') {
    if (confirm('Undo the result? Payouts are taken back and trading reopens until the close time.')) busy(store.settle(m.id, 'open', null, null), 'Reopened');
    return;
  }
  if (v === 'void') {
    if (confirm('Call this market off? Everyone gets back what they spent.')) busy(store.settle(m.id, 'void', null, by), 'Called off. Everyone refunded.');
    return;
  }
  const i = +v;
  if (!confirm(`Mark "${m.outcomes[i]}" as the answer? Everyone holding it gets paid. This can't be undone.`)) return;
  await busy(store.settle(m.id, 'resolved', i, by), `Settled: ${m.outcomes[i]}`);
  $('mTrade').dataset.built = '';
}

// New market
function defaultClose(roundId) {
  const d = S.days.find(x => x.id === roundId) || S.days[S.days.length - 1];
  const base = d?.date ? new Date(d.date) : new Date(Date.now() + 864e5);
  base.setHours(roundId ? 7 : 17, roundId ? 30 : 0, 0, 0);
  return Math.max(+base, Date.now() + 36e5);
}
const toLocalInput = t => { const d = new Date(t); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };

function openCreate() {
  if (!myId()) { toast('Pick your name first, then make your market.'); return openWho(); }
  sheet = { kind: 'create', type: 'binary', answers: ['', ''], roundId: '', closeAt: defaultClose('') };
  openSheet(`<div class="sheet-head"><h3 class="q">New market</h3><button class="x" data-close aria-label="Close">×</button></div>
    <label class="f" for="cQ">The question</label>
    <input class="in qin" id="cQ" maxlength="140" placeholder="Will anyone break 80 at Old Cypress?" autocomplete="off">
    <label class="f">Answers</label>
    <div class="seg" id="cType"><button type="button" data-t="binary" aria-pressed="true">Yes / No</button><button type="button" data-t="multi" aria-pressed="false">Several answers</button></div>
    <div id="cAnswers" style="margin-top:10px"></div>
    <label class="f" for="cDay">It's about</label>
    <select class="in" id="cDay"><option value="">The whole trip</option>${S.days.map(d => `<option value="${esc(d.id)}">Day ${d.n} · ${esc(d.label)} · ${esc(d.course)}</option>`).join('')}</select>
    <label class="f" for="cClose">Trading closes</label>
    <input class="in" id="cClose" type="datetime-local">
    <div class="whens" id="cWhens"></div>
    <label class="f" for="cDetails">How it's decided <span style="text-transform:none;letter-spacing:0;font-weight:400">(optional)</span></label>
    <textarea class="in" id="cDetails" maxlength="300" placeholder="e.g. Gross score on the card, counted after the round"></textarea>
    <div class="preview-lbl">Preview</div>
    <div class="preview" id="cPreview"></div>
    <p class="err" id="cErr"></p>
    <button class="go ink" id="cGo" type="button">Open the market</button>
    <p class="details" style="text-align:center">You'll mark the answer when it's decided. Everyone starts at even odds.</p>`);
  $('cClose').value = toLocalInput(sheet.closeAt);
  $('cQ').oninput = createPreview;
  $('cDetails').oninput = createPreview;
  $('cType').onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; sheet.type = b.dataset.t; if (sheet.type === 'multi' && sheet.answers.filter(Boolean).length < 2) sheet.answers = ['', '', '']; drawAnswers(); };
  $('cDay').onchange = () => { sheet.roundId = $('cDay').value; sheet.closeAt = defaultClose(sheet.roundId); $('cClose').value = toLocalInput(sheet.closeAt); drawWhens(); createPreview(); };
  $('cClose').onchange = () => { sheet.closeAt = +new Date($('cClose').value); drawWhens(); createPreview(); };
  $('cGo').onclick = submitCreate;
  drawAnswers(); drawWhens();
  setTimeout(() => $('cQ').focus(), 300);
}

function drawAnswers() {
  $('cType').querySelectorAll('[data-t]').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === sheet.type));
  if (sheet.type === 'binary') {
    $('cAnswers').innerHTML = `<div class="buy2"><div class="b yes">Yes <span class="c">50¢</span></div><div class="b no">No <span class="c">50¢</span></div></div>`;
  } else {
    $('cAnswers').innerHTML = `${sheet.answers.map((a, i) => `<div class="ans"><input class="in" data-i="${i}" maxlength="40" placeholder="Answer ${i + 1}" value="${esc(a)}">
      ${sheet.answers.length > 2 ? `<button type="button" data-del="${i}" aria-label="Remove">−</button>` : ''}</div>`).join('')}
      ${sheet.answers.length < 6 ? `<button class="ghost" type="button" id="cAdd" style="margin-top:2px">+ Add an answer</button>` : ''}
      <div class="names" id="cNames">${S.roster.filter(p => !sheet.answers.includes(p.name.split(' ')[0])).slice(0, 24).map(p => `<button class="chip" type="button" data-n="${esc(p.name.split(' ')[0])}">+ ${esc(p.name.split(' ')[0])}</button>`).join('')}</div>`;
    $('cAnswers').querySelectorAll('input[data-i]').forEach(inp => inp.oninput = () => { sheet.answers[+inp.dataset.i] = inp.value; createPreview(); });
    $('cAnswers').querySelectorAll('[data-del]').forEach(b => b.onclick = () => { sheet.answers.splice(+b.dataset.del, 1); drawAnswers(); });
    $('cAdd')?.addEventListener('click', () => { sheet.answers.push(''); drawAnswers(); $('cAnswers').querySelector(`input[data-i="${sheet.answers.length - 1}"]`)?.focus(); });
    $('cNames').querySelectorAll('[data-n]').forEach(b => b.onclick = () => {
      const empty = sheet.answers.findIndex(a => !a.trim());
      if (empty >= 0) sheet.answers[empty] = b.dataset.n; else if (sheet.answers.length < 6) sheet.answers.push(b.dataset.n); else return toast('Up to 6 answers');
      drawAnswers();
    });
  }
  createPreview();
}

function drawWhens() {
  const d = S.days.find(x => x.id === sheet.roundId);
  const opts = d?.date ? [['First tee', 7, 30], ['The turn', 10, 30], ['After the round', 14, 0]]
    .map(([l, h, mi]) => { const t = new Date(d.date); t.setHours(h, mi, 0, 0); return [l, +t]; })
    : [['In 1 hour', Date.now() + 36e5], ['Tonight', (() => { const t = new Date(); t.setHours(21, 0, 0, 0); return +t; })()], ...S.days.slice(-1).map(x => { const t = new Date(x.date); t.setHours(17, 0, 0, 0); return ['End of trip', +t]; })];
  $('cWhens').innerHTML = opts.filter(([, t]) => t > Date.now()).map(([l, t]) => `<button class="chip" type="button" data-w="${t}" aria-pressed="${Math.abs(t - sheet.closeAt) < 6e4}">${esc(l)}</button>`).join('');
  $('cWhens').querySelectorAll('[data-w]').forEach(b => b.onclick = () => { sheet.closeAt = +b.dataset.w; $('cClose').value = toLocalInput(sheet.closeAt); drawWhens(); createPreview(); });
}

function draftMarket() {
  const outcomes = sheet.type === 'binary' ? ['Yes', 'No'] : sheet.answers.map(a => a.trim()).filter(Boolean);
  return { id: 'preview', question: $('cQ').value.trim(), details: $('cDetails').value.trim(), outcomes, roundId: sheet.roundId || null,
    closeAt: sheet.closeAt, createdBy: myId(), createdByName: nameOf(myId()), status: 'open', createdAt: Date.now() };
}
function createPreview() {
  const m = draftMarket();
  if (m.outcomes.length < 2) m.outcomes = sheet.answers.map((a, i) => a.trim() || `Answer ${i + 1}`);
  const n = m.outcomes.length, p = Array(n).fill(1 / n);
  $('cPreview').innerHTML = cardHTML(m, { p, q: Array(n).fill(0), history: [{ t: Date.now(), p }], volume: 0, traders: 0, holders: {} }, true);
}

async function submitCreate() {
  const m = draftMarket();
  const err = !m.question || m.question.length < 8 ? 'Write the question (at least a few words).'
    : m.outcomes.length < 2 ? 'Give it at least two answers.'
    : new Set(m.outcomes.map(o => o.toLowerCase())).size !== m.outcomes.length ? 'Two answers are the same.'
    : !(m.closeAt > Date.now() + 5 * 6e4) ? 'Pick a close time at least a few minutes from now.' : '';
  $('cErr').textContent = err;
  if (err) return;
  $('cGo').disabled = true; $('cGo').textContent = 'Opening…';
  try {
    await store.createMarket({ question: m.question, details: m.details, outcomes: m.outcomes, roundId: m.roundId, closeAt: m.closeAt, createdBy: m.createdBy, createdByName: m.createdByName });
    closeSheet();
    filter = 'all'; tab = 'board'; showTab();
    toast('Your market is open');
  } catch (e) { $('cErr').textContent = friendly(e); $('cGo').disabled = false; $('cGo').textContent = 'Open the market'; }
}
$('newBtn').addEventListener('click', openCreate);

// ---------- Bits ----------

function ago(t) {
  const s = (Date.now() - t) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
let toastTimer;
function toast(msg, bad) {
  const t = $('toast');
  t.textContent = msg; t.classList.toggle('bad', !!bad); t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}
async function busy(p, ok) {
  try { await p; if (ok) toast(ok); } catch (e) { toast(friendly(e), true); }
}

function showTab() {
  document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === tab));
  ['board', 'mine', 'leaders'].forEach(k => $(`tab-${k}`).classList.toggle('hidden', k !== tab));
  render();
  window.scrollTo({ top: Math.min(window.scrollY, document.querySelector('.stick').offsetTop) });
}
document.querySelector('.tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { tab = b.dataset.tab; showTab(); } });

$('demoReset').addEventListener('click', () => { if (confirm('Start the practice board over?')) store.reset(); });
$('orgBtn').addEventListener('click', () => {
  if (S?.isOrganizer) return store.signOut().then(() => toast('Signed out'));
  $('orgForm').classList.toggle('hidden');
});
$('orgForm').addEventListener('submit', async e => {
  e.preventDefault();
  $('orgErr').textContent = '';
  try { await store.signIn($('email').value, $('password').value); $('password').value = ''; $('orgForm').classList.add('hidden'); toast('Signed in as organizer'); }
  catch { $('orgErr').textContent = 'Sign-in failed. Check the email and password.'; }
});
function syncOrg() { $('orgBtn').textContent = S.isOrganizer ? `Organizer: ${S.email || 'signed in'} · sign out` : 'Organizer sign-in'; }

// Close times tick by themselves
setInterval(() => { if (S?.ready && !sheet) renderBoard(); }, 30000);
