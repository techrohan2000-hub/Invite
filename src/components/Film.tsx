import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { invite } from "../config"
import { Heart } from "./Heart"
import { Dust } from "./Ornaments"
import { Rings } from "./Rings"

type FilmProps = {
  onComplete: () => void
}

const SCENES = [
  { id: "title", duration: 3200 },
  { id: "rings", duration: 4600 },
  { id: "names", duration: 4200 },
  { id: "date", duration: 3800 },
  { id: "venue", duration: 4000 },
  { id: "close", duration: 3400 },
] as const

type SceneId = (typeof SCENES)[number]["id"]

const TOTAL = SCENES.reduce((sum, scene) => sum + scene.duration, 0)

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export function Film({ onComplete }: FilmProps) {
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [scene, setScene] = useState(0)
  const [locked, setLocked] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    if (!playing || reduce) return
    const started = performance.now()
    let frame = 0

    const tick = (now: number) => {
      setElapsed(now - started)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, reduce])

  useEffect(() => {
    if (!playing) return

    const duration = SCENES[scene].duration
    const timer = window.setTimeout(() => {
      if (scene >= SCENES.length - 1) {
        completeRef.current()
        return
      }
      setScene((current) => current + 1)
    }, duration)

    return () => window.clearTimeout(timer)
  }, [playing, scene])

  useEffect(() => {
    if (SCENES[scene].id === "rings") {
      setLocked(false)
      const timer = window.setTimeout(() => setLocked(true), 280)
      return () => window.clearTimeout(timer)
    }
    if (scene > 1) setLocked(true)
  }, [scene])

  const sceneId: SceneId = SCENES[scene].id
  const showRings = playing && scene >= 1 && scene <= 4
  const progress = Math.min(elapsed / TOTAL, 1)

  function start() {
    if (reduce) {
      completeRef.current()
      return
    }
    setPlaying(true)
    setScene(0)
    setLocked(false)
    setElapsed(0)
  }

  return (
    <section className={`film ${playing ? "is-playing" : "is-gate"}`}>
      <Dust />
      <div className="film-kenburns" />
      <div className="film-flare" />
      <div className="film-petals" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`film-petal film-petal-${i}`} />
        ))}
      </div>

      <AnimatePresence>
        {!playing ? (
          <motion.div
            key="gate"
            className="film-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="kicker gold">{invite.kicker}</p>
            <p className="kicker-en">{invite.kickerEn}</p>

            <div className="cover-names gate-names">
              <span className="name">{invite.partnerOne}</span>
              <button className="heart-btn" onClick={start} aria-label="Open the invitation">
                <span className="heart-glow" />
                <Heart />
              </button>
              <span className="name">{invite.partnerTwo}</span>
            </div>

            <p className="cover-meta">
              {invite.dateLong}
              <span className="dot">·</span>
              Ambajogai
            </p>

            <button className="cta" onClick={start}>
              Open with love
            </button>
            <button className="text-skip" type="button" onClick={onComplete}>
              View details
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reel"
            className="film-reel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {showRings && (
              <div className="film-rings">
                <Rings locked={locked} compact={scene >= 2} />
                {locked && (
                  <div className="rings-heart-wrap">
                    <motion.div
                      className="rings-heart"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.1, type: "spring", stiffness: 220 }}
                    >
                      <Heart />
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            <div className="film-scene-stage">
              <AnimatePresence>
                <motion.div
                  key={sceneId}
                  className="film-scene"
                  initial={fade.initial}
                  animate={fade.animate}
                  exit={fade.exit}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {sceneId === "title" && (
                    <>
                      <p className="cine-kicker">{invite.kicker}</p>
                      <h2 className="cine-title">{invite.kickerEn}</h2>
                      <Heart className="cine-heart" />
                      <p className="cine-sub">{invite.togetherLine}</p>
                    </>
                  )}

                  {sceneId === "rings" && (
                    <p className="cine-sub cine-under-rings">{invite.tagline}</p>
                  )}

                  {sceneId === "names" && (
                    <>
                      <CinematicName text={invite.partnerOne} />
                      <Heart className="cine-heart" />
                      <CinematicName text={invite.partnerTwo} delay={0.28} />
                    </>
                  )}

                  {sceneId === "date" && (
                    <>
                      <p className="cine-kicker">When</p>
                      <p className="cine-date-num">{invite.dateDisplay}</p>
                      <p className="cine-title cine-title-sm">
                        {invite.dateLabel}, {invite.monthYear}
                      </p>
                      <p className="cine-sub">{invite.timeLabel}</p>
                    </>
                  )}

                  {sceneId === "venue" && (
                    <>
                      <p className="cine-kicker">Where</p>
                      <h2 className="cine-title cine-title-sm">{invite.venueName}</h2>
                      <p className="cine-sub">
                        {invite.venueArea}
                        <br />
                        Ambajogai
                      </p>
                    </>
                  )}

                  {sceneId === "close" && (
                    <>
                      <Heart className="cine-heart" />
                      <h2 className="cine-title cine-title-sm">
                        {invite.partnerOne} & {invite.partnerTwo}
                      </h2>
                      <p className="cine-sub">{invite.familiesLine}</p>
                      <button className="cta" type="button" onClick={onComplete}>
                        Open with love
                      </button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {playing && (
        <>
          <div className="film-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <button className="film-skip" type="button" onClick={onComplete}>
            Details
          </button>
        </>
      )}
    </section>
  )
}

function CinematicName({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <p className="cine-name">
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </p>
  )
}
