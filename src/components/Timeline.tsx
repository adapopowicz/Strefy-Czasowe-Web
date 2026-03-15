'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU']

// Logo positions: index into months array
const SPRING_MONTH = 2  // MAR
const BLANK_MONTH = 9   // PAŹ

// With justify-between over 12 items, item i sits at i/11 * 100% of container width
function monthPercent(i: number) {
  return (i / 11) * 100
}

function getDotPercent(): number {
  const now = new Date()
  const monthIndex = now.getMonth()
  const daysInMonth = new Date(now.getFullYear(), monthIndex + 1, 0).getDate()
  const dayFraction = (now.getDate() - 1) / daysInMonth
  return Math.min(100, Math.max(0, ((monthIndex + dayFraction) / 11) * 100))
}

export default function Timeline() {
  const [dotPercent, setDotPercent] = useState(getDotPercent)

  // Update dot position every minute
  useEffect(() => {
    const id = setInterval(() => setDotPercent(getDotPercent()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative w-full px-8 pb-5">

        {/* Logos — absolutely positioned above the line */}
        <img
          src="/images/logo_spring.svg"
          alt="Strefy Czasowe Spring"
          style={{
            position: 'absolute',
            bottom: 'calc(5px + 36px + 16px + 8px + 20px)',
            left: `calc(32px + (100% - 64px) * ${monthPercent(SPRING_MONTH) / 100})`,
            transform: 'translateX(-50%)',
            height: '36px',
            width: 'auto',
          }}
        />
        <img
          src="/images/logo_blank.svg"
          alt="Strefy Czasowe Autumn"
          style={{
            position: 'absolute',
            bottom: 'calc(5px + 36px + 16px + 8px + 20px)',
            left: `calc(32px + (100% - 64px) * ${monthPercent(BLANK_MONTH) / 100})`,
            transform: 'translateX(-50%)',
            height: '36px',
            width: 'auto',
          }}
        />

        {/* Logo spacer */}
        <div style={{ height: '56px' }} />

        {/* Horizontal line with dot */}
        <div className="relative w-full" style={{ height: '16px', marginBottom: '8px' }}>
          {/* Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: '#24380D',
              transform: 'translateY(-50%)',
            }}
          />
          {/* Current time dot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${dotPercent}%`,
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#A4F782',
              boxShadow: '0 0 8px rgba(164,247,130,0.6)',
            }}
          />
        </div>

        {/* Month labels */}
        <div className="flex justify-between">
          {months.map((month, i) => {
            const isPast = i < new Date().getMonth()
            const isCurrent = i === new Date().getMonth()
            return (
              <span
                key={month}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 400,
                  fontSize: '36px',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  color: isCurrent
                    ? '#A4F782'
                    : isPast
                    ? '#E8E8E8'
                    : '#24380D',
                }}
              >
                {month}
              </span>
            )
          })}
        </div>

      </div>
    </motion.div>
  )
}
