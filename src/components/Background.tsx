'use client'

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}
