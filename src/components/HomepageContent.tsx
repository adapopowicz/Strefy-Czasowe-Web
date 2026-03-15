'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// March 28 2026 at 19:00 Warsaw time (CET = UTC+1, before DST change on Mar 29)
const FESTIVAL_DATE = new Date('2026-03-28T19:00:00+01:00')

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export default function HomepageContent() {
  const { days, hours, minutes, seconds } = useCountdown(FESTIVAL_DATE)

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{ paddingTop: '60px', paddingBottom: '160px' }}
    >
      {/* Pink ellipse SVG — dome rising from below, behind text */}
      <img
        src="/images/pink_ellipse.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{
          width: '80vw',
          left: '50%',
          top: '6vh',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      />

      {/* Date + Location — two lines, above title */}
      <motion.p
        className="relative z-10 text-center"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          fontSize: '28px',
          color: '#90A981',
          letterSpacing: '0.04em',
          lineHeight: 1.3,
          marginBottom: '16px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        28.03.2026
        <br />
        SVERA Gdynia
      </motion.p>

      {/* Main title */}
      <motion.h1
        className="relative z-10 text-center leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: '260px',
          color: '#A4F782',
          letterSpacing: '-0.01em',
          lineHeight: 0.88,
          textShadow: '0 4px 32px rgba(164,247,130,0.45), 0 8px 48px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        STREFY
        <br />
        CZASOWE
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 text-center mt-6"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: '50px',
          color: '#E8E8E8',
          lineHeight: 1.2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Indoorowy festiwal muzyczno-wizualny
        <br />
        odbywający się w noce zmiany czasu.
      </motion.p>

      {/* Countdown */}
      <motion.p
        className="relative z-10 text-center mt-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          fontSize: '28px',
          color: '#8B968A',
          letterSpacing: '0.02em',
          lineHeight: 1.5,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Do zmiany czasu na letni pozostało
        <br />
        <span style={{ color: '#A4F782' }}>
          {days} dni {hours} godzin {minutes} minut {seconds} sekund
        </span>
      </motion.p>
    </div>
  )
}
