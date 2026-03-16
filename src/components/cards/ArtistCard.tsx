'use client'

import { motion } from 'framer-motion'

export default function ArtistCard() {
  return (
    <motion.div
      className="card overflow-hidden"
      style={{ width: 'min(400px, calc(100vw - 32px))', borderRadius: '16px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Photo placeholder — wider, less portrait */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #200D0A 0%, #1A280A 50%, #24380D 100%)' }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" fill="none">
          <circle cx="200" cy="76" r="34" fill="rgba(164,247,130,0.04)" stroke="rgba(164,247,130,0.08)" strokeWidth="1" />
          <path d="M100 160 Q135 120 200 114 Q265 120 300 160" stroke="rgba(164,247,130,0.09)" strokeWidth="1" fill="rgba(164,247,130,0.02)" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(26,40,10,0.92) 0%, transparent 100%)' }} />
      </div>

      <div className="px-4 py-3">
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '8px', color: '#8B968A', letterSpacing: '0.1em', marginBottom: '4px' }}>
          LINE-UP 2026
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '15px', color: '#A4F782' }}>
          TBA
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '9px', color: '#8B968A', marginTop: '2px' }}>
          28.03.2026
        </p>
      </div>
    </motion.div>
  )
}
