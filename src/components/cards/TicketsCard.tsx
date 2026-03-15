'use client'

import { motion } from 'framer-motion'

const ticketTiers = [
  { name: 'PULA I', status: 'SOLD OUT', price: null },
  { name: 'PULA II', status: 'SOLD OUT', price: null },
  { name: 'PULA III', status: null, price: '69 PLN' },
  { name: 'PULA IV', status: null, price: '100 PLN' },
  { name: 'PULA V', status: null, price: '129 PLN' },
]

export default function TicketsCard() {
  return (
    <motion.div
      className="card relative overflow-hidden"
      style={{ width: '300px', borderRadius: '14px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header image strip */}
      <div
        className="w-full overflow-hidden relative"
        style={{ height: '90px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1e3508 0%, #0a2010 50%, #061208 100%)',
          }}
        />
        {/* Subtle grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ticket-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="20" y2="10" stroke="#7FFF00" strokeWidth="0.4" />
              <line x1="10" y1="0" x2="10" y2="20" stroke="#7FFF00" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ticket-grid)" />
        </svg>
        <div className="absolute inset-0 flex items-center px-4">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              color: 'rgba(127,255,0,0.5)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            BILETY / TICKETS
          </span>
        </div>
      </div>

      {/* Ticket tiers */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {ticketTiers.map((tier) => (
          <div key={tier.name} className="flex items-center justify-between">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: tier.status ? 'rgba(127,255,0,0.35)' : 'var(--neon-green)',
              }}
            >
              {tier.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: tier.status ? 'rgba(127,255,0,0.35)' : 'var(--neon-green)',
                textDecoration: tier.status ? 'line-through' : 'none',
              }}
            >
              {tier.status ?? tier.price}
            </span>
          </div>
        ))}
      </div>

      {/* Fine print */}
      <p
        className="px-4 pb-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          color: 'rgba(127,255,0,0.25)',
          lineHeight: '1.4',
        }}
      >
        Kwoty przy zakupie mogą być powiększone o prowizję Operatora.
      </p>

      {/* Buy button */}
      <div className="px-4 pb-4">
        <a
          href="#bilety"
          className="pill-btn block text-center w-full"
          style={{ fontSize: '11px' }}
        >
          KUP BILET
        </a>
      </div>
    </motion.div>
  )
}
