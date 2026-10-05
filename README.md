# JustVibing

Small phone-friendly apps and games, served from one landing page. Plain HTML/JS, no build step.

```
index.html        landing page (reads apps.json)
apps.json         list of apps shown on the landing page
apps/
  _template/      copy this to start a new app
  tower-defence/  Orbital Defence
  patient-zero/   Patient Zero (Plague Inc-style pandemic strategy)
  magic-sort/     Magic Sort (potion colour-sorting puzzle)
```

## Adding an app

1. `cp -r apps/_template apps/my-app` and build it there (keep it self-contained: relative paths only).
2. Add an entry to `apps.json`:
   ```json
   { "id": "my-app", "name": "My App", "description": "One line.", "category": "Games", "path": "apps/my-app/" }
   ```
   Categories become filter chips on the landing page automatically.
3. Commit and push.

Each app has its own `manifest.webmanifest`, so it can be installed to the home screen on its own, not just the hub. Give each app its own `localStorage` keys (e.g. prefix with the app id), since all apps share one origin.

## Running locally

```
python3 -m http.server 8000
```
Open http://localhost:8000 (the landing page needs http, not file://).
