"use client";

import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <Image
        src="/images/background.jpg"
        alt=""
        fill
        priority
        quality={85}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
