import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Save, LogOut, Check, Mail, Trash2, Lock, Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, deleteAllUserData } from '../services/firestore'
import { logOut, resendVerificationEmail, deleteAccount } from '../services/auth'
import { Toast } from '../components/Toast'

export default function Profile() {
  const { user, profile, setProfile } = useAuthStore()
  const fileRef = useRef()
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [openSection, setOpenSection] = useState(null)

  const [deleteModal, setDeleteModal] = useState(false)
  const [deletePass, setDeletePass] = useState('')
  const [showDeletePass, setShowDeletePass] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [resendingEmail, setResendingEmail] = useState(false)

  const EXPERIENCE_LEVELS = [
    { id: 'iniciante',     label: 'Iniciante',     desc: 'Até 1 ano de treino' },
    { id: 'intermediario', label: 'Intermediário', desc: '1 a 3 anos de treino' },
    { id: 'avancado',      label: 'Avançado',      desc: 'Mais de 3 anos' },
  ]

  const DIETARY_OPTIONS = [
    { id: 'vegetariano', label: 'Vegetariano' },
    { id: 'vegano',      label: 'Vegano' },
    { id: 'sem_lactose', label: 'Sem lactose' },
    { id: 'sem_gluten',  label: 'Sem glúten' },
    { id: 'nenhuma_d',   label: 'Sem restrições' },
  ]

  const GOALS = [
    { id: 'hipertrofia',     label: 'Hipertrofia',     desc: 'Ganhar massa muscular' },
    { id: 'emagrecimento',   label: 'Emagrecimento',   desc: 'Perder gordura corporal' },
    { id: 'condicionamento', label: 'Condicionamento', desc: 'Melhorar forma física' },
  ]

  const [form, setForm] = useState({
    name:                profile?.name                || '',
    weight:              profile?.weight              || '',
    height:              profile?.height              || '',
    age:                 profile?.age                 || '',
    sex:                 profile?.sex                 || 'masculino',
    goal:                profile?.goal                || 'hipertrofia',
    experienceLevel:     profile?.experienceLevel     || '',
    frequency:           profile?.frequency           || 4,
    workoutTime:         profile?.workoutTime         || 'manhã',
    dietaryRestrictions: profile?.dietaryRestrictions || [],
    photoURL:            profile?.photoURL            || null,
  })

  const toggleSection = (id) => setOpenSection(prev => prev === id ? null : id)

  const toggleDietary = (id) => {
    if (id === 'nenhuma_d') { setForm(f => ({ ...f, dietaryRestrictions: ['nenhuma_d'] })); return }
    setForm(f => {
      const current = (f.dietaryRestrictions || []).filter(r => r !== 'nenhuma_d')
      return { ...f, dietaryRestrictions: current.includes(id) ? current.filter(r => r !== id) : [...current, id] }
    })
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const SIZE = 240
        canvas.width = SIZE; canvas.height = SIZE
        const ctx = canvas.getContext('2d')
        const min = Math.min(img.width, img.height)
        ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, SIZE, SIZE)
        setForm(f => ({ ...f, photoURL: canvas.toDataURL('image/jpeg', 0.82) }))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      const data = { ...form, weight: Number(form.weight), height: Number(form.height), age: Number(form.age), frequency: Number(form.frequency) }
      await updateUserProfile(user.uid, data)
      setProfile({ ...profile, ...data })
      setOpenSection(null)
      setToast('Perfil atualizado!')
    } catch { setToast('Erro ao salvar. Tente novamente.') }
    finally { setSaving(false) }
  }

  const handleResendEmail = async () => {
    if (!user || resendingEmail) return
    setResendingEmail(true)
    try { await resendVerificationEmail(user); setToast('E-mail de verificação reenviado!') }
    catch { setToast('Erro ao reenviar. Tente novamente.') }
    finally { setResendingEmail(false) }
  }

  const handleDeleteAccount = async () => {
    if (!user || !deletePass) return
    setDeleting(true); setDeleteError('')
    try { await deleteAllUserData(user.uid); await deleteAccount(user, deletePass) }
    catch (err) {
      const msgs = { 'auth/wrong-password': 'Senha incorreta.', 'auth/invalid-credential': 'Senha incorreta.', 'auth/too-many-requests': 'Muitas tentativas. Aguarde.' }
      setDeleteError(msgs[err.code] || 'Erro ao deletar. Tente novamente.')
    } finally { setDeleting(false) }
  }

  // Summaries para exibir no accordion fechado
  const dietarySummary = () => {
    const d = form.dietaryRestrictions || []
    if (!d.length) return '—'
    if (d.includes('nenhuma_d')) return 'Sem restrições'
    return d.map(id => DIETARY_OPTIONS.find(o => o.id === id)?.label).filter(Boolean).join(', ')
  }

  const firstName = form.name?.split(' ')[0] || '?'
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, color: '#f0f0f0', fontSize: 14, padding: '12px 14px', width: '100%', outline: 'none', fontFamily: 'inherit' }

  // Componente inline de accordion
  const AccordionRow = ({ id, title, summary, children, last }) => {
    const isOpen = openSection === id
    return (
      <div>
        <button
          onClick={() => toggleSection(id)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '17px 20px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', gap: 12 }}
        >
          <span style={{ flex: 1, color: '#f0f0f0', fontSize: 14, fontWeight: 600, textAlign: 'left' }}>
            {title}
          </span>
          {!isOpen && summary && (
            <span style={{ color: 'rgba(220,232,255,0.3)', fontSize: 12, maxWidth: 120, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {summary}
            </span>
          )}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={15} style={{ color: 'rgba(220,232,255,0.25)', flexShrink: 0 }} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 20px 20px' }}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!last && <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 20px' }} />}
      </div>
    )
  }

  return (
    <div className="min-h-full pb-6">
      <Toast message={toast} onClose={() => setToast('')} />

      {/* Header */}
      <div className="px-4 pt-8 pb-2">
        <p className="text-muted text-sm font-medium mb-0.5">Configurações</p>
        <h1 className="text-text text-3xl font-bold tracking-tight">Perfil</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-7">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ background: form.photoURL ? 'transparent' : 'linear-gradient(135deg, #1a52f5 0%, #0a2fa8 100%)', boxShadow: '0 8px 32px rgba(20,74,224,0.4)' }}>
            {form.photoURL
              ? <img src={form.photoURL} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-white text-3xl font-bold">{firstName[0]?.toUpperCase()}</span>}
          </div>
          <button onClick={() => fileRef.current?.click()}
            className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(220,232,255,0.95)', boxShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
            <Camera size={16} style={{ color: '#07102a' }} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>
        <p className="text-muted text-xs mt-4">Toque na câmera para alterar a foto</p>
      </div>

      <div className="px-4 space-y-3">
        {/* Accordion principal */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-glass rounded-2xl overflow-hidden">

          <AccordionRow id="dados" title="Dados Pessoais" summary={form.name || '—'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nome completo</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Seu nome" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[{ key: 'weight', label: 'Peso', unit: 'kg' }, { key: 'height', label: 'Altura', unit: 'cm' }].map(({ key, label, unit }) => (
                  <div key={key}>
                    <label style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>{label}</label>
                    <div style={{ position: 'relative' }}>
                      <input type="number" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ ...inputStyle, paddingRight: 36 }} />
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(220,232,255,0.3)', fontSize: 12 }}>{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>Idade</label>
                  <div style={{ position: 'relative' }}>
                    <input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} style={{ ...inputStyle, paddingRight: 44 }} />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(220,232,255,0.3)', fontSize: 12 }}>anos</span>
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>Sexo</label>
                  <select value={form.sex} onChange={e => setForm(f => ({ ...f, sex: e.target.value }))} style={{ ...inputStyle, appearance: 'none' }}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
              </div>
            </div>
          </AccordionRow>

          <AccordionRow id="objetivo" title="Objetivo" summary={GOALS.find(g => g.id === form.goal)?.label}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {GOALS.map(g => (
                <button key={g.id} onClick={() => setForm(f => ({ ...f, goal: g.id }))}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', background: form.goal === g.id ? 'rgba(220,232,255,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${form.goal === g.id ? 'rgba(220,232,255,0.18)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{g.label}</p>
                    <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 12 }}>{g.desc}</p>
                  </div>
                  {form.goal === g.id && (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(220,232,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} style={{ color: '#07102a' }} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </AccordionRow>

          <AccordionRow id="nivel" title="Nível de Experiência" summary={EXPERIENCE_LEVELS.find(l => l.id === form.experienceLevel)?.label || 'Não definido'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EXPERIENCE_LEVELS.map(lvl => (
                <button key={lvl.id} onClick={() => setForm(f => ({ ...f, experienceLevel: lvl.id }))}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', background: form.experienceLevel === lvl.id ? 'rgba(220,232,255,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${form.experienceLevel === lvl.id ? 'rgba(220,232,255,0.18)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{lvl.label}</p>
                    <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 12 }}>{lvl.desc}</p>
                  </div>
                  {form.experienceLevel === lvl.id && (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(220,232,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} style={{ color: '#07102a' }} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </AccordionRow>

          <AccordionRow id="dieta" title="Preferências Alimentares" summary={dietarySummary()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DIETARY_OPTIONS.map(opt => {
                const sel = (form.dietaryRestrictions || []).includes(opt.id)
                return (
                  <button key={opt.id} onClick={() => toggleDietary(opt.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', background: sel ? 'rgba(220,232,255,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${sel ? 'rgba(220,232,255,0.18)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, border: `2px solid ${sel ? 'rgba(220,232,255,0.9)' : 'rgba(255,255,255,0.2)'}`, background: sel ? 'rgba(220,232,255,0.9)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {sel && <Check size={10} style={{ color: '#07102a' }} strokeWidth={3} />}
                    </div>
                    <span style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 500 }}>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </AccordionRow>

          <AccordionRow id="freq" title="Frequência" summary={`${form.frequency}x / semana`}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[3, 4, 5].map(f => (
                <button key={f} onClick={() => setForm(frm => ({ ...frm, frequency: f }))}
                  style={{ flex: 1, padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', background: form.frequency === f ? 'rgba(220,232,255,0.95)' : 'rgba(255,255,255,0.04)', color: form.frequency === f ? '#07102a' : 'rgba(220,232,255,0.45)', border: `1px solid ${form.frequency === f ? 'rgba(220,232,255,0.7)' : 'rgba(255,255,255,0.07)'}` }}>
                  {f}x / sem
                </button>
              ))}
            </div>
          </AccordionRow>

          <AccordionRow id="horario" title="Horário preferido" summary={form.workoutTime} last>
            <div style={{ display: 'flex', gap: 10 }}>
              {['manhã', 'tarde', 'noite'].map(t => (
                <button key={t} onClick={() => setForm(f => ({ ...f, workoutTime: t }))}
                  style={{ flex: 1, padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', background: form.workoutTime === t ? 'rgba(220,232,255,0.95)' : 'rgba(255,255,255,0.04)', color: form.workoutTime === t ? '#07102a' : 'rgba(220,232,255,0.45)', border: `1px solid ${form.workoutTime === t ? 'rgba(220,232,255,0.7)' : 'rgba(255,255,255,0.07)'}` }}>
                  {t}
                </button>
              ))}
            </div>
          </AccordionRow>

        </motion.div>

        {/* Salvar */}
        <button onClick={handleSave} disabled={saving}
          className="w-full btn-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
          {saving
            ? <span className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(7,16,42,0.25)', borderTopColor: '#07102a' }} />
            : <><Save size={18} style={{ color: '#07102a' }} /><span style={{ color: '#07102a' }}>Salvar alterações</span></>}
        </button>

        {/* Card de conta */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-glass rounded-2xl overflow-hidden">
          <button onClick={() => logOut()} className="w-full flex items-center gap-3 px-5 py-4 text-left"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(220,232,255,0.07)' }}>
              <LogOut size={15} style={{ color: 'rgba(220,232,255,0.5)' }} />
            </div>
            <span style={{ flex: 1, color: 'rgba(220,232,255,0.7)', fontSize: 14, fontWeight: 500 }}>Sair da conta</span>
            <ChevronRight size={14} style={{ color: 'rgba(220,232,255,0.2)' }} />
          </button>

          {user && !user.emailVerified && (
            <>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 20px' }} />
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.08)' }}>
                  <Mail size={15} style={{ color: 'rgba(251,191,36,0.7)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'rgba(220,232,255,0.65)', fontSize: 14, fontWeight: 500, marginBottom: 1 }}>E-mail não confirmado</p>
                  <p style={{ color: 'rgba(220,232,255,0.25)', fontSize: 11 }}>{user.email}</p>
                </div>
                <button onClick={handleResendEmail} disabled={resendingEmail}
                  style={{ padding: '5px 11px', borderRadius: 8, flexShrink: 0, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', color: 'rgba(251,191,36,0.7)', fontSize: 11, fontWeight: 600, cursor: resendingEmail ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: resendingEmail ? 0.5 : 1, whiteSpace: 'nowrap' }}>
                  {resendingEmail ? '...' : 'Reenviar'}
                </button>
              </div>
            </>
          )}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 20px' }} />

          <button onClick={() => { setDeleteModal(true); setDeleteError(''); setDeletePass('') }}
            className="w-full flex items-center gap-3 px-5 py-4 text-left"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,71,87,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,71,87,0.07)' }}>
              <Trash2 size={15} style={{ color: 'rgba(255,71,87,0.6)' }} />
            </div>
            <span style={{ flex: 1, color: 'rgba(255,71,87,0.65)', fontSize: 14, fontWeight: 500 }}>Excluir conta</span>
            <ChevronRight size={14} style={{ color: 'rgba(255,71,87,0.2)' }} />
          </button>
        </motion.div>
      </div>

      {/* Modal deletar conta */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}
            onClick={(e) => { if (e.target === e.currentTarget) setDeleteModal(false) }}>
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              style={{ width: '100%', background: 'linear-gradient(180deg, #0d1425 0%, #080f1e 100%)', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none', borderRadius: '28px 28px 0 0', padding: '28px 20px 36px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', margin: '0 auto 24px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, flexShrink: 0, background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={20} style={{ color: '#FF4757' }} />
                </div>
                <div>
                  <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 16, marginBottom: 3 }}>Excluir conta</p>
                  <p style={{ color: 'rgba(220,232,255,0.35)', fontSize: 12, lineHeight: 1.4 }}>Ação irreversível. Todos os dados serão apagados.</p>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ color: 'rgba(220,232,255,0.4)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>Confirme com sua senha</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={13} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(220,232,255,0.25)', pointerEvents: 'none' }} />
                  <input type={showDeletePass ? 'text' : 'password'} value={deletePass} onChange={e => setDeletePass(e.target.value)} placeholder="••••••••"
                    style={{ width: '100%', paddingLeft: 38, paddingRight: 44, paddingTop: 13, paddingBottom: 13, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, color: '#f0f0f0', fontSize: 15, outline: 'none', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,71,87,0.35)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
                  <button type="button" onClick={() => setShowDeletePass(v => !v)}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(220,232,255,0.3)', display: 'flex' }}>
                    {showDeletePass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {deleteError && (
                <p style={{ color: '#FF4757', fontSize: 12, marginBottom: 12, padding: '9px 13px', background: 'rgba(255,71,87,0.07)', borderRadius: 10, border: '1px solid rgba(255,71,87,0.15)' }}>
                  {deleteError}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                <button onClick={handleDeleteAccount} disabled={deleting || !deletePass}
                  style={{ width: '100%', padding: '15px', borderRadius: 16, background: deleting || !deletePass ? 'rgba(255,71,87,0.08)' : 'rgba(255,71,87,0.88)', color: deleting || !deletePass ? 'rgba(255,71,87,0.35)' : '#fff', border: `1px solid ${deleting || !deletePass ? 'rgba(255,71,87,0.12)' : 'rgba(255,71,87,0.5)'}`, fontWeight: 700, fontSize: 14, cursor: deleting || !deletePass ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {deleting ? <><span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />Excluindo...</> : 'Confirmar exclusão'}
                </button>
                <button onClick={() => setDeleteModal(false)}
                  style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(220,232,255,0.35)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
