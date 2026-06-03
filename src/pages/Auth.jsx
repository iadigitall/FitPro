import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import { useRef, useCallback } from 'react'
import { signIn, signUp, resetPassword } from '../services/auth'
import { saveProfile, searchGyms } from '../services/firestore'
import { Building2, Check } from 'lucide-react'
import { FitProLogo } from '../components/Splash'

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(255,255,255,0.09)',
}

function Field({ icon: Icon, type, value, onChange, placeholder, right }) {
  return (
    <div style={{ position: 'relative' }}>
      {Icon && (
        <Icon size={14} style={{
          position: 'absolute', left: 14,
          top: '50%', transform: 'translateY(-50%)',
          color: 'rgba(220,232,255,0.3)', pointerEvents: 'none'
        }} />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={{
          ...inputBase,
          width: '100%',
          paddingLeft: Icon ? 40 : 14,
          paddingRight: right ? 42 : 14,
          paddingTop: 11, paddingBottom: 11,
          borderRadius: 12, color: '#f0f0f0',
          fontSize: 14, outline: 'none',
          fontFamily: 'inherit', transition: 'border-color 0.2s',
          WebkitAppearance: 'none',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(220,232,255,0.3)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
      />
      {right}
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotMode, setForgotMode] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const navigate = useNavigate()

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

  const handleReset = async (e) => {
    e.preventDefault()
    setResetLoading(true)
    try {
      await resetPassword(forgotEmail)
      setResetSent(true)
    } catch {
      setError('E-mail não encontrado ou inválido.')
      setForgotMode(false)
    } finally {
      setResetLoading(false)
    }
  }

  if (resetSent) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>📩</div>
        <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
          Link enviado!
        </p>
        <p style={{ color: 'rgba(220,232,255,0.45)', fontSize: 13, marginBottom: 20 }}>
          Verifique sua caixa de entrada em <strong style={{ color: '#dce8ff' }}>{forgotEmail}</strong>
        </p>
        <button onClick={() => { setResetSent(false); setForgotMode(false) }}
          style={{ color: 'rgba(220,232,255,0.6)', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
          Voltar ao login
        </button>
      </motion.div>
    )
  }

  if (forgotMode) {
    return (
      <motion.form initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
        onSubmit={handleReset}
        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ color: 'rgba(220,232,255,0.5)', fontSize: 13, margin: 0 }}>
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
        <Field label="E-mail" icon={Mail} type="email" value={forgotEmail}
          onChange={e => setForgotEmail(e.target.value)} placeholder="seu@email.com" />
        <button type="submit" disabled={resetLoading} className="btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: 14, fontWeight: 700,
            fontSize: 14, color: '#07102a', border: 'none', fontFamily: 'inherit',
            opacity: resetLoading ? 0.6 : 1, cursor: 'pointer' }}>
          {resetLoading ? 'Enviando...' : 'Enviar link de redefinição'}
        </button>
        <button type="button" onClick={() => setForgotMode(false)}
          style={{ color: 'rgba(220,232,255,0.4)', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
          Voltar ao login
        </button>
      </motion.form>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <Field label="E-mail" icon={Mail} type="email" value={email}
        onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />

      <div>
        <Field label="Senha" icon={Lock} type={showPass ? 'text' : 'password'}
          value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha"
          right={
            <button type="button" onClick={() => setShowPass(v => !v)}
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(220,232,255,0.35)' }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <button type="button" onClick={() => setForgotMode(true)}
          style={{ marginTop: 8, color: 'rgba(220,232,255,0.4)', background: 'none',
            border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
            display: 'block', textAlign: 'right', width: '100%' }}>
          Esqueceu a senha?
        </button>
      </div>

      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          style={{ color: '#FF4757', fontSize: 13, padding: '10px 14px',
            background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 12, margin: 0 }}>
          {error}
        </motion.p>
      )}

      <button type="submit" disabled={loading} className="btn-primary"
        style={{ width: '100%', padding: '15px', borderRadius: 14, fontWeight: 700,
          fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1, color: '#07102a', border: 'none', fontFamily: 'inherit' }}>
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 16, height: 16, border: '2px solid rgba(7,16,42,0.2)',
              borderTopColor: '#07102a', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
              display: 'inline-block' }} />
            Entrando...
          </span>
        ) : 'Entrar'}
      </button>
    </form>
  )
}

function GymField({ value, onChange }) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState(false)
  const timerRef = useRef(null)

  const search = useCallback((term) => {
    clearTimeout(timerRef.current)
    if (term.length < 2) { setResults([]); setOpen(false); return }
    setSearching(true)
    timerRef.current = setTimeout(async () => {
      try {
        const res = await searchGyms(term)
        setResults(res)
        setOpen(true)
      } catch { setResults([]) }
      finally { setSearching(false) }
    }, 350)
  }, [])

  const handleChange = (e) => {
    const v = e.target.value
    setQuery(v)
    onChange(v)
    setSelected(false)
    search(v)
  }

  const handleSelect = (gym) => {
    setQuery(gym.name)
    onChange(gym.name)
    setSelected(true)
    setOpen(false)
    setResults([])
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <Building2 size={14} style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          color: selected ? '#dce8ff' : 'rgba(220,232,255,0.35)', pointerEvents: 'none'
        }} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          placeholder="Digite o nome da sua academia"
          required
          style={{
            ...inputBase,
            width: '100%', paddingLeft: 40, paddingRight: 40,
            paddingTop: 11, paddingBottom: 11,
            borderRadius: 12, color: '#f0f0f0', fontSize: 14,
            outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.2s', WebkitAppearance: 'none',
            borderColor: selected ? 'rgba(220,232,255,0.35)' : undefined,
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(220,232,255,0.35)'}
          onBlur={e => {
            setTimeout(() => setOpen(false), 180)
            if (!selected) e.target.style.borderColor = 'rgba(255,255,255,0.09)'
          }}
        />
        {searching && (
          <span style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            width: 14, height: 14, border: '2px solid rgba(220,232,255,0.15)',
            borderTopColor: 'rgba(220,232,255,0.5)', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite', display: 'inline-block'
          }} />
        )}
        {selected && (
          <Check size={14} style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            color: '#dce8ff'
          }} />
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
              marginTop: 6, borderRadius: 14, overflow: 'hidden',
              background: 'rgba(10,16,32,0.97)',
              border: '1px solid rgba(220,232,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {results.length > 0 ? (
              results.map(gym => (
                <button key={gym.id} type="button" onMouseDown={() => handleSelect(gym)}
                  style={{
                    width: '100%', padding: '12px 16px', textAlign: 'left',
                    background: 'none', border: 'none', cursor: 'pointer',
                    borderBottom: '1px solid rgba(220,232,255,0.06)',
                    color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,232,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <Building2 size={14} style={{ color: 'rgba(220,232,255,0.4)', shrink: 0 }} />
                  <span>{gym.name}</span>
                  {gym.city && <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 12 }}>— {gym.city}</span>}
                </button>
              ))
            ) : (
              <div style={{ padding: '14px 16px' }}>
                <p style={{ color: 'rgba(220,232,255,0.4)', fontSize: 13, margin: 0 }}>
                  Academia não encontrada ainda.
                </p>
                <p style={{ color: 'rgba(220,232,255,0.25)', fontSize: 11, marginTop: 4 }}>
                  Continue com o nome digitado — ela será cadastrada quando fecharmos parceria.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SignupForm() {
  const [name, setName] = useState('')
  const [gymName, setGymName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifyPending, setVerifyPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!gymName.trim()) { setError('Informe o nome da sua academia.'); return }
    if (password.length < 6) { setError('A senha deve ter no mínimo 6 caracteres.'); return }
    setLoading(true)
    try {
      const user = await signUp(email, password, name)
      await saveProfile(user.uid, { gymName: gymName.trim() })
      setVerifyPending(true)
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/invalid-email':        'E-mail inválido.',
        'auth/weak-password':        'Senha muito fraca. Use ao menos 6 caracteres.',
      }
      setError(msgs[err.code] || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (verifyPending) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📩</div>
        <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
          Verifique seu e-mail!
        </p>
        <p style={{ color: 'rgba(220,232,255,0.45)', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
          Enviamos um link de confirmação para{' '}
          <strong style={{ color: '#dce8ff' }}>{email}</strong>.
          <br />Clique no link para ativar sua conta.
        </p>
        <button onClick={() => navigate('/onboarding')}
          className="btn-primary"
          style={{
            width: '100%', padding: '13px', borderRadius: 12, fontWeight: 700,
            fontSize: 14, cursor: 'pointer', color: '#07102a',
            border: 'none', fontFamily: 'inherit', marginBottom: 10,
          }}>
          Continuar para o app
        </button>
        <p style={{ color: 'rgba(220,232,255,0.3)', fontSize: 11 }}>
          Não recebeu? Verifique a pasta de spam.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <Field label="Como quer ser chamado?" icon={User} type="text" value={name}
        onChange={e => setName(e.target.value)} placeholder="Seu nome" />

      {/* Academia com autocomplete */}
      <GymField value={gymName} onChange={setGymName} />

      <Field label="E-mail" icon={Mail} type="email" value={email}
        onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />

      <Field label="Senha" icon={Lock} type={showPass ? 'text' : 'password'}
        value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres"
        right={
          <button type="button" onClick={() => setShowPass(v => !v)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(220,232,255,0.35)' }}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          style={{ color: '#FF4757', fontSize: 13, padding: '10px 14px',
            background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 12, margin: 0 }}>
          {error}
        </motion.p>
      )}

      <button type="submit" disabled={loading}
        className="btn-primary"
        style={{
          width: '100%', padding: '12px', borderRadius: 12, fontWeight: 700,
          fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1, color: '#07102a',
          border: 'none', marginTop: 6, fontFamily: 'inherit'
        }}>
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 16, height: 16, border: '2px solid rgba(7,16,42,0.2)',
              borderTopColor: '#07102a', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
              display: 'inline-block' }} />
            Criando conta...
          </span>
        ) : 'Criar conta grátis'}
      </button>
    </form>
  )
}

export default function Auth({ defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab)

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-5 py-10"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #1444d8 0%, #070d1f 52%, #030810 100%)',
      }}
    >
      {/* Bem-vindo — acima do logo */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          color: 'rgba(220,232,255,0.45)', fontSize: 13,
          letterSpacing: '0.3px', marginBottom: 18
        }}
      >
        Bem-vindo
      </motion.p>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
      >
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(220,232,255,0.25))' }}
        >
          <FitProLogo size={58} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{
            color: '#f0f0f0', fontSize: 30, fontWeight: 800,
            letterSpacing: '-1px', lineHeight: 1, margin: 0
          }}>
            FitPro
          </h1>
          <p style={{ color: 'rgba(220,232,255,0.3)', fontSize: 12, marginTop: 5 }}>
            Seu personal trainer digital
          </p>
        </motion.div>
      </motion.div>

      {/* Auth Card — menor e mais transparente */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 220, damping: 26 }}
        style={{
          width: '100%', maxWidth: 400,
          background: 'rgba(6, 10, 22, 0.45)',
          border: '1px solid rgba(220,232,255,0.1)',
          borderRadius: 22,
          padding: '16px 16px 18px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: 4, padding: 4,
          background: 'rgba(0,0,0,0.3)', borderRadius: 12, marginBottom: 16
        }}>
          {[['login', 'Entrar'], ['signup', 'Criar conta']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{
                flex: 1, padding: '9px 10px', borderRadius: 10,
                border: 'none', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                background: tab === key ? 'rgba(220,232,255,0.95)' : 'transparent',
                color: tab === key ? '#07102a' : 'rgba(220,232,255,0.3)',
                boxShadow: tab === key ? '0 2px 12px rgba(220,232,255,0.2)' : 'none',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === 'login' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === 'login' ? 16 : -16 }}
            transition={{ duration: 0.18 }}
          >
            {tab === 'login' ? <LoginForm /> : <SignupForm />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
