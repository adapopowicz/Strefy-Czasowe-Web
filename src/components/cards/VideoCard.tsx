'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const VIDEO_ID = 'L4AW0tJOAvE'

export default function VideoCard() {
  const [soundOn, setSoundOn] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: next ? 'unMute' : 'mute', args: [] }),
      '*'
    )
  }

  return (
    <motion.div
      className="card overflow-hidden"
      style={{ width: 'min(700px, calc(100vw - 32px))', borderRadius: '16px' }}
    >
      {/* Video area — autoplay, muted, looping */}
      <div className="relative overflow-hidden" style={{ height: '420px' }}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&enablejsapi=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ border: 'none', display: 'block' }}
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 pill-btn" style={{ fontSize: '9px', padding: '4px 10px' }}>
          POPRZEDNIA EDYCJA
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '10px', color: '#90A981' }}>
          STREFY CZASOWE 2025
        </span>
        <button
          onClick={toggleSound}
          className="pill-btn flex items-center gap-1.5"
          style={{ fontSize: '9px', padding: '4px 10px' }}
        >
          <span style={{
            display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
            background: soundOn ? '#A4F782' : 'transparent',
            border: '1px solid #A4F782',
          }} />
          {soundOn ? 'SOUND ON' : 'SOUND OFF'}
        </button>
      </div>
    </motion.div>
  )
}
