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
 *   { uid, practice: score | null, runs: { '0': { s, t }, '1': ... } }
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
