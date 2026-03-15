'use client'

import { motion } from 'framer-motion'

interface MenuProps {
  onNavClick: (sectionId: string) => void
}

const navItems = [
  { label: 'BILETY',   sectionId: 'bilety' },
  { label: 'LINE-UP',  sectionId: 'lineup' },
  { label: 'KONTAKT',  sectionId: 'kontakt' },
]

export default function Menu({ onNavClick }: MenuProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-2 px-6 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavClick(item.sectionId)}
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '4px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#1A280A',
            background: '#90A981',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = '#A4F782' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = '#90A981' }}
        >
          {item.label}
        </button>
      ))}
    </motion.nav>
  )
}
