import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
}

const colors = {
  success: 'border-primary text-primary',
  error: 'border-danger text-danger',
  info: 'border-info text-blue-400',
}

export function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [message, onClose, duration])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
            bg-surface-2 border rounded-xl px-4 py-3 shadow-2xl min-w-[280px] max-w-[90vw]
            ${colors[type]}`}
        >
          <span className={colors[type]}>{icons[type]}</span>
          <p className="text-text text-sm font-medium flex-1">{message}</p>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function WorkoutCompleteToast({ onClose }) {
  return (
    <Toast
      message="🎉 Treino concluído! Incrível, continue assim!"
      type="success"
      onClose={onClose}
      duration={4000}
    />
  )
}
