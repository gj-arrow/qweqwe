# AGENTS.md — NADI Studio Landing Page

## Project structure
- `index.html` — single-page HTML (all sections: hero, about, services, pricing, gallery, reviews, contacts)
- `style.css` — all styles, mobile-first, responsive breakpoints at 968px and 600px
- `script.js` — all JS (sticky header, mobile menu, scroll reveal, reviews carousel, booking modal, phone mask)
- `assets/` — images (placeholder; replace with real photos from Instagram)
- `start-server.bat` — double-click to run local server on port 8083

## Run locally
```
python -m http.server 8083
# or double-click start-server.bat
```

## Key implementation notes
- **Booking widget**: `openBookingWidget()` in `script.js:6` is a placeholder. Replace with Dikidi API when credentials are available.
- **Photos**: Instagram blocks direct downloads (403). Download manually from `@nadi_studio_minsk` and place in `assets/`.
- **Map**: Yandex Maps iframe uses approximate coordinates. Update with real address coordinates.
- **Phone mask**: formats to `+375 (XX) XXX-XX-XX` in `script.js:180`.

## Conventions
- No build tools, no framework — pure HTML/CSS/JS
- CSS custom properties in `:root` for colors, fonts, spacing
- BEM-like class naming: `block__element--modifier`
- All CTA buttons call `openBookingWidget()` — update once to change everywhere
