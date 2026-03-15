'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import VideoCard from './cards/VideoCard'
import TicketsCard from './cards/TicketsCard'
import ContactCard from './cards/ContactCard'
import ArtistCard from './cards/ArtistCard'

interface FloatingCardProps {
  children: React.ReactNode
  x: number   // % from left
  y: number   // % from top
  factor: number  // parallax speed multiplier
  scrollProgress: MotionValue<number>
  baseZ?: number
}

function FloatingCard({ children, x, y, factor, scrollProgress, baseZ = 10 }: FloatingCardProps) {
  const yMove = useTransform(scrollProgress, [0, 1], [0, -100 * factor])

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, y: yMove, zIndex: baseZ }}
      whileHover={{ zIndex: 100, scale: 1.03 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.div>
  )
}

export default function ScrollElements({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="relative w-full h-full">

      {/* Video — left side */}
      <FloatingCard x={4} y={16} factor={0.7} scrollProgress={scrollProgress} baseZ={12}>
        <VideoCard />
      </FloatingCard>

      {/* Tickets — center-right */}
      <FloatingCard x={54} y={8} factor={1.1} scrollProgress={scrollProgress} baseZ={11}>
        <TicketsCard />
      </FloatingCard>

      {/* Artist — far right */}
      <FloatingCard x={76} y={34} factor={0.85} scrollProgress={scrollProgress} baseZ={10}>
        <ArtistCard />
      </FloatingCard>

      {/* Contact — lower left */}
      <FloatingCard x={8} y={54} factor={1.3} scrollProgress={scrollProgress} baseZ={13}>
        <ContactCard />
      </FloatingCard>

      {/* Decorative ghost date */}
      <FloatingCard x={40} y={58} factor={0.55} scrollProgress={scrollProgress} baseZ={7}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '88px',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(127,255,0,0.1)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          28.03
        </div>
      </FloatingCard>

      {/* Decorative label */}
      <FloatingCard x={26} y={34} factor={1.5} scrollProgress={scrollProgress} baseZ={7}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(127,255,0,0.18)',
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
