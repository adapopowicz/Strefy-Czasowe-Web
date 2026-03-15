'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const VIDEO_ID = 'L4AW0tJOAvE'

export default function VideoCard() {
  const [playing, setPlaying] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function handlePlay() {
    setPlaying(true)
  }

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
      style={{ width: '440px', borderRadius: '16px' }}
    >
      {/* Video area */}
      <div
        className="relative overflow-hidden"
        style={{ height: '260px', cursor: playing ? 'default' : 'pointer' }}
        onClick={playing ? undefined : handlePlay}
      >
        {playing ? (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&enablejsapi=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ border: 'none', display: 'block' }}
          />
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              alt="Strefy Czasowe 2025"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0" style={{ background: 'rgba(26,40,10,0.35)' }} />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(164,247,130,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: '11px solid transparent',
                  borderBottom: '11px solid transparent',
                  borderLeft: '18px solid #1A280A',
                  marginLeft: '4px',
                }} />
              </div>
            </div>
            {/* Badge */}
            <div className="absolute top-3 left-3 pill-btn" style={{ fontSize: '9px', padding: '4px 10px' }}>
              POPRZEDNIA EDYCJA
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '10px', color: '#90A981' }}>
          STREFY CZASOWE 2025
        </span>
        {playing && (
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
        )}
      </div>
    </motion.div>
  )
}
