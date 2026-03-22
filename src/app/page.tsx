"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Background from "@/components/Background";
import Menu from "@/components/Menu";
import Timeline from "@/components/Timeline";
import HomepageContent from "@/components/HomepageContent";
import ScrollElements from "@/components/ScrollElements";
import SponsorsSection from "@/components/SponsorsSection";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [focusedSection, setFocusedSection] = useState<string | null>(null);

  // Reset to top on mount (browser scroll restoration doesn't affect custom scroll containers,
  // but this guards against any cached scroll position)
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  function focusSection(sectionId: string) {
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    setFocusedSection((prev) => (prev === sectionId ? null : sectionId));
    if (scrollRef.current) {
      const targetScroll = window.innerHeight * 2;
      if (scrollRef.current.scrollTop < targetScroll) {
        scrollRef.current.scrollTo({ top: targetScroll, behavior: "auto" });
      }
    }
    focusTimerRef.current = setTimeout(() => setFocusedSection(null), 3000);
  }

  // Homepage blurs but stays partially visible as background
  const homepageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const homepageScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const homepageBlurRaw = useTransform(scrollYProgress, [0, 0.15], [0, 18]);
  const homepageFilter = useTransform(homepageBlurRaw, (v) => `blur(${v}px)`);

  // Scroll elements fade in simultaneously with blur
  const scrollElementsOpacity = useTransform(
    scrollYProgress,
    [0, 0.06],
    [0, 1],
  );

  return (
    <>
      <Background />
      <Menu onNavClick={focusSection} />
      <div className="hidden md:block">
        <Timeline />
      </div>

      {/* Scroll driver */}
      <div
        ref={scrollRef}
        className="fixed inset-0 overflow-y-scroll overflow-x-hidden"
        style={{ zIndex: 1 }}
      >
        <div style={{ height: "250vh" }}>
          <div
            className="sticky top-0 h-screen w-full"
            style={{ overflow: "visible" }}
          >
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

            {/* Layer 2: Floating scroll cards — each card rises with its own timing */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: scrollElementsOpacity,
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
        <div style={{ position: "relative", zIndex: 10 }}>
          <SponsorsSection />
        </div>
      </div>
    </>
  );
}
