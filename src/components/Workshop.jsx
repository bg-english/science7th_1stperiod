// components/Workshop.jsx - v2
import { useState, useRef } from 'react'
import { WORKSHOP_QUESTIONS, WORKSHOP_MATCH, WORKSHOP_WORDSEARCH, WORKSHOP_CROSSWORD } from '../data/courseData'
import { sendTelegramText, sendTelegramDocument } from '../utils/telegram'
import { generateWorkshopPDF } from '../utils/generatePdf'
import MatchGame from './games/MatchGame'
import WordSearch from './games/WordSearch'
import Crossword from './games/Crossword'

function ResultModal({ score, total, pct, onClose }) {
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '📚' : '💪'
  const color = pct >= 70 ? '#27ae60' : pct >= 50 ? '#d35400' : '#c0392b'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="text-6xl mb-3">{emoji}</div>
        <h2 className="text-xl font-black mb-2">Workshop Submitted!</h2>
        <div className="text-5xl font-black my-4" style={{ color }}>{score}/{total} — {pct}%</div>
        <p className="text-sm text-gray-500 leading-relaxed">
          {pct >= 70
            ? 'Great work! Your teacher received your graded PDF. God bless your studies! 🌿'
            : 'Your PDF has been sent to your teacher. Keep studying — you can do it! 💪'}
        </p>
        <button onClick={onClose} className="mt-5 px-8 py-3 rounded-xl text-white font-black text-base"
          style={{ background: '#1a3a6b' }}>Close</button>
      </div>
    </div>
  )
}

const SECTION_TABS = [
  { id: 'mc',         label: '❓ Q&A' },
  { id: 'match',      label: '🔗 Match' },
  { id: 'wordsearch', label: '🔍 Word Search' },
  { id: 'crossword',  label: '⬜ Crossword' },
  { id: 'open',       label: '✍️ Open' },
]

export default function Workshop({ student }) {
  const [answers, setAnswers]       = useState({})
  const [status, setStatus]         = useState('')
  const [loading, setLoading]       = useState(false)
  const [result, setResult]         = useState(null)
  const [section, setSection]       = useState('mc')

  // Game scores (for PDF)
  const matchScore    = useRef({ correct: 0, total: 0 })
  const wsScore       = useRef({ correct: 0, total: 0 })
  const cwScore       = useRef({ correct: 0, total: 0 })

  const mcTf = WORKSHOP_QUESTIONS.filter(q => q.type !== 'open')
  const open  = WORKSHOP_QUESTIONS.filter(q => q.type === 'open')

  const selectOption = (id, val) => setAnswers(p => ({ ...p, [id]: val }))
  const setOpen      = (id, val) => setAnswers(p => ({ ...p, [id]: val }))

  const handleSubmit = async () => {
    const mcAnswered   = mcTf.every(q => answers[q.id] !== undefined)
    const openAnswered = open.every(q => (answers[q.id] || '').trim().length >= 20)
    const gamesPlayed  = matchScore.current.total > 0 && wsScore.current.total > 0 && cwScore.current.total > 0

    const incomplete = []
    if (!mcAnswered)   incomplete.push('Q&A questions')
    if (!gamesPlayed)  incomplete.push('Match / Word Search / Crossword')
    if (!openAnswered) incomplete.push('Open questions')

    if (incomplete.length > 0) {
      const confirmed = window.confirm(
        `⚠️ You have not completed: ${incomplete.join(', ')}.

Your teacher will see which sections were left empty.

Do you still want to submit?`
      )
      if (!confirmed) return
    }

    setLoading(true); setStatus('Grading your workshop...')

    try {
      // Grade MC/TF
      let mcCorrect = 0
      const details = mcTf.map(q => {
        const given = answers[q.id]
        const givenLabel = q.type === 'tf' ? (given ? 'TRUE' : 'FALSE') : q.options?.[given] ?? String(given)
        const correctLabel = q.type === 'tf' ? (q.correct ? 'TRUE' : 'FALSE') : q.options?.[q.correct] ?? String(q.correct)
        const ok = given === q.correct
        if (ok) mcCorrect++
        return { id: q.id, ok, given: givenLabel, correct: correctLabel }
      })

      const gameTotal   = matchScore.current.total + wsScore.current.total + cwScore.current.total
      const gameCorrect = matchScore.current.correct + wsScore.current.correct + cwScore.current.correct

      // Total = 6 MC/TF + 6 match + ws words + cw cells + 2 open (partial credit not auto-graded)
      const autoTotal   = mcTf.length + (gameTotal || 0)
      const autoCorrect = mcCorrect + gameCorrect
      const pct = autoTotal > 0 ? Math.round((autoCorrect / autoTotal) * 100) : 0
      const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '📚' : '💪'
      const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })

      setStatus('Generating PDF...')

      const openAnswers = open.map((q, i) => ({
        label: `Q${mcTf.length + i + 1} — ${q.section}:`,
        instruction: q.text,
        answer: answers[q.id] || '',
      }))

      const gameResults = [
        { label: 'Match Game',   correct: matchScore.current.correct, total: matchScore.current.total },
        { label: 'Word Search',  correct: wsScore.current.correct,    total: wsScore.current.total },
        { label: 'Crossword',    correct: cwScore.current.correct,    total: cwScore.current.total },
      ]

      const pdfBlob = generateWorkshopPDF({
        student, score: autoCorrect, total: autoTotal, pct,
        details, openAnswers, gameResults, now
      })

      setStatus('Sending to Telegram...')

      const detailText   = details.map(d => `${d.id}: ${d.ok ? '✅' : '❌'} (${d.given} → ${d.correct})`).join('\n')
      const gameText     = gameResults.map(g => `${g.label}: ${g.correct}/${g.total}`).join('\n')
      const q7 = answers['wq7'] || ''
      const q8 = answers['wq8'] || ''

      await sendTelegramText(
        `📝 <b>WORKSHOP SUBMITTED — 7th Grade Science</b>\n` +
        `👤 <b>${student.name}</b>\n📧 ${student.email}\n🕐 ${now}\n\n` +
        `<b>📊 AUTO SCORE: ${autoCorrect}/${autoTotal} (${pct}%) ${emoji}</b>\n\n` +
        `<b>MC/TF:</b>\n${detailText}\n\n` +
        `<b>Games:</b>\n${gameText}\n\n` +
        `<b>Q7:</b>\n${q7}\n\n<b>Q8:</b>\n${q8}`
      )

      const fileName = `Workshop_${student.name.replace(/\s+/g, '_')}_Science7.pdf`
      await sendTelegramDocument(pdfBlob, fileName, `📄 ${student.name} — Science Workshop ${pct}%`)

      setResult({ score: autoCorrect, total: autoTotal, pct })
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('Error sending — please try again or contact your teacher.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {result && <ResultModal {...result} onClose={() => setResult(null)} />}

      <div className="rounded-2xl p-5 mb-5 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #c0392b, #6b0f0f)' }}>
        <h2 className="text-xl font-black mb-1">📝 Final Workshop</h2>
        <p className="text-xs opacity-90 leading-relaxed">Complete ALL sections below. Your graded PDF will be sent to your teacher when you submit.</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1.5 overflow-x-auto mb-5 pb-1" style={{ scrollbarWidth: 'none' }}>
        {SECTION_TABS.map(t => (
          <button key={t.id} onClick={() => setSection(t.id)}
            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black transition-all"
            style={{
              background: section === t.id ? '#c0392b' : '#f3f4f6',
              color: section === t.id ? 'white' : '#6b7280',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Q&A ── */}
      {section === 'mc' && (
        <>
          {mcTf.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#c0392b' }}>
                Q{idx+1} · {q.type === 'tf' ? 'True / False' : 'Multiple Choice'} · {q.section}
              </p>
              <p className="font-bold text-sm mb-4 leading-snug">{q.text}</p>
              {q.type === 'mc' ? (
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <div key={i} onClick={() => selectOption(q.id, i)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold"
                      style={{
                        borderColor: answers[q.id] === i ? '#1a3a6b' : '#e5e7eb',
                        background:  answers[q.id] === i ? '#dde8f7' : 'white',
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
                        background:  answers[q.id] === val ? '#dde8f7' : 'white',
                        color:       answers[q.id] === val ? '#1a3a6b' : '#6b7280',
                      }}>
                      {val ? 'TRUE' : 'FALSE'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── Match ── */}
      {section === 'match' && (
        <>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4 text-xs font-bold text-orange-700">
            ⭐ This activity is graded! Match all pairs correctly to earn full points.
          </div>
          <MatchGame
            pairs={WORKSHOP_MATCH}
            onScore={(correct, total) => { matchScore.current = { correct, total } }}
          />
        </>
      )}

      {/* ── Word Search ── */}
      {section === 'wordsearch' && (
        <>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4 text-xs font-bold text-orange-700">
            ⭐ This activity is graded! Find all words to earn full points.
          </div>
          <WordSearch
            words={WORKSHOP_WORDSEARCH}
            onScore={(correct, total) => { wsScore.current = { correct, total } }}
          />
        </>
      )}

      {/* ── Crossword ── */}
      {section === 'crossword' && (
        <>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4 text-xs font-bold text-orange-700">
            ⭐ This activity is graded! Press "Check Answers" when done.
          </div>
          <Crossword
            clues={WORKSHOP_CROSSWORD}
            onScore={(correct, total) => { cwScore.current = { correct, total } }}
          />
        </>
      )}

      {/* ── Open Questions ── */}
      {section === 'open' && (
        <>
          {open.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#c0392b' }}>
                Q{mcTf.length + idx + 1} · Open · {q.section}
              </p>
              <p className="font-bold text-sm mb-3 leading-snug">{q.text}</p>
              <textarea rows={4} placeholder={q.placeholder}
                value={answers[q.id] || ''}
                onChange={e => setOpen(q.id, e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none transition-colors"
                style={{ fontFamily: 'Nunito,sans-serif', minHeight:'90px' }}
                onFocus={e => e.target.style.borderColor = '#1a3a6b'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          ))}
        </>
      )}

      {/* Submit */}
      <div className="text-center pt-4 pb-10">
        {status && <p className="text-sm text-gray-500 mb-3">{status}</p>}
        <button onClick={handleSubmit} disabled={loading}
          className="px-12 py-4 rounded-xl text-white font-black text-base transition-all shadow-lg"
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg,#1a3a6b,#0d2247)',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
          {loading ? 'Sending… ⏳' : 'Submit Workshop 🚀'}
        </button>
      </div>
    </div>
  )
}
