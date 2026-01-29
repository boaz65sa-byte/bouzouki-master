import React from 'react'
import { Music, Sun, Moon } from 'lucide-react'
import './Header.css'

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <Music className="header-icon" size={40} />
          <div>
            <h1>Bouzouki Master</h1>
            <p className="subtitle">מאסטר הבוזוקי - מודוסים (דרומוס) ואקורדים</p>
          </div>
        </div>

        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="החלף ערכת נושא"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="header-info">
        <span>🎸 בוזוקי טטראכורדו - 4 מיתרים</span>
        <span className="separator">•</span>
        <span>כיוון: D-A-F-C</span>
        <span className="separator">•</span>
        <span>15 סריגים</span>
      </div>
    </header>
  )
}

export default Header
