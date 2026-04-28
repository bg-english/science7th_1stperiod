// components/games/MatchGame.jsx
import { useState, useEffect } from 'react'

export default function MatchGame({ pairs, onScore }) {
  const [left, setLeft]       = useState([])   // terms
  const [right, setRight]     = useState([])   // definitions shuffled
  const [selLeft, setSelLeft] = useState(null)
  const [selRight, setSelRight] = useState(null)
  const [matched, setMatched] = useState({})   // term -> def
  const [wrong, setWrong]     = useState(null)
  const [done, setDone]       = useState(false)
  const [reported, setReported] = useState(false)

  useEffect(() => {
    const shuffled = [...pairs].sort(() => Math.random() - 0.5)
    setLeft([...pairs].sort(() => Math.random() - 0.5))
    setRight(shuffled)
  }, [])

  useEffect(() => {
    if (selLeft !== null && selRight !== null) {
      const term = left[selLeft].term
      const def  = right[selRight].def
      const correct = pairs.find(p => p.term === term)?.def === def

      if (correct) {
        const newMatched = { ...matched, [term]: def }
        setMatched(newMatched)
        if (Object.keys(newMatched).length === pairs.length) {
          setDone(true)
          if (!reported) {
            onScore?.(pairs.length, pairs.length)
            setReported(true)
          }
        }
      } else {
        setWrong({ left: selLeft, right: selRight })
        setTimeout(() => setWrong(null), 800)
      }
      setTimeout(() => { setSelLeft(null); setSelRight(null) }, wrong ? 900 : 300)
    }
  }, [selLeft, selRight])

  const isMatchedLeft  = (i) => matched[left[i]?.term] !== undefined
  const isMatchedRight = (i) => Object.values(matched).includes(right[i]?.def)

  const getBtnStyle = (side, i) => {
    if (side === 'left') {
      if (isMatchedLeft(i))  return { bg: '#eafaf1', border: '#27ae60', color: '#1e8449', opacity: 0.7 }
      if (wrong?.left === i) return { bg: '#fdf0f0', border: '#e74c3c', color: '#c0392b' }
      if (selLeft === i)     return { bg: '#dde8f7', border: '#1a3a6b', color: '#1a3a6b' }
    } else {
      if (isMatchedRight(i))  return { bg: '#eafaf1', border: '#27ae60', color: '#1e8449', opacity: 0.7 }
      if (wrong?.right === i) return { bg: '#fdf0f0', border: '#e74c3c', color: '#c0392b' }
      if (selRight === i)     return { bg: '#dde8f7', border: '#1a3a6b', color: '#1a3a6b' }
    }
    return { bg: 'white', border: '#e5e7eb', color: '#1a1a2e' }
  }

  const score = Object.keys(matched).length

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-black text-sm" style={{ color: '#1a3a6b' }}>🔗 Match: Term ↔ Definition</h4>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#dde8f7', color: '#1a3a6b' }}>
          {score}/{pairs.length}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">Tap a term on the left, then its matching definition on the right.</p>

      {done && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-bold text-center"
          style={{ background: '#eafaf1', color: '#1e8449', border: '2px solid #27ae60' }}>
          🎉 Perfect! All matched correctly!
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Left - Terms */}
        <div className="space-y-2">
          {left.map((p, i) => {
            const s = getBtnStyle('left', i)
            const disabled = isMatchedLeft(i) || done
            return (
              <button key={p.term} onClick={() => !disabled && setSelLeft(i === selLeft ? null : i)}
                className="w-full text-left px-3 py-2 rounded-xl border-2 text-xs font-bold leading-snug transition-all"
                style={{ background: s.bg, borderColor: s.border, color: s.color, opacity: s.opacity || 1, cursor: disabled ? 'default' : 'pointer', minHeight: '44px' }}>
                {p.term}
              </button>
            )
          })}
        </div>
        {/* Right - Definitions */}
        <div className="space-y-2">
          {right.map((p, i) => {
            const s = getBtnStyle('right', i)
            const disabled = isMatchedRight(i) || done
            return (
              <button key={p.def} onClick={() => !disabled && selLeft !== null && setSelRight(i === selRight ? null : i)}
                className="w-full text-left px-3 py-2 rounded-xl border-2 text-xs leading-snug transition-all"
                style={{ background: s.bg, borderColor: s.border, color: s.color, opacity: s.opacity || 1, cursor: (disabled || selLeft === null) ? 'default' : 'pointer', minHeight: '44px', fontWeight: 600 }}>
                {p.def}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
