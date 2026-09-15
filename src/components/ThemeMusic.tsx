import { useEffect, useRef, useState } from "react"

const BASE = import.meta.env.BASE_URL
const THEME = `${BASE}audio/theme.mp3`

type ThemeMusicProps = {
  restartKey: number
}

/**
 * Starts on first user gesture (Begin / Open invitation).
 * Loops through film + letter; mute stays available once started.
 */
export function ThemeMusic({ restartKey }: ThemeMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setMuted(false)
    setReady(false)
  }, [restartKey])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !ready) return
    audio.muted = muted
    if (!muted) audio.play().catch(() => undefined)
  }, [muted, ready])

  useEffect(() => {
    const start = () => {
      const audio = audioRef.current
      if (!audio) return
      audio.volume = 0.52
      audio.loop = true
      audio.muted = false
      setMuted(false)
      setReady(true)
      audio.play().catch(() => undefined)
    }
    window.addEventListener("invite-music-start", start)
    return () => window.removeEventListener("invite-music-start", start)
  }, [])

  return (
    <>
      <audio ref={audioRef} src={THEME} preload="auto" loop playsInline />
      {ready ? (
        <button
          className={`music-toggle ${muted ? "is-muted" : ""}`}
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? "Unmute music" : "Mute music"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      ) : null}
    </>
  )
}

export function startInviteMusic() {
  window.dispatchEvent(new Event("invite-music-start"))
}
