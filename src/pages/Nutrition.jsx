import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils, Clock, ChefHat, Zap, CheckCircle2, Coffee, Moon, Apple } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUserStore } from '../store/userStore'
import { calculateTMB, calculateTDEE, calculateTargets, generateDayMealPlan, getPostWorkoutMessage } from '../services/nutrition'
import { getWorkoutForDay } from '../data/workoutPlans'

const MEAL_TIME_LABELS = {
  cafe:   { label: 'Café da Manhã', Icon: Coffee,   color: '#FFA502' },
  almoco: { label: 'Almoço',        Icon: Utensils, color: '#3498DB' },
  lanche: { label: 'Lanche',        Icon: Apple,    color: '#dce8ff' },
  janta:  { label: 'Jantar',        Icon: Moon,     color: '#9B59B6' },
}

function CircularProgress({ value, max, label, color, unit = 'g', size = 80 }) {
  const r = 32
  const circ = 2 * Math.PI * r
  const filled = Math.min((value / max) * circ, circ)
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#2A2A2A" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r}
          fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text x="36" y="33" textAnchor="middle" fontSize="11" fill="#F0F0F0" fontWeight="800">{value}</text>
        <text x="36" y="44" textAnchor="middle" fontSize="8" fill="#888888">{unit}</text>
      </svg>
      <span className="text-muted text-[10px] font-medium text-center leading-tight">{label}</span>
    </div>
  )
}

function MealCard({ meal, checked, onToggle }) {
  const timeInfo = MEAL_TIME_LABELS[meal.mealTime] || MEAL_TIME_LABELS.lanche
  return (
    <div
      onClick={onToggle}
      className={`rounded-2xl border p-4 cursor-pointer transition-all active:scale-[0.99] ${
        checked
          ? 'border-primary/40 bg-primary/5'
          : 'border-border bg-surface-2 hover:border-border/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className={`text-sm font-semibold ${checked ? 'text-text line-through opacity-60' : 'text-text'}`}>
            {meal.name}
          </p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-warning text-xs font-bold">{meal.calories} kcal</span>
            <span className="text-muted text-xs">{meal.prep}</span>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="text-muted text-xs">P: <span className="text-primary">{meal.protein}g</span></span>
            <span className="text-muted text-xs">C: <span className="text-blue-400">{meal.carbs}g</span></span>
            <span className="text-muted text-xs">G: <span className="text-yellow-400">{meal.fats}g</span></span>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          checked ? 'border-primary bg-primary' : 'border-border'
        }`}>
          {checked && (
            <svg viewBox="0 0 10 8" className="w-3 h-3" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      {meal.ingredients && (
        <div className="mt-2 flex flex-wrap gap-1">
          {meal.ingredients.slice(0, 3).map((ing, i) => (
            <span key={i} className="text-[10px] bg-surface-3 text-muted px-2 py-0.5 rounded-full">{ing}</span>
          ))}
          {meal.ingredients.length > 3 && (
            <span className="text-[10px] bg-surface-3 text-muted px-2 py-0.5 rounded-full">+{meal.ingredients.length - 3}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default function Nutrition() {
  const { profile } = useAuthStore()
  const { completedDays } = useUserStore()
  const [checkedMeals, setCheckedMeals] = useState({})

  const today = new Date()
  const todayIndex = today.getDay()
  const todayKey = today.toISOString().split('T')[0]

  const targets = useMemo(() => {
    if (!profile) return null
    const tmb = calculateTMB(profile)
    const tdee = calculateTDEE(tmb, profile.frequency || 4)
    return calculateTargets(tdee, profile.goal, profile.weight)
  }, [profile])

  const mealPlan = useMemo(() => {
    if (!profile || !targets) return null
    return generateDayMealPlan(profile.goal, todayIndex, targets, profile.dietaryRestrictions || [])
  }, [profile, targets, todayIndex])

  const consumed = useMemo(() => {
    if (!mealPlan) return { calories: 0, protein: 0, carbs: 0, fats: 0 }
    return mealPlan.meals.reduce((acc, m) => {
      if (!checkedMeals[m.id]) return acc
      return {
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fats: acc.fats + m.fats,
      }
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 })
  }, [mealPlan, checkedMeals])

  const todayWorkout = useMemo(() => {
    if (!profile?.goal) return null
    return getWorkoutForDay(profile.goal, todayIndex)
  }, [profile, todayIndex])

  const isWorkoutDone = completedDays[todayKey]

  const postWorkoutMsg = useMemo(() => {
    if (!isWorkoutDone || !todayWorkout || !profile?.goal) return null
    return getPostWorkoutMessage(todayWorkout.group, profile.goal)
  }, [isWorkoutDone, todayWorkout, profile])

  const mealsByTime = useMemo(() => {
    if (!mealPlan) return {}
    const grouped = {}
    mealPlan.meals.forEach(m => {
      if (!grouped[m.mealTime]) grouped[m.mealTime] = []
      grouped[m.mealTime].push(m)
    })
    return grouped
  }, [mealPlan])

  const toggleMeal = (id) => setCheckedMeals(prev => ({ ...prev, [id]: !prev[id] }))

  if (!profile || !targets) {
    return (
      <div className="min-h-full bg-bg flex items-center justify-center">
        <p className="text-muted">Carregando plano nutricional...</p>
      </div>
    )
  }

  return (
    <div className="min-h-full pb-4">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <p className="text-muted text-sm font-medium mb-0.5 capitalize">{profile.goal}</p>
        <h1 className="text-text text-3xl font-bold tracking-tight">Nutrição</h1>
      </div>

      {/* Macro Summary */}
      <div className="mx-4 card-glass rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-text text-sm font-semibold">Meta do dia</p>
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-warning" />
            <span className="text-warning text-sm font-bold">{targets.calories} kcal</span>
          </div>
        </div>
        <div className="flex justify-around">
          <CircularProgress value={consumed.protein}  max={targets.protein} label="Proteína"    color="#dce8ff" />
          <CircularProgress value={consumed.carbs}    max={targets.carbs}   label="Carboidratos" color="#3498DB" />
          <CircularProgress value={consumed.fats}     max={targets.fats}    label="Gorduras"     color="#FFA502" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-20 h-20 rounded-full border-4 border-surface-3 flex flex-col items-center justify-center"
              style={{ borderColor: consumed.calories >= targets.calories ? '#dce8ff' : '#2A2A2A' }}>
              <p className="text-text text-xs font-bold">{consumed.calories}</p>
              <p className="text-muted text-[9px]">de {targets.calories}</p>
            </div>
            <span className="text-muted text-[10px] font-medium">Calorias</span>
          </div>
        </div>
      </div>

      {/* Post-Workout Banner */}
      {postWorkoutMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 bg-primary/10 border border-primary/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-primary font-bold text-sm mb-1">Recomendação pós-treino</p>
              <p className="text-muted text-xs leading-relaxed">{postWorkoutMsg}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Meal Plan */}
      <div className="px-4 space-y-5">
        {['cafe', 'almoco', 'lanche', 'janta'].map((time) => {
          const timeMeals = mealsByTime[time]
          if (!timeMeals?.length) return null
          const info = MEAL_TIME_LABELS[time]
          return (
            <div key={time}>
              <div className="flex items-center gap-2 mb-3">
                <info.Icon size={16} style={{ color: info.color }} />
                <h3 className="text-text font-semibold text-sm">{info.label}</h3>
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted text-xs">
                  {timeMeals.reduce((s, m) => s + m.calories, 0)} kcal
                </span>
              </div>
              {timeMeals.length > 1 && (
                <p style={{ color: 'rgba(220,232,255,0.5)', fontSize: 11, fontWeight: 600,
                  marginBottom: 8, letterSpacing: '0.02em' }}>
                  Escolha 1 opção abaixo
                </p>
              )}
              <div className="space-y-0">
                {timeMeals.map((meal, i) => (
                  <div key={meal.id}>
                    <MealCard
                      meal={meal}
                      checked={!!checkedMeals[meal.id]}
                      onToggle={() => toggleMeal(meal.id)}
                    />
                    {i < timeMeals.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                        <span style={{
                          background: 'rgba(220,232,255,0.07)',
                          border: '1px solid rgba(220,232,255,0.18)',
                          color: 'rgba(220,232,255,0.55)',
                          fontSize: 10, fontWeight: 700,
                          padding: '4px 14px', borderRadius: 20,
                          letterSpacing: '0.12em',
                        }}>
                          OU
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Footer note */}
        <div className="bg-surface-2 border border-border rounded-2xl p-4 flex items-start gap-3">
          <ChefHat size={18} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-text text-xs font-semibold mb-1">Como usar</p>
            <p className="text-muted text-xs leading-relaxed">
              Marque as refeições conforme for consumindo. O plano é gerado automaticamente com base no seu objetivo, peso e treino do dia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
