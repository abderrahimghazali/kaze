<p align="center">
  <img src="public/kaze-icon.svg" alt="KazeUI" width="48" height="48" />
</p>

<h1 align="center">KazeUI</h1>
<p align="center">A minimal, composable design system.<br/>Clean defaults, sharp details, zero opinions you can't override.</p>

![KazeUI](https://img.shields.io/badge/version-0.1.0-black) ![React](https://img.shields.io/badge/React-19-blue) ![TanStack Router](https://img.shields.io/badge/TanStack_Router-1-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4)

## Components

| Component | Description |
|-----------|-------------|
| **Accordion** | Animated expand/collapse with height transitions |
| **Avatar** | Initials, images, status dots, ring accents, animated entrance |
| **AvatarGroup** | Stacked avatars with overflow count and hover fan-out |
| **Badge** | Six semantic variants with tinted backgrounds |
| **Button** | Five variants, three sizes, icon composable |
| **Card** | Surface elevation with hover lift |
| **CodeBlock** | Dark code display with copy-to-clipboard |
| **Dialog** | Modal overlay with scale-in animation (portaled) |
| **Input** | Focus rings, icon slots, optical alignment |
| **Separator** | Labeled horizontal divider |
| **Tabs** | Sliding underline indicator with smooth transitions |
| **Toggle** | Switch with thumb animation and ARIA roles |

## Stack

- **React 19** — UI
- **TanStack Router** — File-based routing
- **Tailwind CSS v4** — Utility layer
- **Vite** — Build tooling
- **CSS Variables** — Theming via `--kaze-*` tokens

## Getting Started

```bash
git clone https://github.com/abderrahimghazali/kaze.git
cd kaze
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Design Tokens

All tokens are CSS custom properties. Override at `:root` to theme the entire system:

```css
:root {
  --kaze-accent: #2563EB;      /* swap stone → blue */
  --kaze-bg: #FAFAF9;          /* page background */
  --kaze-surface: #FFFFFF;     /* card/component surface */
  --kaze-border: #E8E6E3;      /* borders */
  --kaze-text: #1C1917;        /* primary text */
  --kaze-radius-sm: 6px;       /* small radius */
  --kaze-radius-lg: 12px;      /* large radius */
  --kaze-transition: 160ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Typography

- **Sans** — DM Sans (UI, body)
- **Serif** — Newsreader (headings, display)
- **Mono** — IBM Plex Mono (code, labels)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abderrahimghazali/kaze)

## License

MIT — Built by [Abderrahim](https://github.com/abderrahimghazali)
