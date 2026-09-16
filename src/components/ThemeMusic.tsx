import { useEffect, useRef, useState, type MouseEvent } from "react"
import { THEME_SRC } from "../lib/music"

type ThemeMusicProps = {
  restartKey: number
}

/**
 * Music starts when guest taps “Open the doors” (invite-music-start).
 * After that, a quiet Sound on / off control stays available.
 */
export function ThemeMusic({ restartKey }: ThemeMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const unlockedRef = useRef(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(THEME_SRC)
    audio.preload = "auto"
    audio.loop = true
    audio.volume = 0.7
    audioRef.current = audio
    unlockedRef.current = false
    setMuted(false)
    setReady(false)

    let cancelled = false

    const playNow = async () => {
      if (cancelled || !audioRef.current) return
      const el = audioRef.current
      el.muted = false
      el.volume = 0.7
      el.loop = true
      try {
        await el.play()
        unlockedRef.current = true
        if (!cancelled) {
          setReady(true)
          setMuted(false)
        }
      } catch {
        // Gate button will retry via invite-music-start
      }
    }

    const onStart = () => {
      void playNow()
    }

    window.addEventListener("invite-music-start", onStart)

    return () => {
      cancelled = true
      window.removeEventListener("invite-music-start", onStart)
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
      audioRef.current = null
    }
  }, [restartKey])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !unlockedRef.current) return
    audio.muted = muted
    if (!muted) audio.play().catch(() => undefined)
  }, [muted])

  function onToggle(e: MouseEvent) {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio || !ready) return
    setMuted((v) => {
      const next = !v
      audio.muted = next
      return next
    })
  }

  if (!ready) return null

  return (
    <button
      className={`music-toggle ${muted ? "is-muted" : ""}`}
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Sound off" : "Sound on"}
    >
      {muted ? "Sound off" : "Sound on"}
    </button>
  )
}
