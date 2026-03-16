'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU']

const BLANK_MONTH = 9  // PAŹ

// Spring festival is March 28 — logo left edge aligns to that exact day on the 365-day scale.
// Month index 2 (March), day 28, days in March = 31
// dayFraction = (28 - 1) / 31 = 27/31
// overallFraction = (2 + 27/31) / 11 ≈ 0.261
const SPRING_DAY_FRACTION = (2 + 27 / 31) / 11

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
  const [dotPercent, setDotPercent] = useState(0)
  const [dotReady, setDotReady] = useState(false)

  useEffect(() => {
    const initId = setTimeout(() => {
      setDotPercent(getDotPercent())
      setDotReady(true)
    }, 100)
    const intervalId = setInterval(() => setDotPercent(getDotPercent()), 60000)
    return () => {
      clearTimeout(initId)
      clearInterval(intervalId)
    }
  }, [])

  // Position for a given 0–1 fraction of the inner width (matching px-8 padding)
  const logoLeftFraction = (fraction: number) =>
    `calc(32px + (100% - 64px) * ${fraction})`

  const logoLeftMonth = (index: number) =>
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

        {/* Spring logo — left edge at March 28 day-accurate position */}
        <img
          src="/images/logo_spring.svg"
          alt="Strefy Czasowe Spring"
          style={{
            position: 'absolute',
            bottom: 'calc(12px + 22px + 6px + 10px + 6px)',
            left: logoLeftFraction(SPRING_DAY_FRACTION),
            height: '48px',
            width: 'auto',
          }}
        />

        {/* Autumn logo — above PAŹ, shifted slightly right */}
        <img
          src="/images/logo_blank.svg"
          alt="Strefy Czasowe Autumn"
          style={{
            position: 'absolute',
            bottom: 'calc(12px + 22px + 6px + 10px + 6px)',
            left: logoLeftMonth(BLANK_MONTH),
            transform: 'translateX(-30%)',
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
            transition: dotReady ? 'left 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }} />
        </div>

        {/* Month labels */}
        <div className="flex justify-between">
          {months.map((month, i) => {
            const now = new Date()
            const isCurrent = i === now.getMonth()
            return (
              <span key={month} style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                fontSize: '22px',
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: isCurrent ? '#A4F782' : '#24380D',
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
