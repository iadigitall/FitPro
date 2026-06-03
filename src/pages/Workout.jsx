import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dumbbell, Clock, CheckCircle, SkipForward, ChevronRight,
  Info, RotateCcw, Flame, ClipboardList, Plus, Minus, X,
  Search, SlidersHorizontal
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUserStore } from '../store/userStore'
import { saveWorkoutLog } from '../services/firestore'
import { getWorkoutForDay, getDayName, isRestDay } from '../data/workoutPlans'
import { exercises as allExercises, getExerciseById, muscleGroups } from '../data/exercises'
import { ExerciseModal } from '../components/ExerciseModal'
import { Toast } from '../components/Toast'

function ExerciseLogModal({ exercise, log, onSave, onClose }) {
  const planned = Array.from({ length: exercise.sets || 3 }, (_, i) => ({
    reps: log?.[i]?.reps ?? '',
    weight: log?.[i]?.weight ?? '',
  }))
  const [sets, setSets] = useState(log?.length ? log.map(s => ({ ...s })) : planned)

  const updateSet = (i, field, val) =>
    setSets(s => s.map((set, idx) => idx === i ? { ...set, [field]: val } : set))

  const addSet = () => setSets(s => [...s, { reps: '', weight: '' }])
  const removeSet = (i) => setSets(s => s.filter((_, idx) => idx !== i))

  const handleSave = () => {
    const cleaned = sets.map(s => ({
      reps: Number(s.reps) || 0,
      weight: Number(s.weight) || 0,
    }))
    onSave(cleaned)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '100%', background: '#0a1020',
          border: '1px solid rgba(220,232,255,0.1)',
          borderRadius: '24px 24px 0 0',
          padding: '20px 20px 32px',
          maxHeight: '80vh', overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 16 }}>{exercise.name}</p>
            <p style={{ color: 'rgba(220,232,255,0.4)', fontSize: 12, marginTop: 2 }}>
              Planejado: {exercise.sets}×{exercise.reps} · {exercise.rest}s descanso
            </p>
          </div>
          <button onClick={onClose}
            style={{ background: 'rgba(220,232,255,0.08)', border: 'none', borderRadius: 10,
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(220,232,255,0.5)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Cabeçalho da tabela */}
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 1fr 28px', gap: 8, marginBottom: 8 }}>
          <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>#</span>
          <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>KG</span>
          <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>REPS</span>
          <span />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {sets.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 1fr 28px', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'rgba(220,232,255,0.35)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
                {i + 1}
              </span>
              <input
                type="number"
                inputMode="decimal"
                value={s.weight}
                onChange={e => updateSet(i, 'weight', e.target.value)}
                placeholder="0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(220,232,255,0.12)',
                  borderRadius: 10, padding: '10px 8px',
                  color: '#f0f0f0', fontSize: 15, fontWeight: 600,
                  textAlign: 'center', outline: 'none', fontFamily: 'inherit',
                  width: '100%',
                }}
              />
              <input
                type="number"
                inputMode="numeric"
                value={s.reps}
                onChange={e => updateSet(i, 'reps', e.target.value)}
                placeholder="0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(220,232,255,0.12)',
                  borderRadius: 10, padding: '10px 8px',
                  color: '#f0f0f0', fontSize: 15, fontWeight: 600,
                  textAlign: 'center', outline: 'none', fontFamily: 'inherit',
                  width: '100%',
                }}
              />
              {sets.length > 1 ? (
                <button onClick={() => removeSet(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,71,87,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={14} />
                </button>
              ) : <span />}
            </div>
          ))}
        </div>

        <button onClick={addSet}
          style={{
            width: '100%', padding: '10px', marginBottom: 14,
            background: 'rgba(220,232,255,0.05)',
            border: '1px dashed rgba(220,232,255,0.15)',
            borderRadius: 12, color: 'rgba(220,232,255,0.5)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontFamily: 'inherit',
          }}>
          <Plus size={14} /> Adicionar série
        </button>

        <button onClick={handleSave}
          className="btn-primary"
          style={{
            width: '100%', padding: '14px', borderRadius: 14,
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
            color: '#07102a', border: 'none', fontFamily: 'inherit',
          }}>
          Salvar registro
        </button>
      </motion.div>
    </motion.div>
  )
}

function ExerciseCard({ exercise, log, onInfo, onLog }) {
  if (!exercise) return null
  const logged = log && log.length > 0
  const bestWeight = logged ? Math.max(...log.map(s => s.weight || 0)) : 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-2 border rounded-2xl p-4 flex items-center gap-3 transition-all"
      style={{ borderColor: logged ? 'rgba(220,232,255,0.2)' : undefined }}
    >
      <div
        onClick={() => onInfo(exercise)}
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
        style={{ background: logged ? 'rgba(220,232,255,0.12)' : 'rgba(220,232,255,0.07)' }}
      >
        {logged
          ? <CheckCircle size={18} className="text-primary" />
          : <Dumbbell size={18} className="text-primary" />}
      </div>
      <div className="flex-1 min-w-0" onClick={() => onInfo(exercise)} style={{ cursor: 'pointer' }}>
        <p className="text-text text-sm font-semibold truncate">{exercise.name}</p>
        {logged ? (
          <p className="text-muted text-xs mt-0.5">
            {log.length} séries · {bestWeight > 0 ? `${bestWeight}kg` : 'peso corporal'}
          </p>
        ) : (
          <p className="text-muted text-xs mt-0.5">
            {exercise.sets} séries · {exercise.reps} reps · {exercise.rest}s descanso
          </p>
        )}
        <p className="text-muted/60 text-xs">{exercise.group} · {exercise.equipment}</p>
      </div>
      <button
        onClick={() => onLog(exercise)}
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        style={{
          background: logged ? 'rgba(220,232,255,0.1)' : 'rgba(220,232,255,0.05)',
          border: `1px solid ${logged ? 'rgba(220,232,255,0.2)' : 'rgba(220,232,255,0.08)'}`,
        }}
      >
        <ClipboardList size={15} className="text-primary" />
      </button>
    </motion.div>
  )
}

function SkipModal({ onConfirm, onCancel }) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const reasons = [
    { id: 'cansado',  label: 'Cansaço / Fadiga' },
    { id: 'lesao',    label: 'Dor / Lesão' },
    { id: 'tempo',    label: 'Falta de tempo' },
    { id: 'viagem',   label: 'Viagem / Compromisso' },
    { id: 'outro',    label: 'Outro motivo' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-surface w-full max-w-lg rounded-t-3xl p-6"
      >
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
        <h3 className="text-text font-bold text-lg mb-1">Pular treino</h3>
        <p className="text-muted text-sm mb-4">Conta pra gente o motivo (opcional)</p>

        <div className="space-y-2 mb-4">
          {reasons.map((r) => (
            <button
              key={r.id}
              onClick={() => setReason(r.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                reason === r.id
                  ? 'border-warning bg-warning/10 text-warning'
                  : 'border-border text-muted hover:border-border/60'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Detalhes adicionais (opcional)..."
          rows={2}
          className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3
            text-text text-sm placeholder:text-muted/50 resize-none mb-4
            focus:border-primary transition-colors"
        />

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-border text-muted text-sm font-medium hover:text-text transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(reason, details)}
            className="flex-1 py-3 rounded-xl bg-warning/20 border border-warning/30 text-warning text-sm font-bold"
          >
            Confirmar pulo
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Workout() {
  const today = new Date()
  const todayIndex = today.getDay()
  const todayKey = today.toISOString().split('T')[0]

  const [activeDay, setActiveDay] = useState(todayIndex <= 5 && todayIndex >= 1 ? todayIndex : 1)
  const [modalExercise, setModalExercise] = useState(null)
  const [logModal, setLogModal] = useState(null)
  const [exerciseLogs, setExerciseLogs] = useState({})
  const [showSkip, setShowSkip] = useState(false)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [filterGroup, setFilterGroup] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const { user, profile } = useAuthStore()
  const { completedDays, skippedDays, markDayDone, markDaySkipped, celebrate } = useUserStore()

  const workout = useMemo(() => {
    if (!profile?.goal) return null
    return getWorkoutForDay(profile.goal, activeDay)
  }, [profile, activeDay])

  const exercises = useMemo(() => {
    if (!workout) return []
    return workout.exercises.map(id => getExerciseById(id)).filter(Boolean)
  }, [workout])

  const activeDayKey = useMemo(() => {
    const date = new Date(today)
    date.setDate(today.getDate() - today.getDay() + activeDay)
    return date.toISOString().split('T')[0]
  }, [activeDay])

  const isDone = completedDays[activeDayKey]
  const isSkipped = skippedDays[activeDayKey]
  const isToday = activeDay === todayIndex

  const isSearching = search.trim().length > 0 || filterGroup || filterDifficulty
  const searchResults = useMemo(() => {
    if (!isSearching) return []
    const q = search.trim().toLowerCase()
    return allExercises.filter(ex => {
      const matchText = !q || ex.name.toLowerCase().includes(q) ||
        ex.group.toLowerCase().includes(q) || ex.equipment.toLowerCase().includes(q)
      const matchGroup = !filterGroup || ex.group === filterGroup
      const matchDiff = !filterDifficulty || ex.difficulty === filterDifficulty
      return matchText && matchGroup && matchDiff
    })
  }, [search, filterGroup, filterDifficulty, isSearching])

  const saveExerciseLog = (exercise, sets) => {
    setExerciseLogs(prev => ({ ...prev, [exercise.id]: sets }))
  }

  const handleComplete = async () => {
    if (!user || !workout || isDone) return
    setSaving(true)
    try {
      const exerciseLogsArray = exercises.map(ex => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        group: ex.group,
        sets: exerciseLogs[ex.id] || [],
      }))
      await saveWorkoutLog(user.uid, {
        day: activeDayKey,
        workout: workout.name,
        group: workout.group,
        goal: profile.goal,
        exerciseCount: exercises.length,
        exerciseLogs: exerciseLogsArray,
      })
      markDayDone(activeDayKey)
      // Verifica se completou todos os treinos da semana
      const frequency = profile?.frequency || 5
      const doneThisWeek = [1, 2, 3, 4, 5].filter(d => {
        const date = new Date(today)
        date.setDate(today.getDate() - today.getDay() + d)
        const k = date.toISOString().split('T')[0]
        return k === activeDayKey || completedDays[k]
      }).length
      celebrate(doneThisWeek >= frequency ? 'week_complete' : 'workout_done')
    } catch (err) {
      setToast('Erro ao salvar. Mas marcamos localmente!')
      markDayDone(activeDayKey)
    } finally {
      setSaving(false)
    }
  }

  const handleSkip = async (reason, details) => {
    markDaySkipped(activeDayKey, reason, details)
    setShowSkip(false)
    if (user) {
      try {
        await saveWorkoutLog(user.uid, {
          day: activeDayKey,
          workout: workout?.name || 'Skipped',
          skipped: true,
          skipReason: reason,
          skipDetails: details,
        })
      } catch {}
    }
  }

  const days = [1, 2, 3, 4, 5]

  return (
    <div className="min-h-full pb-4">
      <Toast message={toast} onClose={() => setToast('')} />

      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <p className="text-muted text-sm font-medium mb-0.5 capitalize">{profile?.goal || '—'}</p>
        <h1 className="text-text text-3xl font-bold tracking-tight">Treinos</h1>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {days.map((d) => {
          const date = new Date(today)
          date.setDate(today.getDate() - today.getDay() + d)
          const key = date.toISOString().split('T')[0]
          const w = profile?.goal ? getWorkoutForDay(profile.goal, d) : null
          const done = completedDays[key]
          const skipped = skippedDays[key]
          const active = activeDay === d

          return (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium
                transition-all shrink-0 border ${
                  active
                    ? 'bg-primary text-bg border-primary'
                    : 'bg-surface-2 border-border text-muted hover:text-text'
                }`}
            >
              <span className="font-bold text-[11px]">{getDayName(d)}</span>
              {done ? (
                <CheckCircle size={12} className={active ? 'text-bg mt-0.5' : 'text-primary mt-0.5'} />
              ) : skipped ? (
                <SkipForward size={12} className="text-warning mt-0.5" />
              ) : w ? (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${active ? 'bg-bg' : 'bg-primary/40'}`} />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full mt-1 bg-border" />
              )}
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-3">
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={14} style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(220,232,255,0.35)', pointerEvents: 'none'
            }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar exercício..."
              style={{
                width: '100%', paddingLeft: 36, paddingRight: search ? 36 : 14,
                paddingTop: 10, paddingBottom: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(220,232,255,0.1)',
                borderRadius: 14, color: '#f0f0f0', fontSize: 14,
                outline: 'none', fontFamily: 'inherit',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(220,232,255,0.4)', display: 'flex',
                }}>
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: (filterGroup || filterDifficulty) ? 'rgba(220,232,255,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${(filterGroup || filterDifficulty) ? 'rgba(220,232,255,0.3)' : 'rgba(220,232,255,0.1)'}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: (filterGroup || filterDifficulty) ? '#dce8ff' : 'rgba(220,232,255,0.4)',
            }}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* Filtros */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 10 }}>
                <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Grupo muscular
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {muscleGroups.map(g => (
                    <button key={g} onClick={() => setFilterGroup(filterGroup === g ? '' : g)}
                      style={{
                        padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'inherit',
                        background: filterGroup === g ? 'rgba(220,232,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${filterGroup === g ? 'rgba(220,232,255,0.3)' : 'rgba(220,232,255,0.08)'}`,
                        color: filterGroup === g ? '#dce8ff' : 'rgba(220,232,255,0.4)',
                      }}>
                      {g}
                    </button>
                  ))}
                </div>
                <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Dificuldade
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Iniciante', 'Intermediário', 'Avançado'].map(d => (
                    <button key={d} onClick={() => setFilterDifficulty(filterDifficulty === d ? '' : d)}
                      style={{
                        padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'inherit',
                        background: filterDifficulty === d ? 'rgba(220,232,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${filterDifficulty === d ? 'rgba(220,232,255,0.3)' : 'rgba(220,232,255,0.08)'}`,
                        color: filterDifficulty === d ? '#dce8ff' : 'rgba(220,232,255,0.4)',
                      }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Workout Content */}
      <div className="px-4">
        {/* Resultados da busca */}
        {isSearching ? (
          <>
            <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 12, marginBottom: 12 }}>
              {searchResults.length} exercício{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
            </p>
            {searchResults.length > 0 ? (
              <div className="space-y-2.5 mb-5">
                {searchResults.map((ex, i) => (
                  <motion.div key={ex.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}>
                    <ExerciseCard
                      exercise={ex}
                      log={exerciseLogs[ex.id]}
                      onInfo={setModalExercise}
                      onLog={setLogModal}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search size={28} className="text-muted mb-3" />
                <p className="text-muted text-sm">Nenhum exercício encontrado.</p>
                <p className="text-muted/60 text-xs mt-1">Tente outro nome ou remova os filtros.</p>
              </div>
            )}
          </>
        ) : workout ? (
          <>
            {/* Workout Header */}
            <div
              className="rounded-2xl p-4 mb-4 card-glass"
              style={{ borderColor: workout.color + '50' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: workout.color + '20' }}>
                    <Dumbbell size={20} style={{ color: workout.color }} />
                  </div>
                  <div>
                    <h2 className="text-text font-bold">{workout.name}</h2>
                    <p className="text-muted text-xs">{workout.group}</p>
                  </div>
                </div>
                {isDone && (
                  <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={11} /> Concluído
                  </span>
                )}
                {isSkipped && (
                  <span className="bg-warning/20 text-warning text-xs font-bold px-3 py-1 rounded-full">
                    Pulado
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-muted text-xs">
                  <Clock size={12} />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted text-xs">
                  <Dumbbell size={12} />
                  <span>{exercises.length} exercícios</span>
                </div>
              </div>

              {/* Tip */}
              {workout.tip && (
                <div className="mt-3 flex items-start gap-2 bg-black/20 rounded-xl p-2.5">
                  <Info size={14} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-muted text-xs leading-relaxed">{workout.tip}</p>
                </div>
              )}

              {/* Aquecimento */}
              {workout.warmup && (
                <div className="mt-2 flex items-start gap-2">
                  <Flame size={12} className="text-warning mt-0.5 shrink-0" />
                  <p className="text-warning text-xs"><span className="font-semibold">Aquecimento:</span> {workout.warmup}</p>
                </div>
              )}
            </div>

            {/* Exercises */}
            <div className="space-y-2.5 mb-5">
              {exercises.map((ex, i) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ExerciseCard
                    exercise={ex}
                    log={exerciseLogs[ex.id]}
                    onInfo={setModalExercise}
                    onLog={setLogModal}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress de registro */}
            {!isDone && !isSkipped && exercises.length > 0 && (
              <div className="mb-4">
                {(() => {
                  const logged = exercises.filter(ex => exerciseLogs[ex.id]?.length > 0).length
                  return logged > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1, height: 4, background: 'rgba(220,232,255,0.08)',
                        borderRadius: 4, overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%', borderRadius: 4,
                          background: 'rgba(220,232,255,0.6)',
                          width: `${(logged / exercises.length) * 100}%`,
                          transition: 'width 0.3s',
                        }} />
                      </div>
                      <span style={{ color: 'rgba(220,232,255,0.4)', fontSize: 12 }}>
                        {logged}/{exercises.length} registrados
                      </span>
                    </div>
                  ) : null
                })()}
              </div>
            )}

            {/* Actions */}
            {!isDone && !isSkipped && isToday && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSkip(true)}
                  className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted hover:text-warning hover:border-warning/40 transition-colors"
                >
                  <SkipForward size={18} />
                </button>
                <button
                  onClick={handleComplete}
                  disabled={saving}
                  className="flex-1 btn-primary text-white font-bold py-3.5 rounded-xl
                    flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Concluir treino
                    </>
                  )}
                </button>
              </div>
            )}

            {isDone && (
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle size={22} className="text-primary" />
                <div>
                  <p className="text-primary font-bold text-sm">Treino concluído!</p>
                  <p className="text-muted text-xs">Você mandou muito bem hoje. Recupere-se bem!</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-4">
              <RotateCcw size={32} className="text-muted" />
            </div>
            <p className="text-text font-bold mb-1">Dia de descanso</p>
            <p className="text-muted text-sm">
              {activeDay === 6 || activeDay === 0
                ? 'Final de semana é para recuperar. Descanse!'
                : 'Nenhum treino programado para este dia.'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ExerciseModal exercise={modalExercise} onClose={() => setModalExercise(null)} />
      <AnimatePresence>
        {showSkip && <SkipModal onConfirm={handleSkip} onCancel={() => setShowSkip(false)} />}
        {logModal && (
          <ExerciseLogModal
            key={logModal.id}
            exercise={logModal}
            log={exerciseLogs[logModal.id]}
            onSave={(sets) => saveExerciseLog(logModal, sets)}
            onClose={() => setLogModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
