// נתוני מודוסים יווניים (דרומוס)
export const DROMOI = {
  'Rast (Major)': [0, 2, 4, 5, 7, 9, 11],
  'Hitzaz': [0, 1, 4, 5, 7, 8, 10],
  'Ousak': [0, 1, 3, 5, 7, 8, 10],
  'Pireotikos': [0, 1, 4, 6, 7, 8, 11],
  'Niavent': [0, 2, 3, 6, 7, 8, 11],
  'Sambah': [0, 2, 3, 4, 7, 8, 10],
  'Kiourdi': [0, 2, 3, 5, 7, 9, 10]
}

// נתוני אקורדים (מספר הסריג על כל מיתר)
export const CHORDS = {
  'D Major': [0, 0, 2, 2],
  'D Minor': [0, 0, 1, 2],
  'D7': [0, 3, 2, 2],
  'G Major': [5, 5, 4, 7],
  'A Major': [7, 7, 6, 9],
  'F Major': [3, 3, 2, 5],
  'C Major': [10, 10, 9, 12],
  'E Minor': [2, 2, 2, 4]
}

// שמות התווים
export const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

// כיוון מיתרים (מלמעלה למטה)
export const STRINGS = ['D', 'A', 'F', 'C']
export const OPEN_NOTES = [2, 9, 5, 0] // מיקום בתוך מערך NOTES

// מספר סריגים
export const FRET_COUNT = 15

// פונקציה לחישוב שם תו לפי מיתר וסריג
export const getNoteName = (stringIndex, fret) => {
  const noteIndex = (OPEN_NOTES[stringIndex] + fret) % 12
  return NOTES[noteIndex]
}

// תיאורי מודוסים
export const MODE_DESCRIPTIONS = {
  'Rast (Major)': 'המקם הבסיסי ביותר, מקביל למז\'ור המערבי. משמש בשירים שמחים וחגיגיים.',
  'Hitzaz': 'מקם עם צליל מזרחי אופייני, משתמש ב-2 minor ו-5 diminished. נפוץ במוזיקה טורקית.',
  'Ousak': 'מקם מינורי פריגי עם אופי מלנכולי. נפוץ מאוד במוזיקה יוונית מסורתית.',
  'Pireotikos': 'מקם דרמטי עם שישית מוגבהת, נותן תחושה של מתח ורגש עמוק.',
  'Niavent': 'מקם מינורי הרמוני עם אופי טורקי-ערבי. משמש ביצירות מלודרמטיות.',
  'Sambah': 'מקם נדיר עם שניות קטנות, יוצר צבע הרמוני ייחודי.',
  'Kiourdi': 'גרסה מינורית של Rast, עם אופי עצוב אך לא דרמטי.'
}

// תיאורי אקורדים
export const CHORD_DESCRIPTIONS = {
  'D Major': 'אקורד מז\'ורי בסיסי בפוזיציה פתוחה',
  'D Minor': 'אקורד מינורי בסיסי, מלנכולי',
  'D7': 'אקורד דומיננט, משמש למעברים',
  'G Major': 'אקורד G בפוזיציה נמוכה',
  'A Major': 'אקורד A בפוזיציה בינונית',
  'F Major': 'אקורד F בפוזיציה נמוכה',
  'C Major': 'אקורד C בפוזיציה גבוהה',
  'E Minor': 'אקורד מינורי בסיסי'
}
