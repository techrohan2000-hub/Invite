import { useId } from "react"
import { invite } from "../config"

type WaxSealProps = {
  cracking?: boolean
  size?: "cover" | "small"
}

export function WaxSeal({ cracking = false, size = "cover" }: WaxSealProps) {
  const uid = useId().replace(/:/g, "")
  return (
    <div
      className={`seal ${size === "small" ? "seal-small" : ""} ${cracking ? "is-cracking" : ""}`}
      aria-hidden="true"
    >
      <div className="seal-half seal-left">{sealFace(`${uid}L`)}</div>
      <div className="seal-half seal-right">{sealFace(`${uid}R`)}</div>
    </div>
  )
}

function sealFace(uid: string) {
  const lobes = 18
  const dots = Array.from({ length: lobes }, (_, i) => {
    const a = (i / lobes) * Math.PI * 2 - Math.PI / 2
    return {
      cx: 100 + Math.cos(a) * 41,
      cy: 100 + Math.sin(a) * 41,
    }
  })

  return (
    <svg viewBox="0 0 200 200" className="seal-svg">
      <defs>
        <radialGradient id={`waxFill-${uid}`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#c4453c" />
          <stop offset="45%" stopColor="#8f1e28" />
          <stop offset="100%" stopColor="#4c0d14" />
        </radialGradient>
        <linearGradient id={`goldLetters-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3e2b0" />
          <stop offset="50%" stopColor="#c4a35a" />
          <stop offset="100%" stopColor="#8d6b2f" />
        </linearGradient>
      </defs>
      {dots.map((d) => (
        <circle key={`${d.cx}-${d.cy}`} cx={d.cx} cy={d.cy} r="18" fill={`url(#waxFill-${uid})`} />
      ))}
      <circle cx="100" cy="100" r="52" fill={`url(#waxFill-${uid})`} />
      <circle
        cx="100"
        cy="100"
        r="44"
        fill="none"
        stroke={`url(#goldLetters-${uid})`}
        strokeWidth="1.15"
        opacity="0.85"
      />
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill={`url(#goldLetters-${uid})`}
        fontFamily="Cormorant Garamond, serif"
        fontSize="28"
        letterSpacing="3"
      >
        {invite.initials}
      </text>
    </svg>
  )
}
