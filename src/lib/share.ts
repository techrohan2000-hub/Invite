import { invite } from "../config"

export function shareText(url: string): string {
  return [
    `You're invited to ${invite.partnerOne} & ${invite.partnerTwo}'s ring ceremony.`,
    `${invite.dateLong} · ${invite.timeLabel}`,
    `${invite.venueName}, Ambajogai`,
    url,
  ].join("\n")
}

export function whatsappUrl(url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(shareText(url))}`
}

export async function shareInvite(): Promise<"shared" | "copied" | "aborted"> {
  const url = window.location.href
  const data = {
    title: invite.eventTitle,
    text: shareText(url),
    url,
  }

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(data)
      return "shared"
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "aborted"
      }
    }
  }

  await navigator.clipboard.writeText(`${data.text}`)
  return "copied"
}
