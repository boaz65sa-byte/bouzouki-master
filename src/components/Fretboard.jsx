import React from 'react'
import { STRINGS, FRET_COUNT, getNoteName } from '../data/musicData'
import './Fretboard.css'

const Fretboard = ({ displayType, activeMode, activeChord, modeData, chordData }) => {
  const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
  
  // בדיקה האם תו שייך למוד
  const isNoteInMode = (stringIndex, fret) => {
    if (!modeData) return false
    
    const noteName = getNoteName(stringIndex, fret)
    const notePos = NOTES.indexOf(noteName)
    const rootPos = NOTES.indexOf('D') // טוניקה ב-D
    const interval = (notePos - rootPos + 12) % 12
    
    return modeData.includes(interval)
  }

  // בדיקה האם תו הוא טוניקה
  const isRoot = (stringIndex, fret) => {
    if (!modeData) return false
    const noteName = getNoteName(stringIndex, fret)
    return noteName === 'D'
  }

  // בדיקה האם תו שייך לאקורד
  const isNoteInChord = (stringIndex, fret) => {
    if (!chordData) return false
    return chordData[stringIndex] === fret
  }

  return (
    <div className="fretboard-container">
      <div className="fretboard-scroll">
        <div className="fretboard">
          {/* String labels */}
          <div className="string-labels">
            {STRINGS.map((string, idx) => (
              <div key={idx} className="string-label">
                {string}
              </div>
            ))}
          </div>

          {/* Fretboard grid */}
          <div className="fretboard-grid">
            {/* Strings */}
            {STRINGS.map((_, stringIdx) => (
              <div key={`string-${stringIdx}`} className="string-line" />
            ))}

            {/* Frets and notes */}
            {Array.from({ length: FRET_COUNT + 1 }).map((_, fretIdx) => (
              <div key={`fret-${fretIdx}`} className="fret-column">
                {fretIdx > 0 && <div className="fret-line" />}
                
                {/* Fret number marker */}
                {fretIdx > 0 && (fretIdx === 3 || fretIdx === 5 || fretIdx === 7 || fretIdx === 9 || fretIdx === 12) && (
                  <div className="fret-marker">{fretIdx}</div>
                )}

                {/* Notes on each string */}
                {STRINGS.map((_, stringIdx) => {
                  const showNote = displayType === 'mode' 
                    ? isNoteInMode(stringIdx, fretIdx)
                    : displayType === 'chord'
                    ? isNoteInChord(stringIdx, fretIdx)
                    : false

                  const isRootNote = displayType === 'mode' && isRoot(stringIdx, fretIdx)
                  
                  return (
                    <div
                      key={`note-${stringIdx}-${fretIdx}`}
                      className={`note-position ${showNote ? 'active' : ''} ${isRootNote ? 'root' : ''}`}
                      style={{ 
                        gridRow: stringIdx + 1,
                        gridColumn: fretIdx + 1 
                      }}
                    >
                      {showNote && (
                        <div className="note-marker">
                          {getNoteName(stringIdx, fretIdx)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fretboard
