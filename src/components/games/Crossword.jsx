// components/games/Crossword.jsx
import { useState, useRef, useEffect } from 'react'

/*
  Each clue: { id, answer, clue, row, col, dir: 'across'|'down', number }
  We pre-compute the grid layout from the clues.
*/
export default function Crossword({ clues, onScore }) {
  const [cells, setCells] = useState({})         // key "r-c" -> { letter, correct, wrong }
  const [active, setActive] = useState(null)     // { row, col, dir }
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(null)
  const inputRefs = useRef({})

  // Build grid metadata
  const gridCells = {}  // "r-c" -> { clueIds, number }
  const maxR = { v: 0 }, maxC = { v: 0 }

  clues.forEach(clue => {
    clue.answer.split('').forEach((_, i) => {
      const r = clue.dir === 'across' ? clue.row : clue.row + i
      const c = clue.dir === 'across' ? clue.col + i : clue.col
      const key = `${r}-${c}`
      if (!gridCells[key]) gridCells[key] = { clueIds: [], number: null }
      gridCells[key].clueIds.push(clue.id)
      if (i === 0 && !gridCells[key].number) gridCells[key].number = clue.number
      maxR.v = Math.max(maxR.v, r)
      maxC.v = Math.max(maxC.v, c)
    })
  })

  const ROWS = maxR.v + 1
  const COLS = maxC.v + 1

  const getAnswer = (r, c) => {
    const clue = clues.find(cl => {
      const isAcross = cl.dir === 'across' && cl.row === r && c >= cl.col && c < cl.col + cl.answer.length
      const isDown   = cl.dir === 'down'   && cl.col === c && r >= cl.row && r < cl.row + cl.answer.length
      return isAcross || isDown
    })
    if (!clue) return null
    const idx = clue.dir === 'across' ? c - clue.col : r - clue.row
    return clue.answer[idx]
  }

  const handleInput = (r, c, val) => {
    const letter = val.slice(-1).toUpperCase()
    setCells(prev => ({ ...prev, [`${r}-${c}`]: { ...prev[`${r}-${c}`], letter, correct: undefined, wrong: undefined } }))
    // Advance cursor
    if (letter && active) {
      const [dr, dc] = active.dir === 'across' ? [0,1] : [1,0]
      const nr = r+dr, nc = c+dc
      if (gridCells[`${nr}-${nc}`]) {
        setActive({ row: nr, col: nc, dir: active.dir })
        setTimeout(() => inputRefs.current[`${nr}-${nc}`]?.focus(), 10)
      }
    }
  }

  const handleKeyDown = (r, c, e) => {
    if (e.key === 'Backspace' && !cells[`${r}-${c}`]?.letter) {
      const [dr, dc] = active?.dir === 'across' ? [0,-1] : [-1,0]
      const nr = r+dr, nc = c+dc
      if (gridCells[`${nr}-${nc}`]) {
        setCells(prev => ({ ...prev, [`${nr}-${nc}`]: { ...prev[`${nr}-${nc}`], letter: '' } }))
        setActive({ row: nr, col: nc, dir: active.dir })
        setTimeout(() => inputRefs.current[`${nr}-${nc}`]?.focus(), 10)
      }
    }
  }

  const checkAnswers = () => {
    let correct = 0, total = 0
    const newCells = { ...cells }
    Object.keys(gridCells).forEach(key => {
      const [r,c] = key.split('-').map(Number)
      const expected = getAnswer(r, c)
      const given = (cells[key]?.letter || '').toUpperCase()
      total++
      if (given === expected) { correct++; newCells[key] = { ...newCells[key], correct: true, wrong: false } }
      else { newCells[key] = { ...newCells[key], correct: false, wrong: true } }
    })
    setCells(newCells)
    setChecked(true)
    setScore({ correct, total })
    onScore?.(correct, total)
  }

  const across = clues.filter(c => c.dir === 'across').sort((a,b) => a.number - b.number)
  const down   = clues.filter(c => c.dir === 'down').sort((a,b) => a.number - b.number)

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm" style={{ color: '#1a3a6b' }}>⬜ Crossword</h4>
        {score && (
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#dde8f7', color: '#1a3a6b' }}>
            {score.correct}/{score.total} correct
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto mb-4">
        <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${COLS}, 28px)`, gap: '2px' }}>
          {Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (__, c) => {
              const key = `${r}-${c}`
              const meta = gridCells[key]
              const cell = cells[key] || {}
              if (!meta) return <div key={key} style={{ width:28, height:28, background:'transparent' }} />

              const isActive = active?.row === r && active?.col === c
              let bg = 'white', border = '#d1d5db', color = '#1a1a2e'
              if (cell.correct) { bg = '#eafaf1'; border = '#27ae60' }
              else if (cell.wrong) { bg = '#fdf0f0'; border = '#e74c3c' }
              else if (isActive) { bg = '#dde8f7'; border = '#1a3a6b' }

              return (
                <div key={key} className="relative" style={{ width:28, height:28 }}>
                  {meta.number && (
                    <span style={{ position:'absolute', top:1, left:1, fontSize:'7px', fontWeight:900, color:'#6b7280', lineHeight:1, zIndex:1 }}>
                      {meta.number}
                    </span>
                  )}
                  <input
                    ref={el => inputRefs.current[key] = el}
                    maxLength={1}
                    value={cell.letter || ''}
                    onChange={e => handleInput(r, c, e.target.value)}
                    onKeyDown={e => handleKeyDown(r, c, e)}
                    onFocus={() => setActive({ row:r, col:c, dir: active?.dir || 'across' })}
                    style={{
                      width:'100%', height:'100%', border:`2px solid ${border}`, borderRadius:'4px',
                      textAlign:'center', fontSize:'12px', fontWeight:800, fontFamily:'Nunito,sans-serif',
                      background: bg, color, outline:'none', textTransform:'uppercase',
                      caretColor:'transparent', cursor:'pointer', padding:0,
                    }}
                  />
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Clues */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-4">
        <div>
          <p className="font-black mb-2" style={{ color:'#1a3a6b' }}>ACROSS</p>
          {across.map(cl => (
            <div key={cl.id} className="mb-1.5 cursor-pointer"
              onClick={() => { setActive({row:cl.row,col:cl.col,dir:'across'}); inputRefs.current[`${cl.row}-${cl.col}`]?.focus() }}>
              <span className="font-black">{cl.number}.</span> {cl.clue} <span className="text-gray-300">({cl.answer.length})</span>
            </div>
          ))}
        </div>
        <div>
          <p className="font-black mb-2" style={{ color:'#1a3a6b' }}>DOWN</p>
          {down.map(cl => (
            <div key={cl.id} className="mb-1.5 cursor-pointer"
              onClick={() => { setActive({row:cl.row,col:cl.col,dir:'down'}); inputRefs.current[`${cl.row}-${cl.col}`]?.focus() }}>
              <span className="font-black">{cl.number}.</span> {cl.clue} <span className="text-gray-300">({cl.answer.length})</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={checkAnswers} disabled={checked}
        className="w-full py-2.5 rounded-xl text-white font-black text-sm transition-all"
        style={{ background: checked ? '#9ca3af' : '#1a3a6b', cursor: checked ? 'default' : 'pointer' }}>
        {checked ? `Checked! ${score?.correct}/${score?.total} correct` : 'Check Answers ✓'}
      </button>
    </div>
  )
}
