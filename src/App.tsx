import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Film } from "./components/Film"
import { Letter } from "./components/Letter"
import { Grain } from "./components/Ornaments"
import { Petals } from "./components/Petals"
import { ThemeMusic } from "./components/ThemeMusic"

export default function App() {
  const [opened, setOpened] = useState(false)
  const [filmKey, setFilmKey] = useState(0)
  const [petalMode, setPetalMode] = useState<"off" | "drift" | "burst">("drift")

  function bloom(ms = 5200, after: "off" | "drift" = "off") {
    setPetalMode("burst")
    window.setTimeout(() => setPetalMode(after), ms)
  }

  function replay() {
    setOpened(false)
    setPetalMode("drift")
    setFilmKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  return (
    <div className={`app ${opened ? "is-open" : "is-sealed"}`}>
      <a className="skip" href="#invite">
        Skip to invitation
      </a>
      <Grain />
      <Petals mode={petalMode} />
      <ThemeMusic restartKey={filmKey} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key={`film-${filmKey}`}
            className="scene"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Film
              onBloom={() => bloom(4800, "drift")}
              onComplete={() => {
                setPetalMode("off")
                setOpened(true)
              }}
            />
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>
    </div>
  )
}
