import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { invite } from "../config"
import { startInviteMusic } from "../lib/music"

type FilmProps = {
  onComplete: () => void
  onBloom: () => void
  onSkipToInvite?: () => void
}

type Beat = {
  id: string
  src: string
  kicker?: string
  title: string
  sub?: string
  coverNames?: boolean
}

const BASE = import.meta.env.BASE_URL
const asset = (p: string) => `${BASE}${p.replace(/^\//, "")}`

/**
 * Cinematic gate → “Open the doors” (user gesture unlocks music) → film → reveal.
 */
export function Film({ onComplete, onBloom, onSkipToInvite }: FilmProps) {
  const reduce = useReducedMotion()
  const beats = useMemo<Beat[]>(
    () => [
      {
        id: "doors",
        src: asset("cinematic/01-doors.mp4"),
        kicker: invite.kicker,
        title: invite.ganesh,
        sub: "An auspicious beginning",
      },
      {
        id: "ganesh",
        src: asset("cinematic/02-ganesh.mp4"),
        title: invite.ganesh,
        sub: "With divine blessings",
      },
      {
        id: "arch",
        src: asset("cinematic/03-arch.mp4"),
        kicker: "We cordially invite you to the",
        title: invite.kickerEn,
        coverNames: true,
      },
      {
        id: "couple",
        src: asset("cinematic/04-couple.mp4"),
        title: invite.kickerEn,
        sub: `${invite.dateLong} · Ambajogai`,
        coverNames: true,
      },
    ],
    [],
  )

  const [phase, setPhase] = useState<"gate" | "film" | "reveal">("gate")
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showCopy, setShowCopy] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const preloadRef = useRef<HTMLVideoElement>(null)
  const bloomed = useRef(false)
  const completeRef = useRef(onComplete)
  const bloomRef = useRef(onBloom)
  completeRef.current = onComplete
  bloomRef.current = onBloom

  const beat = beats[index]
  const next = beats[index + 1]
  const total = beats.length + 1

  useEffect(() => {
    if (!reduce) return
    completeRef.current()
  }, [reduce])

  useEffect(() => {
    if (phase !== "film" || !next || !preloadRef.current) return
    preloadRef.current.src = next.src
    preloadRef.current.load()
  }, [phase, next])

  useEffect(() => {
    if (phase !== "film" || reduce) return
    const video = videoRef.current
    if (!video) return
    setProgress(0)
    setShowCopy(false)
    video.src = beat.src
    video.load()
    const ready = () => {
      video.currentTime = 0
      video.play().catch(() => undefined)
      window.setTimeout(() => setShowCopy(true), 450)
    }
    if (video.readyState >= 2) ready()
    else video.addEventListener("loadeddata", ready, { once: true })
    return () => video.removeEventListener("loadeddata", ready)
  }, [phase, index, reduce, beat.src])

  useEffect(() => {
    if (phase !== "film") return
    const video = videoRef.current
    if (!video) return
    let frame = 0
    const tick = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        setProgress(video.currentTime / video.duration)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase, index])

  useEffect(() => {
    if (phase !== "reveal") return
    setProgress(0)
    const started = performance.now()
    const dur = 5600
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - started) / dur, 1)
      setProgress(t)
      if (t >= 1) completeRef.current()
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase])

  function begin() {
    startInviteMusic()
    if (reduce) {
      completeRef.current()
      return
    }
    if (!bloomed.current) {
      bloomed.current = true
      bloomRef.current()
    }
    setPhase("film")
    setIndex(0)
  }

  function onEnded() {
    setShowCopy(false)
    if (index >= beats.length - 1) {
      if (!bloomed.current) {
        bloomed.current = true
        bloomRef.current()
      }
      setPhase("reveal")
      return
    }
    setIndex((v) => v + 1)
  }

  function skipToInvite() {
    startInviteMusic()
    if (onSkipToInvite) onSkipToInvite()
    else completeRef.current()
  }

  /** End film and continue to couple → ring → letter */
  function continueJourney() {
    startInviteMusic()
    completeRef.current()
  }

  const step = phase === "reveal" ? total : index + 1

  if (reduce) return null

  return (
    <section className={`story-v ${phase === "reveal" ? "is-reveal" : ""}`}>
      <div className="story-v-stage">
        {phase === "gate" && (
          <div className="story-v-gate">
            <video
              className="story-v-video"
              src={asset("cinematic/01-doors.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="story-v-veil story-v-veil-gate" />
            <motion.div
              className="story-v-welcome"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="story-om">{invite.ganesh}</p>
              <p className="story-eyebrow">{invite.kicker}</p>
              <h1 className="story-names">
                <span>{invite.partnerOne}</span>
                <em>&</em>
                <span>{invite.partnerTwo}</span>
              </h1>
              <p className="story-meta">
                {invite.dateLong}
                <span> · </span>
                Ambajogai
              </p>
              <p className="story-whisper">{invite.whisper}</p>
              <button className="story-cta story-cta-hero" type="button" onClick={begin}>
                {invite.sealCta}
              </button>
              <button className="story-skip-quiet" type="button" onClick={skipToInvite}>
                Skip to the invite
              </button>
            </motion.div>
          </div>
        )}

        {phase === "film" && (
          <div className="story-v-film">
            <video
              ref={videoRef}
              className="story-v-video"
              muted
              playsInline
              preload="auto"
              onEnded={onEnded}
            />
            <video ref={preloadRef} className="story-v-preload" muted playsInline aria-hidden="true" />
            <div className={`story-v-veil ${beat.coverNames ? "story-v-veil-cover" : "story-v-veil-soft"}`} />

            {beat.coverNames ? (
              <div className="story-v-nameplate" aria-hidden="true">
                <p className="story-v-nameplate-kicker">{invite.kicker}</p>
                <p className="story-v-nameplate-names">
                  {invite.partnerOne}
                  <span>&</span>
                  {invite.partnerTwo}
                </p>
                <p className="story-v-nameplate-meta">{invite.dateLong}</p>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {showCopy && !beat.coverNames ? (
                <motion.div
                  key={beat.id}
                  className="story-v-caption"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {beat.kicker ? <p className="story-v-kicker">{beat.kicker}</p> : null}
                  <h2 className="story-v-title">{beat.title}</h2>
                  {beat.sub ? <p className="story-v-sub">{beat.sub}</p> : null}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Chrome step={step} total={total} progress={progress} onSkip={continueJourney} />
          </div>
        )}

        {phase === "reveal" && (
          <div className="story-v-reveal">
            <video
              className="story-v-video story-v-video-dim"
              src={asset("cinematic/03-arch.mp4")}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="story-v-veil story-v-veil-soft" />
            <motion.article
              className="reveal-card"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="reveal-toran" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span />
              </div>
              <p className="reveal-om">{invite.ganesh}</p>
              <p className="reveal-eyebrow">We cordially invite you to the</p>
              <h2 className="reveal-title">{invite.kickerEn}</h2>
              <p className="reveal-kicker">{invite.kicker}</p>
              <div className="reveal-names">
                <span>{invite.partnerOne}</span>
                <em>&</em>
                <span>{invite.partnerTwo}</span>
              </div>
              <div className="reveal-divider" aria-hidden="true">
                <i /><b /><i />
              </div>
              <p className="reveal-when">
                {invite.dateLong}
                <br />
                {invite.timeLabel}
              </p>
              <p className="reveal-where">
                {invite.venueName}
                <br />
                Ambajogai
              </p>
              <button className="story-cta reveal-cta" type="button" onClick={continueJourney}>
                Continue
              </button>
            </motion.article>
            <Chrome step={total} total={total} progress={progress} onSkip={continueJourney} />
          </div>
        )}
      </div>
    </section>
  )
}

function Chrome({
  step,
  total,
  progress,
  onSkip,
}: {
  step: number
  total: number
  progress: number
  onSkip: () => void
}) {
  return (
    <div className="story-chrome">
      <button className="story-chrome-btn" type="button" onClick={onSkip}>
        Skip
      </button>
      <div className="story-bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }} />
      </div>
      <p className="story-step">
        {step}
        <span>/</span>
        {total}
      </p>
    </div>
  )
}
