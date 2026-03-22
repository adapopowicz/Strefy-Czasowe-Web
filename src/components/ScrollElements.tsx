"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import VideoCard from "./cards/VideoCard";
import TicketsCard from "./cards/TicketsCard";
import ContactCard from "./cards/ContactCard";
import ArtistCard from "./cards/ArtistCard";
import ArtistVideoCard from "./cards/ArtistVideoCard";
import SponsorsSection from "@/components/SponsorsSection";

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
  children: React.ReactNode;
  x: number;
  y: number;
  scale?: number;
  scrollProgress: MotionValue<number>;
  baseZ?: number;
  sectionId?: string;
  focusedSection?: string | null;
  entryStart: number;
  entryEnd: number;
  exitStart: number;
  exitEnd: number;
  groupIndex?: number;
  groupSize?: number;
}

function FloatingCard({
  children,
  x,
  y,
  scale = 1,
  scrollProgress,
  baseZ = 10,
  sectionId,
  focusedSection,
  entryStart,
  entryEnd,
  exitStart,
  exitEnd,
  groupIndex,
  groupSize,
}: FloatingCardProps) {
  const [hovered, setHovered] = useState(false);
  // Single piecewise transform — card enters from below, drifts upward on-screen,
  // then exits off the top. The -220 midpoint ensures continuous motion (no freeze).
  const totalY = useTransform(
    scrollProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [700, 0, -220, -1600],
    { clamp: true },
  );

  const isFocused = sectionId !== undefined && focusedSection === sectionId;
  const innerRef = useRef<HTMLDivElement>(null);
  const [focusOffset, setFocusOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFocused && innerRef.current) {
      const compute = () => {
        if (!innerRef.current) return;
        const rect = innerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        if (
          groupIndex !== undefined &&
          groupSize !== undefined &&
          groupSize > 1
        ) {
          const gap = 24;
          const cardW = rect.width;
          const totalW = groupSize * cardW + (groupSize - 1) * gap;
          const startCX = window.innerWidth / 2 - totalW / 2 + cardW / 2;
          const targetCX = startCX + groupIndex * (cardW + gap);
          setFocusOffset({ x: targetCX - cx, y: window.innerHeight / 2 - cy });
        } else {
          setFocusOffset({
            x: window.innerWidth / 2 - cx,
            y: window.innerHeight / 2 - cy,
          });
        }
      };
      const id = setTimeout(compute, 50);
      return () => clearTimeout(id);
    } else {
      setFocusOffset({ x: 0, y: 0 });
    }
  }, [isFocused, groupIndex, groupSize]);

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
        cursor: "grab",
      }}
      whileDrag={{ cursor: "grabbing", zIndex: 200 }}
    >
      <motion.div
        ref={innerRef}
        style={{ transformOrigin: "top left" }}
        animate={{
          scale: isFocused ? scale * 1.05 : scale,
          x: focusOffset.x,
          y: focusOffset.y,
          boxShadow: isFocused
            ? "0 0 0 2px #A4F782, 0 8px 60px rgba(164,247,130,0.35)"
            : "0 0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ScrollElementsProps {
  scrollProgress: MotionValue<number>;
  focusedSection: string | null;
  onFocusSection: (id: string | null) => void;
}

function MobileStack() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        paddingTop: "420px",
        paddingBottom: "40px",
        paddingLeft: "16px",
        paddingRight: "16px",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <VideoCard />
      </div>
      <div style={{ width: "100%", maxWidth: "370px" }}>
        <TicketsCard />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/piernikowski.png"
          instagramUrl="https://www.instagram.com/p/DWEfxzPCO9w/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/chobot.png"
          instagramUrl="https://www.instagram.com/p/DVyJn5riHVj/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/wschody.png"
          instagramUrl="https://www.instagram.com/p/DWCIyhCiL_Q/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/interakcja.png"
          instagramUrl="https://www.instagram.com/p/DVeFm_biABW/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/expo.png"
          instagramUrl="https://www.instagram.com/p/DVi3KFJCFom/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/klimek.png"
          instagramUrl="https://www.instagram.com/p/DVI2IKfiNl5/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/kurkiewicz.png"
          instagramUrl="https://www.instagram.com/p/DVONcscCI3y/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/no_nie.jpg"
          instagramUrl="https://www.instagram.com/p/DVEgZvHiEYv/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/rhyton.png"
          instagramUrl="https://www.instagram.com/p/DVVnJ2hiEHj/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistVideoCard
          videoSrc="/images/ptaki.mp4"
          instagramUrl="https://www.instagram.com/p/DV_kAA6CDdi/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ArtistCard
          imageSrc="/images/houseofthesun.png"
          instagramUrl="https://www.instagram.com/p/DWLlT4kCBQa/?img_index=1"
        />
      </div>
      <div style={{ width: "100%", maxWidth: "320px" }}>
        <ContactCard />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <SponsorsSection />
      </div>
    </div>
  );
}

export default function ScrollElements({
  scrollProgress,
  focusedSection,
}: ScrollElementsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <MobileStack />;

  return (
    <div className="relative w-full h-full">
      {/* VideoCard — 2× natural size (700×420px), left side */}
      <FloatingCard
        x={3}
        y={6}
        scale={1.3}
        scrollProgress={scrollProgress}
        baseZ={12}
        entryStart={0.03}
        entryEnd={0.15}
        exitStart={0.27}
        exitEnd={0.38}
      >
        <VideoCard />
      </FloatingCard>

      {/* TicketsCard — BILETY, right upper */}
      <FloatingCard
        x={52}
        y={4}
        scale={1.55}
        scrollProgress={scrollProgress}
        baseZ={11}
        sectionId="bilety"
        focusedSection={focusedSection}
        entryStart={0.09}
        entryEnd={0.21}
        exitStart={0.32}
        exitEnd={0.43}
      >
        <TicketsCard />
      </FloatingCard>

      {/* Artist 1 — right */}
      <FloatingCard
        x={56}
        y={28}
        scrollProgress={scrollProgress}
        baseZ={10}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.15}
        entryEnd={0.26}
        exitStart={0.37}
        exitEnd={0.47}
        groupIndex={0}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/piernikowski.png"
          instagramUrl="https://www.instagram.com/p/DWEfxzPCO9w/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 2 — left */}
      <FloatingCard
        x={4}
        y={46}
        scrollProgress={scrollProgress}
        baseZ={9}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.2}
        entryEnd={0.31}
        exitStart={0.41}
        exitEnd={0.51}
        groupIndex={1}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/chobot.png"
          instagramUrl="https://www.instagram.com/p/DVyJn5riHVj/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 3 — center */}
      <FloatingCard
        x={32}
        y={60}
        scrollProgress={scrollProgress}
        baseZ={9}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.25}
        entryEnd={0.36}
        exitStart={0.45}
        exitEnd={0.55}
        groupIndex={2}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/wschody.png"
          instagramUrl="https://www.instagram.com/p/DWCIyhCiL_Q/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 4 — right lower */}
      <FloatingCard
        x={60}
        y={50}
        scrollProgress={scrollProgress}
        baseZ={8}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.3}
        entryEnd={0.41}
        exitStart={0.5}
        exitEnd={0.6}
        groupIndex={3}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/interakcja.png"
          instagramUrl="https://www.instagram.com/p/DVeFm_biABW/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 5 — left lower */}
      <FloatingCard
        x={8}
        y={62}
        scrollProgress={scrollProgress}
        baseZ={8}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.35}
        entryEnd={0.46}
        exitStart={0.55}
        exitEnd={0.65}
        groupIndex={4}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/expo.png"
          instagramUrl="https://www.instagram.com/p/DVi3KFJCFom/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 6 — center lower */}
      <FloatingCard
        x={42}
        y={72}
        scrollProgress={scrollProgress}
        baseZ={7}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.4}
        entryEnd={0.51}
        exitStart={0.6}
        exitEnd={0.7}
        groupIndex={5}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/klimek.png"
          instagramUrl="https://www.instagram.com/p/DVI2IKfiNl5/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 7 — right upper */}
      <FloatingCard
        x={69}
        y={30}
        scrollProgress={scrollProgress}
        baseZ={7}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.45}
        entryEnd={0.56}
        exitStart={0.65}
        exitEnd={0.75}
        groupIndex={6}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/kurkiewicz.png"
          instagramUrl="https://www.instagram.com/p/DVONcscCI3y/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 8 — left upper */}
      <FloatingCard
        x={6}
        y={40}
        scrollProgress={scrollProgress}
        baseZ={6}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.5}
        entryEnd={0.61}
        exitStart={0.7}
        exitEnd={0.8}
        groupIndex={7}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/no_nie.jpg"
          instagramUrl="https://www.instagram.com/p/DVEgZvHiEYv/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 9 — center */}
      <FloatingCard
        x={30}
        y={55}
        scrollProgress={scrollProgress}
        baseZ={6}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.55}
        entryEnd={0.66}
        exitStart={0.75}
        exitEnd={0.85}
        groupIndex={8}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/rhyton.png"
          instagramUrl="https://www.instagram.com/p/DVVnJ2hiEHj/?img_index=1"
        />
      </FloatingCard>

      {/* Artist 10 — video, right */}
      <FloatingCard
        x={55}
        y={65}
        scrollProgress={scrollProgress}
        baseZ={6}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.6}
        entryEnd={0.71}
        exitStart={0.8}
        exitEnd={0.9}
        groupIndex={9}
        groupSize={10}
      >
        <ArtistVideoCard
          videoSrc="/images/ptaki.mp4"
          instagramUrl="https://www.instagram.com/p/DV_kAA6CDdi/?img_index=1"
        />
      </FloatingCard>

      <FloatingCard
        x={20}
        y={45}
        scrollProgress={scrollProgress}
        baseZ={6}
        sectionId="lineup"
        focusedSection={focusedSection}
        entryStart={0.65}
        entryEnd={0.76}
        exitStart={0.85}
        exitEnd={0.9}
        groupIndex={8}
        groupSize={10}
      >
        <ArtistCard
          imageSrc="/images/houseofthesun.png"
          instagramUrl="https://www.instagram.com/p/DWLlT4kCBQa/?img_index=1"
        />
      </FloatingCard>

      {/* ContactCard — KONTAKT, right lower */}
      <FloatingCard
        x={54}
        y={64}
        scale={1.55}
        scrollProgress={scrollProgress}
        baseZ={13}
        sectionId="kontakt"
        focusedSection={focusedSection}
        entryStart={0.75}
        entryEnd={0.8}
        exitStart={0.88}
        exitEnd={0.85}
      >
        <ContactCard />
      </FloatingCard>

      {/* Decorative label */}
      <FloatingCard
        x={28}
        y={38}
        scale={1}
        scrollProgress={scrollProgress}
        baseZ={7}
        entryStart={0.07}
        entryEnd={0.18}
        exitStart={0.37}
        exitEnd={0.47}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 400,
            fontSize: "13px",
            color: "rgba(164,247,130,0.15)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          SVERA · GDYNIA · 2026
        </div>
      </FloatingCard>
    </div>
  );
}
