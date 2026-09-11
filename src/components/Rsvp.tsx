import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { invite } from "../config"
import { downloadIcs, googleCalendarUrl } from "../lib/calendar"
import type { RsvpStatus } from "../lib/storage"
import { loadRsvp, saveRsvp } from "../lib/storage"

const OPTIONS: { id: RsvpStatus; title: string; hint: string }[] = [
  { id: "yes", title: "We'll be there", hint: "Save a place for us" },
  { id: "no", title: "Wish we could", hint: "Sending love from afar" },
  { id: "blessing", title: "Blessings only", hint: "With you in spirit" },
]

const THANKS: Record<RsvpStatus, string> = {
  yes: "A place is saved for you. We cannot wait to celebrate together.",
  no: "We'll miss you that morning — your blessings already mean the world.",
  blessing: "Your blessings are already part of our beginning.",
}

type RsvpProps = {
  onCelebrate: () => void
}

export function Rsvp({ onCelebrate }: RsvpProps) {
  const existing = loadRsvp()
  const [status, setStatus] = useState<RsvpStatus | null>(existing?.status ?? null)
  const [name, setName] = useState(existing?.name ?? "")
  const [plusOne, setPlusOne] = useState(existing?.plusOne ?? false)
  const [done, setDone] = useState(Boolean(existing))
  const [error, setError] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!status) {
      setError("Please choose a reply.")
      return
    }
    if (trimmed.length < 2) {
      setError("Please share your name.")
      return
    }
    saveRsvp({
      name: trimmed,
      status,
      plusOne: status === "yes" ? plusOne : false,
      at: new Date().toISOString(),
    })
    setError("")
    setDone(true)
    if (status === "yes") onCelebrate()
  }

  return (
    <section className="panel" id="rsvp">
      <p className="kicker gold">Your reply</p>
      <h2 className="panel-title">Will you be with us?</h2>
      <p className="panel-copy">{invite.rsvpDeadline}</p>

      <AnimatePresence mode="wait">
        {done && status ? (
          <motion.div
            key="thanks"
            className="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="thanks-lead">Thank you, {name.trim() || "dear guest"}.</p>
            <p>{THANKS[status]}</p>
            <div className="action-row">
              {status === "yes" && (
                <>
                  <a className="btn-secondary" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
                    Google Calendar
                  </a>
                  <button className="btn-secondary" type="button" onClick={downloadIcs}>
                    Apple / Outlook
                  </button>
                </>
              )}
              <button className="text-link" type="button" onClick={() => setDone(false)}>
                Change reply
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="rsvp-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="choice-grid" role="radiogroup" aria-label="Attendance">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={status === option.id}
                  className={`choice ${status === option.id ? "is-selected" : ""}`}
                  onClick={() => {
                    setStatus(option.id)
                    setError("")
                  }}
                >
                  <strong>{option.title}</strong>
                  <span>{option.hint}</span>
                </button>
              ))}
            </div>

            <label className="field">
              <span>Your name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="As you'd like it on the list"
                autoComplete="name"
              />
            </label>

            {status === "yes" && (
              <label className="check">
                <input
                  type="checkbox"
                  checked={plusOne}
                  onChange={(event) => setPlusOne(event.target.checked)}
                />
                I'll be bringing someone
              </label>
            )}

            {error ? <p className="form-error">{error}</p> : null}

            <button className="cta cta-dark" type="submit">
              Send reply
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}
