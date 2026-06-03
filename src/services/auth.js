import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { auth } from './firebase'

export const signUp = async (email, password, name) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  await sendEmailVerification(credential.user)
  return credential.user
}

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

export const resetPassword = (email) => sendPasswordResetEmail(auth, email)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export const resendVerificationEmail = (user) => sendEmailVerification(user)

export const deleteAccount = async (user, password) => {
  const credential = EmailAuthProvider.credential(user.email, password)
  await reauthenticateWithCredential(user, credential)
  await deleteUser(user)
}
