'use client'

import { useRef } from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import VideoCard from './cards/VideoCard'
import TicketsCard from './cards/TicketsCard'
import ContactCard from './cards/ContactCard'
import ArtistCard from './cards/ArtistCard'

interface FloatingCardProps {
  children: React.ReactNode
  x: number
  y: number
  factor: number
  scale?: number
  scrollProgress: MotionValue<number>
  baseZ?: number
  sectionId?: string
  focusedSection?: string | null
}

function FloatingCard({ children, x, y, factor, scale = 1, scrollProgress, baseZ = 10, sectionId, focusedSection }: FloatingCardProps) {
  const yMove = useTransform(scrollProgress, [0, 1], [0, -280 * factor])
  const isFocused = sectionId !== undefined && focusedSection === sectionId

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        y: yMove,
        zIndex: isFocused ? 0 : baseZ,
        scale,
        transformOrigin: 'top left',
        opacity: isFocused ? 0 : 1,
        pointerEvents: isFocused ? 'none' : 'auto',
        cursor: 'grab',
      }}
      whileDrag={{ cursor: 'grabbing', zIndex: 100 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollElementsProps {
  scrollProgress: MotionValue<number>
  focusedSection: string | null
  onFocusSection: (id: string | null) => void
}

export default function ScrollElements({ scrollProgress, focusedSection }: ScrollElementsProps) {
  return (
    <div className="relative w-full h-full">

      {/* VideoCard — no section, links to YouTube video */}
      <FloatingCard x={1} y={8} factor={0.5} scale={1.35} scrollProgress={scrollProgress} baseZ={12}>
        <VideoCard />
      </FloatingCard>

      {/* TicketsCard — BILETY section */}
      <FloatingCard x={57} y={3} factor={1.3} scale={1.25} scrollProgress={scrollProgress} baseZ={11}
        sectionId="bilety" focusedSection={focusedSection}>
        <TicketsCard />
      </FloatingCard>

      {/* ArtistCard — LINE-UP section */}
      <FloatingCard x={80} y={26} factor={0.8} scale={1.3} scrollProgress={scrollProgress} baseZ={10}
        sectionId="lineup" focusedSection={focusedSection}>
        <ArtistCard />
      </FloatingCard>

      {/* ContactCard — KONTAKT section */}
      <FloatingCard x={3} y={52} factor={1.6} scale={1.3} scrollProgress={scrollProgress} baseZ={13}
        sectionId="kontakt" focusedSection={focusedSection}>
        <ContactCard />
      </FloatingCard>

      {/* Decorative label */}
      <FloatingCard x={26} y={32} factor={1.8} scale={1} scrollProgress={scrollProgress} baseZ={7}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(164,247,130,0.15)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          SVERA · GDYNIA · 2026
        </div>
      </FloatingCard>

    </div>
  )
}
