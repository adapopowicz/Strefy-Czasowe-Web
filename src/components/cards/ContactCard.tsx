'use client'

import { motion } from 'framer-motion'

const socials = [
  { label: 'EMAIL', href: 'mailto:strefy@czasowe.pl', icon: '✉' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/strefyczasowe', icon: '◎' },
  { label: 'FACEBOOK', href: 'https://facebook.com/strefyczasowe', icon: '⬡' },
]

export default function ContactCard() {
  return (
    <motion.div
      className="card relative"
      style={{ width: '260px', borderRadius: '14px', padding: '20px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Section header */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'rgba(127,255,0,0.4)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}
      >
        ORGANIZACJA FESTIWALU
      </p>

      {/* Social links */}
      <div className="flex flex-col gap-2 mb-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn flex items-center gap-2 justify-center"
            style={{ fontSize: '10px', width: '100%' }}
          >
            <span style={{ opacity: 0.7 }}>{s.icon}</span>
            {s.label}
          </a>
        ))}
      </div>

      {/* Credits */}
      <div
        style={{
          borderTop: '1px solid rgba(127,255,0,0.1)',
          paddingTop: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(127,255,0,0.3)',
            marginBottom: '4px',
          }}
        >
          PROJEKT I WYKONANIE STRONY
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(127,255,0,0.6)',
          }}
        >
          ADA POPOWICZ × SMOOTHSAIL
        </p>
      </div>
    </motion.div>
  )
}
