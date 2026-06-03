import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDcWMGVCW0rOf9rd1n7FND5TO6vq42s_js",
  authDomain: "fitpro-web.firebaseapp.com",
  projectId: "fitpro-web",
  storageBucket: "fitpro-web.firebasestorage.app",
  messagingSenderId: "919773194671",
  appId: "1:919773194671:web:e505c3de72d6967197e75a"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
