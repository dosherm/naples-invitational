// Google's clock, so "Go" lands on every phone at the same moment. Phone clocks
// can be seconds apart; each phone stamps clock/{its uid} with the server's time,
// keeps the reading with the quickest round trip, and works out its offset.
import { doc, getDocFromServer, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

let offset = 0;
let synced = false;

/** Milliseconds on Google's clock (this phone's clock until the first sync). */
export const now = () => Date.now() + offset;
export const isSynced = () => synced;

export async function syncClock(db, uid, tries = 3) {
  let best = null;
  for (let i = 0; i < tries; i++) {
    try {
      const ref = doc(db, 'clock', uid);
      const sent = Date.now();
      await setDoc(ref, { t: serverTimestamp() });
      const acked = Date.now();
      const server = (await getDocFromServer(ref)).data()?.t?.toMillis?.();
      if (!server) continue;
      // The stamp was taken somewhere in the round trip; assume the middle
      const reading = { rtt: acked - sent, offset: server - (sent + acked) / 2 };
      if (!best || reading.rtt < best.rtt) best = reading;
    } catch (e) {
      console.warn('Clock sync failed:', e);
    }
  }
  if (best) { offset = best.offset; synced = true; }
  return best;
}
