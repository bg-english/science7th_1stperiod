// components/JudahBanner.jsx
import { useState, useEffect } from 'react'

export default function JudahBanner({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => { setVisible(true) }, [message])

  if (!visible) return null

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b-2" style={{ background: '#f4d03f', borderColor: '#1a3a6b' }}>
      <img src="judah.png" alt="Judah" className="w-14 flex-shrink-0 drop-shadow" />
      <div className="flex-1 bg-white rounded-xl px-4 py-2 text-sm font-bold relative shadow"
        style={{ color: '#1a3a6b' }}>
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 border-8 border-transparent"
          style={{ borderRightColor: 'white' }} />
        {message}
      </div>
      <button onClick={() => setVisible(false)}
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors"
        style={{ background: 'rgba(26,58,107,0.15)', color: '#1a3a6b' }}>✕</button>
    </div>
  )
}
