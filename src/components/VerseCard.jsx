// components/VerseCard.jsx
export default function VerseCard({ verse }) {
  return (
    <div className="rounded-2xl p-6 mb-5 relative overflow-hidden text-white"
      style={{ background: 'linear-gradient(135deg, #0d2247, #1a3a6b)' }}>
      <div className="absolute top-0 left-2 text-9xl opacity-10 font-serif leading-none select-none">"</div>
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">📖 Biblical Principle</p>
        <p className="italic text-sm leading-relaxed mb-2" style={{ fontFamily: 'Merriweather, serif' }}>{verse.text}</p>
        <p className="text-xs font-bold opacity-90">— {verse.ref}</p>
        <div className="mt-3 pt-3 border-t border-white border-opacity-30 text-xs leading-relaxed opacity-90">
          💭 <strong>Think about it:</strong> {verse.reflection}
        </div>
      </div>
    </div>
  )
}
