# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
# Docs site (root)
npm run dev        # Vite dev server at localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build

# CLI package
cd packages/cli
npm run build      # tsup → dist/index.js (with shebang)
npm run dev -- list          # Run CLI directly without building
npm run dev -- add button    # Test add command locally
```

## Architecture

KazeUI has three parts in one repo:

1. **Docs site** (root) — Vite + TanStack Router file-based routing. Interactive component showcase with sidebar, search (Cmd+K), and dark mode toggle.
2. **Registry** (`registry/`) — Standalone component source files + `registry.json` manifest. The CLI fetches these from GitHub raw URLs at install time.
3. **CLI** (`packages/cli/`) — Published as `kazeui-cli` on npm. Commands: `init`, `add`, `list`. Not a workspace — built and published independently.

### Theming via CSS Variables

All color tokens live as `--kaze-*` CSS custom properties in `globals.css`. Light values in `:root`, dark values in `[data-theme="dark"]`. The JS `tokens` object (`src/lib/tokens.ts`) is just string references to these CSS vars — never hardcoded hex values in component code.

Theme toggle: `document.documentElement.setAttribute('data-theme', 'dark' | 'light')`.

### Component Style Pattern

Components use **inline React styles** referencing CSS variables through the `tokens` object — no Tailwind classes, no CSS-in-JS library. All components start with `"use client"` for RSC compatibility.

### Two Copies of Components

- `src/components/ui.tsx` — monolithic file used by the docs site, imports from `@/lib/tokens`
- `registry/components/*.tsx` — individual standalone files for CLI distribution, import from `@/lib/kaze/tokens`

These must stay in sync. When modifying a component, update both.

### Registry Import Rewriting

Registry components use `@/lib/kaze/tokens` and `@/lib/kaze/icons` as import paths. The CLI's `add` command rewrites these to match the user's `kaze.json` alias config.

## Adding a New Component

1. Add to `registry/components/<name>.tsx` (standalone, imports from `@/lib/kaze/tokens`)
2. Add entry in `registry/registry.json` (name, description, files, registryDependencies)
3. Add to `src/components/ui.tsx` (same implementation, imports from `@/lib/tokens`)
4. Add demo entry in `src/lib/registry.tsx` (examples, code, props)
5. Add to sidebar nav in `src/components/sidebar.tsx`
6. Add to search items in `src/routes/__root.tsx`

## Key Conventions

- Path alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)
- Animations defined as CSS `@keyframes` in `globals.css`, referenced inline via `animation` property
- Icons are inline SVG JSX in `src/lib/icons.tsx`, not an icon library
- Dialog uses `createPortal` to escape parent stacking contexts
- Tabs use `offsetLeft`/`offsetWidth` measurement for the sliding indicator
- Avatar color is deterministic from `name.length % 6`
