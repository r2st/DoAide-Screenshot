# DoAide Screenshot

Beautiful screenshot generator at [screenshot.doaide.com](https://screenshot.doaide.com).

## Features

- **Code Screenshot** — Syntax-highlighted code with 20+ themes (Dracula, Monokai, Nord, etc.)
- **Tweet / Quote Card** — Beautiful quote cards for social media
- **Browser Mockup** — Chrome, Safari, Firefox, Arc frame styles
- **Phone Mockup** — iPhone & Android device frames
- **Comparison Slider** — Before/after image comparison

All tools are free, no login required, and run entirely in the browser.

## Tech Stack

- React + Vite
- Tailwind CSS 3.4
- Prism.js (syntax highlighting)
- html-to-image (PNG export at 2x resolution)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
npx serve dist -s -l tcp://172.18.0.1:3055
```

### Systemd Service

```bash
sudo cp doaide-screenshot-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now doaide-screenshot-web
```

## Port

- Web: 3055 (bound to 172.18.0.1)
- Server: 89.167.8.178
- Subdomain: screenshot.doaide.com
