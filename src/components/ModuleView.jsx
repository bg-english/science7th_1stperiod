// components/ModuleView.jsx
import { useState } from 'react'
import TheoryPanel from './TheoryPanel'
import PracticePanel from './PracticePanel'

export default function ModuleView({ module }) {
  const [tab, setTab] = useState('theory')

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Toggle */}
      <div className="flex gap-2 mb-5 bg-white rounded-xl p-1 shadow-sm">
        {['theory', 'practice'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 rounded-lg font-black text-sm transition-all"
            style={{
              background: tab === t ? '#1a3a6b' : 'transparent',
              color: tab === t ? 'white' : '#9ca3af',
              boxShadow: tab === t ? '0 2px 8px rgba(26,58,107,0.3)' : 'none',
            }}>
            {t === 'theory' ? '📖 Theory' : '✏️ Practice'}
          </button>
        ))}
      </div>

      <div style={{ display: tab === 'theory' ? '' : 'none' }}>
        <TheoryPanel module={module} />
      </div>
      <div style={{ display: tab === 'practice' ? '' : 'none' }}>
        <PracticePanel questions={module.practice} moduleId={module.id} />
      </div>
    </div>
  )
}
