'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VideoCard() {
  const [soundOn, setSoundOn] = useState(false)

  return (
    <motion.div
      className="card overflow-hidden"
      style={{ width: '340px', borderRadius: '14px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Concert image placeholder */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #200D0A 0%, #1A280A 50%, #24380D 100%)',
          }}
        />
        {/* Stage lights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(71,127,156,0.45) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 70% 40%, rgba(252,160,235,0.28) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 80%, rgba(164,247,130,0.18) 0%, transparent 60%)',
          }}
        />
        {/* Crowd silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" height="70" viewBox="0 0 340 70" preserveAspectRatio="none">
          <path
            d="M0 70 L0 48 Q15 38 28 44 Q40 32 55 42 Q68 30 82 42 Q95 35 110 46 Q125 30 140 42 Q155 36 168 46 Q182 33 195 44 Q210 36 225 46 Q238 32 252 44 Q268 36 280 46 Q295 33 310 42 Q322 36 340 44 L340 70 Z"
            fill="rgba(32,13,10,0.70)"
          />
        </svg>
        {/* Badge */}
        <div className="absolute top-3 left-3 pill-btn" style={{ fontSize: '9px', padding: '4px 10px' }}>
          POPRZEDNIA EDYCJA
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '10px', color: '#90A981' }}>
          STREFY CZASOWE 2025
        </span>
        <button
          onClick={() => setSoundOn((s) => !s)}
          className="pill-btn flex items-center gap-1.5"
          style={{ fontSize: '9px', padding: '4px 10px' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: soundOn ? '#A4F782' : 'transparent',
              border: '1px solid #A4F782',
            }}
          />
          {soundOn ? 'SOUND ON' : 'SOUND OFF'}
        </button>
      </div>
    </motion.div>
  )
}
