// components/PracticePanel.jsx
import { useState } from 'react'

function QuestionCard({ q, answered, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const answer = (val, label) => {
    if (answered[q.id]) return
    const ok = val === q.correct
    setSelected(val)
    setFeedback({ ok, text: ok ? `✅ Correct! ${q.feedback}` : `❌ Not quite. ${q.feedback}` })
    onAnswer(q.id, ok)
  }

  const done = answered[q.id] !== undefined

  if (q.type === 'mc') return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <p className="font-bold text-sm mb-4 leading-snug">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-black mr-2 flex-shrink-0"
          style={{ background: '#c0392b' }}>{q.id.split('-')[1]}</span>
        {q.text}
      </p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let bg = 'white', border = '#e5e7eb', color = '#1a1a2e'
          if (done) {
            if (i === q.correct) { bg = '#eafaf1'; border = '#27ae60'; color = '#1e8449' }
            else if (i === selected && !feedback?.ok) { bg = '#fdf0f0'; border = '#e74c3c'; color = '#c0392b' }
          }
          return (
            <button key={i} onClick={() => answer(i, opt)} disabled={done}
              className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all"
              style={{ background: bg, borderColor: border, color, cursor: done ? 'default' : 'pointer' }}>
              {opt}
            </button>
          )
        })}
      </div>
      {feedback && (
        <div className={`mt-3 px-4 py-3 rounded-xl text-sm leading-relaxed ${feedback.ok ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
          {feedback.text}
        </div>
      )}
    </div>
  )

  // True/False
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <p className="font-bold text-sm mb-4 leading-snug">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-black mr-2 flex-shrink-0"
          style={{ background: '#c0392b' }}>{q.id.split('-')[1]}</span>
        {q.text}
      </p>
      <div className="flex gap-3">
        {[true, false].map(val => {
          let bg = 'white', border = '#e5e7eb', color = '#1a1a2e'
          if (done) {
            if (val === q.correct) { bg = '#eafaf1'; border = '#27ae60'; color = '#1e8449' }
            else if (val === selected && feedback && !feedback.ok) { bg = '#fdf0f0'; border = '#e74c3c'; color = '#c0392b' }
          }
          return (
            <button key={String(val)} onClick={() => answer(val, val ? 'TRUE' : 'FALSE')} disabled={done}
              className="flex-1 py-3 rounded-xl border-2 font-black text-sm transition-all"
              style={{ background: bg, borderColor: border, color, cursor: done ? 'default' : 'pointer' }}>
              {val ? 'TRUE' : 'FALSE'}
            </button>
          )
        })}
      </div>
      {feedback && (
        <div className={`mt-3 px-4 py-3 rounded-xl text-sm leading-relaxed ${feedback.ok ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
          {feedback.text}
        </div>
      )}
    </div>
  )
}

export default function PracticePanel({ questions }) {
  const [answered, setAnswered] = useState({})
  const [score, setScore] = useState(0)

  const handleAnswer = (id, ok) => {
    setAnswered(prev => ({ ...prev, [id]: ok }))
    if (ok) setScore(s => s + 1)
  }

  const total = Object.keys(answered).length

  return (
    <div>
      {total > 0 && (
        <div className="flex justify-between items-center rounded-xl px-4 py-3 mb-4 text-sm font-bold"
          style={{ background: '#dde8f7', color: '#1a3a6b' }}>
          <span>Score:</span>
          <span>{score} / {total} answered</span>
        </div>
      )}
      <h3 className="font-black text-base mb-4 flex items-center gap-2">
        <span>✏️</span> Practice Questions
      </h3>
      {questions.map(q => (
        <QuestionCard key={q.id} q={q} answered={answered} onAnswer={handleAnswer} />
      ))}
    </div>
  )
}
