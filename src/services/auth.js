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

const ACTION_CODE_SETTINGS = {
  url: 'https://iadigitall.github.io/FitPro/',
  handleCodeInApp: false,
}

export const signUp = async (email, password, name) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  return credential.user
}

export const sendVerificationEmail = async (user) => {
  await sendEmailVerification(user, ACTION_CODE_SETTINGS)
}

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

export const resetPassword = (email) => sendPasswordResetEmail(auth, email)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export const resendVerificationEmail = (user) =>
  sendEmailVerification(user, ACTION_CODE_SETTINGS)

export const deleteAccount = async (user, password) => {
  const credential = EmailAuthProvider.credential(user.email, password)
  await reauthenticateWithCredential(user, credential)
  await deleteUser(user)
}
