import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Film } from "./components/Film"
import { Letter } from "./components/Letter"
import { Grain } from "./components/Ornaments"
import { Petals } from "./components/Petals"

export default function App() {
  const [opened, setOpened] = useState(false)
  const [filmKey, setFilmKey] = useState(0)
  const [celebrate, setCelebrate] = useState(false)

  function replay() {
    setOpened(false)
    setFilmKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  return (
    <div className={`app ${opened ? "is-open" : "is-sealed"}`}>
      <a className="skip" href="#invite">
        Skip to invitation
      </a>
      <Grain />
      <Petals active={celebrate} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key={`film-${filmKey}`}
            className="scene"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Film onComplete={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="scene"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Letter
              onReplay={replay}
              onCelebrate={() => {
                setCelebrate(true)
                window.setTimeout(() => setCelebrate(false), 7000)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
