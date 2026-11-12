// Trip planning tracker. Everyone with the page can view (anonymous sign-in);
// only the organizer, signed in with the admin account, can change anything
// (firestore.rules: planning/{taskId}).
//
// planning/{id}: { title, parentId: id | null, order, due: 'YYYY-MM-DD' | '',
//   done, comment, dependsOn: [id], updatedAt, updatedBy }
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getFirestore, collection, doc, onSnapshot, setDoc, updateDoc, writeBatch,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const app = initializeApp({
  apiKey: 'AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0',
  authDomain: 'golf-tournament-app-e2390.firebaseapp.com',
  projectId: 'golf-tournament-app-e2390',
});
const auth = getAuth(app);
const db = getFirestore(app);
const ADMIN_UID = 'GknZy04hB2V8xQdnMmKqy2x24Qu2';
const TRIP_START = '2027-01-06';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const show = (el, on) => el.classList.toggle('hidden', !on);

let tasks = {};          // id -> task
let isAdmin = false;
let filter = 'all';
let editing = null;      // task id being edited, or { new: true, parentId }
const COLLAPSE_KEY = 'naples-planning-collapsed';
let collapsed = new Set();
try { collapsed = new Set(JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '[]')); } catch {}
const saveCollapsed = () => { try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...collapsed])); } catch {} };

// ---------- Tree helpers ----------

const childrenOf = id => Object.values(tasks).filter(t => (t.parentId || null) === id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const descendants = id => childrenOf(id).flatMap(c => [c, ...descendants(c.id)]);
const leavesUnder = id => {
  const kids = childrenOf(id);
  return kids.length ? kids.flatMap(k => leavesUnder(k.id)) : [tasks[id]];
};
// A task with subtasks is done when every subtask is
const isDone = t => (childrenOf(t.id).length ? leavesUnder(t.id).every(l => l.done) : !!t.done);
const today = () => new Date().toISOString().slice(0, 10);
const daysUntil = d => Math.round((Date.parse(d) - Date.parse(today())) / 86400000);
// Earliest open due date in a branch (a parent is due when its first open subtask is)
const dueOf = t => {
  const dates = [t, ...descendants(t.id)].filter(x => !isDone(x) && x.due).map(x => x.due).sort();
  return dates[0] || t.due || '';
};
const blockers = t => (t.dependsOn || []).map(id => tasks[id]).filter(d => d && !isDone(d));
const path = t => (t.parentId && tasks[t.parentId] ? `${path(tasks[t.parentId])} › ` : '') + t.title;
const fmtDate = d => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

function matches(t) {
  if (filter === 'all') return true;
  const branch = [t, ...descendants(t.id)];
  if (filter === 'open') return branch.some(x => !isDone(x));
  if (filter === 'overdue') return branch.some(x => !isDone(x) && x.due && daysUntil(x.due) < 0);
  return true;
}

// ---------- Rendering ----------

function render() {
  const leaves = Object.values(tasks).filter(t => !childrenOf(t.id).length);
  const done = leaves.filter(t => t.done).length;
  $('barFill').style.width = `${leaves.length ? (done / leaves.length) * 100 : 0}%`;
  $('progressText').textContent = leaves.length ? `${done} of ${leaves.length} done` : 'No tasks yet';
  const left = daysUntil(TRIP_START);
  $('countdown').textContent = left > 0 ? `${left} days to go` : left === 0 ? 'Trip starts today' : 'Trip under way';

  const rows = [];
  const walk = (parentId, depth) => {
    childrenOf(parentId).filter(matches).forEach(t => {
      rows.push(rowHtml(t, depth));
      if (childrenOf(t.id).length && !collapsed.has(t.id)) walk(t.id, depth + 1);
    });
  };
  walk(null, 0);
  $('list').innerHTML = rows.join('') || `<div class="empty">${filter === 'all' ? 'No tasks yet.' : 'Nothing here. Nice.'}</div>`;
  show($('addTop'), isAdmin);
  $('foldAll').textContent = collapsed.size ? 'Expand all' : 'Collapse all';
  $('adminBtn').textContent = isAdmin ? 'Sign out' : 'Organizer sign-in';
  const last = Object.values(tasks).map(t => t.updatedAt || '').sort().pop();
  $('foot').textContent = last ? `Last updated ${new Date(last).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : '';
}

function rowHtml(t, depth) {
  const kids = childrenOf(t.id);
  const parent = kids.length > 0;
  const done = isDone(t);
  const due = dueOf(t);
  const d = due ? daysUntil(due) : null;
  const block = blockers(t);
  const leaves = parent ? leavesUnder(t.id) : [];
  const leafDone = leaves.filter(l => l.done).length;
  const pills = [];
  if (!done && d !== null && d < 0) pills.push(`<span class="pill overdue">${-d} day${d === -1 ? '' : 's'} overdue</span>`);
  else if (!done && d !== null && d <= 7) pills.push(`<span class="pill soon">${d === 0 ? 'Due today' : `Due in ${d} day${d === 1 ? '' : 's'}`}</span>`);
  if (!done && block.length) pills.push(`<span class="pill blocked">Waits on ${esc(block.map(b => b.title).join(', '))}</span>`);
  if (parent) pills.push(`<span class="pill count">${leafDone}/${leaves.length}</span>`);
  const box = parent
    ? `<span class="check ${done ? 'done' : 'rollup'}" aria-hidden="true">${done ? '✓' : ''}</span>`
    : isAdmin
      ? `<button class="check ${done ? 'done' : ''}" data-toggle="${t.id}" type="button" aria-label="${done ? 'Mark not done' : 'Mark done'}: ${esc(t.title)}">${done ? '✓' : ''}</button>`
      : `<span class="check ${done ? 'done' : ''}" aria-label="${done ? 'Done' : 'Not done'}">${done ? '✓' : ''}</span>`;
  return `<div class="row ${parent ? 'parent' : ''} ${done ? 'is-done' : ''}" style="padding-left:${12 + depth * 22}px">
    <button class="twisty ${parent ? '' : 'leaf'}" data-twisty="${t.id}" type="button" aria-expanded="${!collapsed.has(t.id)}" aria-label="${collapsed.has(t.id) ? 'Expand' : 'Collapse'} ${esc(t.title)}">${collapsed.has(t.id) ? '▶' : '▼'}</button>
    ${box}
    <div class="body">
      <div class="title">${esc(t.title)}</div>
      <div class="meta">${due ? `<span>📅 ${fmtDate(due)}${parent && !t.due ? ' (next)' : ''}</span>` : ''}${pills.join('')}</div>
      ${t.comment ? `<div class="comment">${esc(t.comment)}</div>` : ''}
    </div>
    ${isAdmin ? `<button class="edit" data-edit="${t.id}" type="button">Edit</button>` : ''}
  </div>`;
}

// ---------- Interactions ----------

$('list').addEventListener('click', e => {
  const tw = e.target.closest('[data-twisty]');
  if (tw) {
    const id = tw.dataset.twisty;
    collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id);
    saveCollapsed(); render(); return;
  }
  const tg = e.target.closest('[data-toggle]');
  if (tg && isAdmin) {
    const t = tasks[tg.dataset.toggle];
    save(t.id, { done: !t.done }); return;
  }
  const ed = e.target.closest('[data-edit]');
  if (ed && isAdmin) openEditor(ed.dataset.edit);
});

document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
  filter = b.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('on', x === b));
  render();
}));
// One button: collapse everything, or expand everything if anything is collapsed
$('foldAll').addEventListener('click', () => {
  collapsed = collapsed.size ? new Set() : new Set(Object.values(tasks).filter(t => childrenOf(t.id).length).map(t => t.id));
  saveCollapsed(); render();
});

async function save(id, fields) {
  try {
    await updateDoc(doc(db, 'planning', id), { ...fields, updatedAt: new Date().toISOString(), updatedBy: auth.currentUser?.email || '' });
  } catch (e) { fail(e); }
}

// ---------- Editor ----------

function openEditor(id, parentId = null) {
  editing = id ? { id } : { new: true, parentId };
  const t = id ? tasks[id] : { title: '', parentId, due: '', done: false, comment: '', dependsOn: [] };
  $('editTitle').textContent = id ? 'Edit task' : parentId ? `New subtask of ${tasks[parentId].title}` : 'New task';
  $('fTitle').value = t.title || '';
  $('fDue').value = t.due || '';
  $('fDone').checked = !!t.done;
  $('fDone').disabled = !!(id && childrenOf(id).length);
  $('fComment').value = t.comment || '';
  // Can't move a task under itself or one of its own subtasks
  const banned = new Set(id ? [id, ...descendants(id).map(x => x.id)] : []);
  const options = [];
  const walk = (pid, depth) => childrenOf(pid).forEach(x => {
    if (banned.has(x.id)) return;
    options.push(`<option value="${x.id}">${'— '.repeat(depth)}${esc(x.title)}</option>`);
    walk(x.id, depth + 1);
  });
  walk(null, 1);
  $('fParent').innerHTML = `<option value="">(top level)</option>${options.join('')}`;
  $('fParent').value = t.parentId || '';
  const deps = new Set(t.dependsOn || []);
  $('fDeps').innerHTML = Object.values(tasks)
    .filter(x => !banned.has(x.id))
    .sort((a, b) => path(a).localeCompare(path(b)))
    .map(x => `<label><input type="checkbox" value="${x.id}" ${deps.has(x.id) ? 'checked' : ''}>${esc(path(x))}</label>`)
    .join('') || '<label>No other tasks yet</label>';
  ['addSubBtn', 'upBtn', 'downBtn', 'deleteBtn'].forEach(b => show($(b), !!id));
  $('editErr').textContent = '';
  show($('editor'), true);
  $('fTitle').focus();
}
const closeEditor = () => { show($('editor'), false); editing = null; };
$('cancelBtn').addEventListener('click', closeEditor);
$('editor').addEventListener('click', e => { if (e.target === $('editor')) closeEditor(); });
$('addTop').addEventListener('click', () => openEditor(null, null));
$('addSubBtn').addEventListener('click', () => { const pid = editing.id; closeEditor(); openEditor(null, pid); });

$('editForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = $('fTitle').value.trim();
  if (!title) { $('editErr').textContent = 'Give the task a name.'; return; }
  const parentId = $('fParent').value || null;
  const fields = {
    title,
    parentId,
    due: $('fDue').value || '',
    comment: $('fComment').value.trim(),
    dependsOn: [...$('fDeps').querySelectorAll('input:checked')].map(i => i.value),
    updatedAt: new Date().toISOString(),
    updatedBy: auth.currentUser?.email || '',
  };
  if (!$('fDone').disabled) fields.done = $('fDone').checked;
  try {
    if (editing.new) {
      const siblings = childrenOf(parentId);
      const ref = doc(collection(db, 'planning'));
      await setDoc(ref, { ...fields, done: !!fields.done, order: (siblings.at(-1)?.order ?? 0) + 1, createdAt: fields.updatedAt });
      if (parentId) { collapsed.delete(parentId); saveCollapsed(); }
    } else {
      const moved = (tasks[editing.id].parentId || null) !== parentId;
      if (moved) fields.order = (childrenOf(parentId).at(-1)?.order ?? 0) + 1;
      await updateDoc(doc(db, 'planning', editing.id), fields);
    }
    closeEditor();
  } catch (err) { $('editErr').textContent = err.message; }
});

async function move(dir) {
  const t = tasks[editing.id];
  const sibs = childrenOf(t.parentId || null);
  const i = sibs.findIndex(s => s.id === t.id);
  const j = i + dir;
  if (j < 0 || j >= sibs.length) return;
  const batch = writeBatch(db);
  // Renumber so the swap is clean even if orders were equal
  const order = sibs.map(s => s.id);
  [order[i], order[j]] = [order[j], order[i]];
  order.forEach((id, k) => batch.update(doc(db, 'planning', id), { order: k + 1 }));
  try { await batch.commit(); } catch (e) { $('editErr').textContent = e.message; }
}
$('upBtn').addEventListener('click', () => move(-1));
$('downBtn').addEventListener('click', () => move(1));

$('deleteBtn').addEventListener('click', async () => {
  const t = tasks[editing.id];
  const kids = descendants(t.id);
  if (!confirm(kids.length ? `Delete "${t.title}" and its ${kids.length} subtask${kids.length === 1 ? '' : 's'}?` : `Delete "${t.title}"?`)) return;
  const gone = new Set([t.id, ...kids.map(k => k.id)]);
  const batch = writeBatch(db);
  gone.forEach(id => batch.delete(doc(db, 'planning', id)));
  // Drop them from anything that waited on them
  Object.values(tasks).filter(x => !gone.has(x.id) && (x.dependsOn || []).some(d => gone.has(d)))
    .forEach(x => batch.update(doc(db, 'planning', x.id), { dependsOn: x.dependsOn.filter(d => !gone.has(d)) }));
  try { await batch.commit(); closeEditor(); } catch (e) { $('editErr').textContent = e.message; }
});

// ---------- Sign-in ----------

$('adminBtn').addEventListener('click', () => {
  if (isAdmin) signOut(auth).catch(fail);
  else { show($('signIn'), true); $('email').focus(); }
});
$('cancelSignIn').addEventListener('click', () => show($('signIn'), false));
$('signInForm').addEventListener('submit', async e => {
  e.preventDefault();
  $('signInErr').textContent = '';
  try {
    await signInWithEmailAndPassword(auth, $('email').value, $('password').value);
    $('password').value = '';
    show($('signIn'), false);
  } catch { $('signInErr').textContent = 'Sign-in failed. Check the email and password.'; }
});

function fail(error) {
  console.error(error);
  $('pageErr').textContent = error?.message || String(error);
}

let unsub = null;
onAuthStateChanged(auth, user => {
  if (!user) { signInAnonymously(auth).catch(fail); return; }
  isAdmin = !user.isAnonymous && user.uid === ADMIN_UID;
  if (!unsub) {
    unsub = onSnapshot(collection(db, 'planning'), snap => {
      tasks = Object.fromEntries(snap.docs.map(d => [d.id, { id: d.id, ...d.data() }]));
      render();
    }, fail);
  }
  render();
});
