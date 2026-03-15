'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function update() {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// Festival date: 28 March 2026, time change night
const FESTIVAL_DATE = new Date('2026-03-28T23:00:00')

export default function HomepageContent() {
  const { days, hours, minutes, seconds } = useCountdown(FESTIVAL_DATE)

  return (
    <div className="relative flex flex-col items-start justify-center h-full px-12 pt-20 pb-20">
      {/* Pink/magenta glowing ellipse blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '520px',
          height: '420px',
          left: '50%',
          top: '46%',
          transform: 'translate(-40%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(255, 68, 255, 0.45) 0%, rgba(200, 30, 200, 0.18) 45%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Festival title */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1
          className="font-black leading-none tracking-tight neon-glow"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 13vw, 12rem)',
            color: 'var(--neon-green)',
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
          }}
        >
          STREFY
          <br />
          CZASOWE
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 mt-6 max-w-sm"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'rgba(127, 255, 0, 0.75)',
          lineHeight: '1.5',
          fontWeight: 300,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Indoorowy festiwal muzyczno-wizualny
        <br />
        odbywający się w noce zmiany czasu.
      </motion.p>

      {/* Countdown + date info */}
      <motion.div
        className="relative z-10 mt-4 flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(127, 255, 0, 0.5)',
            letterSpacing: '0.04em',
          }}
        >
          Do zmiany czasu na letni pozostało{' '}
          <span style={{ color: 'rgba(127,255,0,0.8)' }}>
            {days} dni {hours} godzin {minutes} minut {seconds} sekund
          </span>
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(127, 255, 0, 0.4)',
            letterSpacing: '0.04em',
          }}
        >
          28.03.2026, SVERA Gdynia
        </p>
      </motion.div>

      {/* CTA button */}
      <motion.a
        href="#bilety"
        className="relative z-10 mt-8 pill-btn"
        style={{ fontSize: '12px', padding: '8px 24px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        DOWIEDZ SIĘ WIĘCEJ
      </motion.a>
    </div>
  )
}
