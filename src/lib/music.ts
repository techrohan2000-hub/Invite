const BASE = import.meta.env.BASE_URL
export const THEME_SRC = `${BASE}audio/theme.mp3`

export function startInviteMusic() {
  window.dispatchEvent(new Event("invite-music-start"))
}
