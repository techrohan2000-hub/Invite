import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { invite } from "../config"
import { downloadIcs, googleCalendarUrl } from "../lib/calendar"
import { shareInvite, whatsappUrl } from "../lib/share"
import { Blessings } from "./Blessings"
import { CornerFrame, Divider } from "./Ornaments"
import { Rsvp } from "./Rsvp"
import { WaxSeal } from "./WaxSeal"

type LetterProps = {
  onCelebrate: () => void
  onReplay: () => void
}

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

export function Letter({ onCelebrate, onReplay }: LetterProps) {
  const [toast, setToast] = useState("")
  const [pageUrl, setPageUrl] = useState("")

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  async function onShare() {
    const result = await shareInvite()
    if (result === "copied") {
      setToast("Invite link copied")
      window.setTimeout(() => setToast(""), 2200)
    }
  }

  return (
    <main className="letter-scene" id="invite">
      <article className="letter">
        <div className="letter-arch" aria-hidden="true" />
        <CornerFrame />
        <motion.header className="letter-head" {...rise}>
          <button className="replay-link" type="button" onClick={onReplay}>
            Replay the invitation
          </button>
          <p className="ganesh-line dark">{invite.ganesh}</p>
          <WaxSeal size="small" />
          <p className="kicker gold">{invite.kicker}</p>
          <p className="invite-eyebrow">We cordially invite you to the</p>
          <h1 className="ceremony-title">{invite.kickerEn}</h1>
          <p className="families">{invite.togetherLine}</p>
          <div className="cover-names letter-names">
            <span className="name name-one">{invite.partnerOne}</span>
            <span className="ampersand" aria-hidden="true">
              &
            </span>
            <span className="name name-two">{invite.partnerTwo}</span>
          </div>
          <p className="invite-line">{invite.inviteLine}</p>
        </motion.header>

        <Divider />

        <motion.section className="date-block" {...rise}>
          <p className="date-dow">{invite.dateLabel}</p>
          <p className="date-num">{invite.dateDisplay}</p>
          <p className="date-my">{invite.monthYear}</p>
          <p className="date-time">{invite.timeLabel}</p>
        </motion.section>

        <Divider />

        <motion.section className="venue-block" {...rise}>
          <p className="kicker">Venue</p>
          <h2 className="venue-name">{invite.venueName}</h2>
          <p className="venue-addr">
            {invite.venueArea}
            <br />
            {invite.venueCity}
          </p>
          <a className="btn-primary" href={invite.mapsUrl} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </motion.section>

        <motion.p className="story" {...rise}>
          {invite.story}
        </motion.p>

        <motion.dl className="meta-list" {...rise}>
          <div>
            <dt>Hosted by</dt>
            <dd>{invite.familiesLine}</dd>
          </div>
          <div>
            <dt>Attire</dt>
            <dd>{invite.dressCode}</dd>
          </div>
        </motion.dl>

        <motion.div className="action-row sticky-actions" {...rise}>
          <a className="btn-primary" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
            Add to calendar
          </a>
          <button className="btn-ghost" type="button" onClick={downloadIcs}>
            Download .ics
          </button>
          <button className="btn-ghost" type="button" onClick={onShare}>
            Share invite
          </button>
          {pageUrl ? (
            <a className="btn-ghost" href={whatsappUrl(pageUrl)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
        </motion.div>

        <motion.blockquote className="quote" {...rise}>
          <p>{invite.quote}</p>
        </motion.blockquote>

        <motion.div {...rise}>
          <Rsvp onCelebrate={onCelebrate} />
        </motion.div>
        <motion.div {...rise}>
          <Blessings />
        </motion.div>

        <footer className="letter-foot">
          <p>
            With love & aashirwad
            <br />
            {invite.partnerOne} & {invite.partnerTwo}
          </p>
        </footer>
      </article>

      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </main>
  )
}
