export type RsvpStatus = "yes" | "no" | "blessing"

export type Rsvp = {
  name: string
  status: RsvpStatus
  plusOne: boolean
  at: string
}

export type Blessing = {
  id: string
  name: string
  note: string
  at: string
}

const RSVP_KEY = "ar-engagement-rsvp"
const BLESSINGS_KEY = "ar-engagement-blessings"

export function loadRsvp(): Rsvp | null {
  try {
    const raw = localStorage.getItem(RSVP_KEY)
    return raw ? (JSON.parse(raw) as Rsvp) : null
  } catch {
    return null
  }
}

export function saveRsvp(rsvp: Rsvp): void {
  localStorage.setItem(RSVP_KEY, JSON.stringify(rsvp))
}

export function loadBlessings(): Blessing[] {
  try {
    const raw = localStorage.getItem(BLESSINGS_KEY)
    return raw ? (JSON.parse(raw) as Blessing[]) : []
  } catch {
    return []
  }
}

export function saveBlessing(blessing: Blessing): Blessing[] {
  const next = [blessing, ...loadBlessings()].slice(0, 40)
  localStorage.setItem(BLESSINGS_KEY, JSON.stringify(next))
  return next
}
