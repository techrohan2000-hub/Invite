import { useId } from "react"
import { motion } from "framer-motion"

type RingsProps = {
  locked: boolean
  compact?: boolean
}

export function Rings({ locked, compact = false }: RingsProps) {
  const uid = useId().replace(/:/g, "")

  return (
    <motion.div
      className={`rings ${compact ? "rings-compact" : ""} ${locked ? "is-locked" : ""}`}
      aria-hidden="true"
      initial={false}
      animate={{ scale: compact ? 0.72 : 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg className="rings-svg" viewBox="0 0 320 200">
        <defs>
          <linearGradient id={`goldRing-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8ebc4" />
            <stop offset="38%" stopColor="#e0c36c" />
            <stop offset="62%" stopColor="#a67c2d" />
            <stop offset="100%" stopColor="#f0d78a" />
          </linearGradient>
          <linearGradient id={`roseRing-${uid}`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6ddd0" />
            <stop offset="45%" stopColor="#e0b48a" />
            <stop offset="100%" stopColor="#b8874e" />
          </linearGradient>
          <filter id={`ringGlow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          className="ring-left"
          initial={{ x: -88, y: 8, rotate: -38, opacity: 0 }}
          animate={
            locked
              ? { x: 0, y: 0, rotate: -26, opacity: 1 }
              : { x: -70, y: 6, rotate: -34, opacity: 0.95 }
          }
          transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
          filter={`url(#ringGlow-${uid})`}
        >
          <ellipse
            cx="132"
            cy="104"
            rx="58"
            ry="24"
            fill="none"
            stroke={`url(#goldRing-${uid})`}
            strokeWidth="9"
          />
          <ellipse
            cx="132"
            cy="104"
            rx="58"
            ry="24"
            fill="none"
            stroke="#fff6d6"
            strokeWidth="2.2"
            opacity="0.45"
          />
        </motion.g>

        <motion.g
          className="ring-right"
          initial={{ x: 88, y: 8, rotate: 38, opacity: 0 }}
          animate={
            locked
              ? { x: 0, y: 0, rotate: 26, opacity: 1 }
              : { x: 70, y: 6, rotate: 34, opacity: 0.95 }
          }
          transition={{ duration: 1.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          filter={`url(#ringGlow-${uid})`}
        >
          <ellipse
            cx="188"
            cy="104"
            rx="58"
            ry="24"
            fill="none"
            stroke={`url(#roseRing-${uid})`}
            strokeWidth="9"
          />
          <ellipse
            cx="188"
            cy="104"
            rx="58"
            ry="24"
            fill="none"
            stroke="#fff1e6"
            strokeWidth="2.2"
            opacity="0.4"
          />
          <motion.polygon
            points="188,61 192,70 202,71 194,78 196,88 188,82 180,88 182,78 174,71 184,70"
            fill="#f8ebc4"
            initial={{ scale: 0, opacity: 0 }}
            animate={locked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.45, type: "spring", stiffness: 260 }}
            style={{ transformOrigin: "188px 74px" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={locked ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.15, duration: 0.4 }}
        >
          <ellipse
            cx="132"
            cy="104"
            rx="58"
            ry="24"
            fill="none"
            stroke={`url(#goldRing-${uid})`}
            strokeWidth="9"
            strokeDasharray="70 300"
            strokeDashoffset="18"
            transform="rotate(-26 132 104)"
          />
        </motion.g>
      </svg>
      <div className="ring-sparkles">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </motion.div>
  )
}
