# Aishwarya & Rohan — Engagement Invite

Digital ring-ceremony invitation. Play the short film, then share the letter.

**Live site (GitHub Pages):** https://techrohan2000-hub.github.io/Invite/

## Run locally

```bash
npm install
npm run dev
```

## Change names, date, or venue

Edit `src/config.ts`. Cover names, RSVP copy, calendar times, and map link all live there.

## Deploy

### GitHub Pages (automatic)

Push to `main` — the Actions workflow builds and publishes to GitHub Pages.

After the first push, enable Pages once if needed:

1. Repo **Settings → Pages**
2. Source: **GitHub Actions**

### Docker

```bash
# Build & run locally
docker compose up --build

# Or
npm run docker:build
npm run docker:run
```

Open http://localhost:8080

Published image (after CI):

```bash
docker pull ghcr.io/techrohan2000-hub/invite:latest
docker run --rm -p 8080:80 ghcr.io/techrohan2000-hub/invite:latest
```

RSVP and blessings are stored in each guest's browser (`localStorage`) for this first version. Connect Formspree, Google Sheets, or Firebase in `src/lib/storage.ts` when you want a shared guest list.
