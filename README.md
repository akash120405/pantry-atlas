# Pantry Atlas

A responsive first version of a photo-to-pantry cooking app. Browser-native HTML, CSS and JavaScript with a Cloudflare-compatible Worker; no dependencies to install.

Features: photo upload, resize and preview; server-side ingredient recognition when configured; review before adding detected ingredients; editable pantry with regional ingredient aliases; twelve starter recipes across twelve cuisines; complete quantities, steps, serving adjustment, flavour descriptions, missing ingredients, filters, favourites, shopping lists and YouTube tutorial searches.

## Run locally

Requires Node.js 20+. Run npm run build, then npm run dev. Open http://127.0.0.1:4173. After securely creating .env.local, start the built app with node --env-file=.env.local scripts/preview.mjs to enable local AI recognition. Never commit the env file. Run npm test for matching and API checks; run npm run validate after a build.

## Configuration

GEMINI_API_KEY and GROQ_API_KEY are server-only secrets. Gemini is tried first; Groq handles a failure or invalid response. Either provider can also be configured alone. GEMINI_VISION_MODEL defaults to gemini-3.8-flash; GROQ_VISION_MODEL defaults to qwen/qwen3.8-27b. Configure hosted secrets through Sites; local secrets do not automatically deploy. Photos are sent to Google Gemini and, if needed, Groq for recognition. This app does not persist uploaded photos; provider data policies apply. The status endpoint reveals only whether a provider is configured, never credentials. Keep .env.local ignored, and never place a key in source or client code.

## First-version limits

Twelve authored starter recipes, one per cuisine, rather than an exhaustive database. Ingredient matching checks names, not quantities, freshness or product safety. Listed-allergen exclusions cannot certify allergen safety. Tutorial links open clearly labelled YouTube searches, rather than individually verified videos. Dish photos are sourced from Wikimedia Commons with per-image author and license credits. Photos are serving suggestions and may include different garnishes. The interface is English; language selection changes tutorial searches only. Pantry and favourites are stored in this browser without account syncing. Image recognition remains explicitly unavailable until a server credential is configured and verified. Request limiting is per Worker instance; use durable limits before public launch.

## Source

Edit the HTML, CSS, effects, motion, client, photos, recipes, logic and server files in worker/. scripts/build.mjs embeds them in worker/index.js and produces dist/server/index.js. Sites identity remains in .openai/hosting.json. The site can be published publicly through Sites access settings. Reuse the API boundary when adding a mobile client later, with suitable authentication.

## Visual experience

The interface includes a CSS 3D food scene, floating layers, perspective card tilt, scroll entrances, photo zoom, animated dialogs and an Effects toggle. System reduced-motion preferences are respected by default. Dish photos load lazily from Wikimedia; credits are available in recipe dialogs and How it works. The interface is responsive for phones and desktops.
