'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import VideoCard from './cards/VideoCard'
import TicketsCard from './cards/TicketsCard'
import ContactCard from './cards/ContactCard'
import ArtistCard from './cards/ArtistCard'

// Card lifecycle timing (fractions of scrollYProgress over 320vh track = 220vh actual scroll):
//
//  Video      ▓▓▓▓▓░░░░░░░░░░░░  enters 4%, exits 50%   → on-screen: 18-34%
//  Tickets       ░▓▓▓▓▓░░░░░░░░  enters 13%, exits 58%  → on-screen: 27-44%
//  Artist1          ░▓▓▓▓▓░░░░░  enters 23%, exits 67%  → on-screen: 37-54%
//  Artist2            ░▓▓▓▓▓░░░  enters 32%, exits 75%  → on-screen: 46-62%
//  Artist3               ░▓▓▓▓▓  enters 42%, exits 83%  → on-screen: 55-70%
//  Contact                  ░▓▓▓▓▓  enters 52%, exits 96% → on-screen: 65-80%
//
// Max 2 cards overlap at once. Last card exits at 96% (211vh), leaving ~9vh blank.

interface FloatingCardProps {
  children: React.ReactNode
  x: number
  y: number
  scale?: number
  scrollProgress: MotionValue<number>
  baseZ?: number
  sectionId?: string
  focusedSection?: string | null
  entryStart: number
  entryEnd: number
  exitStart: number
  exitEnd: number
  groupIndex?: number
  groupSize?: number
}

function FloatingCard({
  children, x, y, scale = 1, scrollProgress, baseZ = 10,
  sectionId, focusedSection,
  entryStart, entryEnd, exitStart, exitEnd,
  groupIndex, groupSize,
}: FloatingCardProps) {
  const [hovered, setHovered] = useState(false)
  // Single piecewise transform — card enters from below, drifts upward on-screen,
  // then exits off the top. The -220 midpoint ensures continuous motion (no freeze).
  const totalY = useTransform(
    scrollProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [700, 0, -220, -1600],
    { clamp: true }
  )

  const isFocused = sectionId !== undefined && focusedSection === sectionId
  const innerRef = useRef<HTMLDivElement>(null)
  const [focusOffset, setFocusOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isFocused && innerRef.current) {
      const compute = () => {
        if (!innerRef.current) return
        const rect = innerRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        if (groupIndex !== undefined && groupSize !== undefined && groupSize > 1) {
          const gap = 24
          const cardW = rect.width
          const totalW = groupSize * cardW + (groupSize - 1) * gap
          const startCX = window.innerWidth / 2 - totalW / 2 + cardW / 2
          const targetCX = startCX + groupIndex * (cardW + gap)
          setFocusOffset({ x: targetCX - cx, y: window.innerHeight / 2 - cy })
        } else {
          setFocusOffset({ x: window.innerWidth / 2 - cx, y: window.innerHeight / 2 - cy })
        }
      }
      const id = setTimeout(compute, 50)
      return () => clearTimeout(id)
    } else {
      setFocusOffset({ x: 0, y: 0 })
    }
  }, [isFocused, groupIndex, groupSize])

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      className="absolute"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        y: totalY,
        zIndex: isFocused ? 100 : hovered ? 50 : baseZ,
        cursor: 'grab',
      }}
      whileDrag={{ cursor: 'grabbing', zIndex: 200 }}
    >
      <motion.div
        ref={innerRef}
        style={{ transformOrigin: 'top left' }}
        animate={{
          scale: isFocused ? scale * 1.05 : scale,
          x: focusOffset.x,
          y: focusOffset.y,
          boxShadow: isFocused
            ? '0 0 0 2px #A4F782, 0 8px 60px rgba(164,247,130,0.35)'
            : '0 0 0 0px transparent',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface ScrollElementsProps {
  scrollProgress: MotionValue<number>
  focusedSection: string | null
  onFocusSection: (id: string | null) => void
}

function MobileStack() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '20px', paddingTop: '72px', paddingBottom: '40px',
      paddingLeft: '16px', paddingRight: '16px', width: '100%',
    }}>
      <div style={{ width: '100%', maxWidth: '700px' }}><VideoCard /></div>
      <div style={{ width: '100%', maxWidth: '370px' }}><TicketsCard /></div>
      <div style={{ width: '100%', maxWidth: '400px' }}><ArtistCard /></div>
      <div style={{ width: '100%', maxWidth: '400px' }}><ArtistCard /></div>
      <div style={{ width: '100%', maxWidth: '400px' }}><ArtistCard /></div>
      <div style={{ width: '100%', maxWidth: '320px' }}><ContactCard /></div>
    </div>
  )
}

export default function ScrollElements({ scrollProgress, focusedSection }: ScrollElementsProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <MobileStack />

  return (
    <div className="relative w-full h-full">

      {/* VideoCard — 2× natural size (700×420px), left side */}
      <FloatingCard
        x={3} y={6} scale={1.3}
        scrollProgress={scrollProgress} baseZ={12}
        entryStart={0.03} entryEnd={0.15}
        exitStart={0.27} exitEnd={0.38}>
        <VideoCard />
      </FloatingCard>

      {/* TicketsCard — BILETY, right upper */}
      <FloatingCard
        x={52} y={4} scale={1.55}
        scrollProgress={scrollProgress} baseZ={11}
        sectionId="bilety" focusedSection={focusedSection}
        entryStart={0.09} entryEnd={0.21}
        exitStart={0.32} exitEnd={0.43}>
        <TicketsCard />
      </FloatingCard>

      {/* Artist 1 — LINE-UP group, right side */}
      <FloatingCard
        x={56} y={28} scale={1.55}
        scrollProgress={scrollProgress} baseZ={10}
        sectionId="lineup" focusedSection={focusedSection}
        entryStart={0.15} entryEnd={0.26}
        exitStart={0.37} exitEnd={0.47}
        groupIndex={0} groupSize={3}>
        <ArtistCard />
      </FloatingCard>

      {/* Artist 2 — LINE-UP group, left side */}
      <FloatingCard
        x={4} y={46} scale={1.55}
        scrollProgress={scrollProgress} baseZ={9}
        sectionId="lineup" focusedSection={focusedSection}
        entryStart={0.20} entryEnd={0.31}
        exitStart={0.41} exitEnd={0.51}
        groupIndex={1} groupSize={3}>
        <ArtistCard />
      </FloatingCard>

      {/* Artist 3 — LINE-UP group, center */}
      <FloatingCard
        x={32} y={60} scale={1.55}
        scrollProgress={scrollProgress} baseZ={9}
        sectionId="lineup" focusedSection={focusedSection}
        entryStart={0.25} entryEnd={0.36}
        exitStart={0.45} exitEnd={0.55}
        groupIndex={2} groupSize={3}>
        <ArtistCard />
      </FloatingCard>

      {/* ContactCard — KONTAKT, right lower */}
      <FloatingCard
        x={54} y={64} scale={1.55}
        scrollProgress={scrollProgress} baseZ={13}
        sectionId="kontakt" focusedSection={focusedSection}
        entryStart={0.30} entryEnd={0.41}
        exitStart={0.52} exitEnd={0.65}>
        <ContactCard />
      </FloatingCard>

      {/* Decorative label */}
      <FloatingCard
        x={28} y={38} scale={1}
        scrollProgress={scrollProgress} baseZ={7}
        entryStart={0.07} entryEnd={0.18}
        exitStart={0.37} exitEnd={0.47}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '13px',
          color: 'rgba(164,247,130,0.15)', letterSpacing: '0.22em',
          textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none',
        }}>
          SVERA · GDYNIA · 2026
        </div>
      </FloatingCard>

    </div>
  )
}
