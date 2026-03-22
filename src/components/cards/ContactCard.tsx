"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "EMAIL", href: "mailto:kuba@smoothsail.pl" },
  { label: "INSTAGRAM", href: "https://instagram.com/strefyczasowe" },
  {
    label: "FACEBOOK",
    href: "https://www.facebook.com/profile.php?id=61574732535976",
  },
];

export default function ContactCard() {
  return (
    <motion.div
      className="card"
      style={{
        width: "min(320px, calc(100vw - 32px))",
        borderRadius: "16px",
        padding: "28px",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-2 mb-5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn text-center"
            style={{ fontSize: "10px" }}
          >
            {s.label}
          </a>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #24380D", paddingTop: "12px" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 400,
            fontSize: "8px",
            color: "#8B968A",
            marginBottom: "4px",
          }}
        >
          PROJEKT I WYKONANIE STRONY
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 400,
            fontSize: "10px",
            color: "#90A981",
          }}
        >
          ADA POPOWICZ × SMOOTH SAIL
        </p>
      </div>
    </motion.div>
  );
}
