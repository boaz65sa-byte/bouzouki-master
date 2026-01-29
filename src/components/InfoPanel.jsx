import React from 'react'
import { Info } from 'lucide-react'
import './InfoPanel.css'

const InfoPanel = ({ text }) => {
  return (
    <div className="info-panel">
      <div className="info-content">
        <Info className="info-icon" size={24} />
        <p className="info-text">{text}</p>
      </div>
    </div>
  )
}

export default InfoPanel
