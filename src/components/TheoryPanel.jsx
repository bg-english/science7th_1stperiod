// components/TheoryPanel.jsx
import VerseCard from './VerseCard'

function ContentCard({ card }) {
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border-l-4" style={{ borderColor: '#c0392b' }}>
      <h3 className="font-black text-base mb-3" style={{ color: '#1a3a6b' }}
        dangerouslySetInnerHTML={{ __html: card.title }} />
      {card.content && <p className="text-sm leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: card.content }} />}
      {card.bullets && (
        <ul className="list-disc pl-5 mt-1 mb-2 space-y-1">
          {card.bullets.map((b, i) => <li key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: b }} />)}
        </ul>
      )}
      {card.content2 && <p className="text-sm leading-relaxed mb-2 mt-3" dangerouslySetInnerHTML={{ __html: card.content2 }} />}
      {card.bullets2 && (
        <ul className="list-disc pl-5 mt-1 space-y-1">
          {card.bullets2.map((b, i) => <li key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: b }} />)}
        </ul>
      )}
      {card.extra && <p className="text-sm leading-relaxed mt-3 italic text-gray-600" dangerouslySetInnerHTML={{ __html: card.extra }} />}
    </div>
  )
}

function VocabGrid({ vocab }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 mb-4" style={{ borderColor: '#c0392b' }}>
      <h3 className="font-black text-base mb-4" style={{ color: '#1a3a6b' }}>📚 Key Vocabulary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {vocab.map(v => (
          <div key={v.term} className="rounded-xl p-3" style={{ background: '#dde8f7' }}>
            <p className="font-black text-sm" style={{ color: '#1a3a6b' }}>{v.term}</p>
            <p className="text-xs text-gray-500 mt-1 leading-snug">{v.def}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TheoryPanel({ module }) {
  return (
    <div>
      <VerseCard verse={module.verse} />
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{module.icon}</span>
        <div>
          <h2 className="font-black text-lg leading-tight">{module.title}</h2>
          <p className="text-xs text-gray-500">{module.indicator}</p>
        </div>
      </div>
      {module.theory.cards.map((c, i) => <ContentCard key={i} card={c} />)}
      <VocabGrid vocab={module.theory.vocab} />
    </div>
  )
}
