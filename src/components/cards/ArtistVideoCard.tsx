"use client";

interface ArtistVideoCardProps {
  videoSrc: string;
  videoPoster?: string;
  instagramUrl?: string;
}

export default function ArtistVideoCard({
  videoSrc,
  videoPoster,
  instagramUrl = "#",
}: ArtistVideoCardProps) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        width: "min(400px, calc(100vw - 32px))",
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <video
        preload="none"
        src={videoSrc}
        poster={videoPoster}
        autoPlay
        loop
        muted
        playsInline
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />
    </a>
  );
}
