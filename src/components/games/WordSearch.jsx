// components/games/WordSearch.jsx
import { useState, useEffect, useCallback } from 'react'

const DIRECTIONS = [
  [0,1],[1,0],[0,-1],[-1,0],   // H, V, H-rev, V-rev
  [1,1],[1,-1],[-1,1],[-1,-1]  // diagonals
]

function buildGrid(words, size = 14) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''))
  const placed = []

  const tryPlace = (word) => {
    const dirs = [...DIRECTIONS].sort(() => Math.random() - 0.5)
    const positions = []
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) positions.push([r,c])
    positions.sort(() => Math.random() - 0.5)

    for (const [dr, dc] of dirs) {
      for (const [r, c] of positions) {
        let ok = true
        const cells = []
        for (let i = 0; i < word.length; i++) {
          const nr = r + dr * i, nc = c + dc * i
          if (nr < 0 || nr >= size || nc < 0 || nc >= size) { ok = false; break }
          if (grid[nr][nc] !== '' && grid[nr][nc] !== word[i]) { ok = false; break }
          cells.push([nr, nc])
        }
        if (ok) {
          cells.forEach(([nr,nc], i) => grid[nr][nc] = word[i])
          placed.push({ word, cells })
          return true
        }
      }
    }
    return false
  }

  const sorted = [...words].sort((a,b) => b.length - a.length)
  sorted.forEach(w => tryPlace(w.toUpperCase()))

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random() * 26)]

  return { grid, placed }
}

export default function WordSearch({ words, onScore }) {
  const [gridData, setGridData]   = useState(null)
  const [selecting, setSelecting] = useState([])
  const [found, setFound]         = useState([])   // array of word strings
  const [foundCells, setFoundCells] = useState([]) // array of [r,c] pairs
  const [reported, setReported]   = useState(false)

  useEffect(() => {
    setGridData(buildGrid(words))
  }, [])

  const cellKey = (r,c) => `${r}-${c}`

  const startSelect = (r, c) => setSelecting([[r,c]])

  const moveSelect = (r, c) => {
    if (!selecting.length) return
    const [sr, sc] = selecting[0]
    // Only allow straight lines
    const dr = r - sr, dc = c - sc
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const len = Math.max(Math.abs(dr), Math.abs(dc))
      const stepR = len ? Math.sign(dr) : 0
      const stepC = len ? Math.sign(dc) : 0
      const cells = []
      for (let i = 0; i <= len; i++) cells.push([sr + stepR*i, sc + stepC*i])
      setSelecting(cells)
    }
  }

  const endSelect = useCallback(() => {
    if (!selecting.length || !gridData) { setSelecting([]); return }
    const selected = selecting.map(([r,c]) => gridData.grid[r][c]).join('')
    const reversed = selected.split('').reverse().join('')

    const match = gridData.placed.find(p =>
      (p.word === selected || p.word === reversed) && !found.includes(p.word)
    )

    if (match) {
      const newFound = [...found, match.word]
      const newCells = [...foundCells, ...match.cells]
      setFound(newFound)
      setFoundCells(newCells)
      if (newFound.length === gridData.placed.length && !reported) {
        onScore?.(words.length, words.length)
        setReported(true)
      }
    }
    setSelecting([])
  }, [selecting, gridData, found, foundCells, reported])

  if (!gridData) return <div className="text-center py-8 text-gray-400 text-sm">Building word search…</div>

  const isSelected  = (r,c) => selecting.some(([sr,sc]) => sr===r && sc===c)
  const isFound     = (r,c) => foundCells.some(([fr,fc]) => fr===r && fc===c)
  const score = found.length

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm" style={{ color: '#1a3a6b' }}>🔍 Word Search</h4>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#dde8f7', color: '#1a3a6b' }}>
          {score}/{gridData.placed.length} found
        </span>
      </div>

      {/* Word list */}
      <div className="flex flex-wrap gap-2 mb-4">
        {gridData.placed.map(p => (
          <span key={p.word}
            className="text-xs font-black px-2 py-1 rounded-lg"
            style={{
              background: found.includes(p.word) ? '#eafaf1' : '#f3f4f6',
              color: found.includes(p.word) ? '#1e8449' : '#6b7280',
              textDecoration: found.includes(p.word) ? 'line-through' : 'none',
            }}>
            {p.word}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div
        className="select-none overflow-x-auto"
        onMouseLeave={endSelect}
        onTouchEnd={endSelect}>
        <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${gridData.grid[0].length}, 1fr)`, gap: '1px', touchAction: 'none' }}>
          {gridData.grid.map((row, r) =>
            row.map((letter, c) => {
              const sel  = isSelected(r,c)
              const fnd  = isFound(r,c)
              return (
                <div key={cellKey(r,c)}
                  onMouseDown={() => startSelect(r,c)}
                  onMouseEnter={() => selecting.length && moveSelect(r,c)}
                  onMouseUp={endSelect}
                  onTouchStart={() => startSelect(r,c)}
                  onTouchMove={e => {
                    e.preventDefault()
                    const t = e.touches[0]
                    const el = document.elementFromPoint(t.clientX, t.clientY)
                    if (el?.dataset?.r && el?.dataset?.c) moveSelect(+el.dataset.r, +el.dataset.c)
                  }}
                  data-r={r} data-c={c}
                  style={{
                    width: '22px', height: '22px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 800, borderRadius: '4px', cursor: 'pointer',
                    background: fnd ? '#27ae60' : sel ? '#1a3a6b' : 'transparent',
                    color: (fnd || sel) ? 'white' : '#374151',
                    transition: 'background 0.1s',
                    userSelect: 'none',
                  }}>
                  {letter}
                </div>
              )
            })
          )}
        </div>
      </div>

      {found.length === gridData.placed.length && (
        <div className="mt-4 px-4 py-3 rounded-xl text-sm font-bold text-center"
          style={{ background: '#eafaf1', color: '#1e8449', border: '2px solid #27ae60' }}>
          🎉 All words found! Amazing work!
        </div>
      )}
    </div>
  )
}
