import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const STEPS = [
  {
    id: 'tour-hero',
    title: 'Treino do Dia',
    desc: 'Aqui aparece o seu treino de hoje. Toque para ver os exercícios e concluir o treino.',
  },
  {
    id: 'tour-week',
    title: 'Semana Atual',
    desc: 'Acompanhe quantos treinos você fez essa semana. Consistência é o que gera resultado.',
  },
  {
    id: 'tour-nav-workout',
    title: 'Treinos',
    desc: 'Veja exercícios com detalhes, séries, repetições e vídeos demonstrativos.',
  },
  {
    id: 'tour-nav-nutrition',
    title: 'Nutrição',
    desc: 'Plano alimentar calculado automaticamente com base no seu objetivo e treino do dia.',
  },
  {
    id: 'tour-nav-profile',
    title: 'Perfil',
    desc: 'Atualize seus dados, troque a foto e ajuste suas configurações quando quiser.',
  },
]

const STORAGE_KEY = 'fitpro_tour_done'
const PAD = 10

export function Tour() {
  const [step, setStep] = useState(-1)
  const [rect, setRect] = useState(null)

  const resolveRect = useCallback((id) => {
    const el = document.getElementById(id)
    return el ? el.getBoundingClientRect() : null
  }, [])

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') return
    const t = setTimeout(() => setStep(0), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (step < 0 || step >= STEPS.length) return
    setRect(null)
    const t = setTimeout(() => setRect(resolveRect(STEPS[step].id)), 120)
    return () => clearTimeout(t)
  }, [step, resolveRect])

  const next = () => {
    const n = step + 1
    if (n >= STEPS.length) end()
    else setStep(n)
  }

  const end = () => {
    setStep(-1)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  if (step < 0 || step >= STEPS.length) return null
  const current = STEPS[step]

  return (
    <AnimatePresence>
      <motion.div
        key="tour"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}
      >
        {/* Anel no elemento — sem escurecer nada */}
        <AnimatePresence>
          {rect && (
            <motion.div
              key={`ring-${step}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              style={{
                position: 'fixed',
                top: rect.top - PAD,
                left: rect.left - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
                borderRadius: 20,
                border: '2px solid rgba(220,232,255,0.7)',
                boxShadow: '0 0 0 4px rgba(220,232,255,0.08), 0 0 20px rgba(220,232,255,0.2)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Card — sem bloquear interações com o fundo */}
        <motion.div
          key={`card-${step}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
          style={{
            position: 'fixed',
            bottom: 110,
            left: 16,
            right: 16,
            background: 'rgba(8, 12, 24, 0.97)',
            border: '1px solid rgba(220,232,255,0.1)',
            borderRadius: 22,
            padding: '20px 20px 16px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {step + 1} / {STEPS.length}
            </p>
            <button onClick={end}
              style={{ color: 'rgba(220,232,255,0.3)', background: 'none', border: 'none',
                cursor: 'pointer', padding: 0, display: 'flex' }}>
              <X size={16} />
            </button>
          </div>

          <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
            {current.title}
          </p>
          <p style={{ color: 'rgba(220,232,255,0.4)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            {current.desc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            {step < STEPS.length - 1 && (
              <button onClick={end}
                style={{
                  padding: '9px 16px', borderRadius: 12,
                  border: '1px solid rgba(220,232,255,0.08)',
                  background: 'transparent',
                  color: 'rgba(220,232,255,0.3)',
                  fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                Pular
              </button>
            )}
            <button onClick={next}
              style={{
                padding: '9px 24px', borderRadius: 12,
                background: 'rgba(220,232,255,0.95)',
                color: '#07102a', fontWeight: 700,
                fontSize: 13, cursor: 'pointer',
                border: 'none', fontFamily: 'inherit',
              }}>
              {step + 1 >= STEPS.length ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
