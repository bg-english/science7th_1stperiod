// components/LoginScreen.jsx
import { useState } from 'react'
import { STUDENTS } from '../data/courseData'
import { sendTelegramText } from '../utils/telegram'

export default function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState('')
  const [email, setEmail]       = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSelect = (e) => {
    setSelected(e.target.value)
    setEmail(e.target.value)
    setError('')
  }

  const handleLogin = async () => {
    setError('')
    if (!selected || !email.trim()) { setError('⚠️ Please select your name and confirm your email.'); return }
    if (email.trim().toLowerCase() !== selected.toLowerCase()) { setError('❌ Name and email do not match.'); return }
    const student = STUDENTS.find(s => s.email.toLowerCase() === selected.toLowerCase())
    if (!student) { setError('❌ Student not found.'); return }

    setLoading(true)
    const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
    await sendTelegramText(
      `🟢 <b>Student Login — 7th Grade Science</b>\n👤 <b>${student.name}</b>\n📧 ${student.email}\n🕐 ${now}`
    )
    onLogin(student)
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <span className="text-5xl">🦁</span>
          <h2 className="text-xl font-black mt-2" style={{ color: '#1a3a6b' }}>Welcome, Student!</h2>
          <p className="text-sm text-gray-500 mt-1">Log in with your institutional email to start the review.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" style={{ color: '#1a3a6b' }}>Select your name</label>
          <select value={selected} onChange={handleSelect}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none transition-colors"
            style={{ fontFamily: 'Nunito, sans-serif' }}
            onFocus={e => e.target.style.borderColor = '#1a3a6b'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}>
            <option value="">— Choose your name —</option>
            {STUDENTS.map(s => <option key={s.email} value={s.email}>{s.name}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" style={{ color: '#1a3a6b' }}>Institutional Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="yourname@redboston.edu.co"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
            style={{ fontFamily: 'Nunito, sans-serif' }}
            onFocus={e => e.target.style.borderColor = '#1a3a6b'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {error && <p className="text-red-600 text-sm font-bold mb-3">{error}</p>}

        <button onClick={handleLogin} disabled={loading}
          className="w-full text-white font-black py-3 rounded-xl text-base transition-all"
          style={{ background: loading ? '#9ca3af' : '#1a3a6b', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Entering…' : 'Enter Review →'}
        </button>
      </div>
    </div>
  )
}
