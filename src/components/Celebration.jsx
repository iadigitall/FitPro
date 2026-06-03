import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENTS = {
  water_complete: {
    emoji: '💧',
    title: 'Hidratação completa.',
    message: '8 copos. Missão do dia cumprida.',
    color: '#60a5fa',
  },
  workout_done: {
    svg: true,
    title: 'Treino feito.',
    message: 'Consistência é o que separa.',
    color: '#dce8ff',
  },
  week_complete: {
    emoji: '◆',
    title: 'Semana 100%.',
    message: 'Todos os treinos. Nível outro.',
    color: '#fbbf24',
  },
}

/* Checkmark SVG que se desenha — usado no workout_done */
function CheckIcon({ color }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <motion.circle
        cx="17" cy="17" r="15"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.14 }}
      />
      <motion.path
        d="M10.5 17.5L15 22L23.5 12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.38, ease: 'easeOut', delay: 0.6 }}
      />
    </svg>
  )
}

/* Anéis de pulso — irradiam do centro continuamente */
function PulseRings({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {[0, 0.5, 1.0].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.9, opacity: 0.4 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{
            duration: 2.2,
            delay,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'absolute',
            width: 72, height: 72,
            borderRadius: '50%',
            border: `1px solid ${color}`,
          }}
        />
      ))}
    </div>
  )
}

export function Celebration({ type, onClose }) {
  const event = EVENTS[type]

  useEffect(() => {
    if (!event) return
    const t = setTimeout(onClose, 3400)
    return () => clearTimeout(t)
  }, [event, onClose])

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key={type}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(2, 4, 12, 0.72)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          {/* Glow ambiente — único ponto de cor no fundo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 340, height: 340,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${event.color}18 0%, transparent 68%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 18 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.9,   opacity: 0        }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: 264,
              background: 'rgba(7, 10, 22, 0.97)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 26,
              padding: '38px 24px 30px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: `0 40px 96px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03)`,
            }}
          >
            {/* Ícone com pulso */}
            <div style={{
              position: 'relative',
              width: 72, height: 72,
              margin: '0 auto 26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PulseRings color={event.color} />

              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1,  rotate: 0   }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: `${event.color}0e`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {event.svg
                  ? <CheckIcon color={event.color} />
                  : (
                    <span style={{ fontSize: 30, lineHeight: 1 }}>
                      {event.emoji}
                    </span>
                  )
                }
              </motion.div>
            </div>

            {/* Texto */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1,  y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                color: '#f0f0f0',
                fontWeight: 750,
                fontSize: 17,
                letterSpacing: '-0.3px',
                marginBottom: 7,
              }}
            >
              {event.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1,  y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                color: 'rgba(220,232,255,0.3)',
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {event.message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
