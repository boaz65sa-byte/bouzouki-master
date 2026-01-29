import React, { useState } from 'react'
import Header from './components/Header'
import Fretboard from './components/Fretboard'
import ControlPanel from './components/ControlPanel'
import InfoPanel from './components/InfoPanel'
import { DROMOI, CHORDS } from './data/musicData'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState(null)
  const [activeChord, setActiveChord] = useState(null)
  const [displayType, setDisplayType] = useState(null) // 'mode' or 'chord'
  const [infoText, setInfoText] = useState('בחר סולם או אקורד כדי לראות את הפריסה על הצוואר. כיוון: D-A-F-C')
  const [darkMode, setDarkMode] = useState(true)

  const handleModeSelect = (modeName) => {
    setActiveMode(modeName)
    setActiveChord(null)
    setDisplayType('mode')
    setInfoText(`מציג דרומוס ${modeName}. התווים באדום הם הטוניקה (Root).`)
  }

  const handleChordSelect = (chordName) => {
    setActiveChord(chordName)
    setActiveMode(null)
    setDisplayType('chord')
    setInfoText(`מציג אקורד ${chordName}. המיקומים מצוינים על המיתרים.`)
  }

  const handleClear = () => {
    setActiveMode(null)
    setActiveChord(null)
    setDisplayType(null)
    setInfoText('בחר סולם או אקורד כדי לראות את הפריסה על הצוואר. כיוון: D-A-F-C')
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <Fretboard 
          displayType={displayType}
          activeMode={activeMode}
          activeChord={activeChord}
          modeData={activeMode ? DROMOI[activeMode] : null}
          chordData={activeChord ? CHORDS[activeChord] : null}
        />

        <ControlPanel
          onModeSelect={handleModeSelect}
          onChordSelect={handleChordSelect}
          onClear={handleClear}
          activeMode={activeMode}
          activeChord={activeChord}
        />

        <InfoPanel text={infoText} />
      </main>

      <footer className="footer">
        <p>🎸 נוצר עם ❤️ לנגני בוזוקי | Bouzouki Master 2026</p>
      </footer>
    </div>
  )
}

export default App
