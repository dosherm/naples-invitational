// Replays a captain's Whack-a-Gopher run on the draft board: the round's gophers
// (rebuilt from its seed) and the captain's own taps as the server checked them.
import { GAME_MS, makeSchedule, gopherAt, tapCounts, unpackTaps } from './shootout.js?v=20261113b';

/** Every tap as { ms, hole, gopher (schedule index or -1), hit }, in time order. */
export function replayEvents(sched, taps) {
  const hit = new Set();
  return unpackTaps(taps)
    .filter(x => Array.isArray(x) && Number.isFinite(x[0]) && Number.isInteger(x[1]))
    .sort((a, b) => a[0] - b[0])
    .map(([ms, hole]) => {
      const g = gopherAt(sched, hole, ms, hit);
      const ok = tapCounts(sched, g, ms);
      if (ok) hit.add(g);
      return { ms, hole, gopher: ok ? g : -1, hit: ok };
    });
}

/**
 * Play the run inside `el` (the replay dialog's body). Returns stop().
 * Speed 1 is real time (30 seconds); 2 or 4 to hurry it along.
 */
export function playReplay(el, { seed, taps, speed = 1 }) {
  const sched = makeSchedule(seed);
  const events = replayEvents(sched, taps);
  const hitAt = new Map(events.filter(e => e.hit).map(e => [e.gopher, e.ms]));
  const cells = [...el.querySelectorAll('.rcell')];
  const scoreEl = el.querySelector('.rscore');
  const timeEl = el.querySelector('.rtime');
  let start = performance.now();
  let raf = 0;

  const draw = t => {
    const ms = Math.min(GAME_MS, (t - start) * speed);
    const up = new Set();
    for (let i = 0; i < sched.length && sched[i].t <= ms; i++) {
      const g = sched[i];
      const gone = hitAt.has(i) ? hitAt.get(i) : g.t + g.dur;
      if (ms < gone) up.add(g.hole);
    }
    const recent = events.filter(e => e.ms <= ms && ms - e.ms < 350);
    cells.forEach((c, hole) => {
      const flash = recent.find(e => e.hole === hole);
      c.textContent = flash?.hit ? '💥' : up.has(hole) ? '🐹' : flash ? '·' : '';
      c.classList.toggle('miss', !!flash && !flash.hit);
    });
    scoreEl.textContent = String(events.filter(e => e.hit && e.ms <= ms).length);
    timeEl.textContent = String(Math.max(0, Math.ceil((GAME_MS - ms) / 1000)));
    if (ms < GAME_MS) raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}
