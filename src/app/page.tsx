'use client'

import { useRef, useState } from 'react'
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'
import Background from '@/components/Background'
import Menu from '@/components/Menu'
import Timeline from '@/components/Timeline'
import HomepageContent from '@/components/HomepageContent'
import ScrollElements from '@/components/ScrollElements'
import TicketsCard from '@/components/cards/TicketsCard'
import ArtistCard from '@/components/cards/ArtistCard'
import ContactCard from '@/components/cards/ContactCard'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const [focusedSection, setFocusedSection] = useState<string | null>(null)

  function focusSection(sectionId: string) {
    setFocusedSection(prev => prev === sectionId ? null : sectionId)
    if (scrollRef.current) {
      const targetScroll = window.innerHeight * 2
      if (scrollRef.current.scrollTop < targetScroll) {
        scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' })
      }
    }
  }

  // Homepage blurs but stays partially visible as background
  const homepageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const homepageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const homepageBlurRaw = useTransform(scrollYProgress, [0, 0.4], [0, 18])
  const homepageFilter = useTransform(homepageBlurRaw, (v) => `blur(${v}px)`)

  // Scroll elements rise up from below the screen
  const scrollElementsOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1])
  const scrollElementsY = useTransform(scrollYProgress, [0.08, 0.5], [700, 0])

  return (
    <>
      <Background />
      <Menu onNavClick={focusSection} />
      <Timeline />

      {/* Scroll driver */}
      <div
        ref={scrollRef}
        className="fixed inset-0 overflow-y-scroll overflow-x-hidden"
        style={{ zIndex: 1 }}
      >
        <div style={{ height: '400vh' }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* Layer 1: Homepage hero — blurs and dims, stays as background */}
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

            {/* Layer 2: Floating scroll cards — rise from below */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: scrollElementsOpacity,
                y: scrollElementsY,
                zIndex: 3,
              }}
            >
              <ScrollElements
                scrollProgress={scrollYProgress}
                focusedSection={focusedSection}
                onFocusSection={setFocusedSection}
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Focused section overlay — rendered outside opacity-controlled layers */}
      <AnimatePresence>
        {focusedSection && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0"
              style={{ zIndex: 400, background: 'rgba(26,40,10,0.80)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFocusedSection(null)}
            />
            {/* Centered card */}
            <motion.div
              className="fixed"
              style={{ top: '50%', left: '50%', zIndex: 401 }}
              initial={{ x: '-50%', y: '-45%', scale: 0.85, opacity: 0 }}
              animate={{ x: '-50%', y: '-50%', scale: 1.15, opacity: 1 }}
              exit={{ x: '-50%', y: '-45%', scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              {focusedSection === 'bilety'  && <TicketsCard />}
              {focusedSection === 'lineup'  && <ArtistCard />}
              {focusedSection === 'kontakt' && <ContactCard />}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
