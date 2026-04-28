// components/Workshop.jsx
import { useState } from 'react'
import { WORKSHOP_QUESTIONS } from '../data/courseData'
import { sendTelegramText, sendTelegramDocument } from '../utils/telegram'
import { generateWorkshopPDF } from '../utils/generatePdf'

function ResultModal({ score, total, pct, onClose }) {
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '📚' : '💪'
  const color = pct >= 70 ? '#27ae60' : pct >= 50 ? '#d35400' : '#c0392b'
  const msg = pct >= 70
    ? 'Great work! Your teacher received your PDF results. God bless your studies! 🌿'
    : 'Your PDF has been sent to your teacher. Keep studying — you can do it! 💪'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="text-6xl mb-3">{emoji}</div>
        <h2 className="text-xl font-black mb-2">Workshop Submitted!</h2>
        <div className="text-5xl font-black my-4" style={{ color }}>{score}/{total} — {pct}%</div>
        <p className="text-sm text-gray-500 leading-relaxed">{msg}</p>
        <button onClick={onClose} className="mt-5 px-8 py-3 rounded-xl text-white font-black text-base"
          style={{ background: '#1a3a6b' }}>Close</button>
      </div>
    </div>
  )
}

export default function Workshop({ student }) {
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const mcTf = WORKSHOP_QUESTIONS.filter(q => q.type !== 'open')
  const open  = WORKSHOP_QUESTIONS.filter(q => q.type === 'open')

  const selectOption = (id, val) => setAnswers(p => ({ ...p, [id]: val }))
  const setOpen = (id, val) => setAnswers(p => ({ ...p, [id]: val }))

  const handleSubmit = async () => {
    // Validate
    const mcAnswered = mcTf.every(q => answers[q.id] !== undefined)
    const openAnswered = open.every(q => (answers[q.id] || '').trim().length >= 20)
    if (!mcAnswered || !openAnswered) {
      setStatus('⚠️ Please answer all questions before submitting. Open questions need at least 20 characters.')
      return
    }

    setLoading(true); setStatus('Grading your workshop...')

    // Grade
    let score = 0
    const details = mcTf.map(q => {
      const given = answers[q.id]
      const correct = q.correct
      const givenLabel = q.type === 'tf'
        ? (given ? 'TRUE' : 'FALSE')
        : q.options?.[given] || String(given)
      const correctLabel = q.type === 'tf'
        ? (correct ? 'TRUE' : 'FALSE')
        : q.options?.[correct] || String(correct)
      const ok = given === correct
      if (ok) score++
      return { id: q.id, ok, given: givenLabel, correct: correctLabel }
    })

    const total = mcTf.length
    const pct = Math.round((score / total) * 100)
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '📚' : '💪'
    const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })

    setStatus('Generating PDF...')

    const openAnswers = open.map(q => ({
      label: `Q${open.indexOf(q) + 7} — ${q.section}:`,
      instruction: q.text,
      answer: answers[q.id] || '',
    }))

    const pdfBytes = generateWorkshopPDF({ student, score, total, pct, details, openAnswers, now })

    setStatus('Sending to Telegram...')

    const detailText = details.map(d => `${d.id}: ${d.ok ? '✅' : '❌'} (${d.given} → correct: ${d.correct})`).join('\n')
    const q7 = answers['wq7'] || ''
    const q8 = answers['wq8'] || ''

    await sendTelegramText(
      `📝 <b>WORKSHOP SUBMITTED — 7th Grade Science</b>\n` +
      `👤 <b>${student.name}</b>\n📧 ${student.email}\n🕐 ${now}\n\n` +
      `<b>📊 SCORE: ${score}/${total} (${pct}%) ${emoji}</b>\n\n` +
      `<b>Results:</b>\n${detailText}\n\n` +
      `<b>Q7 — Food Web Analysis:</b>\n${q7}\n\n` +
      `<b>Q8 — Biblical Reflection:</b>\n${q8}`
    )

    const fileName = `Workshop_${student.name.replace(/\s+/g, '_')}_Science7.pdf`
    await sendTelegramDocument(pdfBytes, fileName, `📄 ${student.name} — Science Workshop ${pct}%`)

    setResult({ score, total, pct })
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {result && <ResultModal {...result} onClose={() => setResult(null)} />}

      <div className="rounded-2xl p-6 mb-5 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #c0392b, #6b0f0f)' }}>
        <h2 className="text-xl font-black mb-2">📝 Final Workshop</h2>
        <p className="text-sm opacity-90 leading-relaxed">Answer every question carefully. When you press Submit, your graded PDF will be sent to your teacher via Telegram.</p>
      </div>

      {/* MC / TF */}
      {mcTf.map((q, idx) => (
        <div key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#c0392b' }}>
            Question {idx + 1} · {q.type === 'tf' ? 'True / False' : 'Multiple Choice'} · {q.section}
          </p>
          <p className="font-bold text-sm mb-4 leading-snug">{q.text}</p>
          {q.type === 'mc' ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <div key={i} onClick={() => selectOption(q.id, i)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold"
                  style={{
                    borderColor: answers[q.id] === i ? '#1a3a6b' : '#e5e7eb',
                    background: answers[q.id] === i ? '#dde8f7' : 'white',
                  }}>
                  <input type="radio" readOnly checked={answers[q.id] === i}
                    className="w-4 h-4 flex-shrink-0" style={{ accentColor: '#1a3a6b' }} />
                  <label className="cursor-pointer">{opt}</label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => selectOption(q.id, val)}
                  className="flex-1 py-3 rounded-xl border-2 font-black text-sm transition-all"
                  style={{
                    borderColor: answers[q.id] === val ? '#1a3a6b' : '#e5e7eb',
                    background: answers[q.id] === val ? '#dde8f7' : 'white',
                    color: answers[q.id] === val ? '#1a3a6b' : '#6b7280',
                  }}>
                  {val ? 'TRUE' : 'FALSE'}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Open questions */}
      {open.map((q, idx) => (
        <div key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#c0392b' }}>
            Question {mcTf.length + idx + 1} · Open Question · {q.section}
          </p>
          <p className="font-bold text-sm mb-3 leading-snug">{q.text}</p>
          <textarea rows={4} placeholder={q.placeholder}
            value={answers[q.id] || ''}
            onChange={e => setOpen(q.id, e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none transition-colors"
            style={{ fontFamily: 'Nunito, sans-serif', minHeight: '90px' }}
            onFocus={e => e.target.style.borderColor = '#1a3a6b'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      ))}

      <div className="text-center pt-2 pb-8">
        {status && <p className="text-sm text-gray-500 mb-3">{status}</p>}
        <button onClick={handleSubmit} disabled={loading}
          className="px-12 py-4 rounded-xl text-white font-black text-base transition-all shadow-lg"
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #1a3a6b, #0d2247)',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(26,58,107,0.35)',
          }}>
          {loading ? 'Sending… ⏳' : 'Submit Workshop 🚀'}
        </button>
      </div>
    </div>
  )
}
