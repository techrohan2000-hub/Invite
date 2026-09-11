import { invite } from "../config"

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: invite.eventTitle,
    dates: `${invite.calendar.start}/${invite.calendar.end}`,
    ctz: invite.calendar.timeZone,
    location: `${invite.venueName}, ${invite.venueArea}, ${invite.venueCity}`,
    details: `${invite.tagline}\n${invite.dateLong} · ${invite.timeLabel}\n${invite.venueName}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcs(): void {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aishwarya Rohan//RingCeremony//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `DTSTAMP:${invite.calendar.startUtc}`,
    `DTSTART:${invite.calendar.startUtc}`,
    `DTEND:${invite.calendar.endUtc}`,
    `SUMMARY:${invite.eventTitle}`,
    `LOCATION:${invite.venueName}\\, ${invite.venueArea}\\, ${invite.venueCity}`,
    `DESCRIPTION:${invite.tagline} — ${invite.timeLabel}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "Aishwarya-rohan-ring-ceremony.ics"
  a.click()
  URL.revokeObjectURL(url)
}
