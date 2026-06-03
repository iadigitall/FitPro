import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function FitProLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="14" fill="#dce8ff"/>
      {/* F minimalista — traço único */}
      <path
        d="M15 44 L15 12 L41 12"
        stroke="#07102a" strokeWidth="6"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <line x1="15" y1="28" x2="35" y2="28"
        stroke="#07102a" strokeWidth="6" strokeLinecap="round"
      />
      {/* Ponto azul — marca de identidade */}
      <circle cx="44" cy="43" r="5" fill="#144ae0"/>
    </svg>
  )
}

export function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1444d8 0%, #070d1f 55%, #030810 100%)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
        style={{ filter: 'drop-shadow(0 0 32px rgba(220,232,255,0.35))' }}
      >
        <FitProLogo size={80} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ color: 'rgba(220,232,255,0.4)', fontSize: 13, marginTop: 20, marginBottom: 4 }}
      >
        Bem-vindo ao
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.65, type: 'spring', stiffness: 240, damping: 20 }}
        style={{
          color: '#f0f0f0',
          fontSize: 48,
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        FitPro
      </motion.h1>

      {/* Loading bar */}
      <motion.div
        style={{
          marginTop: 36,
          width: 120,
          height: 3,
          borderRadius: 99,
          background: 'rgba(220,232,255,0.12)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 1.6, ease: 'easeInOut' }}
          style={{ height: '100%', background: '#dce8ff', borderRadius: 99 }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ color: 'rgba(220,232,255,0.25)', fontSize: 12, marginTop: 14 }}
      >
        Seu personal trainer digital
      </motion.p>
    </motion.div>
  )
}
