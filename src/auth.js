import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { app } from './database';
const auth = getAuth(app);

export async function signUp(email, password) {
  // a try blockon belüli részben ha hiba van akkor azt a catch blokkban elkaphatjuk
  try {
    // regisztráljuk a user-t az email, password bemeneti paraméterek segítségével
    const auth = getAuth();
    // https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // ha sikerült a regisztráció akkor a signUp fügvény vissza adja a user-t
    return userCredential.user;
  } catch (error) {
    // az error változó a catch blokk-ban létezik, a try-ban létrejött hibát tárolja
    window.alert('error during sign up: ', error.message);
  }
}

export async function signIn(email, password) {
  try {
    const auth = getAuth();
    // https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log('error during sign in', error.message);
    window.alert(error.message);
  }
}

export async function signOutUser() {
  try {
    const auth = getAuth();
    // https://firebase.google.com/docs/reference/js/auth#next_steps
    await signOut(auth);
  } catch (error) {
    window.alert('error during signout: ', error.message);
  }
}

export async function loginStatus() {
  // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error('no user'));
      }
    });
  });
}

export async function resetPassword(email) {
  try {
    // https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    window.alert('Küldünk email-t, benne a további utasításokkal!');
  } catch (e) {
    window.alert('Error during resetpasword email:', e);
  }
}
