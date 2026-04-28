// components/Header.jsx
export default function Header() {
  return (
    <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d2247 0%, #1a3a6b 60%, #8b1a1a 100%)' }}>
      {/* diagonal pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 20px)'
      }} />
      <div className="relative z-10 flex items-end justify-between max-w-3xl mx-auto px-4 pt-4">
        <img src="logo.png" alt="Boston Flex" className="w-16 h-16 object-contain mb-3 drop-shadow-lg" />
        <div className="text-center text-white pb-4 flex-1 px-3">
          <h1 className="text-xl sm:text-2xl font-black leading-tight">7th Grade Science Review</h1>
          <p className="text-sm opacity-80 mt-1">Colegio Boston Flexible · 2026</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
            style={{ background: 'rgba(212,160,23,0.25)', border: '1px solid rgba(212,160,23,0.5)', color: '#f4d03f' }}>
            ✨ Año de la Pureza · Great Disciples
          </span>
        </div>
        <img src="judah.png" alt="Judah" className="w-24 object-contain self-end drop-shadow-xl" />
      </div>
      <div className="h-1" style={{ background: '#c0392b' }} />
    </header>
  )
}
