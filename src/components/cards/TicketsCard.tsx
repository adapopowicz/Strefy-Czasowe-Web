"use client";

import { motion } from "framer-motion";

const tiers = [
  { name: "UTC+0 // FOGGY SUNRISE", soldOut: true, price: null },
  { name: "UTC+1 // SMOOTH MORNIN'", soldOut: true, price: null },
  { name: "UTC+2 // FULL NOON", soldOut: true, price: null },
  { name: "UTC+3 // SUNSET", soldOut: false, price: "119 PLN" },
  { name: "UTC+4 // DISCOVER", soldOut: false, price: "129 PLN" },
];

export default function TicketsCard() {
  return (
    <motion.div
      className="card overflow-hidden"
      style={{ width: "min(370px, calc(100vw - 32px))", borderRadius: "16px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="relative overflow-hidden" style={{ height: "80px" }}>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #24380D 0%, #1A280A 100%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <pattern
              id="tgrid"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="9"
                x2="18"
                y2="9"
                stroke="#A4F782"
                strokeWidth="0.4"
              />
              <line
                x1="9"
                y1="0"
                x2="9"
                y2="18"
                stroke="#A4F782"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgrid)" />
        </svg>
        <div className="absolute inset-0 flex items-center px-4">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: "10px",
              color: "#90A981",
              letterSpacing: "0.12em",
            }}
          >
            BILETY / TICKETS
          </span>
        </div>
      </div>

      {/* Tiers */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2">
        {tiers.map((t) => (
          <div key={t.name} className="flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 400,
                fontSize: "11px",
                color: t.soldOut ? "#24380D" : "#A4F782",
              }}
            >
              {t.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 400,
                fontSize: "11px",
                color: t.soldOut ? "#24380D" : "#A4F782",
                textDecoration: t.soldOut ? "line-through" : "none",
              }}
            >
              {t.soldOut ? "SOLD OUT" : t.price}
            </span>
          </div>
        ))}
      </div>

      <p
        className="px-4 pb-3"
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          fontSize: "8px",
          color: "#8B968A",
          lineHeight: 1.4,
        }}
      >
        Kwoty przy zakupie mogą być powiększone o prowizję Operatora.
      </p>

      <div className="px-4 pb-4">
        <a
          href="https://goingapp.pl/wydarzenie/strefy-czasowe-2026-1/gdynia-marzec-2026"
          className="pill-btn block text-center"
          style={{ fontSize: "11px" }}
        >
          KUP BILET
        </a>
      </div>
    </motion.div>
  );
}
