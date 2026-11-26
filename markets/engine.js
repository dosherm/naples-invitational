// The Prop Board's price engine. No prices or balances are stored anywhere:
// every phone replays the same list of trades (oldest first) and gets the same
// answer, so nobody can type in a better price or a bigger balance.
//
// Prices: a market maker (LMSR, the usual one for prediction markets). Each
// share of an answer pays B$1 if that answer wins. Buying an answer makes its
// shares dearer and the others cheaper; prices across a market's answers always
// add up to B$1, so a price reads as the group's odds (62¢ = 62%).

export const START = 1000;      // Bogey Bucks each player starts with
export const LIQUIDITY = 200;   // higher = prices move less per buck
export const MAX_TRADE = 250;   // per trade (the rules allow up to 500)

// Prices from the shares sold of each answer
export function prices(q, b = LIQUIDITY) {
  const m = Math.max(...q);
  const e = q.map(x => Math.exp((x - m) / b));
  const s = e.reduce((a, x) => a + x, 0);
  return e.map(x => x / s);
}

// Shares that `spend` bucks buy of answer i
export function sharesFor(q, i, spend, b = LIQUIDITY) {
  const p = prices(q, b)[i];
  return b * Math.log(1 + (Math.exp(spend / b) - 1) / p);
}

const time = x => (typeof x === 'number' ? x : x?.toMillis ? x.toMillis() : x ? +new Date(x) : Infinity);

// markets: [{ id, outcomes, status, winner, createdAt, resolvedAt }]
// trades:  [{ id, marketId, playerId, outcome, spend, createdAt }]
// Returns { markets: { id: state }, players: { id: wallet }, trades: { id: fill } }
export function replay(markets, trades) {
  const byId = Object.fromEntries(markets.map(m => [m.id, m]));
  const mk = {};
  for (const m of markets) {
    const n = m.outcomes.length;
    mk[m.id] = {
      q: Array(n).fill(0), volume: 0, traders: new Set(), trades: [],
      history: [{ t: time(m.createdAt), p: prices(Array(n).fill(0)) }],
      holders: {},          // playerId -> { shares: [], spent: [] }
    };
  }
  const wallets = {};
  const wallet = id => (wallets[id] ||= { cash: START, settled: 0, wins: 0, trades: 0 });

  const events = [
    ...trades.filter(t => byId[t.marketId]).map(t => ({ kind: 'trade', t: time(t.createdAt), id: t.id, x: t })),
    ...markets.filter(m => m.status !== 'open').map(m => ({ kind: 'settle', t: time(m.resolvedAt), id: m.id, x: m })),
  ].sort((a, b) => a.t - b.t || (a.kind === b.kind ? (a.id < b.id ? -1 : 1) : a.kind === 'trade' ? -1 : 1));

  const fills = {};
  const settled = new Set();
  for (const e of events) {
    if (e.kind === 'trade') {
      const t = e.x, s = mk[t.marketId], w = wallet(t.playerId);
      const n = s.q.length;
      // A trade the rules should never let in (after close, too big, more than
      // the player has) simply doesn't count
      const ok = !settled.has(t.marketId) && Number.isInteger(t.spend) && t.spend > 0
        && t.spend <= 500 && t.outcome >= 0 && t.outcome < n && t.spend <= w.cash + 1e-9;
      if (!ok) { fills[t.id] = { void: true }; continue; }
      const before = prices(s.q)[t.outcome];
      const shares = sharesFor(s.q, t.outcome, t.spend);
      s.q[t.outcome] += shares;
      const after = prices(s.q);
      w.cash -= t.spend; w.trades++;
      const h = (s.holders[t.playerId] ||= { shares: Array(n).fill(0), spent: Array(n).fill(0) });
      h.shares[t.outcome] += shares; h.spent[t.outcome] += t.spend;
      s.volume += t.spend; s.traders.add(t.playerId);
      s.history.push({ t: e.t, p: after });
      const fill = { shares, avg: t.spend / shares, before, after: after[t.outcome] };
      fills[t.id] = fill;
      s.trades.push({ ...t, ...fill });
    } else {
      const m = e.x, s = mk[m.id];
      settled.add(m.id);
      for (const [pid, h] of Object.entries(s.holders)) {
        const w = wallet(pid);
        const back = m.status === 'void' ? h.spent.reduce((a, x) => a + x, 0)
          : m.status === 'resolved' ? h.shares[m.winner] || 0 : 0;
        const spent = h.spent.reduce((a, x) => a + x, 0);
        w.cash += back;
        w.settled += back - spent;
        if (m.status === 'resolved' && back > spent) w.wins++;
      }
    }
  }

  // What each player's open shares are worth at today's prices
  for (const [id, s] of Object.entries(mk)) {
    s.p = prices(s.q);
    s.traders = s.traders.size;
    if (settled.has(id)) continue;
    for (const [pid, h] of Object.entries(s.holders)) {
      const w = wallet(pid);
      w.open = (w.open || 0) + h.shares.reduce((a, x, i) => a + x * s.p[i], 0);
    }
  }
  for (const w of Object.values(wallets)) { w.open ||= 0; w.total = w.cash + w.open; }
  return { markets: mk, players: wallets, trades: fills, wallet };
}

// What a trade would get right now (before it's sent)
export function quote(q, i, spend) {
  const shares = sharesFor(q, i, spend);
  const next = q.slice(); next[i] += shares;
  return { shares, avg: spend / shares, after: prices(next)[i], payout: shares };
}
