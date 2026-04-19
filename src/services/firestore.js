import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, addDoc, getDocs, query, orderBy, limit,
  serverTimestamp, onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// ══════════════════════════════════════════════
//  USER PROFILE — CRUD
// ══════════════════════════════════════════════

/** Create user profile on signup */
export async function createUserProfile(uid, data) {
  await setDoc(doc(db, 'users', uid), {
    displayName: data.displayName || '',
    email: data.email || '',
    photoURL: data.photoURL || '',
    location: '',
    totalSavings: 0,
    onboardingComplete: false,
    createdAt: serverTimestamp(),
  });
}

/** Read user profile */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Update user profile fields (creates if missing) */
export async function updateUserProfile(uid, fields) {
  await setDoc(doc(db, 'users', uid), fields, { merge: true });
}

// ══════════════════════════════════════════════
//  FAVORITES — CRUD
// ══════════════════════════════════════════════

/** Add a restaurant to favorites (Create) */
export async function addUserFavorite(uid, restaurantId) {
  await setDoc(doc(db, 'users', uid, 'favorites', restaurantId), {
    restaurantId,
    addedAt: serverTimestamp(),
  });
}

/** Remove a restaurant from favorites (Delete) */
export async function removeUserFavorite(uid, restaurantId) {
  await deleteDoc(doc(db, 'users', uid, 'favorites', restaurantId));
}

/** Read all favorites */
export async function getUserFavorites(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'favorites'));
  return snap.docs.map(d => d.data().restaurantId);
}

/** Real-time listener for favorites */
export function onFavoritesChange(uid, callback) {
  return onSnapshot(collection(db, 'users', uid, 'favorites'), (snap) => {
    callback(snap.docs.map(d => d.data().restaurantId));
  });
}

// ══════════════════════════════════════════════
//  COMPARISON HISTORY — CRUD
// ══════════════════════════════════════════════

/** Save a price comparison (Create) */
export async function addComparisonHistory(uid, entry) {
  await addDoc(collection(db, 'users', uid, 'history'), {
    itemName: entry.itemName,
    restaurantName: entry.restaurantName,
    cheapestPlatform: entry.cheapestPlatform,
    savedAmount: entry.savedAmount,
    prices: entry.prices,
    comparedAt: serverTimestamp(),
  });
}

/** Read comparison history (Read) */
export async function getComparisonHistory(uid) {
  const q = query(
    collection(db, 'users', uid, 'history'),
    orderBy('comparedAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Delete a single history entry (Delete) */
export async function deleteHistoryEntry(uid, historyId) {
  await deleteDoc(doc(db, 'users', uid, 'history', historyId));
}

/** Clear ALL comparison history (Delete) */
export async function clearComparisonHistory(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'history'));
  const deletes = snap.docs.map(d => deleteDoc(d.ref));
  await Promise.all(deletes);
}
