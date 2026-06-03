import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Plus, Trash2, Scale, Ruler, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuthStore } from '../store/authStore'
import { saveEvolutionRecord, getEvolutionRecords, deleteEvolutionRecord } from '../services/firestore'
import { calculateBMI, getBMIStatus } from '../services/nutrition'
import { Toast } from '../components/Toast'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-xl px-3 py-2 shadow-xl">
      <p className="text-muted text-xs mb-1">{label}</p>
      <p className="text-primary text-sm font-bold">{payload[0].value} kg</p>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, unit, color = '#dce8ff' }) {
  return (
    <div className="bg-surface-2 border border-border rounded-2xl p-3 text-center">
      <Icon size={18} style={{ color }} className="mx-auto mb-1" />
      <p className="text-text text-lg font-bold">{value ?? '—'}<span className="text-muted text-xs font-normal ml-0.5">{unit}</span></p>
      <p className="text-muted text-[10px]">{label}</p>
    </div>
  )
}

export default function Evolution() {
  const { user, profile } = useAuthStore()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    weight: '',
    waist: '',
    chest: '',
    arm: '',
    thigh: '',
    bodyFat: '',
  })

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getEvolutionRecords(user.uid)
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const handleSave = async () => {
    if (!form.weight) return
    setSaving(true)
    try {
      await saveEvolutionRecord(user.uid, {
        weight: Number(form.weight),
        waist: form.waist ? Number(form.waist) : null,
        chest: form.chest ? Number(form.chest) : null,
        arm: form.arm ? Number(form.arm) : null,
        thigh: form.thigh ? Number(form.thigh) : null,
        bodyFat: form.bodyFat ? Number(form.bodyFat) : null,
      })
      const updated = await getEvolutionRecords(user.uid)
      setRecords(updated)
      setForm({ weight: '', waist: '', chest: '', arm: '', thigh: '', bodyFat: '' })
      setShowForm(false)
      setToast('Medidas registradas com sucesso!')
    } catch {
      setToast('Erro ao salvar. Verifique sua conexão.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteEvolutionRecord(user.uid, id)
      setRecords(r => r.filter(rec => rec.id !== id))
    } catch {}
  }

  const chartData = records
    .filter(r => r.weight)
    .slice(-12)
    .map(r => ({ date: r.dateStr || '—', weight: r.weight }))

  const latest = records[records.length - 1]
  const bmi = latest && profile ? calculateBMI(latest.weight, profile.height) : null
  const bmiStatus = bmi ? getBMIStatus(bmi) : null

  const weightChange = records.length >= 2
    ? (records[records.length - 1].weight - records[0].weight).toFixed(1)
    : null

  return (
    <div className="min-h-full pb-4">
      <Toast message={toast} onClose={() => setToast('')} />

      {/* Header */}
      <div className="px-4 pt-8 pb-4 flex items-center justify-between">
        <div>
          <p className="text-muted text-sm font-medium mb-0.5">{records.length} registros</p>
          <h1 className="text-text text-3xl font-bold tracking-tight">Evolução</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center
            hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} className="text-bg" />
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mx-4 mb-4 card-glass rounded-2xl p-4 overflow-hidden"
        >
          <h3 className="text-text font-bold text-sm mb-4">Novo registro de hoje</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'weight', label: 'Peso*', unit: 'kg', placeholder: '75' },
              { key: 'bodyFat', label: 'Gordura corporal', unit: '%', placeholder: '18' },
              { key: 'waist', label: 'Cintura', unit: 'cm', placeholder: '80' },
              { key: 'chest', label: 'Peito/Busto', unit: 'cm', placeholder: '95' },
              { key: 'arm', label: 'Braço', unit: 'cm', placeholder: '35' },
              { key: 'thigh', label: 'Coxa', unit: 'cm', placeholder: '55' },
            ].map(({ key, label, unit, placeholder }) => (
              <div key={key}>
                <label className="text-muted text-xs block mb-1">{label}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form[key]}
                    onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    step={0.1}
                    className="w-full bg-surface-2 border border-border rounded-xl px-3 py-2.5
                      text-text text-sm placeholder:text-muted/40 focus:border-primary transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">{unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 rounded-xl border border-border text-muted text-sm hover:text-text transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.weight}
              className="flex-1 py-3 rounded-xl bg-primary text-bg font-bold text-sm
                hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar registro'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      {latest && (
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <StatCard icon={Scale} label="Peso atual" value={latest.weight} unit="kg" color="#dce8ff" />
            {bmi && (
              <div className="bg-surface-2 border border-border rounded-2xl p-3 text-center">
                <Activity size={18} style={{ color: bmiStatus.color }} className="mx-auto mb-1" />
                <p className="text-text text-lg font-bold">{bmi}</p>
                <p className="text-muted text-[10px]">IMC</p>
                <p className="text-[9px] font-semibold" style={{ color: bmiStatus.color }}>{bmiStatus.label}</p>
              </div>
            )}
            {weightChange !== null && (
              <div className="bg-surface-2 border border-border rounded-2xl p-3 text-center">
                <TrendingUp size={18} className={`mx-auto mb-1 ${Number(weightChange) < 0 ? 'text-primary' : Number(weightChange) > 0 ? 'text-danger' : 'text-muted'}`} />
                <p className={`text-lg font-bold ${Number(weightChange) < 0 ? 'text-primary' : Number(weightChange) > 0 ? 'text-danger' : 'text-text'}`}>
                  {weightChange > 0 ? '+' : ''}{weightChange}
                  <span className="text-muted text-xs font-normal">kg</span>
                </p>
                <p className="text-muted text-[10px]">Variação total</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length >= 2 && (
        <div className="mx-4 mb-4 card-glass rounded-2xl p-4">
          <h3 className="text-text text-sm font-semibold mb-4">Evolução do peso</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#888888', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#888888', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#dce8ff"
                strokeWidth={2.5}
                dot={{ fill: '#dce8ff', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#dce8ff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Records List */}
      <div className="px-4">
        <h3 className="text-text text-sm font-semibold mb-3">Histórico de medidas</h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ruler size={24} className="text-muted" />
            </div>
            <p className="text-text font-semibold mb-1">Nenhum registro ainda</p>
            <p className="text-muted text-sm">Clique no + para adicionar seu primeiro registro</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...records].reverse().map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-2 border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-text font-bold">{rec.weight} kg</p>
                    <p className="text-muted text-xs mt-0.5">{rec.dateStr}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {rec.bodyFat  && <span className="text-muted text-xs">Gordura: <span className="text-text">{rec.bodyFat}%</span></span>}
                      {rec.waist    && <span className="text-muted text-xs">Cintura: <span className="text-text">{rec.waist}cm</span></span>}
                      {rec.chest    && <span className="text-muted text-xs">Peito: <span className="text-text">{rec.chest}cm</span></span>}
                      {rec.arm      && <span className="text-muted text-xs">Braço: <span className="text-text">{rec.arm}cm</span></span>}
                      {rec.thigh    && <span className="text-muted text-xs">Coxa: <span className="text-text">{rec.thigh}cm</span></span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="w-8 h-8 flex items-center justify-center text-muted hover:text-danger transition-colors ml-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
