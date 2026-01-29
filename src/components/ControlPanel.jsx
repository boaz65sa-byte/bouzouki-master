import React from 'react'
import { Music2, Music, X } from 'lucide-react'
import { DROMOI, CHORDS, MODE_DESCRIPTIONS, CHORD_DESCRIPTIONS } from '../data/musicData'
import './ControlPanel.css'

const ControlPanel = ({ onModeSelect, onChordSelect, onClear, activeMode, activeChord }) => {
  return (
    <div className="control-panel">
      {/* Modes Section */}
      <div className="panel-section">
        <div className="section-header">
          <Music2 className="section-icon" size={24} />
          <h3>דרומוס (מודוסים יווניים)</h3>
        </div>
        
        <div className="button-grid">
          {Object.keys(DROMOI).map((modeName) => (
            <button
              key={modeName}
              className={`control-button ${activeMode === modeName ? 'active' : ''}`}
              onClick={() => onModeSelect(modeName)}
              title={MODE_DESCRIPTIONS[modeName]}
            >
              <span className="button-text">{modeName}</span>
              {activeMode === modeName && (
                <span className="active-indicator">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chords Section */}
      <div className="panel-section">
        <div className="section-header">
          <Music className="section-icon" size={24} />
          <h3>אקורדים בסיסיים</h3>
        </div>
        
        <div className="button-grid">
          {Object.keys(CHORDS).map((chordName) => (
            <button
              key={chordName}
              className={`control-button ${activeChord === chordName ? 'active' : ''}`}
              onClick={() => onChordSelect(chordName)}
              title={CHORD_DESCRIPTIONS[chordName]}
            >
              <span className="button-text">{chordName}</span>
              {activeChord === chordName && (
                <span className="active-indicator">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Button */}
      {(activeMode || activeChord) && (
        <div className="clear-section">
          <button className="clear-button" onClick={onClear}>
            <X size={20} />
            <span>נקה את הצוואר</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ControlPanel
