/**
 * Promotion and relegation ("the Open System"), kept free of Firebase so it can be
 * tested on its own. Rules from the Naples page:
 *
 * - Each flight is ranked by individual net score for the day (lowest is best)
 * - Best in B, C and D move up one flight; worst in A, B and C move down one;
 *   all swaps happen at the same time
 * - Ties: scorecard countback from hole 18 (back 9, back 6, back 3, back 1)
 * - Next day's captains: the players relegated from A, B and C, plus last in D
 * - After Day 3: Flight B (after that day's moves) ranked by Day 3 individual
 *   net; 1st & 4th captain one Ryder Cup side, 2nd & 3rd the other
 */

import { FLIGHTS } from './draftLogic.js';

/** Strokes received on a hole (same rule as the app's utils/games/netScores.js). */
export function strokesOnHole(playingHandicap, holeHandicap) {
  const ph = Math.round(playingHandicap || 0);
  if (!ph || !holeHandicap) return 0;
  // Plus handicap: gives a stroke back on each of the easiest holes (e.g. +1 on stroke index 18)
  if (ph < 0) return holeHandicap > 18 + ph ? -1 : 0;
  if (holeHandicap <= ph - 18) return 2;
  return holeHandicap <= ph ? 1 : 0;
}

/** Net score on each of 18 holes from gross scores, course handicap and stroke indexes. */
export function netHoles(gross, courseHandicap, holeHandicaps) {
  return gross.map((g, i) => g - strokesOnHole(courseHandicap, holeHandicaps[i]));
}

const sum = (a, from = 0) => a.slice(from).reduce((s, x) => s + x, 0);

// Total, then countback from 18: back 9, back 6, back 3, back 1
const COUNTBACK = [['18 holes', 0], ['back 9', 9], ['back 6', 12], ['back 3', 15], ['18th', 17]];

/**
 * Rank players best to worst. `holes` maps playerId -> 18 numbers.
 * Returns [{ playerId, total, tiedWith: [...], decidedBy }] where decidedBy says
 * which countback step separated a player from the next one ('' when not tied).
 */
export function rank(playerIds, holes, { higherIsBetter = false } = {}) {
  const keys = id => COUNTBACK.map(([, from]) => sum(holes[id], from));
  const cmp = (a, b) => {
    const ka = keys(a), kb = keys(b);
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return higherIsBetter ? kb[i] - ka[i] : ka[i] - kb[i];
    }
    return 0;
  };
  const sorted = [...playerIds].sort(cmp);
  return sorted.map((id, i) => {
    const neighbours = [sorted[i - 1], sorted[i + 1]].filter(Boolean);
    const tiedWith = neighbours.filter(o => cmp(id, o) === 0);
    // Which step broke a tie on the total with a neighbour
    let decidedBy = '';
    for (const o of neighbours) {
      if (sum(holes[o]) !== sum(holes[id]) || cmp(id, o) === 0) continue;
      const ka = keys(id), kb = keys(o);
      const step = COUNTBACK.findIndex((_, s) => ka[s] !== kb[s]);
      decidedBy = `countback (${COUNTBACK[step][0]})`;
    }
    return { playerId: id, total: sum(holes[id]), tiedWith, decidedBy };
  });
}

/**
 * The day's moves. `flights` maps playerId -> 'A'..'D' for the round played;
 * `net` maps playerId -> 18 net hole scores.
 * Returns { standings: { A: rank(...), ... }, moves: [...], nextFlights, captains, unresolved }.
 * `unresolved` lists flights where countback couldn't separate the player who moves.
 */
export function openSystem(flights, net) {
  const standings = {};
  FLIGHTS.forEach(f => {
    standings[f] = rank(Object.keys(flights).filter(id => flights[id] === f), net);
  });
  const moves = [];
  const unresolved = [];
  const best = f => standings[f][0];
  const worst = f => standings[f][standings[f].length - 1];
  FLIGHTS.forEach((f, i) => {
    if (i > 0) {
      const p = best(f);
      if (p.tiedWith.length) unresolved.push(`Best in ${f}`);
      moves.push({ playerId: p.playerId, from: f, to: FLIGHTS[i - 1], reason: `best net in ${f}`, net: p.total, decidedBy: p.decidedBy });
    }
    if (i < FLIGHTS.length - 1) {
      const p = worst(f);
      if (p.tiedWith.length) unresolved.push(`Worst in ${f}`);
      moves.push({ playerId: p.playerId, from: f, to: FLIGHTS[i + 1], reason: `worst net in ${f}`, net: p.total, decidedBy: p.decidedBy });
    }
  });
  const nextFlights = { ...flights };
  moves.forEach(m => { nextFlights[m.playerId] = m.to; });
  const lastD = worst('D');
  if (lastD.tiedWith.length) unresolved.push('Last in D');
  const captains = [
    ...['A', 'B', 'C'].map(f => moves.find(m => m.from === f && m.reason.startsWith('worst')).playerId),
    lastD.playerId,
  ];
  return { standings, moves, nextFlights, captains, unresolved };
}

/** Ryder Cup captain pairs: Flight B after the day's moves, ranked by the day's net (lowest first). */
export function ryderCaptains(nextFlights, net) {
  const bs = Object.keys(nextFlights).filter(id => nextFlights[id] === 'B');
  const ranked = rank(bs, net);
  const ids = ranked.map(r => r.playerId);
  return { ranked, pairs: [[ids[0], ids[3]], [ids[1], ids[2]]] };
}
