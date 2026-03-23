"use client";

import { motion } from "framer-motion";

interface MenuProps {
  onNavClick: (sectionId: string) => void;
}

const navItems: Array<{ label: string; sectionId?: string; url?: string }> = [
  { label: "BILETY", sectionId: "bilety" },
  { label: "LINE-UP", sectionId: "lineup" },
  { label: "KONTAKT", sectionId: "kontakt" },
  {
    label: "POPRZEDNIA EDYCJA",
    url: "https://smoothsail.pl/strefyczasowe2025",
  },
];

export default function Menu({ onNavClick }: MenuProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-center md:justify-start gap-2 px-6 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {navItems.map((item) => {
        const commonStyles = {
          border: "none",
          borderRadius: "999px",
          padding: "clamp(3px, 0.8vw, 6px) clamp(10px, 2vw, 16px)",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(12px, 3.5vw, 18px)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: "#1A280A",
          background: "#90A981",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "background 0.2s",
        };

        if (item.url) {
          return (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={commonStyles}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "#A4F782";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "#90A981";
              }}
            >
              {item.label}
            </a>
          );
        }

        return (
          <button
            key={item.label}
            onClick={() => onNavClick(item.sectionId!)}
            style={commonStyles}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#A4F782";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "#90A981";
            }}
          >
            {item.label}
          </button>
        );
      })}
    </motion.nav>
  );
}
