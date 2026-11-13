/**
 * Whack-a-Gopher shootout for draft order, kept free of Firebase like draftLogic.js.
 *
 * Before a draft, the captains play on their own phones: one practice run each,
 * then one real round played together. A team's score is its captains' scores
 * added (one captain on Days 1-3, two on the Ryder Cup day). The highest team
 * picks first; tied teams play sudden-death rounds until the tie is broken.
 *
 * On the draft doc (admin writes):
 *   shootout: { stage: 'practice' | 'live', rounds: [{ teamIds, seed, goAt }] }
 *   Round 0 is the real round for every team; later rounds are sudden death.
 * Per captain, drafts/{id}/shootout/{captainId} (the captain's phone writes):
 *   { uid, practice: score | null, runs: { '0': { s, t, taps: [packed taps] }, '1': ... } }
 *   (each tap is one number, ms * 10 + hole: the database can't store lists of pairs)
 * The server replays each run's taps and writes the official score to
 * drafts/{id}/verified/{captainId} { runs: { '0': { s, claimed, t, taps } } }, which
 * phones can't write. Standings use only those (officialShots).
 *
 * The server keeps a copy of this file (TournamentApp/functions/shared/shootout.js);
 * change both together.
 */

export const GAME_MS = 30000;
export const PRACTICE_SEED = 4242;
export const COUNTDOWN_MS = 8000; // from Go to the first gopher, so every phone is ready

/** The same gopher pattern for everyone who plays a round with this seed. */
export function makeSchedule(seed) {
  const r = rng(seed);
  const list = [];
  const busy = Array(9).fill(0);
  let t = 700;
  while (t < GAME_MS - 250) {
    const p = t / GAME_MS;
    const dur = Math.round(1000 - 520 * p + r() * 120);
    let hole;
    let n = 0;
    do { hole = Math.floor(r() * 9); n++; } while (busy[hole] > t && n < 20);
    busy[hole] = t + dur + 150;
    list.push({ t, hole, dur });
    t += Math.round(620 - 360 * p + r() * 120);
  }
  return list;
}

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A tap this soon after a gopher pops up is faster than a person can react, so it
// doesn't count (on the phone or when the server checks the run)
export const MIN_REACT_MS = 100;
const MAX_TAPS = 600;

/** The schedule index of the gopher up in `hole` at `ms` that isn't hit yet, or -1. */
export function gopherAt(sched, hole, ms, hit = new Set()) {
  for (let i = 0; i < sched.length && sched[i].t <= ms; i++) {
    const g = sched[i];
    if (g.hole === hole && ms < g.t + g.dur && !hit.has(i)) return i;
  }
  return -1;
}

/** Whether a tap at `ms` on gopher `i` counts: the gopher is up and it wasn't too fast. */
export const tapCounts = (sched, i, ms) => i >= 0 && ms - sched[i].t >= MIN_REACT_MS;

/** Taps as stored: each [ms since the start, hole] packed into one number, ms * 10 + hole. */
export const packTaps = taps => taps.map(([ms, hole]) => Math.round(ms) * 10 + hole);

/** Stored taps back to [[ms, hole], ...] (pairs are passed through as they are). */
export const unpackTaps = taps => (Array.isArray(taps) ? taps : [])
  .map(x => (typeof x === 'number' ? [Math.floor(x / 10), x % 10] : x));

/**
 * The official score for a run: its taps (packed, or [[ms since the start, hole], ...])
 * played against the round's gophers. Each gopher counts once.
 */
export function scoreTaps(sched, taps) {
  if (!Array.isArray(taps)) return 0;
  const hit = new Set();
  unpackTaps(taps).slice(0, MAX_TAPS)
    .filter(x => Array.isArray(x) && Number.isFinite(x[0]) && Number.isInteger(x[1]) && x[0] >= 0 && x[0] <= GAME_MS)
    .sort((a, b) => a[0] - b[0])
    .forEach(([ms, hole]) => {
      const i = gopherAt(sched, hole, ms, hit);
      if (tapCounts(sched, i, ms)) hit.add(i);
    });
  return hit.size;
}

/** Each captain with only the server-checked runs, for standings. */
export function officialShots(shots, verified) {
  const ids = new Set([...Object.keys(shots || {}), ...Object.keys(verified || {})]);
  return Object.fromEntries([...ids].map(id => [id, { ...(shots?.[id] || {}), runs: verified?.[id]?.runs || {} }]));
}

/** The phone has saved a run in round `r` that the server hasn't checked yet. */
export const checking = (shots, verified, captainId, r) =>
  shots?.[captainId]?.runs?.[r] != null && verified?.[captainId]?.runs?.[r] == null;

/**
 * What should happen next in the shootout once scores change:
 * 'wait' (a round is still being played), 'sudden' (with the tied team ids),
 * 'finish' (with the pick order), or 'none' (practice, or already done).
 */
export function nextStep(draft, shots) {
  if (draft.status !== 'shootout' || draft.shootout?.stage !== 'live') return { type: 'none' };
  const r = currentRound(draft);
  if (r < 0) return { type: 'none' };
  if (waitingOn(draft, shots, r).length) return { type: 'wait' };
  const tie = nextTie(draft, shots);
  if (tie) return { type: 'sudden', teamIds: tie };
  if (isSettled(draft, shots)) return { type: 'finish', order: standings(draft, shots).flat() };
  return { type: 'wait' };
}

export const newSeed = () => Math.floor(Math.random() * 2147483646) + 1;

export const rounds = draft => draft.shootout?.rounds || [];
export const currentRound = draft => rounds(draft).length - 1; // -1 while practising

/** A captain's score in round `r`, or null if they haven't played it. */
export const runScore = (shots, captainId, r) => shots[captainId]?.runs?.[r]?.s ?? null;

/** A team's score in round `r`: its captains' scores added, null until all have played. */
export function teamScore(team, shots, r) {
  let sum = 0;
  for (const id of team.captainIds) {
    const s = runScore(shots, id, r);
    if (s == null) return null;
    sum += s;
  }
  return sum;
}

export const inRound = (draft, teamId, r) => !!rounds(draft)[r]?.teamIds.includes(teamId);

/** Captains in round `r` who haven't played it yet. */
export function waitingOn(draft, shots, r) {
  const round = rounds(draft)[r];
  if (!round) return [];
  return draft.teams
    .filter(t => round.teamIds.includes(t.teamId))
    .flatMap(t => t.captainIds)
    .filter(id => runScore(shots, id, r) == null);
}

/**
 * Teams in finishing order, as groups of team ids: [['team-b'], ['team-a', 'team-d'], ...].
 * A group of more than one is a tie still to be broken. Each round splits only the
 * groups whose teams all played it; teams keep their setup order inside a tie.
 */
export function standings(draft, shots) {
  let groups = [draft.teams.map(t => t.teamId)];
  rounds(draft).forEach((round, r) => {
    groups = groups.flatMap(g => {
      if (g.length < 2 || !g.every(id => round.teamIds.includes(id))) return [g];
      const scored = g.map(id => [id, teamScore(draft.teams.find(t => t.teamId === id), shots, r)]);
      if (scored.some(([, s]) => s == null)) return [g];
      const levels = [...new Set(scored.map(([, s]) => s))].sort((a, b) => b - a);
      return levels.map(v => scored.filter(([, s]) => s === v).map(([id]) => id));
    });
  });
  return groups;
}

/** The first tie still to break once the latest round is finished, or null. */
export function nextTie(draft, shots) {
  const r = currentRound(draft);
  if (r < 0 || waitingOn(draft, shots, r).length) return null;
  return standings(draft, shots).find(g => g.length > 1) || null;
}

/** Every team has its own place. */
export function isSettled(draft, shots) {
  return currentRound(draft) >= 0 && standings(draft, shots).every(g => g.length === 1);
}

/**
 * Rows for the scoreboards, best first: { teamId, place, tied, provisional }.
 * While a round is still being played, the teams waiting on it are listed by
 * score so far with no place yet (provisional), rather than as one big tie.
 */
export function boardRows(draft, shots) {
  const r = currentRound(draft);
  const playing = r >= 0 && waitingOn(draft, shots, r).length > 0;
  const rows = [];
  let place = 1;
  for (const g of standings(draft, shots)) {
    const provisional = playing && g.length > 1 && g.some(id => inRound(draft, id, r));
    const ordered = provisional
      ? [...g].sort((a, b) => (teamScore(team(draft, b), shots, r) ?? -1) - (teamScore(team(draft, a), shots, r) ?? -1))
      : g;
    ordered.forEach(teamId => rows.push({ teamId, place, tied: !provisional && g.length > 1 && r >= 0, provisional }));
    place += g.length;
  }
  return rows;
}

const team = (draft, teamId) => draft.teams.find(t => t.teamId === teamId);
