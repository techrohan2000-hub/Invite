import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CoupleReveal } from "./components/CoupleReveal"
import { Film } from "./components/Film"
import { Letter } from "./components/Letter"
import { Grain } from "./components/Ornaments"
import { Petals } from "./components/Petals"
import { RingBlessing } from "./components/RingBlessing"
import { ThemeMusic } from "./components/ThemeMusic"

type Act = "film" | "couple" | "ring" | "letter"

export default function App() {
  const [act, setAct] = useState<Act>("film")
  const [filmKey, setFilmKey] = useState(0)
  const [petalMode, setPetalMode] = useState<"off" | "drift" | "burst">("drift")

  function bloom(ms = 5200, after: "off" | "drift" = "off") {
    setPetalMode("burst")
    window.setTimeout(() => setPetalMode(after), ms)
  }

  function replay() {
    setAct("film")
    setPetalMode("drift")
    setFilmKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  return (
    <div className={`app ${act === "letter" ? "is-open" : "is-sealed"}`}>
      <a className="skip" href="#invite">
        Skip to invitation
      </a>
      <Grain />
      <Petals mode={petalMode} />
      <ThemeMusic restartKey={filmKey} />
      <AnimatePresence mode="wait">
        {act === "film" ? (
          <motion.div
            key={`film-${filmKey}`}
            className="scene"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Film
              onBloom={() => bloom(4800, "drift")}
              onComplete={() => {
                setPetalMode("drift")
                setAct("couple")
              }}
              onSkipToInvite={() => {
                setPetalMode("off")
                setAct("letter")
              }}
            />
          </motion.div>
        ) : null}

        {act === "couple" ? (
          <motion.div
            key="couple"
            className="scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.7 }}
          >
            <CoupleReveal
              onBloom={() => bloom(3200, "drift")}
              onContinue={() => setAct("ring")}
            />
          </motion.div>
        ) : null}

        {act === "ring" ? (
          <motion.div
            key="ring"
            className="scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.7 }}
          >
            <RingBlessing
              onBloom={() => bloom(5000, "off")}
              onComplete={() => {
                setPetalMode("off")
                setAct("letter")
              }}
            />
          </motion.div>
        ) : null}

        {act === "letter" ? (
          <motion.div
            key="letter"
            className="scene"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Letter
              onReplay={replay}
              onCelebrate={() => bloom(7000, "off")}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
