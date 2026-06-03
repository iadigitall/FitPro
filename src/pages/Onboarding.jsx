import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Target, User, AlertTriangle, Salad } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { saveProfile } from '../services/firestore'

const GOALS = [
  { id: 'hipertrofia',    label: 'Hipertrofia',     desc: 'Ganhar massa muscular',    emoji: '💪' },
  { id: 'emagrecimento',  label: 'Emagrecimento',   desc: 'Perder gordura corporal',  emoji: '🔥' },
  { id: 'condicionamento',label: 'Condicionamento', desc: 'Melhorar saúde e preparo', emoji: '⚡' },
]

const EXPERIENCE_LEVELS = [
  { id: 'iniciante',     label: 'Iniciante',     desc: 'Até 1 ano de treino',    emoji: '🌱' },
  { id: 'intermediario', label: 'Intermediário', desc: '1 a 3 anos de treino',   emoji: '⚡' },
  { id: 'avancado',      label: 'Avançado',      desc: 'Mais de 3 anos',         emoji: '🔥' },
]

const FREQUENCY = [3, 4, 5]
const WORKOUT_TIMES = [
  { id: 'manha',  label: 'Manhã',  desc: '6h - 12h',  emoji: '🌅' },
  { id: 'tarde',  label: 'Tarde',  desc: '12h - 18h', emoji: '☀️' },
  { id: 'noite',  label: 'Noite',  desc: '18h - 22h', emoji: '🌙' },
]

const RESTRICTIONS = [
  { id: 'joelho',   label: 'Joelho' },
  { id: 'coluna',   label: 'Coluna / Lombar' },
  { id: 'ombro',    label: 'Ombro' },
  { id: 'tornozelo',label: 'Tornozelo' },
  { id: 'quadril',  label: 'Quadril' },
  { id: 'nenhuma',  label: 'Nenhuma restrição' },
]

const DIETARY_RESTRICTIONS = [
  { id: 'vegetariano', label: 'Vegetariano',   desc: 'Sem carnes' },
  { id: 'vegano',      label: 'Vegano',         desc: 'Sem produtos animais' },
  { id: 'sem_lactose', label: 'Sem lactose',    desc: 'Intolerância à lactose' },
  { id: 'sem_gluten',  label: 'Sem glúten',     desc: 'Intolerância ao glúten' },
  { id: 'nenhuma_d',   label: 'Sem restrições', desc: 'Como de tudo normalmente' },
]

function ProgressBar({ step, total }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full flex-1 transition-all duration-300 ${
            i <= step ? 'bg-primary' : 'bg-surface-3'
          }`}
        />
      ))}
    </div>
  )
}

function OptionCard({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl border p-4 transition-all duration-200
        ${selected
          ? 'border-primary bg-primary/10'
          : 'border-border bg-surface-2 hover:border-border/80'
        } ${className}`}
    >
      {children}
    </button>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuthStore()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [data, setData] = useState({
    name: user?.displayName || '',
    age: '',
    weight: '',
    height: '',
    sex: 'masculino',
    goal: '',
    experienceLevel: '',
    frequency: 4,
    workoutTime: 'tarde',
    restrictions: [],
    dietaryRestrictions: [],
  })

  const update = (key, val) => setData(d => ({ ...d, [key]: val }))

  const toggleRestriction = (id) => {
    if (id === 'nenhuma') {
      update('restrictions', ['nenhuma'])
      return
    }
    const current = data.restrictions.filter(r => r !== 'nenhuma')
    if (current.includes(id)) {
      update('restrictions', current.filter(r => r !== id))
    } else {
      update('restrictions', [...current, id])
    }
  }

  const toggleDietaryRestriction = (id) => {
    if (id === 'nenhuma_d') {
      update('dietaryRestrictions', ['nenhuma_d'])
      return
    }
    const current = data.dietaryRestrictions.filter(r => r !== 'nenhuma_d')
    if (current.includes(id)) {
      update('dietaryRestrictions', current.filter(r => r !== id))
    } else {
      update('dietaryRestrictions', [...current, id])
    }
  }

  const canNext = [
    data.name && data.age && data.weight && data.height,
    data.goal && data.workoutTime && data.experienceLevel,
    data.restrictions.length > 0 && data.dietaryRestrictions.length > 0,
  ][step]

  const handleFinish = async () => {
    setSaving(true)
    setError('')
    try {
      const profileData = {
        ...data,
        age: Number(data.age),
        weight: Number(data.weight),
        height: Number(data.height),
        onboardingComplete: true,
        createdAt: new Date().toISOString(),
      }
      await saveProfile(user.uid, profileData)
      updateProfile(profileData)
      navigate('/dashboard')
    } catch {
      setError('Erro ao salvar perfil. Verifique sua conexão e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const steps = [
    // ── STEP 0: Dados físicos ──────────────────────────────────
    <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <div className="flex items-center gap-2 mb-2">
        <User size={18} className="text-primary" />
        <h2 className="text-text font-bold text-lg">Seus dados físicos</h2>
      </div>
      <p className="text-muted text-sm mb-6">Usamos para calcular sua dieta personalizada</p>

      <div className="space-y-4">
        {/* Nome */}
        <div>
          <label className="text-muted text-xs font-medium block mb-1.5">Como você se chama?</label>
          <input
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3
              text-text text-sm placeholder:text-muted/50 focus:border-primary transition-colors"
          />
        </div>

        {/* Sexo */}
        <div>
          <label className="text-muted text-xs font-medium block mb-1.5">Sexo biológico</label>
          <div className="grid grid-cols-2 gap-2">
            {['masculino', 'feminino'].map((s) => (
              <OptionCard key={s} selected={data.sex === s} onClick={() => update('sex', s)}>
                <p className="text-sm font-medium text-text capitalize text-center">{s}</p>
              </OptionCard>
            ))}
          </div>
        </div>

        {/* Idade + Peso */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-muted text-xs font-medium block mb-1.5">Idade</label>
            <div className="relative">
              <input
                type="number"
                value={data.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="25"
                min={14} max={100}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3
                  text-text text-sm placeholder:text-muted/50 focus:border-primary transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">anos</span>
            </div>
          </div>
          <div>
            <label className="text-muted text-xs font-medium block mb-1.5">Peso</label>
            <div className="relative">
              <input
                type="number"
                value={data.weight}
                onChange={(e) => update('weight', e.target.value)}
                placeholder="75"
                min={30} max={300} step={0.1}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3
                  text-text text-sm placeholder:text-muted/50 focus:border-primary transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">kg</span>
            </div>
          </div>
        </div>

        {/* Altura */}
        <div>
          <label className="text-muted text-xs font-medium block mb-1.5">
            Altura: <span className="text-primary">{data.height ? `${data.height} cm` : '---'}</span>
          </label>
          <input
            type="range"
            min={140} max={220}
            value={data.height || 170}
            onChange={(e) => update('height', e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-muted text-xs mt-1">
            <span>140cm</span>
            <span>220cm</span>
          </div>
        </div>
      </div>
    </motion.div>,

    // ── STEP 1: Objetivo ──────────────────────────────────────
    <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <div className="flex items-center gap-2 mb-2">
        <Target size={18} className="text-primary" />
        <h2 className="text-text font-bold text-lg">Seu objetivo</h2>
      </div>
      <p className="text-muted text-sm mb-6">Isso define seu plano de treinos e dieta</p>

      <div className="space-y-3 mb-6">
        {GOALS.map((g) => (
          <OptionCard key={g.id} selected={data.goal === g.id} onClick={() => update('goal', g.id)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{g.emoji}</span>
              <div>
                <p className="text-text font-semibold text-sm">{g.label}</p>
                <p className="text-muted text-xs">{g.desc}</p>
              </div>
              {data.goal === g.id && (
                <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-bg rounded-full" />
                </div>
              )}
            </div>
          </OptionCard>
        ))}
      </div>

      {/* Nível de experiência */}
      <div className="mb-6">
        <label className="text-muted text-xs font-medium block mb-3">Nível de experiência</label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((lvl) => (
            <OptionCard key={lvl.id} selected={data.experienceLevel === lvl.id} onClick={() => update('experienceLevel', lvl.id)}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{lvl.emoji}</span>
                <div>
                  <p className="text-text font-semibold text-sm">{lvl.label}</p>
                  <p className="text-muted text-xs">{lvl.desc}</p>
                </div>
                {data.experienceLevel === lvl.id && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-bg rounded-full" />
                  </div>
                )}
              </div>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* Frequência */}
      <div className="mb-6">
        <label className="text-muted text-xs font-medium block mb-3">
          Frequência semanal: <span className="text-primary">{data.frequency}x por semana</span>
        </label>
        <div className="flex gap-2">
          {FREQUENCY.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => update('frequency', f)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                data.frequency === f
                  ? 'bg-primary text-bg'
                  : 'bg-surface-2 border border-border text-muted hover:border-primary/50'
              }`}
            >
              {f}x
            </button>
          ))}
        </div>
      </div>

      {/* Horário */}
      <div>
        <label className="text-muted text-xs font-medium block mb-3">Horário preferido para treinar</label>
        <div className="grid grid-cols-3 gap-2">
          {WORKOUT_TIMES.map((t) => (
            <OptionCard
              key={t.id}
              selected={data.workoutTime === t.id}
              onClick={() => update('workoutTime', t.id)}
            >
              <div className="text-center">
                <p className="text-xl mb-1">{t.emoji}</p>
                <p className="text-text text-xs font-semibold">{t.label}</p>
                <p className="text-muted text-[10px]">{t.desc}</p>
              </div>
            </OptionCard>
          ))}
        </div>
      </div>
    </motion.div>,

    // ── STEP 2: Restrições físicas + dietéticas ───────────────
    <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-warning" />
        <h2 className="text-text font-bold text-lg">Restrições</h2>
      </div>
      <p className="text-muted text-sm mb-6">Adaptamos treinos e dieta para você</p>

      {/* Lesões físicas */}
      <p className="text-muted text-xs font-bold uppercase tracking-widest mb-3">Lesões / restrições físicas</p>
      <div className="space-y-2 mb-6">
        {RESTRICTIONS.map((r) => (
          <OptionCard
            key={r.id}
            selected={data.restrictions.includes(r.id)}
            onClick={() => toggleRestriction(r.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                data.restrictions.includes(r.id)
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {data.restrictions.includes(r.id) && (
                  <svg viewBox="0 0 10 8" className="w-3 h-3" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="text-text text-sm font-medium">{r.label}</p>
            </div>
          </OptionCard>
        ))}
      </div>

      {/* Restrições alimentares */}
      <div className="flex items-center gap-2 mb-3">
        <Salad size={15} className="text-primary" />
        <p className="text-muted text-xs font-bold uppercase tracking-widest">Preferências alimentares</p>
      </div>
      <div className="space-y-2">
        {DIETARY_RESTRICTIONS.map((r) => (
          <OptionCard
            key={r.id}
            selected={data.dietaryRestrictions.includes(r.id)}
            onClick={() => toggleDietaryRestriction(r.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                data.dietaryRestrictions.includes(r.id)
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {data.dietaryRestrictions.includes(r.id) && (
                  <svg viewBox="0 0 10 8" className="w-3 h-3" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-text text-sm font-medium">{r.label}</p>
                <p className="text-muted text-xs">{r.desc}</p>
              </div>
            </div>
          </OptionCard>
        ))}
      </div>

      {error && (
        <p className="text-danger text-sm mt-4 bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </motion.div>,
  ]

  return (
    <div className="min-h-screen flex flex-col px-5 py-8"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #0d2260 0%, #070d1f 55%, #030810 100%)' }}
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted text-xs">Passo {step + 1} de 3</span>
          <span className="text-primary text-xs font-semibold">
            {Math.round(((step + 1) / 3) * 100)}%
          </span>
        </div>
        <ProgressBar step={step} total={3} />
      </div>

      {/* Steps */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted hover:text-text transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext}
            className="flex-1 btn-primary text-white font-bold py-3.5 rounded-xl
              disabled:opacity-40 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 text-sm"
          >
            Continuar <ChevronRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={!canNext || saving}
            className="flex-1 btn-primary text-white font-bold py-3.5 rounded-xl
              disabled:opacity-40 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 text-sm"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>Começar agora 🚀</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
