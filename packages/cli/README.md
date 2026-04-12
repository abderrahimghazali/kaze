# kazeui-cli

CLI for adding [KazeUI](https://kazeui.vercel.app) components to your project.

Copy-paste components — not a runtime dependency. Like shadcn/ui, you own the code.

## Usage

```bash
# Setup your project
npx kazeui-cli init

# Add components
npx kazeui-cli add button card dialog

# See all available components
npx kazeui-cli list
```

## Commands

### `init`

Interactive setup that creates:
- `kaze.json` — config file with paths and import aliases
- `lib/kaze/tokens.ts` — CSS variable token references
- `lib/kaze/icons.tsx` — SVG icon components
- Appends `--kaze-*` CSS variables to your global stylesheet

### `add <components...>`

Fetches component source from the registry and writes it to your project. Automatically resolves dependencies between components (e.g. `avatar-group` pulls `avatar`).

```bash
npx kazeui-cli add button          # single
npx kazeui-cli add card dialog     # multiple
npx kazeui-cli add avatar-group    # auto-installs avatar
```

### `list`

Shows all available components with descriptions.

## Components

| Name | Description |
|------|-------------|
| accordion | Animated expand/collapse |
| avatar | Initials, images, status dots, ring, animation |
| avatar-group | Stacked avatars with hover fan-out |
| badge | Six semantic color variants |
| button | Five variants, three sizes, icons |
| card | Surface elevation with hover lift |
| checkbox | Animated checkmark with label |
| code-block | Syntax-highlighted with copy button |
| dialog | Portaled modal with scale animation |
| input | Focus rings, icon slot |
| radio-group | Single-select with animated dot |
| separator | Labeled horizontal divider |
| tabs | Sliding underline indicator |
| toggle | Switch with ARIA roles |

## Config (`kaze.json`)

```json
{
  "componentsDir": "src/components/ui",
  "libDir": "src/lib/kaze",
  "cssPath": "src/styles/globals.css",
  "aliases": {
    "lib": "@/lib/kaze"
  }
}
```

## Links

- [Docs](https://kazeui.vercel.app)
- [GitHub](https://github.com/abderrahimghazali/kaze)

## License

MIT
