import { create } from 'zustand'
import { onAuthChange } from '../services/auth'
import { getProfile } from '../services/firestore'

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,

  initializeAuth: () => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getProfile(firebaseUser.uid)
          set({ user: firebaseUser, profile, loading: false })
        } catch {
          set({ user: firebaseUser, profile: null, loading: false })
        }
      } else {
        set({ user: null, profile: null, loading: false })
      }
    })
    return unsubscribe
  },

  setProfile: (profile) => set({ profile }),

  updateProfile: (data) =>
    set((s) => ({ profile: s.profile ? { ...s.profile, ...data } : data })),

  clearUser: () => set({ user: null, profile: null, loading: false }),
}))
