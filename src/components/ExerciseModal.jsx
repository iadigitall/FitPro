import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, RotateCcw, Zap, ChevronRight } from 'lucide-react'

function TagChip({ children, color = 'primary' }) {
  const classes = {
    primary: 'bg-primary/10 text-primary',
    red: 'bg-red-500/10 text-red-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    blue: 'bg-blue-500/10 text-blue-400',
  }
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${classes[color]}`}>
      {children}
    </span>
  )
}

function DifficultyColor(difficulty) {
  if (difficulty === 'Iniciante') return 'primary'
  if (difficulty === 'Intermediário') return 'yellow'
  return 'red'
}

export function ExerciseModal({ exercise, onClose }) {
  useEffect(() => {
    if (!exercise) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [exercise])

  if (!exercise) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-surface w-full max-w-lg rounded-t-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-border rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between px-5 py-3">
            <div className="flex-1 pr-4">
              <h2 className="text-text text-xl font-bold leading-tight">{exercise.name}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <TagChip color="primary">{exercise.group}</TagChip>
                <TagChip color={DifficultyColor(exercise.difficulty)}>{exercise.difficulty}</TagChip>
                <TagChip color="blue">{exercise.equipment}</TagChip>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-muted hover:text-text transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Video / Placeholder */}
          <div className="mx-5 rounded-2xl overflow-hidden bg-surface-2 aspect-video flex items-center justify-center">
            {exercise.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${exercise.videoId}?rel=0&modestbranding=1`}
                title={exercise.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted p-8">
                <div className="w-16 h-16 rounded-full bg-surface-3 flex items-center justify-center">
                  <Zap size={28} className="text-primary" />
                </div>
                <p className="text-sm text-center">Vídeo demonstrativo em breve</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mx-5 mt-4">
            <div className="bg-surface-2 rounded-xl p-3 text-center">
              <p className="text-primary text-lg font-bold">{exercise.sets}</p>
              <p className="text-muted text-xs mt-0.5">Séries</p>
            </div>
            <div className="bg-surface-2 rounded-xl p-3 text-center">
              <p className="text-primary text-lg font-bold">{exercise.reps}</p>
              <p className="text-muted text-xs mt-0.5">Repetições</p>
            </div>
            <div className="bg-surface-2 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock size={14} className="text-primary" />
                <p className="text-primary text-lg font-bold">{exercise.rest}s</p>
              </div>
              <p className="text-muted text-xs mt-0.5">Descanso</p>
            </div>
          </div>

          {/* Description */}
          <div className="mx-5 mt-4">
            <h3 className="text-text font-semibold text-sm mb-2">Como executar</h3>
            <p className="text-muted text-sm leading-relaxed">{exercise.description}</p>
          </div>

          {/* Muscles */}
          {exercise.muscles && (
            <div className="mx-5 mt-4">
              <h3 className="text-text font-semibold text-sm mb-2">Músculos trabalhados</h3>
              <div className="flex flex-wrap gap-2">
                {exercise.muscles.map((m) => (
                  <span key={m} className="text-xs bg-surface-3 text-muted px-2 py-1 rounded-lg">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {exercise.tips && (
            <div className="mx-5 mt-4 mb-8">
              <h3 className="text-text font-semibold text-sm mb-2 flex items-center gap-1.5">
                <RotateCcw size={14} className="text-primary" />
                Dicas de execução
              </h3>
              <div className="space-y-2">
                {exercise.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-muted text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
