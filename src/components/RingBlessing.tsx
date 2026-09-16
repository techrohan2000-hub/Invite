import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { invite } from "../config"
import { Rings } from "./Rings"

type RingBlessingProps = {
  onComplete: () => void
  onBloom: () => void
}

/**
 * Rings unite on their own — no hold required — then open the invitation.
 */
export function RingBlessing({ onComplete, onBloom }: RingBlessingProps) {
  const [locked, setLocked] = useState(false)
  const completeRef = useRef(onComplete)
  const bloomRef = useRef(onBloom)
  completeRef.current = onComplete
  bloomRef.current = onBloom

  useEffect(() => {
    const lockTimer = window.setTimeout(() => {
      setLocked(true)
      bloomRef.current()
    }, 700)
    const doneTimer = window.setTimeout(() => completeRef.current(), 2800)
    return () => {
      window.clearTimeout(lockTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  return (
    <section className="ritual ring-blessing">
      <div className="ritual-stage">
        <motion.div
          className="ring-blessing-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="ring-blessing-kicker">{invite.kicker}</p>
          <h2 className="ring-blessing-title">With your aashirwad</h2>
          <p className="ring-blessing-sub">
            {locked ? "Two rings. One promise." : "Their rings come together…"}
          </p>

          <div className="ring-blessing-stage">
            <Rings locked={locked} />
          </div>

          {locked ? (
            <motion.p
              className="ring-blessing-done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Opening the invitation…
            </motion.p>
          ) : null}

          <button
            className="story-skip-quiet ring-skip"
            type="button"
            onClick={() => completeRef.current()}
          >
            Continue
          </button>
        </motion.div>
      </div>
    </section>
  )
}
