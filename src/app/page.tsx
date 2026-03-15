'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import Background from '@/components/Background'
import Menu from '@/components/Menu'
import Timeline from '@/components/Timeline'
import HomepageContent from '@/components/HomepageContent'
import ScrollElements from '@/components/ScrollElements'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ container: scrollRef })

  // Homepage content: blurs and fades out as user scrolls
  const homepageOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const homepageScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96])
  const homepageBlurValue = useTransform(scrollYProgress, [0, 0.3], [0, 16])
  const homepageFilter = useTransform(homepageBlurValue, (v) => `blur(${v}px)`)

  // Scroll elements: fades in as user scrolls down
  const scrollElementsOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const scrollElementsY = useTransform(scrollYProgress, [0.05, 0.3], [40, 0])

  return (
    <>
      {/* Fixed background (z-0) */}
      <Background />

      {/* Fixed top/bottom chrome — always on top (z-50) */}
      <Menu />
      <Timeline />

      {/* Scroll driver — this element creates the scroll context */}
      <div
        id="scroll-container"
        ref={scrollRef}
        className="fixed inset-0 overflow-y-scroll overflow-x-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Tall inner track drives scroll progress */}
        <div style={{ height: '400vh' }}>
          {/* Sticky panel — fills viewport, stays at top while user scrolls */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* Layer 1: Homepage hero content (blurs + fades on scroll) */}
            <motion.div
              className="absolute inset-0 flex items-center"
              style={{
                filter: homepageFilter,
                opacity: homepageOpacity,
                scale: homepageScale,
                zIndex: 2,
              }}
            >
              <HomepageContent />
            </motion.div>

            {/* Layer 2: Scroll floating elements (fades in on scroll) */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: scrollElementsOpacity,
                y: scrollElementsY,
                zIndex: 3,
              }}
            >
              <ScrollElements scrollProgress={scrollYProgress} />
            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}
