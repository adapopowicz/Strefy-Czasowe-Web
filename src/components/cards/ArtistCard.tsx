"use client";

import React from "react";
import Image from "next/image";

interface ArtistCardProps {
  imageSrc: string;
  instagramUrl?: string;
}

export default function ArtistCard({
  imageSrc,
  instagramUrl = "#",
}: ArtistCardProps) {
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
      <Image
        src={imageSrc}
        alt=""
        width={400}
        height={500}
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
