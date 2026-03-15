'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoCard from './cards/VideoCard'
import TicketsCard from './cards/TicketsCard'
import ContactCard from './cards/ContactCard'
import ArtistCard from './cards/ArtistCard'

interface FloatingCardProps {
  children: React.ReactNode
  initialX: number
  initialY: number
  parallaxFactor?: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  zIndex?: number
}

function FloatingCard({
  children,
  initialX,
  initialY,
  parallaxFactor = 1,
  scrollProgress,
  zIndex = 10,
}: FloatingCardProps) {
  const yMove = useTransform(
    scrollProgress,
    [0, 1],
    [0, -120 * parallaxFactor]
  )

  return (
    <motion.div
      className="absolute group"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        y: yMove,
        zIndex,
      }}
      whileHover={{ zIndex: 100, scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollElementsProps {
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

export default function ScrollElements({ scrollProgress }: ScrollElementsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enable pointer events on individual cards */}
      <div className="relative w-full h-full pointer-events-auto">
        {/* Video card — left-center */}
        <FloatingCard
          initialX={4}
          initialY={18}
          parallaxFactor={0.7}
          scrollProgress={scrollProgress}
          zIndex={12}
        >
          <VideoCard />
        </FloatingCard>

        {/* Tickets card — center-right */}
        <FloatingCard
          initialX={55}
          initialY={10}
          parallaxFactor={1.1}
          scrollProgress={scrollProgress}
          zIndex={11}
        >
          <TicketsCard />
        </FloatingCard>

        {/* Artist card — far right */}
        <FloatingCard
          initialX={76}
          initialY={35}
          parallaxFactor={0.85}
          scrollProgress={scrollProgress}
          zIndex={10}
        >
          <ArtistCard />
        </FloatingCard>

        {/* Contact card — lower left */}
        <FloatingCard
          initialX={8}
          initialY={55}
          parallaxFactor={1.3}
          scrollProgress={scrollProgress}
          zIndex={13}
        >
          <ContactCard />
        </FloatingCard>

        {/* Decorative floating text elements */}
        <FloatingCard
          initialX={42}
          initialY={60}
          parallaxFactor={0.6}
          scrollProgress={scrollProgress}
          zIndex={8}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '80px',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(127,255,0,0.12)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            28.03
          </div>
        </FloatingCard>

        <FloatingCard
          initialX={28}
          initialY={35}
          parallaxFactor={1.5}
          scrollProgress={scrollProgress}
          zIndex={7}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(127,255,0,0.2)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            SVERA · GDYNIA · 2026
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}
