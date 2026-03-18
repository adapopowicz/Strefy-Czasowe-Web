'use client'

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
      style={{ paddingTop: '60px', paddingBottom: '144px' }}
    >
      {/* Pink ellipse SVG — dome rising from below, behind text */}
      <img
        src="/images/background_ellipse.svg"
        alt=""
        className="absolute pointer-events-none sm:[clip-path:inset(0_0_15%_0)] md:[clip-path:inset(0_0_30%_0)] lg:[clip-path:inset(0_0_45%_0)] xl:[clip-path:inset(0_0_50%_0)]"
        style={{
          width: '72vw',
          left: '50%',
          top: '6vh',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      />

      {/* Date + location badge — upper right corner */}
      <img
        src="/images/date_time.svg"
        alt="28.03.2026 · SVERA Gdynia"
        className="absolute pointer-events-none"
        style={{
          top: '72px',
          right: '24px',
          width: 'clamp(140px, 14vw, 224px)',
          height: 'auto',
          zIndex: 10,
        }}
      />

      {/* Main title */}
      <h1
        className="relative z-10 text-center"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(52px, 16.25vw, 234px)',
          color: '#A4F782',
          letterSpacing: '-0.01em',
          lineHeight: 0.9,
          textShadow: '0 0 10px rgba(0,0,0,0.5)',
        }}
      >
        STREFY
        <br />
        CZASOWE
      </h1>

      {/* Subtitle */}
      <p
        className="relative z-10 text-center mt-5"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 'clamp(16px, 3.125vw, 45px)',
          color: '#E8E8E8',
          lineHeight: 0.9,
        }}
      >
        Indoorowy festiwal muzyczno-wizualny
        <br />
        odbywający się w noce zmiany czasu.
      </p>

      {/* Countdown */}
      <p
        className="relative z-10 text-center mt-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          fontSize: 'clamp(13px, 1.67vw, 24px)',
          color: '#8B968A',
          letterSpacing: '0.02em',
          lineHeight: 0.9,
        }}
      >
        Do zmiany czasu na letni pozostało
        <br />
        <span style={{ color: '#A4F782' }}>
          {days} dni {hours} godzin {minutes} minut {seconds} sekund
        </span>
      </p>
    </div>
  )
}
