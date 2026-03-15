'use client'

import { motion } from 'framer-motion'

const navItems = [
  { label: 'BILETY', href: '#bilety' },
  { label: 'LINE-UP', href: '#lineup' },
  { label: 'KONTAKT', href: '#kontakt' },
]

export default function Menu() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-2 px-6 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          style={{
            display: 'inline-block',
            border: '1px solid rgba(139,150,138,0.35)',
            borderRadius: '999px',
            padding: '5px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '24px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#E8E8E8',
            background: 'rgba(32,13,10,0.68)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            textDecoration: 'none',
            textTransform: 'uppercase' as const,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.target as HTMLElement
            el.style.background = 'rgba(36,56,13,0.88)'
            el.style.borderColor = 'rgba(164,247,130,0.5)'
            el.style.color = '#A4F782'
          }}
          onMouseLeave={e => {
            const el = e.target as HTMLElement
            el.style.background = 'rgba(32,13,10,0.68)'
            el.style.borderColor = 'rgba(139,150,138,0.35)'
            el.style.color = '#E8E8E8'
          }}
        >
          {item.label}
        </a>
      ))}
    </motion.nav>
  )
}
