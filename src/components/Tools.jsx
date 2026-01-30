import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Mic, Play, Pause, Activity, Volume2 } from 'lucide-react';
import './Tools.css';

const Tools = () => {
  // --- Metronome State ---
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(-5);
  
  // --- Tuner State ---
  const [isTunerActive, setIsTunerActive] = useState(false);
  const [pitch, setPitch] = useState({ note: '-', hz: 0, diff: 0 });
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const requestRef = useRef(null);
  const sourceRef = useRef(null);

  // --- Metronome Logic ---
  useEffect(() => {
    let loop;
    const membrane = new Tone.MembraneSynth().toDestination();
    membrane.volume.value = volume;

    if (isPlaying) {
      Tone.start();
      Tone.Transport.bpm.value = bpm;
      
      loop = new Tone.Loop((time) => {
        // High click on the first beat (optional, here simplified to steady click)
        membrane.triggerAttackRelease("C2", "32n", time);
      }, "4n").start(0);

      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      if (loop) loop.stop();
    }

    return () => {
      if (loop) loop.dispose();
    };
  }, [isPlaying, bpm]);

  useEffect(() => {
    // Update volume in real-time
    Tone.Destination.volume.value = volume;
  }, [volume]);


  // --- Tuner Logic (Autocorrelation) ---
  const startTuner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048; // Higher buffer for better bass detection
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      setIsTunerActive(true);
      updatePitch();
    } catch (err) {
      console.error("Microphone Error:", err);
      alert("לא הצלחנו לגשת למיקרופון. אנא בדוק הרשאות.");
    }
  };

  const stopTuner = () => {
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    setIsTunerActive(false);
    setPitch({ note: '-', hz: 0, diff: 0 });
  };

  const autoCorrelate = (buf, sampleRate) => {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      rms += buf[i] * buf[i];
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1; // רעש רקע, לא לזהות

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0; while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    }
    let T0 = maxpos;

    return sampleRate / T0;
  };

  const updatePitch = () => {
    if (!analyserRef.current) return;
    
    const buf = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buf);
    const ac = autoCorrelate(buf, audioContextRef.current.sampleRate);

    if (ac !== -1) {
      const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const noteNum = 12 * (Math.log(ac / 440) / Math.log(2)) + 69;
      const roundedNote = Math.round(noteNum);
      const noteName = noteStrings[roundedNote % 12];
      
      // כמה אנחנו רחוקים מהתו המדויק (בסנטים)
      const detune = Math.floor((noteNum - roundedNote) * 100); 

      setPitch({ 
        note: noteName, 
        hz: Math.round(ac),
        diff: detune 
      });
    }
    requestRef.current = requestAnimationFrame(updatePitch);
  };

  return (
    <div className="tools-container">
      {/* --- מטרונום --- */}
      <div className="tool-card metronome-card">
        <div className="card-header">
          <Activity className="icon" />
          <h3>מטרונום</h3>
        </div>
        
        <div className="metronome-controls">
          <div className="bpm-display">
            <span className="bpm-number">{bpm}</span>
            <span className="bpm-label">BPM</span>
          </div>
          
          <input 
            type="range" 
            min="40" max="240" 
            value={bpm} 
            onChange={(e) => setBpm(e.target.value)}
            className="slider bpm-slider"
          />

          <button 
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>

      {/* --- טיונר --- */}
      <div className="tool-card tuner-card">
        <div className="card-header">
          <Mic className="icon" />
          <h3>טיונר</h3>
        </div>

        <div className="tuner-display">
          {!isTunerActive ? (
            <button className="start-tuner-btn" onClick={startTuner}>
              הפעל טיונר
            </button>
          ) : (
            <>
              <div className="note-display">
                {pitch.note}
                <span className="hz-display">{pitch.hz} Hz</span>
              </div>
              
              {/* מד דיוק (Needle) */}
              <div className="tuner-gauge">
                <div className="gauge-center"></div>
                <div 
                  className="gauge-needle"
                  style={{ 
                    transform: `translateX(-50%) rotate(${pitch.diff}deg)`,
                    backgroundColor: Math.abs(pitch.diff) < 5 ? '#4ade80' : '#f87171'
                  }}
                ></div>
              </div>
              
              <button className="stop-tuner-btn" onClick={stopTuner}>כיבוי</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
