type OrnamentProps = {
  className?: string
}

export function Divider({ className = "" }: OrnamentProps) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-line" />
      <svg viewBox="0 0 56 28" className="divider-floral">
        {/* Marigold + lotus bud */}
        <circle cx="14" cy="14" r="5" fill="#e8a04a" opacity="0.9" />
        <circle cx="14" cy="14" r="2.5" fill="#f5d27a" />
        <path
          d="M28 14 C32 6 40 6 44 14 C40 22 32 22 28 14 Z"
          fill="#e89aaa"
          opacity="0.9"
        />
        <circle cx="36" cy="14" r="2.2" fill="#f5c8d0" />
        <path d="M20 14 H28" stroke="#c4a46a" strokeWidth="1" />
      </svg>
      <span className="divider-line" />
    </div>
  )
}

export function CornerFrame({ className = "" }: OrnamentProps) {
  return (
    <svg
      className={`corner-frame ${className}`}
      viewBox="0 0 360 640"
      fill="none"
      aria-hidden="true"
    >
      <path d="M28 100 C28 48 52 28 100 28" stroke="currentColor" strokeWidth="1.2" />
      <path d="M36 82 C52 54 78 36 104 30" stroke="currentColor" strokeWidth="0.85" opacity="0.65" />
      <ellipse cx="44" cy="56" rx="6" ry="9" fill="#e89aaa" opacity="0.55" transform="rotate(-24 44 56)" />
      <ellipse cx="66" cy="40" rx="5" ry="8" fill="#e8a04a" opacity="0.5" transform="rotate(16 66 40)" />

      <path d="M332 100 C332 48 308 28 260 28" stroke="currentColor" strokeWidth="1.2" />
      <path d="M324 82 C308 54 282 36 256 30" stroke="currentColor" strokeWidth="0.85" opacity="0.65" />
      <ellipse cx="316" cy="56" rx="6" ry="9" fill="#e89aaa" opacity="0.55" transform="rotate(24 316 56)" />
      <ellipse cx="294" cy="40" rx="5" ry="8" fill="#e8a04a" opacity="0.5" transform="rotate(-16 294 40)" />

      <path d="M28 540 C28 592 52 612 100 612" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="44" cy="580" rx="6" ry="9" fill="#e89aaa" opacity="0.45" transform="rotate(20 44 580)" />

      <path d="M332 540 C332 592 308 612 260 612" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="316" cy="580" rx="6" ry="9" fill="#e89aaa" opacity="0.45" transform="rotate(-20 316 580)" />
    </svg>
  )
}

export function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

const DUST = [
  { x: "8%", y: "18%", d: "0s", s: "2px" },
  { x: "18%", y: "72%", d: "1.4s", s: "3px" },
  { x: "27%", y: "36%", d: "2.1s", s: "1.5px" },
  { x: "41%", y: "12%", d: "0.6s", s: "2px" },
  { x: "58%", y: "22%", d: "2.8s", s: "2.5px" },
  { x: "71%", y: "68%", d: "1.1s", s: "2px" },
  { x: "83%", y: "30%", d: "3.2s", s: "3px" },
  { x: "91%", y: "54%", d: "0.9s", s: "1.5px" },
  { x: "12%", y: "88%", d: "2.4s", s: "2px" },
  { x: "64%", y: "84%", d: "1.7s", s: "2px" },
]

export function Dust() {
  return (
    <div className="dust" aria-hidden="true">
      {DUST.map((p) => (
        <span
          key={`${p.x}-${p.y}`}
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            animationDelay: p.d,
          }}
        />
      ))}
    </div>
  )
}
