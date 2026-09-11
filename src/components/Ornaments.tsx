type OrnamentProps = {
  className?: string
}

export function Divider({ className = "" }: OrnamentProps) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-line" />
      <svg viewBox="0 0 24 24" className="divider-diamond">
        <path d="M12 2.5 L21 12 L12 21.5 L3 12 Z" />
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
      <path
        d="M28 88 C28 48 48 28 88 28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M28 72h18M72 28v18" stroke="currentColor" strokeWidth="1" />
      <path
        d="M332 88 C332 48 312 28 272 28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M332 72h-18M288 28v18" stroke="currentColor" strokeWidth="1" />
      <path
        d="M28 552 C28 592 48 612 88 612"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M28 568h18M72 612v-18" stroke="currentColor" strokeWidth="1" />
      <path
        d="M332 552 C332 592 312 612 272 612"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M332 568h-18M288 612v-18" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="88" r="1.6" fill="currentColor" />
      <circle cx="88" cy="28" r="1.6" fill="currentColor" />
      <circle cx="332" cy="88" r="1.6" fill="currentColor" />
      <circle cx="272" cy="28" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
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
