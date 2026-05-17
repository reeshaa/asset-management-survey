import React from 'react'
import './footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <div className="footer-inner"> © {year} Auxilium. All rights reserved.</div>
    </footer>
  )
}
