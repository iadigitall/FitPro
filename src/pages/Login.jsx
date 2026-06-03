import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Dumbbell } from 'lucide-react'
import { signIn } from '../services/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      const msgs = {
        'auth/user-not-found':    'Usuário não encontrado.',
        'auth/wrong-password':    'Senha incorreta.',
        'auth/invalid-email':     'E-mail inválido.',
        'auth/invalid-credential':'E-mail ou senha incorretos.',
        'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',
      }
      setError(msgs[err.code] || 'Erro ao entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 15%, #1a44d8 0%, #070d1f 52%, #030810 100%)',
      }}
    >
      {/* Hero brand */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 22 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 0 48px rgba(220,232,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <Dumbbell size={34} color="white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-white font-black tracking-tight uppercase mb-2"
          style={{ fontSize: 44, lineHeight: 1 }}
        >
          FitPro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center"
          style={{ color: 'rgba(220,232,255,0.35)', fontSize: 14 }}
        >
          Seu personal trainer digital
        </motion.p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 28 }}
        className="w-full px-5 pt-8 pb-10 rounded-t-[32px]"
        style={{
          background: 'rgba(8,14,32,0.96)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(220,232,255,0.08)',
        }}
      >
        <h2 className="text-text text-xl font-bold mb-1">Bem-vindo de volta</h2>
        <p className="mb-7" style={{ color: 'rgba(220,232,255,0.3)', fontSize: 13 }}>
          Entre com sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-muted text-xs font-semibold block mb-2 uppercase tracking-wider">
              E-mail
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-text text-sm placeholder:text-muted/40 focus:outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(220,232,255,0.35)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="text-muted text-xs font-semibold block mb-2 uppercase tracking-wider">
              Senha
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-text text-sm placeholder:text-muted/40 focus:outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(220,232,255,0.35)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-danger text-sm rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)' }}
            >
              {error}
            </motion.p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary font-bold py-4 rounded-2xl text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: '#07102a' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: 'rgba(7,16,42,0.25)', borderTopColor: '#07102a' }} />
                Entrando...
              </span>
            ) : 'Entrar'}
          </button>
        </form>

        <p className="text-center mt-6" style={{ color: 'rgba(220,232,255,0.3)', fontSize: 14 }}>
          Não tem conta?{' '}
          <Link
            to="/register"
            className="font-bold hover:underline"
            style={{ color: 'rgba(220,232,255,0.85)' }}
          >
            Criar agora
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
