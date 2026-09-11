import { useState, type FormEvent } from "react"
import { loadBlessings, saveBlessing } from "../lib/storage"
import type { Blessing } from "../lib/storage"

export function Blessings() {
  const [notes, setNotes] = useState<Blessing[]>(() => loadBlessings())
  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const [error, setError] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    const who = name.trim()
    const message = note.trim()
    if (who.length < 2 || message.length < 2) {
      setError("A name and a few words, that's all we need.")
      return
    }
    const next = saveBlessing({
      id: crypto.randomUUID(),
      name: who,
      note: message,
      at: new Date().toISOString(),
    })
    setNotes(next)
    setName("")
    setNote("")
    setError("")
  }

  return (
    <section className="panel" id="blessings">
      <p className="kicker gold">A little love</p>
      <h2 className="panel-title">Leave a blessing</h2>
      <p className="panel-copy">A line of love they can read again on the day.</p>

      <form className="bless-form" onSubmit={submit}>
        <label className="field">
          <span>Your name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="field">
          <span>Your blessing</span>
          <textarea
            rows={3}
            maxLength={180}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="May your yes be the first of a thousand beautiful ones…"
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="cta cta-dark" type="submit">
          Send blessing
        </button>
      </form>

      {notes.length > 0 && (
        <ul className="bless-wall">
          {notes.map((item) => (
            <li key={item.id} className="bless-card">
              <p>“{item.note}”</p>
              <span>— {item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
