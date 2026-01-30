// src/data/musicData.js

// תדרים בסיסיים לחישוב (אוקטבה 4)
const BASE_FREQ = {
  'C': 261.63, 'C#': 277.18, 'D': 293.66, 'Eb': 311.13, 'E': 329.63, 'F': 349.23,
  'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'Bb': 466.16, 'B': 493.88
};

// כיוון בוזוקי סטנדרטי (CFAD) - מלמטה למעלה (מיתר דק למיתר עבה)
// D4 (רה), A3 (לה), F3 (פה), C3 (דו)
export const STRING_TUNING = [
  { name: 'D', octave: 4, baseFreq: 293.66 },
  { name: 'A', octave: 3, baseFreq: 220.00 },
  { name: 'F', octave: 3, baseFreq: 174.61 },
  { name: 'C', octave: 3, baseFreq: 130.81 }
];

export const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
export const FRET_COUNT = 15;

export const DROMOI = {
  'Rast (Major)': [0, 2, 4, 5, 7, 9, 11],
  'Hitzaz': [0, 1, 4, 5, 7, 8, 10],
  'Ousak': [0, 1, 3, 5, 7, 8, 10],
  'Pireotikos': [0, 1, 4, 6, 7, 8, 11],
  'Niavent': [0, 2, 3, 6, 7, 8, 11],
  'Sambah': [0, 2, 3, 4, 7, 8, 10],
  'Kiourdi': [0, 2, 3, 5, 7, 9, 10]
};

// עדכון האקורדים שיתאימו למבנה החדש
export const CHORDS = {
  'D Major': [2, 0, 0, 2], // מיתר 1 (D) עד 4 (C)
  'D Minor': [1, 0, 0, 2],
  'C Major': [0, 3, 5, 5], 
  'F Major': [1, 0, 2, 3],
  'G Major': [3, 2, 0, 0]
};

// פונקציית עזר לחישוב תדר של תו ספציפי
export const getNoteFreq = (baseFreq, fret) => {
  return baseFreq * Math.pow(2, fret / 12);
};

export const getNoteName = (stringIndex, fret) => {
  // המיתר הראשון במערך STRING_TUNING הוא D (אינדקס 2 ברשימת התווים)
  const startNote = STRING_TUNING[stringIndex].name; 
  const startIndex = NOTES.indexOf(startNote);
  return NOTES[(startIndex + fret) % 12];
};
