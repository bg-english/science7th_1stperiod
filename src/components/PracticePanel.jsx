// components/PracticePanel.jsx
import { useState } from 'react'
import MatchGame from './games/MatchGame'
import WordSearch from './games/WordSearch'
import Crossword from './games/Crossword'
import { MATCH_DATA, WORDSEARCH_DATA, CROSSWORD_DATA } from '../data/courseData'

function QuestionCard({ q, answered, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const answer = (val) => {
    if (answered[q.id] !== undefined) return
    const ok = val === q.correct
    setSelected(val)
    setFeedback({ ok, text: ok ? `✅ Correct! ${q.feedback}` : `❌ Not quite. ${q.feedback}` })
    onAnswer(q.id, ok)
  }

  const done = answered[q.id] !== undefined

  if (q.type === 'mc') return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <p className="font-bold text-sm mb-4 leading-snug flex items-start gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-black flex-shrink-0 mt-0.5"
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
            <button key={i} onClick={() => answer(i)} disabled={done}
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

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <p className="font-bold text-sm mb-4 leading-snug flex items-start gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-black flex-shrink-0 mt-0.5"
          style={{ background: '#c0392b' }}>{q.id.split('-')[1]}</span>
        {q.text}
      </p>
      <div className="flex gap-3">
        {[true, false].map(val => {
          let bg = 'white', border = '#e5e7eb', color = '#6b7280'
          if (done) {
            if (val === q.correct) { bg = '#eafaf1'; border = '#27ae60'; color = '#1e8449' }
            else if (val === selected && !feedback?.ok) { bg = '#fdf0f0'; border = '#e74c3c'; color = '#c0392b' }
          }
          return (
            <button key={String(val)} onClick={() => answer(val)} disabled={done}
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

const ACTIVITY_TABS = [
  { id: 'questions',  label: '❓ Q&A' },
  { id: 'match',      label: '🔗 Match' },
  { id: 'wordsearch', label: '🔍 Word Search' },
  { id: 'crossword',  label: '⬜ Crossword' },
]

export default function PracticePanel({ questions, moduleId }) {
  const [answered, setAnswered] = useState({})
  const [score, setScore] = useState(0)
  const [activity, setActivity] = useState('questions')

  const handleAnswer = (id, ok) => {
    setAnswered(prev => ({ ...prev, [id]: ok }))
    if (ok) setScore(s => s + 1)
  }

  const total = Object.keys(answered).length

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto mb-5 pb-1" style={{ scrollbarWidth: 'none' }}>
        {ACTIVITY_TABS.map(t => (
          <button key={t.id} onClick={() => setActivity(t.id)}
            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black transition-all"
            style={{
              background: activity === t.id ? '#1a3a6b' : '#f3f4f6',
              color: activity === t.id ? 'white' : '#6b7280',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: activity === 'questions' ? '' : 'none' }}>
        {total > 0 && (
          <div className="flex justify-between items-center rounded-xl px-4 py-3 mb-4 text-sm font-bold"
            style={{ background: '#dde8f7', color: '#1a3a6b' }}>
            <span>Score:</span><span>{score} / {total} answered</span>
          </div>
        )}
        <h3 className="font-black text-base mb-4">✏️ Practice Questions</h3>
        {questions.map(q => <QuestionCard key={q.id} q={q} answered={answered} onAnswer={handleAnswer} />)}
      </div>

      <div style={{ display: activity === 'match' ? '' : 'none' }}>
        <p className="text-xs text-gray-400 mb-3">Tap a term on the left, then its matching definition on the right.</p>
        <MatchGame pairs={MATCH_DATA[moduleId] || []} />
      </div>

      <div style={{ display: activity === 'wordsearch' ? '' : 'none' }}>
        <p className="text-xs text-gray-400 mb-3">Find all hidden words. Drag across the grid to select.</p>
        <WordSearch words={WORDSEARCH_DATA[moduleId] || []} />
      </div>

      <div style={{ display: activity === 'crossword' ? '' : 'none' }}>
        <p className="text-xs text-gray-400 mb-3">Tap a clue or cell to start typing. Press Check when done.</p>
        <Crossword clues={CROSSWORD_DATA[moduleId] || []} />
      </div>
    </div>
  )
}
