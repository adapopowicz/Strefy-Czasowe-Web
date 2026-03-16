'use client'

import { motion } from 'framer-motion'

const socials = [
  { label: 'EMAIL',     href: 'mailto:kontakt@strefyczasowe.pl' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/strefyczasowe' },
  { label: 'FACEBOOK',  href: 'https://facebook.com/strefyczasowe' },
]

export default function ContactCard() {
  return (
    <motion.div
      className="card"
      style={{ width: 'min(320px, calc(100vw - 32px))', borderRadius: '16px', padding: '28px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '9px', color: '#90A981', letterSpacing: '0.12em', marginBottom: '14px' }}>
        ORGANIZACJA FESTIWALU
      </p>

      <div className="flex flex-col gap-2 mb-5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn text-center"
            style={{ fontSize: '10px' }}
          >
            {s.label}
          </a>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #24380D', paddingTop: '12px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '8px', color: '#8B968A', marginBottom: '4px' }}>
          PROJEKT I WYKONANIE STRONY
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '10px', color: '#90A981' }}>
          ADA POPOWICZ × SMOOTHSAIL
        </p>
      </div>
    </motion.div>
  )
}
