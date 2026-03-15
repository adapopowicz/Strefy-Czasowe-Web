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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-start gap-2 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="pill-btn"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {item.label}
        </a>
      ))}
    </motion.nav>
  )
}
