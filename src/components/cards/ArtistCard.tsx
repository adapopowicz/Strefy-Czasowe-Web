'use client'

import { motion } from 'framer-motion'

export default function ArtistCard() {
  return (
    <motion.div
      className="card relative overflow-hidden"
      style={{ width: '220px', borderRadius: '14px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Artist photo placeholder */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: '220px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d18 50%, #0a0a0a 100%)',
          }}
        />
        {/* Abstract person silhouette */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body glow */}
          <ellipse cx="110" cy="150" rx="55" ry="80" fill="rgba(127,255,0,0.03)" />
          {/* Head */}
          <circle cx="110" cy="80" r="32" fill="rgba(127,255,0,0.06)" stroke="rgba(127,255,0,0.1)" strokeWidth="1" />
          {/* Shoulders */}
          <path
            d="M 55 160 Q 70 120 110 115 Q 150 120 165 160"
            stroke="rgba(127,255,0,0.12)"
            strokeWidth="1"
            fill="rgba(127,255,0,0.04)"
          />
        </svg>

        {/* Overlay gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,7,0.9) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Artist info */}
      <div className="px-4 py-3">
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(127,255,0,0.35)',
            letterSpacing: '0.1em',
            marginBottom: '4px',
          }}
        >
          LINE-UP 2026
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            color: 'var(--neon-green)',
            fontWeight: 600,
          }}
        >
          TBA
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(127,255,0,0.4)',
            marginTop: '2px',
          }}
        >
          28.03.2026
        </p>
      </div>
    </motion.div>
  )
}
