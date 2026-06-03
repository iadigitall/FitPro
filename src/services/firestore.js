import {
  doc, setDoc, getDoc, updateDoc,
  collection, addDoc, query, orderBy, getDocs, deleteDoc,
  where, limit
} from 'firebase/firestore'
import { db } from './firebase'

// ── Perfil ──────────────────────────────────────────────
export const saveProfile = (uid, data) =>
  setDoc(doc(db, 'users', uid), data, { merge: true })

export const getProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export const updateUserProfile = (uid, data) =>
  updateDoc(doc(db, 'users', uid), data)

// ── Treinos concluídos ───────────────────────────────────
export const saveWorkoutLog = (uid, data) =>
  addDoc(collection(db, 'users', uid, 'workoutLogs'), {
    ...data,
    createdAt: new Date(),
  })

export const getWorkoutLogs = async (uid) => {
  const q = query(
    collection(db, 'users', uid, 'workoutLogs'),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Evolução / Peso ──────────────────────────────────────
export const saveEvolutionRecord = (uid, data) =>
  addDoc(collection(db, 'users', uid, 'evolution'), {
    ...data,
    createdAt: new Date(),
    dateStr: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  })

export const getEvolutionRecords = async (uid) => {
  const q = query(
    collection(db, 'users', uid, 'evolution'),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const deleteEvolutionRecord = (uid, recordId) =>
  deleteDoc(doc(db, 'users', uid, 'evolution', recordId))

// ── Deletar conta (LGPD) ─────────────────────────────────
export const deleteAllUserData = async (uid) => {
  const logsSnap = await getDocs(collection(db, 'users', uid, 'workoutLogs'))
  await Promise.all(logsSnap.docs.map(d => deleteDoc(d.ref)))

  const evoSnap = await getDocs(collection(db, 'users', uid, 'evolution'))
  await Promise.all(evoSnap.docs.map(d => deleteDoc(d.ref)))

  await deleteDoc(doc(db, 'users', uid))
}

// ── Academias ────────────────────────────────────────────
export const searchGyms = async (term) => {
  if (!term || term.length < 2) return []
  const t = term.toLowerCase()
  const q = query(
    collection(db, 'gyms'),
    where('nameLower', '>=', t),
    where('nameLower', '<=', t + ''),
    limit(6)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
