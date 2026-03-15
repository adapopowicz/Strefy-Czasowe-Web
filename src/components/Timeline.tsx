'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU']

// Logos centered above their festival months
const SPRING_MONTH = 2  // MAR
const BLANK_MONTH  = 9  // PAŹ

// justify-between: item i of 12 sits at i/11 of inner width
function monthFraction(i: number) { return i / 11 }

function getDotPercent(): number {
  const now = new Date()
  const monthIndex = now.getMonth()
  const daysInMonth = new Date(now.getFullYear(), monthIndex + 1, 0).getDate()
  const dayFraction = (now.getDate() - 1) / daysInMonth
  return Math.min(100, Math.max(0, ((monthIndex + dayFraction) / 11) * 100))
}

export default function Timeline() {
  const [dotPercent, setDotPercent] = useState(getDotPercent)

  useEffect(() => {
    const id = setInterval(() => setDotPercent(getDotPercent()), 60000)
    return () => clearInterval(id)
  }, [])

  // Centered above the month label (matches justify-between positions)
  const logoLeft = (index: number) =>
    `calc(32px + (100% - 64px) * ${monthFraction(index)})`

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative w-full px-8 pb-3">

        {/* Spring logo — centered above MAR */}
        <img
          src="/images/logo_spring.svg"
          alt="Strefy Czasowe Spring"
          style={{
            position: 'absolute',
            bottom: 'calc(12px + 22px + 6px + 10px + 6px)',
            left: logoLeft(SPRING_MONTH),
            transform: 'translateX(-50%)',
            height: '48px',
            width: 'auto',
          }}
        />

        {/* Autumn logo — centered above PAŹ */}
        <img
          src="/images/logo_blank.svg"
          alt="Strefy Czasowe Autumn"
          style={{
            position: 'absolute',
            bottom: 'calc(12px + 22px + 6px + 10px + 6px)',
            left: logoLeft(BLANK_MONTH),
            transform: 'translateX(-50%)',
            height: '48px',
            width: 'auto',
          }}
        />

        {/* Spacer for logos */}
        <div style={{ height: '60px' }} />

        {/* Horizontal line with current-date dot */}
        <div className="relative w-full" style={{ height: '10px', marginBottom: '6px' }}>
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: '1px', background: '#24380D', transform: 'translateY(-50%)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: `${dotPercent}%`,
            transform: 'translate(-50%, -50%)',
            width: '9px', height: '9px', borderRadius: '50%',
            background: '#A4F782', boxShadow: '0 0 7px rgba(164,247,130,0.6)',
          }} />
        </div>

        {/* Month labels */}
        <div className="flex justify-between">
          {months.map((month, i) => {
            const now = new Date()
            const isPast = i < now.getMonth()
            const isCurrent = i === now.getMonth()
            return (
              <span key={month} style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                fontSize: '22px',
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: isCurrent ? '#A4F782' : isPast ? '#E8E8E8' : '#24380D',
              }}>
                {month}
              </span>
            )
          })}
        </div>

      </div>
    </motion.div>
  )
}
