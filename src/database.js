import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  deleteDoc,
  limit,
  orderBy,
  getDoc,
  getDocs,
  query,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import config from './db_config';

initializeApp(config);
export const db = getFirestore();

//  There are only two hard things in Computer Science: cache invalidation and
//  naming things. -- Phil Karlton

/**
 * Create a new document in the collection 'users' with the given data.
 *
 * @export
 * @param {object} user - The user data to be stored in the database.
 */
export async function createUserData(user) {
  try {
    await setDoc(doc(db, 'users', user.email), user);
  } catch (error) {
    window.alert('error during user creation: ', error.message);
  }
}

/**
 *
 *
 * @export
 * @param {string} email address of the user
 * @returns
 */
export async function getUserDataByEmail(email) {
  // database -> collection -> document
  const docRef = doc(db, 'users', email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  window.alert('No such user data!');
  return null;
}

export async function updateUserState(email, newState) {
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  // database -> collection -> document
  try {
    console.log(email, ' is now ', newState);
    await updateDoc(doc(db, 'users', email), {
      currentState: newState,
    });
  } catch (_e) {
    window.alert('Error updating user state on remote database');
  }
}

export async function addHistory(email, newState) {
  try {
    // database -> collection -> document -> collection
    await addDoc(collection(db, 'users', email, 'history'), {
      date: serverTimestamp(),
      state: newState,
    });
    console.log(`state of ${email} was saved in the database width: ${newState}`);
  } catch (e) {
    window.alert('Error saving user history on remote database');
  }
}

export async function getHistory(email) {
  try {
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const q = query(collection(db, 'users', email, 'history'), orderBy('date', 'desc'), limit(40));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      const data = {
        ...doc.data(),
        id: doc.id,
      };
      result.push(data);
    });
    return result;
  } catch (e) {
    window.alert('Error getting user history from remote database');
  }
}

export async function deleteHistoryById(email, id) {
  try {
    await deleteDoc(doc(db, 'users', email, 'history', id));
  } catch (e) {
    window.alert('Error deleting user history from remote database');
  }
}
