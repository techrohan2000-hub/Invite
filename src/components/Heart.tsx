import { useId } from "react"

type HeartProps = {
  className?: string
}

export function Heart({ className = "" }: HeartProps) {
  const uid = useId().replace(/:/g, "")

  return (
    <svg className={`heart-svg ${className}`} viewBox="0 0 64 58" aria-hidden="true">
      <defs>
        <linearGradient id={`heartGold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8ebc4" />
          <stop offset="45%" stopColor="#e8c4b8" />
          <stop offset="100%" stopColor="#c4a35a" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#heartGold-${uid})`}
        d="M32 54C12.8 41.2 4 31.4 4 20.6 4 11.8 10.6 6 18.6 6c5 0 9.4 2.4 13.4 7.4C36 8.4 40.4 6 45.4 6 53.4 6 60 11.8 60 20.6 60 31.4 51.2 41.2 32 54z"
      />
    </svg>
  )
}
