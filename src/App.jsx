// App.jsx
import { useState } from 'react'
import Header from './components/Header'
import LoginScreen from './components/LoginScreen'
import JudahBanner from './components/JudahBanner'
import ModuleView from './components/ModuleView'
import Workshop from './components/Workshop'
import { MODULES, JUDAH_MESSAGES } from './data/courseData'

const TABS = [
  ...MODULES.map(m => ({ id: m.id, label: `${m.icon} ${m.tab}` })),
  { id: 's4', label: '📝 Workshop' },
]

export default function App() {
  const [student, setStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('s1')

  const handleTabChange = (id) => {
    setActiveTab(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeModule = MODULES.find(m => m.id === activeTab)
  const judahMsg = JUDAH_MESSAGES[activeTab] || JUDAH_MESSAGES.login

  return (
    <div className="min-h-screen" style={{ background: '#f5f7fa' }}>
      <Header />

      {!student ? (
        <LoginScreen onLogin={setStudent} />
      ) : (
        <>
          <div className="flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2"
            style={{ background: '#dde8f7', borderColor: '#1a3a6b', color: '#1a3a6b' }}>
            <span>🦁</span>
            <span>Hello, {student.name.split(' ')[0]}!</span>
            <span className="ml-auto text-xs text-gray-400 font-normal">Science · 7th Grade</span>
          </div>

          <JudahBanner message={judahMsg} />

          <div className="flex overflow-x-auto bg-white border-b-2 border-gray-100 px-2 gap-1"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => handleTabChange(t.id)}
                className="flex-shrink-0 px-4 py-4 text-xs font-black whitespace-nowrap border-b-2 transition-all"
                style={{
                  borderColor: activeTab === t.id ? '#c0392b' : 'transparent',
                  color: activeTab === t.id ? '#1a3a6b' : '#9ca3af',
                  marginBottom: '-2px',
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 's4'
            ? <Workshop student={student} />
            : activeModule
              ? <ModuleView key={activeTab} module={activeModule} />
              : null
          }
        </>
      )}
    </div>
  )
}
