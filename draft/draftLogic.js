/**
 * Draft rules, kept free of Firebase so they can be tested on their own.
 *
 * A draft splits the field into teams that each hold the same number of players
 * from every flight (A-D):
 *   - "teams":  4 teams of 4, one captain each, one player per flight (Days 1-3)
 *   - "ryder":  2 sides of 8, two captains each, two players per flight (Day 4)
 * Captains count toward their own flight and can't be picked. Picks run in a
 * snake: 1-2-3-4-4-3-2-1 ...
 */

export const FLIGHTS = ['A', 'B', 'C', 'D'];

export const FORMATS = {
  teams: { label: '4 teams of 4', teamCount: 4, captainsPerTeam: 1 },
  ryder: { label: 'Ryder Cup: 2 sides of 8', teamCount: 2, captainsPerTeam: 2 },
};

/** Players on a team: its captains, then its picks in order. */
export function teamMembers(draft, teamId) {
  const team = draft.teams.find(t => t.teamId === teamId);
  const picked = draft.picks.filter(p => p.teamId === teamId).map(p => p.playerId);
  return [...(team?.captainIds || []), ...picked];
}

/** How many players each team takes from each flight. */
export function perFlight(draft) {
  return Object.keys(draft.players).length / FLIGHTS.length / draft.teams.length;
}

export function totalPicks(draft) {
  const captains = draft.teams.reduce((n, t) => n + t.captainIds.length, 0);
  return Object.keys(draft.players).length - captains;
}

export function isComplete(draft) {
  return draft.picks.length >= totalPicks(draft);
}

/** The team whose turn it is for pick number `pickIndex` (0-based), snake order. */
export function teamOnClock(draft, pickIndex = draft.picks.length) {
  if (pickIndex >= totalPicks(draft)) return null;
  const count = draft.teams.length;
  const round = Math.floor(pickIndex / count);
  const slot = pickIndex % count;
  return draft.teams[round % 2 === 0 ? slot : count - 1 - slot];
}

/** Captains and picked players. */
export function takenIds(draft) {
  return new Set([...draft.teams.flatMap(t => t.captainIds), ...draft.picks.map(p => p.playerId)]);
}

/** Why `teamId` can't take `playerId` right now, or null if it can. */
export function pickProblem(draft, teamId, playerId) {
  const player = draft.players[playerId];
  if (!player) return 'Not in this draft';
  if (takenIds(draft).has(playerId)) return 'Already on a team';
  const have = teamMembers(draft, teamId).filter(id => draft.players[id].flight === player.flight).length;
  if (have >= perFlight(draft)) return `Team already has its Flight ${player.flight}`;
  return null;
}

/** Problems with flights and captains before a draft can start; empty when ready. */
export function setupProblems(players, format, captainsByTeam) {
  const problems = [];
  const ids = Object.keys(players);
  const { teamCount, captainsPerTeam } = FORMATS[format];
  if (ids.length === 0 || ids.length % (FLIGHTS.length * teamCount) !== 0) {
    problems.push(`${ids.length} players can't be split into ${teamCount} teams with equal flights`);
    return problems;
  }
  const flightSize = ids.length / FLIGHTS.length;
  FLIGHTS.forEach(f => {
    const n = ids.filter(id => players[id].flight === f).length;
    if (n !== flightSize) problems.push(`Flight ${f} has ${n} players; it needs ${flightSize}`);
  });
  const quota = flightSize / teamCount;
  const allCaptains = captainsByTeam.flat().filter(Boolean);
  captainsByTeam.forEach((captains, i) => {
    const chosen = captains.filter(Boolean);
    if (chosen.length !== captainsPerTeam) {
      problems.push(`Team ${i + 1} needs ${captainsPerTeam === 1 ? 'a captain' : `${captainsPerTeam} captains`}`);
    }
    FLIGHTS.forEach(f => {
      if (chosen.filter(id => players[id]?.flight === f).length > quota) {
        problems.push(`Team ${i + 1} has more than ${quota} Flight ${f} captain${quota === 1 ? '' : 's'}`);
      }
    });
  });
  if (new Set(allCaptains).size !== allCaptains.length) problems.push('A player is captain of two teams');
  return problems;
}

/**
 * The round's playing groups once the draft is done.
 * - teams: each team is a foursome, listed A, B, C, D
 * - ryder: one fourball match per flight, the two A's of each side together, and so on
 * `newId` makes a Firestore auto id for each group.
 */
export function groupsFromDraft(draft, newId) {
  const byFlight = ids => [...ids].sort(
    (a, b) => FLIGHTS.indexOf(draft.players[a].flight) - FLIGHTS.indexOf(draft.players[b].flight)
  );
  if (draft.format === 'ryder') {
    return FLIGHTS.map((flight, i) => {
      const sides = {};
      draft.teams.forEach(t => {
        sides[t.teamId] = teamMembers(draft, t.teamId).filter(id => draft.players[id].flight === flight);
      });
      return {
        groupId: newId(),
        groupNumber: i + 1,
        name: `Flight ${flight} match`,
        players: draft.teams.flatMap(t => sides[t.teamId]),
        sides,
      };
    });
  }
  return draft.teams.map((t, i) => ({
    groupId: newId(),
    groupNumber: i + 1,
    name: t.name,
    players: byFlight(teamMembers(draft, t.teamId)),
  }));
}

/** Default flights: rank by handicap index, best four are A, next four B, ... */
export function flightsByHandicap(ids, handicapOf) {
  const ranked = [...ids].sort((a, b) => (handicapOf(a) ?? 99) - (handicapOf(b) ?? 99));
  const size = ranked.length / FLIGHTS.length;
  const flights = {};
  ranked.forEach((id, i) => { flights[id] = FLIGHTS[Math.min(Math.floor(i / size), FLIGHTS.length - 1)]; });
  return flights;
}
