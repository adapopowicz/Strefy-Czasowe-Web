"use client";

interface Sponsor {
  name: string;
  logoSrc: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Miasto Gdynia",
    logoSrc: "/images/GDYNIA.png",
  },
  {
    name: "Shroom",
    logoSrc: "/images/shroom.png",
  },
  {
    name: "Mariola Cafe",
    logoSrc: "/images/2025_mariola_cafe.png",
  },
];

export default function SponsorsSection() {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "48px",
        paddingBottom: "64px",
        paddingLeft: "32px",
        paddingRight: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        background: "transparent",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: "18px",
          color: "rgba(252,160,235)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Sponsorzy
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px 56px",
        }}
      >
        {sponsors.map((sponsor) => (
          <img
            key={sponsor.name}
            src={sponsor.logoSrc}
            alt={sponsor.name}
            draggable={false}
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        ))}
      </div>
    </div>
  );
}
