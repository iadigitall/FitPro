import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell, Utensils, TrendingUp, LogOut, Droplets, Flame, Check, ChevronRight, Activity } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUserStore } from '../store/userStore'
import { logOut } from '../services/auth'
import { getWorkoutForDay, getDayName, isRestDay } from '../data/workoutPlans'
import { calculateTMB, calculateTDEE, calculateTargets } from '../services/nutrition'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function MacroRing({ value, max, label, color = '#dce8ff', size = 60 }) {
  const r = 22
  const circumference = 2 * Math.PI * r
  const filled = Math.min((value / max) * circumference, circumference)
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="25" cy="25" r={r}
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 25 25)"
          style={{ transition: 'stroke-dasharray 0.6s ease', filter: `drop-shadow(0 0 4px ${color}60)` }}
        />
        <text x="25" y="29" textAnchor="middle" fontSize="9" fill="#F0F0F0" fontWeight="700">
          {value}g
        </text>
      </svg>
      <span className="text-muted text-[10px]">{label}</span>
    </div>
  )
}

function WeekDot({ dayName, workout, completed, isToday }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 transition-opacity ${isToday ? 'opacity-100' : 'opacity-50'}`}>
      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all ${
        completed
          ? 'text-white'
          : workout && isToday
          ? 'border border-primary/60 text-primary'
          : workout
          ? 'bg-surface-3 text-muted'
          : 'bg-surface-2 text-subtle'
      }`}
        style={completed ? {
          background: 'linear-gradient(135deg, #1a52f5, #0f3bc0)',
          boxShadow: '0 2px 12px rgba(20,74,224,0.4)'
        } : {}}
      >
        {completed ? <Check size={12} strokeWidth={3} /> : dayName[0]}
      </div>
      <span className={`text-[9px] font-semibold ${isToday ? 'text-primary' : 'text-muted'}`}>
        {dayName}
      </span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, profile } = useAuthStore()
  const { completedDays, waterCups, addWater } = useUserStore()

  const today = new Date()
  const todayIndex = today.getDay()
  const todayKey = today.toISOString().split('T')[0]

  const todayWorkout = useMemo(() => {
    if (!profile?.goal) return null
    return getWorkoutForDay(profile.goal, todayIndex)
  }, [profile, todayIndex])

  const nutritionTargets = useMemo(() => {
    if (!profile) return null
    const tmb = calculateTMB(profile)
    const tdee = calculateTDEE(tmb, profile.frequency || 4)
    return calculateTargets(tdee, profile.goal, profile.weight)
  }, [profile])

  const isWorkoutDone = completedDays[todayKey]
  const weekCompleted = [1, 2, 3, 4, 5].filter(d => {
    const date = new Date(today)
    date.setDate(today.getDate() - today.getDay() + d)
    return completedDays[date.toISOString().split('T')[0]]
  }).length

  const frequency = profile?.frequency || 5
  const adherencePercent = Math.round((weekCompleted / frequency) * 100)

  const streak = useMemo(() => {
    let count = 0
    const cursor = new Date(today)
    // Começa de ontem (se hoje ainda não foi feito) ou hoje
    if (!completedDays[todayKey]) cursor.setDate(cursor.getDate() - 1)
    for (let i = 0; i < 90; i++) {
      const key = cursor.toISOString().split('T')[0]
      const dayOfWeek = cursor.getDay()
      // Pula fins de semana (não contam como "dia perdido")
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        cursor.setDate(cursor.getDate() - 1)
        continue
      }
      if (completedDays[key]) {
        count++
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }
    return count
  }, [completedDays, todayKey])

  const firstName = profile?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Atleta'

  return (
    <div className="min-h-full pb-4">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 mb-8">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{
              background: profile?.photoURL ? 'transparent' : 'linear-gradient(135deg, #1a52f5 0%, #0a2fa8 100%)',
              boxShadow: '0 4px 16px rgba(20,74,224,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
              overflow: 'hidden',
            }}
          >
            {profile?.photoURL
              ? <img src={profile.photoURL} alt="avatar" className="w-full h-full object-cover" />
              : firstName[0]?.toUpperCase()
            }
          </div>
          <div>
            <p className="text-muted text-xs font-medium leading-none mb-1">{greeting()}</p>
            <h1 className="text-text text-xl font-bold tracking-tight leading-none uppercase">{firstName}</h1>
            {profile?.goal && (
              <span
                className="inline-block text-[10px] font-semibold capitalize mt-1.5 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(220,232,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {profile.goal}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => logOut()}
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-muted hover:text-danger transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Hero Workout Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/workout')}
        id="tour-hero"
        className="mx-4 rounded-3xl mb-4 cursor-pointer overflow-hidden active:scale-[0.985] transition-transform"
        style={{
          background: 'linear-gradient(135deg, #071840 0%, #1444c8 60%, #091428 100%)',
          boxShadow: '0 12px 48px rgba(20,74,224,0.45), 0 2px 8px rgba(0,0,0,0.6)'
        }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <p className="text-blue-200/50 text-[11px] font-bold uppercase tracking-widest mb-2">
                Treino de hoje
              </p>
              <h2 className="text-white text-[22px] font-bold leading-tight">
                {todayWorkout
                  ? todayWorkout.name
                  : isRestDay(profile?.goal, todayIndex)
                  ? 'Dia de Descanso'
                  : 'Ver Plano'}
              </h2>
              {todayWorkout && (
                <p className="text-blue-200/40 text-sm mt-1">{todayWorkout.group}</p>
              )}
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ml-3"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {isWorkoutDone
                ? <Check size={22} className="text-white" strokeWidth={2.5} />
                : <Dumbbell size={22} className="text-white" />
              }
            </div>
          </div>

          {todayWorkout ? (
            <div className="flex gap-2 flex-wrap">
              <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}
                className="text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                {todayWorkout.duration} min
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}
                className="text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                {todayWorkout.exercises.length} exercícios
              </span>
              {isWorkoutDone && (
                <span style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.2)' }}
                  className="text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Concluído
                </span>
              )}
            </div>
          ) : (
            <p className="text-blue-200/30 text-sm">Recupere-se bem. Volte mais forte amanhã.</p>
          )}
        </div>
      </motion.div>

      {/* Semana */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        id="tour-week"
        className="mx-4 card-glass rounded-2xl p-4 mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-text text-sm font-bold">Semana atual</p>
          <span
            className="text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/25"
            style={{ background: 'rgba(20,74,224,0.12)' }}
          >
            {weekCompleted}/5 treinos
          </span>
        </div>
        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5].map((d) => {
            const date = new Date(today)
            date.setDate(today.getDate() - today.getDay() + d)
            const key = date.toISOString().split('T')[0]
            const workout = profile?.goal ? getWorkoutForDay(profile.goal, d) : null
            return (
              <WeekDot
                key={d}
                dayIndex={d}
                dayName={getDayName(d)}
                workout={workout}
                completed={completedDays[key]}
                isToday={d === todayIndex}
              />
            )
          })}
        </div>
      </motion.div>

      {/* Taxa de Aderência */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.09 }}
        className="mx-4 card-glass rounded-2xl p-4 mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(220,232,255,0.1)' }}>
            <Activity size={14} className="text-primary" />
          </div>
          <p className="text-text text-sm font-bold">Aderência semanal</p>
          {streak > 0 && (
            <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
              🔥 {streak} dia{streak > 1 ? 's' : ''} seguido{streak > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${adherencePercent}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: adherencePercent >= 80
                  ? 'linear-gradient(90deg, #dce8ff, #93c5fd)'
                  : adherencePercent >= 50
                  ? 'linear-gradient(90deg, #fbbf24, #f97316)'
                  : 'linear-gradient(90deg, #f87171, #ef4444)',
                boxShadow: adherencePercent >= 80
                  ? '0 0 8px rgba(220,232,255,0.4)'
                  : 'none',
              }}
            />
          </div>
          <span className="text-text font-bold text-sm shrink-0">{adherencePercent}%</span>
        </div>
        <p className="text-muted text-xs">
          {weekCompleted} de {frequency} treino{frequency > 1 ? 's' : ''} concluído{weekCompleted !== 1 ? 's' : ''} esta semana
        </p>
      </motion.div>

      {/* Nutrição de Hoje */}
      {nutritionTargets && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/nutrition')}
          className="mx-4 card-glass rounded-2xl p-5 mb-4 cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                <Utensils size={15} className="text-primary" />
              </div>
              <p className="text-text text-sm font-bold">Nutrição de hoje</p>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-text text-sm font-bold">{nutritionTargets.calories}</p>
              <p className="text-muted text-xs">kcal</p>
              <ChevronRight size={14} className="text-muted ml-1" />
            </div>
          </div>
          <div className="flex justify-around">
            <MacroRing value={nutritionTargets.protein} max={nutritionTargets.protein} label="Proteína"    color="#dce8ff" />
            <MacroRing value={nutritionTargets.carbs}   max={nutritionTargets.carbs}   label="Carboidrato" color="#93c5fd" />
            <MacroRing value={nutritionTargets.fats}    max={nutritionTargets.fats}     label="Gordura"     color="#FFA502" />
          </div>
        </motion.div>
      )}

      {/* Hidratação + Evolução */}
      <div className="grid grid-cols-2 gap-3 mb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="card-glass rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Droplets size={14} className="text-blue-400" />
            </div>
            <p className="text-text text-xs font-bold">Hidratação</p>
          </div>
          <p className="text-text text-3xl font-bold mb-0.5 tracking-tight">
            {waterCups}
            <span className="text-muted text-base font-normal">/8</span>
          </p>
          <p className="text-muted text-xs mb-3">copos hoje</p>
          <button
            onClick={(e) => { e.stopPropagation(); addWater() }}
            className="w-full text-blue-400 text-xs font-bold py-2 rounded-xl transition-colors border border-blue-400/20"
            style={{ background: 'rgba(59,130,246,0.08)' }}
          >
            + Adicionar
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          onClick={() => navigate('/evolution')}
          className="card-glass rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center">
              <TrendingUp size={14} className="text-primary" />
            </div>
            <p className="text-text text-xs font-bold">Evolução</p>
          </div>
          {profile && (
            <>
              <p className="text-text text-3xl font-bold mb-0.5 tracking-tight">
                {profile.weight}
                <span className="text-muted text-base font-normal"> kg</span>
              </p>
              <p className="text-muted text-xs mb-3">peso atual</p>
            </>
          )}
          <div
            className="w-full text-primary text-xs font-bold py-2 rounded-xl text-center border border-primary/20"
            style={{ background: 'rgba(20,74,224,0.08)' }}
          >
            Ver progresso
          </div>
        </motion.div>
      </div>

      {/* Perfil Stats */}
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mx-4 card-glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-xl bg-warning/15 flex items-center justify-center">
              <Flame size={14} className="text-warning" />
            </div>
            <p className="text-text text-sm font-bold">Seu perfil</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: `${profile.weight}`, unit: 'kg', label: 'Peso' },
              { value: `${profile.height}`, unit: 'cm', label: 'Altura' },
              { value: `${profile.frequency}x`, unit: '/sem', label: 'Frequência' },
            ].map(({ value, unit, label }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-text text-lg font-bold tracking-tight">
                  {value}<span className="text-muted text-xs font-normal ml-0.5">{unit}</span>
                </p>
                <p className="text-muted text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
