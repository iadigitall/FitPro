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
const PAD = 8

export function Tour() {
  const [step, setStep] = useState(-1)
  const [rect, setRect] = useState(null)
  const [cardOpen, setCardOpen] = useState(false)

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
    setCardOpen(false)
    setRect(null)
    const t1 = setTimeout(() => {
      setRect(resolveRect(STEPS[step].id))
    }, 80)
    const t2 = setTimeout(() => setCardOpen(true), 420)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [step, resolveRect])

  const next = () => {
    const nextStep = step + 1
    if (nextStep >= STEPS.length) end()
    else setStep(nextStep)
  }

  const end = () => {
    setStep(-1)
    setCardOpen(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  if (step < 0 || step >= STEPS.length) return null
  const current = STEPS[step]

  return (
    <AnimatePresence>
      <motion.div
        key="tour-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0"
        style={{ background: 'rgba(0,0,0,0.72)', zIndex: 9998 }}
        onClick={() => cardOpen && next()}
      >
        {/* Spotlight ring */}
        <AnimatePresence>
          {rect && (
            <motion.div
              key={`ring-${step}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              style={{
                position: 'fixed',
                top: rect.top - PAD,
                left: rect.left - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
                borderRadius: 18,
                border: '2px solid rgba(220,232,255,0.75)',
                boxShadow: '0 0 0 4000px rgba(0,0,0,0.72), 0 0 0 4px rgba(220,232,255,0.12), 0 0 28px rgba(220,232,255,0.25)',
                pointerEvents: 'none',
                zIndex: 9999,
              }}
            />
          )}
        </AnimatePresence>

        {/* Tap hint */}
        <AnimatePresence>
          {rect && !cardOpen && (
            <motion.div
              key={`hint-${step}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: rect.bottom + 14,
                left: Math.max(12, rect.left + rect.width / 2 - 50),
                background: 'rgba(220,232,255,0.12)',
                border: '1px solid rgba(220,232,255,0.18)',
                borderRadius: 20,
                padding: '6px 14px',
                color: 'rgba(220,232,255,0.65)',
                fontSize: 11,
                whiteSpace: 'nowrap',
                zIndex: 10000,
                pointerEvents: 'none',
              }}
            >
              Toque para saber mais
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <AnimatePresence>
          {cardOpen && (
            <motion.div
              key={`card-${step}`}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'fixed',
                bottom: 96,
                left: 16,
                right: 16,
                background: 'rgba(10,16,36,0.97)',
                border: '1px solid rgba(220,232,255,0.12)',
                borderRadius: 22,
                padding: 22,
                boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(220,232,255,0.04)',
                zIndex: 10001,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 17, margin: 0 }}>
                  {current.title}
                </h3>
                <button
                  onClick={end}
                  style={{ color: 'rgba(220,232,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', paddingLeft: 8 }}
                >
                  <X size={18} />
                </button>
              </div>
              <p style={{ color: '#7a8aaa', fontSize: 13, lineHeight: 1.65, margin: '0 0 18px' }}>
                {current.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 11 }}>
                  {step + 1} de {STEPS.length}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {step < STEPS.length - 1 && (
                    <button
                      onClick={end}
                      style={{
                        padding: '9px 15px', borderRadius: 11,
                        border: '1px solid rgba(220,232,255,0.1)',
                        background: 'transparent',
                        color: 'rgba(220,232,255,0.35)',
                        fontSize: 12, cursor: 'pointer',
                      }}
                    >
                      Pular
                    </button>
                  )}
                  <button
                    onClick={next}
                    style={{
                      padding: '9px 22px', borderRadius: 11,
                      background: 'rgba(220,232,255,0.93)',
                      color: '#07102a',
                      fontWeight: 700, fontSize: 12,
                      cursor: 'pointer', border: 'none',
                    }}
                  >
                    {step + 1 >= STEPS.length ? 'Concluir' : 'Próximo'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
