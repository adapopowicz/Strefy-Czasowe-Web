'use client'

import { motion } from 'framer-motion'

const months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU']

// Festival date: 28 March 2026 — MAR is the active month (index 2)
const FESTIVAL_MONTH_INDEX = 2

export default function Timeline() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 py-3"
      style={{
        background: 'rgba(10, 10, 7, 0.75)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(127, 255, 0, 0.12)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    >
      {/* Logo mark */}
      <div className="mr-6 flex-shrink-0">
        <LogoSpring />
      </div>

      {/* Month labels */}
      <div className="flex flex-1 items-center gap-0 relative">
        {/* Progress track */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px opacity-20"
          style={{ background: 'var(--neon-green)' }}
        />

        {months.map((month, i) => {
          const isPast = i < FESTIVAL_MONTH_INDEX
          const isCurrent = i === FESTIVAL_MONTH_INDEX
          return (
            <div
              key={month}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Tick mark */}
              <div
                className="w-px mb-1 transition-all duration-300"
                style={{
                  height: isCurrent ? '10px' : '6px',
                  background: isPast || isCurrent ? 'var(--neon-green)' : 'rgba(127,255,0,0.25)',
                }}
              />
              <span
                className="text-[9px] tracking-widest transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: isCurrent
                    ? 'var(--neon-green)'
                    : isPast
                    ? 'rgba(127,255,0,0.5)'
                    : 'rgba(127,255,0,0.2)',
                  fontWeight: isCurrent ? '700' : '400',
                  textShadow: isCurrent
                    ? '0 0 8px rgba(127,255,0,0.6)'
                    : 'none',
                }}
              >
                {month}
              </span>

              {/* Festival dot marker */}
              {isCurrent && (
                <div
                  className="absolute -top-1 w-2 h-2 rounded-full"
                  style={{
                    background: 'var(--neon-green)',
                    boxShadow: '0 0 8px rgba(127,255,0,0.8)',
                    top: '-2px',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Logo blank / right mark */}
      <div className="ml-6 flex-shrink-0 opacity-30">
        <div
          className="w-6 h-6 rounded-full border"
          style={{ borderColor: 'var(--neon-green)' }}
        />
      </div>
    </motion.div>
  )
}

function LogoSpring() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" stroke="#7FFF00" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="5" fill="#7FFF00" fillOpacity="0.8" />
      <line x1="14" y1="0" x2="14" y2="8" stroke="#7FFF00" strokeWidth="1.5" />
      <line x1="14" y1="20" x2="14" y2="28" stroke="#7FFF00" strokeWidth="1.5" />
      <line x1="0" y1="14" x2="8" y2="14" stroke="#7FFF00" strokeWidth="1.5" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="#7FFF00" strokeWidth="1.5" />
    </svg>
  )
}
