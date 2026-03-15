'use client'

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #141a09 0%, #0a0a07 60%, #070807 100%)',
        }}
      />

      {/* SVG topographic/circuit line pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="topo-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="30" x2="120" y2="30" stroke="#2a3d10" strokeWidth="0.6" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="#2a3d10" strokeWidth="0.6" />
            <line x1="0" y1="90" x2="120" y2="90" stroke="#2a3d10" strokeWidth="0.6" />
            {/* Vertical lines */}
            <line x1="30" y1="0" x2="30" y2="120" stroke="#2a3d10" strokeWidth="0.6" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="#2a3d10" strokeWidth="0.6" />
            <line x1="90" y1="0" x2="90" y2="120" stroke="#2a3d10" strokeWidth="0.6" />
          </pattern>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-grid)" />
      </svg>

      {/* Organic topographic curves — left cluster */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1512 982"
        preserveAspectRatio="xMidYMid slice"
      >
        <g opacity="0.55" stroke="#3a5515" strokeWidth="1" fill="none">
          {/* Vertical flowing lines mimicking the Figma topographic map */}
          <path d="M 170 0 C 175 200, 162 400, 170 600 C 178 750, 165 900, 170 982" />
          <path d="M 244 0 C 252 150, 238 350, 244 550 C 250 700, 240 880, 244 982" />
          <path d="M 335 0 C 340 180, 328 360, 335 560 C 342 720, 330 900, 335 982" />
          <path d="M 364 0 C 370 160, 356 340, 363 540 C 370 710, 358 890, 364 982" />
          <path d="M 387 32 C 392 100, 405 200, 414 310 C 430 420, 440 500, 430 570 C 420 640, 410 700, 400 760 C 390 830, 387 900, 387 982" />
          <path d="M 455 308 L 468 340 C 472 360, 474 380, 470 400 L 455 435" />
          <path d="M 467 308 L 480 345 C 485 370, 487 395, 483 415 L 468 450" />
          <path d="M 485 0 C 490 150, 478 300, 485 480 C 492 650, 480 820, 485 982" />
          <path d="M 571 0 C 578 170, 564 340, 571 520 C 578 690, 566 860, 571 982" />
          <path d="M 600 37 C 606 90, 616 180, 620 270 C 624 360, 622 450, 610 530 C 598 610, 600 680, 605 760" />
          <path d="M 633 0 C 640 160, 626 320, 633 500 C 640 670, 628 840, 633 982" />
          <path d="M 752 0 C 759 170, 745 340, 752 520 C 759 690, 747 860, 752 982" />
          <path d="M 814 0 C 821 165, 807 330, 814 510 C 821 680, 809 850, 814 982" />
          <path d="M 874 0 C 881 155, 868 310, 874 490 C 880 670, 869 840, 874 982" />
          <path d="M 912 0 C 919 145, 906 290, 912 470 C 918 650, 907 820, 912 982" />
          <path d="M 921 407 C 930 430, 940 450, 938 480 C 936 500, 928 515, 921 530" />
          <path d="M 912 458 L 928 462" />
          <path d="M 991 493 C 995 510, 998 530, 995 550 C 992 565, 988 580, 991 595" />
          <path d="M 1003 0 C 1010 145, 997 290, 1003 470 C 1009 650, 998 820, 1003 982" />
          <path d="M 1052 0 C 1058 150, 1045 300, 1052 480 C 1059 660, 1048 830, 1052 982" />
          <path d="M 1121 0 C 1127 155, 1114 310, 1121 490 C 1128 670, 1116 840, 1121 982" />
          <path d="M 1186 0 C 1193 155, 1180 310, 1186 490 C 1192 670, 1181 840, 1186 982" />
          <path d="M 1255 0 C 1262 145, 1249 290, 1255 470 C 1261 650, 1250 820, 1255 982" />
          <path d="M 1356 0 C 1363 150, 1350 300, 1356 480 C 1362 660, 1351 830, 1356 982" />
          <path d="M 1463 629 C 1471 650, 1477 680, 1480 710 C 1483 740, 1482 760, 1478 780 C 1474 800, 1468 820, 1463 752" />
          {/* Shorter accent strokes */}
          <path d="M 44 629 L 44 657" />
          <path d="M 114 110 C 118 130, 120 155, 117 180 C 114 200, 110 215, 109 235" />
        </g>

        {/* Brighter accent lines */}
        <g opacity="0.25" stroke="#6aaa22" strokeWidth="0.8" fill="none">
          <path d="M 364 0 C 368 300, 358 600, 364 982" />
          <path d="M 912 0 C 918 300, 908 600, 912 982" />
          <path d="M 1186 0 C 1192 300, 1182 600, 1186 982" />
        </g>
      </svg>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A07 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
