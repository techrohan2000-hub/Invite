import { useEffect, useState } from "react"
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
        <CornerFrame />
        <header className="letter-head">
          <button className="replay-link" type="button" onClick={onReplay}>
            Replay the invitation
          </button>
          <WaxSeal size="small" />
          <p className="kicker gold">{invite.kicker}</p>
          <p className="families">{invite.togetherLine}</p>
          <div className="cover-names letter-names">
            <span className="name name-one">{invite.partnerOne}</span>
            <span className="ampersand" aria-hidden="true">
              &
            </span>
            <span className="name name-two">{invite.partnerTwo}</span>
          </div>
          <p className="invite-line">{invite.inviteLine}</p>
        </header>

        <Divider />

        <section className="date-block">
          <p className="date-dow">{invite.dateLabel}</p>
          <p className="date-num">{invite.dateDisplay}</p>
          <p className="date-my">{invite.monthYear}</p>
          <p className="date-time">{invite.timeLabel}</p>
        </section>

        <Divider />

        <section className="venue-block">
          <p className="kicker">The venue</p>
          <h2 className="venue-name">{invite.venueName}</h2>
          <p className="venue-addr">
            {invite.venueArea}
            <br />
            {invite.venueCity}
          </p>
          <a
            className="btn-secondary"
            href={invite.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Maps
          </a>
        </section>

        <p className="story">{invite.story}</p>

        <dl className="meta-list">
          <div>
            <dt>Hosted by</dt>
            <dd>{invite.familiesLine}</dd>
          </div>
          <div>
            <dt>Attire</dt>
            <dd>{invite.dressCode}</dd>
          </div>
        </dl>

        <div className="action-row sticky-actions">
          <a className="btn-secondary" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
            Add to calendar
          </a>
          <button className="btn-secondary" type="button" onClick={downloadIcs}>
            Download .ics
          </button>
          <button className="btn-secondary" type="button" onClick={onShare}>
            Share invite
          </button>
          {pageUrl ? (
            <a className="btn-secondary" href={whatsappUrl(pageUrl)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
        </div>

        <blockquote className="quote">
          <p>{invite.quote}</p>
        </blockquote>

        <Rsvp onCelebrate={onCelebrate} />
        <Blessings />

        <footer className="letter-foot">
          <p>
            With love
            <br />
            {invite.partnerOne} & {invite.partnerTwo}
          </p>
        </footer>
      </article>

      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </main>
  )
}
