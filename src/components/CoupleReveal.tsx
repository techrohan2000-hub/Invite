import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { invite } from "../config"

type CoupleRevealProps = {
  onContinue: () => void
  onBloom: () => void
}

const BASE = import.meta.env.BASE_URL
const PHOTO = `${BASE}photos/couple.jpg`

/**
 * Soft couple beat after the film — auto-continues (no tap required).
 * Drop a portrait at public/photos/couple.jpg — otherwise shows monogram.
 */
export function CoupleReveal({ onContinue, onBloom }: CoupleRevealProps) {
  const [hasPhoto, setHasPhoto] = useState(false)
  const continueRef = useRef(onContinue)
  const bloomRef = useRef(onBloom)
  continueRef.current = onContinue
  bloomRef.current = onBloom

  useEffect(() => {
    const bloomTimer = window.setTimeout(() => bloomRef.current(), 400)
    const nextTimer = window.setTimeout(() => continueRef.current(), 3200)
    return () => {
      window.clearTimeout(bloomTimer)
      window.clearTimeout(nextTimer)
    }
  }, [])

  return (
    <section className="ritual couple-reveal">
      <div className="ritual-stage">
        <div className="couple-glow" aria-hidden="true" />
        <motion.div
          className="couple-frame"
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`couple-portrait ${hasPhoto ? "has-photo" : "is-mono"}`}>
            <div className="couple-mono" aria-hidden="true">
              <span>{invite.initials}</span>
            </div>
            <img
              className={`couple-photo ${hasPhoto ? "is-on" : ""}`}
              src={PHOTO}
              alt=""
              onLoad={() => setHasPhoto(true)}
              onError={() => setHasPhoto(false)}
            />
          </div>
          <p className="couple-kicker">{invite.kicker}</p>
          <h2 className="couple-names">
            {invite.partnerOne}
            <em>&</em>
            {invite.partnerTwo}
          </h2>
          <p className="couple-line">A first glimpse of their forever.</p>
          <p className="couple-auto">Continuing…</p>
        </motion.div>
      </div>
    </section>
  )
}
