import { create } from 'zustand'

export const useUserStore = create((set) => ({
  profile: null,
  weightLogs: [],
  completedDays: {},
  skippedDays: {},
  waterCups: 0,
  celebration: null,
  celebrate: (type) => set({ celebration: type }),
  clearCelebration: () => set({ celebration: null }),

  setProfile: (profile) => set({ profile }),
  updateProfile: (data) => set((s) => ({ profile: { ...s.profile, ...data } })),

  setWeightLogs: (weightLogs) => set({ weightLogs }),
  addWeightLog: (log) => set((s) => ({ weightLogs: [...s.weightLogs, log] })),

  markDayDone: (day) =>
    set((s) => ({
      completedDays: { ...s.completedDays, [day]: true },
      skippedDays: Object.fromEntries(
        Object.entries(s.skippedDays).filter(([k]) => k !== day)
      ),
    })),

  markDaySkipped: (day, reason, details) =>
    set((s) => ({
      skippedDays: { ...s.skippedDays, [day]: { reason, details } },
      completedDays: Object.fromEntries(
        Object.entries(s.completedDays).filter(([k]) => k !== day)
      ),
    })),

  resetDay: (day) =>
    set((s) => ({
      completedDays: Object.fromEntries(
        Object.entries(s.completedDays).filter(([k]) => k !== day)
      ),
      skippedDays: Object.fromEntries(
        Object.entries(s.skippedDays).filter(([k]) => k !== day)
      ),
    })),

  setWater: (waterCups) => set({ waterCups }),
  addWater: () => set((s) => {
    const next = Math.min(s.waterCups + 1, 16)
    return { waterCups: next, ...(next === 8 && s.waterCups < 8 ? { celebration: 'water_complete' } : {}) }
  }),
  resetWater: () => set({ waterCups: 0 }),

  reset: () =>
    set({ profile: null, weightLogs: [], completedDays: {}, skippedDays: {}, waterCups: 0 }),
}))
