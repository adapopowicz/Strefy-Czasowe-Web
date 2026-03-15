'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VideoCard() {
  const [soundOn, setSoundOn] = useState(false)

  return (
    <motion.div
      className="card relative overflow-hidden cursor-default select-none"
      style={{
        width: '340px',
        borderRadius: '14px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Video placeholder / concert image */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: '200px' }}
      >
        {/* Concert photo placeholder with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1a08 40%, #0a1505 100%)',
          }}
        />
        {/* Simulated stage lights / concert atmosphere */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(100, 40, 200, 0.6) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 70% 40%, rgba(180, 30, 180, 0.4) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 80%, rgba(60, 130, 20, 0.3) 0%, transparent 60%)',
          }}
        />
        {/* Crowd silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-50"
          height="80"
          viewBox="0 0 340 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80 L0 55 Q10 45 20 50 Q30 40 40 48 Q50 35 60 45 Q70 38 80 50 Q90 42 100 52 Q115 38 130 48 Q140 35 150 45 Q160 40 170 50 Q180 38 190 48 Q200 42 210 50 Q220 38 230 45 Q240 35 250 48 Q260 42 270 52 Q280 40 290 48 Q300 38 310 45 Q320 50 330 44 Q335 48 340 50 L340 80 Z"
            fill="rgba(0,0,0,0.7)"
          />
        </svg>

        {/* "POPRZEDNIA EDYCJA" badge */}
        <div
          className="absolute top-3 left-3 pill-btn"
          style={{ fontSize: '9px', padding: '4px 10px', pointerEvents: 'none' }}
        >
          POPRZEDNIA EDYCJA
        </div>
      </div>

      {/* Sound toggle */}
      <div className="flex items-center justify-between px-4 py-3">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(127,255,0,0.5)',
          }}
        >
          STREFY CZASOWE 2025
        </span>
        <button
          onClick={() => setSoundOn((s) => !s)}
          className="pill-btn flex items-center gap-1"
          style={{ fontSize: '9px', padding: '4px 10px' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: soundOn ? 'var(--neon-green)' : 'transparent',
              border: '1px solid var(--neon-green)',
            }}
          />
          {soundOn ? 'SOUND ON' : 'SOUND OFF'}
        </button>
      </div>
    </motion.div>
  )
}
