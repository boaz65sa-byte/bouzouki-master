import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { STRING_TUNING, getNoteFreq, getNoteName, NOTES } from '../data/musicData';
import './Fretboard.css';

const Fretboard = ({ displayType, activeMode, activeChord, modeData, chordData }) => {
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    const polySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();
    polySynth.volume.value = -6;
    setSynth(polySynth);
  }, []);

  const playNote = (freq) => {
    if (synth) {
      synth.triggerAttackRelease(freq, "8n");
      synth.triggerAttackRelease(freq + 1.5, "8n", "+0.02"); 
    }
  };

  return (
    <div className="fretboard-container">
      <div className="fretboard-scroll">
        {/* שורת המספרים (Frets Header) */}
        <div className="fret-numbers-row">
          <div className="fret-number-cell nut-header">0</div>
          {[...Array(15)].map((_, i) => (
            <div key={i} className="fret-number-cell">{i + 1}</div>
          ))}
        </div>

        {/* שורות המיתרים */}
        <div className="strings-container">
          {STRING_TUNING.map((stringInfo, stringIdx) => (
            <div key={stringIdx} className="string-row">
              
              {/* מיתר פתוח (0) */}
              <NoteCell 
                fret={0}
                stringIdx={stringIdx}
                baseFreq={stringInfo.baseFreq}
                playNote={playNote}
                displayType={displayType}
                modeData={modeData}
                chordData={chordData}
                isOpenString={true}
              />

              {/* סריגים 1-15 */}
              {[...Array(15)].map((_, fretIdx) => (
                <NoteCell 
                  key={fretIdx}
                  fret={fretIdx + 1}
                  stringIdx={stringIdx}
                  baseFreq={stringInfo.baseFreq}
                  playNote={playNote}
                  displayType={displayType}
                  modeData={modeData}
                  chordData={chordData}
                  isOpenString={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoteCell = ({ fret, stringIdx, baseFreq, playNote, displayType, modeData, chordData, isOpenString }) => {
  const noteName = getNoteName(stringIdx, fret);
  const freq = getNoteFreq(baseFreq, fret);

  let isActive = false;
  let isRoot = false;

  if (displayType === 'mode' && modeData) {
    const rootIndex = NOTES.indexOf('D');
    const noteIndex = NOTES.indexOf(noteName);
    const interval = (noteIndex - rootIndex + 12) % 12;
    isActive = modeData.includes(interval);
    isRoot = (interval === 0);
  } else if (displayType === 'chord' && chordData) {
    isActive = chordData[stringIdx] === fret;
  }

  // בדיקת נקודות סימון (Dots)
  const isDot = [3, 5, 7, 10].includes(fret);
  const isDoubleDot = fret === 12;

  return (
    <div className={`fret-cell ${isOpenString ? 'open-string' : ''}`} onClick={() => playNote(freq)}>
      {/* קו המיתר (ויזואלי בלבד) */}
      <div className="string-line-container">
        <div className="string-line"></div>
        <div className="string-line"></div>
      </div>

      {/* נקודת סימון על הצוואר (רקע) */}
      {!isOpenString && isDot && <div className="fret-dot"></div>}
      {!isOpenString && isDoubleDot && <div className="fret-dot double"></div>}

      {/* התו עצמו */}
      {isActive && (
        <div className={`note-marker ${isRoot ? 'root' : ''}`}>
          {noteName}
        </div>
      )}
    </div>
  );
};

export default Fretboard;
