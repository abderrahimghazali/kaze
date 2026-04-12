import { useState } from 'react'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import {
  Button, ButtonGroup, Input, Badge, Toggle, Checkbox, RadioGroup, Accordion, Card,
  Tabs, Avatar, AvatarGroup, Dialog, Separator, CodeBlock,
} from '@/components/ui'

type PropDef = { name: string; type: string; default: string }
type Example = { title: string; content: React.ReactNode; align?: string; direction?: 'row' | 'column' }
type Entry = { name: string; description: string; examples: Example[]; code: string; props: PropDef[] }

// ─── Photo map ───
const photos: Record<string, string> = {
  'Abderrahim G': '/abderrahim.jpg',
  'Sarah Chen': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Dan Abramov': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Evan You': 'https://randomuser.me/api/portraits/men/75.jpg',
  'Ryan Dahl': 'https://randomuser.me/api/portraits/men/46.jpg',
  'Guillermo Rauch': 'https://randomuser.me/api/portraits/men/67.jpg',
  'Rich Harris': 'https://randomuser.me/api/portraits/men/22.jpg',
  'Theo Browne': 'https://randomuser.me/api/portraits/men/85.jpg',
}
const p = (name: string) => photos[name]
const people = (...names: string[]) => names.map((n) => ({ name: n, src: p(n) }))

export const registry: Record<string, Entry> = {
  accordion: {
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings that reveal content. Animated height transitions with a single open panel at a time.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <Accordion items={[
              { title: 'Is KazeUI accessible?', content: 'Yes. Every component follows WAI-ARIA patterns with proper roles, keyboard navigation, and focus management.' },
              { title: 'Can I use it with Next.js?', content: 'Absolutely. Kaze components are RSC-compatible. Use the "use client" directive only where state is needed.' },
              { title: 'How does theming work?', content: 'CSS variables at the root level. Override --kaze-accent, --kaze-bg, --kaze-border and the entire system adapts.' },
            ]} />
          </div>
        ),
      },
    ],
    code: `import { Accordion } from "kazeui"

<Accordion items={[
  { title: "Question?", content: "Answer." },
  { title: "Another?", content: "Another answer." },
]} />`,
    props: [
      { name: 'items', type: '{ title: string; content: string }[]', default: '—' },
    ],
  },

  avatar: {
    name: 'Avatar',
    description: 'A circular avatar with initials, image support, status indicators, ring accents, and animated entrance. Includes AvatarGroup for stacked displays with hover fan-out.',
    examples: [
      {
        title: 'Sizes',
        content: (
          <>
            <Avatar name="Abderrahim G" src={p('Abderrahim G')} size={48} />
            <Avatar name="Sarah Chen" src={p('Sarah Chen')} size={40} />
            <Avatar name="Kaze UI" size={36} />
            <Avatar name="Dan Abramov" src={p('Dan Abramov')} size={32} />
            <Avatar name="Evan You" src={p('Evan You')} size={24} />
          </>
        ),
      },
      {
        title: 'Status Indicators',
        content: (
          <>
            <Avatar name="Abderrahim G" src={p('Abderrahim G')} size={44} status="online" />
            <Avatar name="Sarah Chen" src={p('Sarah Chen')} size={44} status="busy" />
            <Avatar name="Kaze UI" size={44} status="away" />
            <Avatar name="Dan Abramov" src={p('Dan Abramov')} size={44} status="offline" />
          </>
        ),
      },
      {
        title: 'With Ring',
        content: (
          <>
            <Avatar name="Abderrahim G" src={p('Abderrahim G')} size={44} ring />
            <Avatar name="Sarah Chen" src={p('Sarah Chen')} size={44} ring status="online" />
            <Avatar name="Kaze UI" size={44} ring status="busy" />
          </>
        ),
      },
      {
        title: 'Animated Entrance',
        content: <AvatarAnimatedDemo />,
      },
      {
        title: 'Avatar Group — hover to fan out',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <AvatarGroup
              items={people('Abderrahim G', 'Sarah Chen', 'Dan Abramov', 'Evan You', 'Ryan Dahl', 'Guillermo Rauch', 'Rich Harris')}
              size={38}
              max={5}
            />
            <AvatarGroup
              items={people('Abderrahim G', 'Sarah Chen', 'Dan Abramov', 'Evan You', 'Ryan Dahl', 'Guillermo Rauch', 'Rich Harris', 'Theo Browne')}
              size={32}
              max={6}
            />
          </div>
        ),
      },
      {
        title: 'Animated Group',
        content: <AvatarGroupAnimatedDemo />,
      },
    ],
    code: `import { Avatar, AvatarGroup } from "kazeui"

{/* Basic */}
<Avatar name="Sarah Chen" size={40} />

{/* With status */}
<Avatar name="Sarah Chen" size={40} status="online" />

{/* With ring accent */}
<Avatar name="Sarah Chen" size={40} ring />

{/* Animated entrance */}
<Avatar name="Sarah Chen" size={40} animate />

{/* Avatar group with overflow + hover fan-out */}
<AvatarGroup
  names={["Sarah", "Dan", "Evan", "Ryan", "Rich"]}
  size={36}
  max={4}
  animate
/>`,
    props: [
      { name: 'name', type: 'string', default: '—' },
      { name: 'size', type: 'number', default: '36' },
      { name: 'src', type: 'string', default: '—' },
      { name: 'status', type: '"online" | "offline" | "busy" | "away"', default: '—' },
      { name: 'ring', type: 'boolean', default: 'false' },
      { name: 'animate', type: 'boolean', default: 'false' },
      { name: 'delay', type: 'number', default: '0' },
    ],
  },

  badge: {
    name: 'Badge',
    description: 'Pill-shaped status indicators with semantic color variants. Tinted backgrounds for inline labels, metadata tags, and status signals.',
    examples: [
      {
        title: 'Variants',
        content: (
          <>
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </>
        ),
      },
    ],
    code: `import { Badge } from "kazeui"

<Badge variant="success">Active</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="outline">Draft</Badge>`,
    props: [
      { name: 'variant', type: '"default" | "success" | "destructive" | "info" | "warning" | "outline"', default: '"default"' },
      { name: 'children', type: 'ReactNode', default: '—' },
    ],
  },

  checkbox: {
    name: 'Checkbox',
    description: 'An animated checkbox with a checkmark that scales in on toggle. Supports labels and disabled state.',
    examples: [
      {
        title: 'States',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" defaultChecked disabled />
          </div>
        ),
      },
    ],
    code: `import { Checkbox } from "kazeui"

<Checkbox label="Accept terms" />
<Checkbox label="Subscribed" defaultChecked />
<Checkbox label="Disabled" disabled />`,
    props: [
      { name: 'defaultChecked', type: 'boolean', default: 'false' },
      { name: 'label', type: 'string', default: '—' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
  },

  button: {
    name: 'Button',
    description: 'A tactile, composable button with five variants and three sizes. Every button renders with a 1px border and subtle inner shadow for depth.',
    examples: [
      {
        title: 'Variants',
        content: (
          <>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </>
        ),
      },
      {
        title: 'Sizes',
        content: (
          <>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </>
        ),
      },
      {
        title: 'With Icons',
        content: (
          <>
            <Button variant="secondary" icon={Icons.star}>Starred</Button>
            <Button variant="outline" icon={Icons.copy}>Copy link</Button>
            <Button variant="ghost" icon={Icons.search}>Search</Button>
          </>
        ),
      },
      {
        title: 'Button Group',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ButtonGroup>
              <Button variant="outline">Day</Button>
              <Button variant="outline">Week</Button>
              <Button variant="outline">Month</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" icon={Icons.star}>Star</Button>
              <Button variant="outline" icon={Icons.copy}>Fork</Button>
              <Button variant="outline" icon={Icons.search}>Watch</Button>
            </ButtonGroup>
          </div>
        ),
      },
    ],
    code: `import { Button, ButtonGroup } from "kazeui"

<Button variant="primary" size="md" icon={<Star />}>
  Star repo
</Button>

<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`,
    props: [
      { name: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"primary"' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'icon', type: 'ReactNode', default: '—' },
      { name: 'onClick', type: '() => void', default: '—' },
    ],
  },

  card: {
    name: 'Card',
    description: 'A surface container with border, subtle shadow, and optional hover elevation. The building block for content grouping.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
            <Card hoverable padding="20px">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name="Abderrahim G" src={p('Abderrahim G')} size={32} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>Design System</div>
                  <div style={{ fontSize: 12, color: tokens.colors.textTertiary }}>v0.1.0</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
                A composable component library. Clean, minimal, extensible.
              </p>
            </Card>
            <Card hoverable padding="20px">
              <div style={{ fontSize: 11, fontFamily: 'var(--kaze-font-mono)', color: tokens.colors.textTertiary, marginBottom: 6 }}>METRICS</div>
              <div style={{ fontSize: 28, fontWeight: 300, fontFamily: 'var(--kaze-font-serif)', letterSpacing: '-0.04em', marginBottom: 2 }}>2.4kb</div>
              <div style={{ fontSize: 13, color: tokens.colors.textSecondary }}>Gzipped bundle size</div>
            </Card>
          </div>
        ),
      },
    ],
    code: `import { Card } from "kazeui"

<Card hoverable padding="24px">
  <h3>Title</h3>
  <p>Card content goes here.</p>
</Card>`,
    props: [
      { name: 'padding', type: 'string', default: '"20px"' },
      { name: 'hoverable', type: 'boolean', default: 'false' },
      { name: 'children', type: 'ReactNode', default: '—' },
    ],
  },

  'code-block': {
    name: 'Code Block',
    description: 'A dark-themed code display with language label and one-click copy. Styled with IBM Plex Mono for crisp readability.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <CodeBlock code={`import { Button, Card, Badge } from "kazeui"

function App() {
  return (
    <Card hoverable>
      <Badge variant="success">Live</Badge>
      <Button variant="primary">Deploy</Button>
    </Card>
  )
}`} />
          </div>
        ),
      },
    ],
    code: `import { CodeBlock } from "kazeui"

<CodeBlock
  language="tsx"
  code={\`const greeting = "hello"\`}
/>`,
    props: [
      { name: 'code', type: 'string', default: '—' },
      { name: 'language', type: 'string', default: '"jsx"' },
    ],
  },

  dialog: {
    name: 'Dialog',
    description: 'A modal overlay with backdrop blur, scale-in animation, and click-outside-to-close. Built for confirmations, forms, and focused interactions.',
    examples: [
      {
        title: 'Interactive',
        content: <DialogDemo />,
      },
    ],
    code: `import { Dialog, Button } from "kazeui"

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open</Button>

<Dialog open={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <Button onClick={() => setOpen(false)}>Cancel</Button>
  <Button variant="destructive" onClick={() => setOpen(false)}>
    Delete
  </Button>
</Dialog>`,
    props: [
      { name: 'open', type: 'boolean', default: '—' },
      { name: 'onClose', type: '() => void', default: '—' },
      { name: 'title', type: 'string', default: '—' },
      { name: 'children', type: 'ReactNode', default: '—' },
    ],
  },

  input: {
    name: 'Input',
    description: 'A clean text input with 3px focus ring offset, optional leading icon, and disabled state. Icons sit flush left with proper optical alignment.',
    examples: [
      {
        title: 'Variants',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
            <Input placeholder="Email address" />
            <Input placeholder="Search components..." icon={Icons.search} />
            <Input placeholder="Disabled input" disabled />
          </div>
        ),
      },
    ],
    code: `import { Input } from "kazeui"

<Input placeholder="Email address" />
<Input placeholder="Search..." icon={<Search />} />
<Input placeholder="Disabled" disabled />`,
    props: [
      { name: 'placeholder', type: 'string', default: '—' },
      { name: 'icon', type: 'ReactNode', default: '—' },
      { name: 'type', type: 'string', default: '"text"' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
  },

  'radio-group': {
    name: 'RadioGroup',
    description: 'A single-select radio group with an animated dot indicator. Supports default selection and disabled state.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <RadioGroup
              defaultValue="comfortable"
              options={[
                { value: 'compact', label: 'Compact' },
                { value: 'comfortable', label: 'Comfortable' },
                { value: 'spacious', label: 'Spacious' },
              ]}
            />
          </div>
        ),
      },
      {
        title: 'Disabled',
        direction: 'column',
        content: (
          <RadioGroup
            disabled
            defaultValue="light"
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        ),
      },
    ],
    code: `import { RadioGroup } from "kazeui"

<RadioGroup
  defaultValue="comfortable"
  options={[
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious" },
  ]}
/>`,
    props: [
      { name: 'options', type: '{ value: string; label: string }[]', default: '—' },
      { name: 'defaultValue', type: 'string', default: '—' },
      { name: 'name', type: 'string', default: '—' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
  },

  separator: {
    name: 'Separator',
    description: 'A horizontal divider with an optional centered label. Uses mono font for section headers in documentation layouts.',
    examples: [
      {
        title: 'Variants',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <Separator />
            <div style={{ height: 16 }} />
            <Separator label="Section Title" />
            <div style={{ height: 16 }} />
            <Separator label="Another Section" />
          </div>
        ),
      },
    ],
    code: `import { Separator } from "kazeui"

<Separator />
<Separator label="Section Title" />`,
    props: [
      { name: 'label', type: 'string', default: '—' },
    ],
  },

  tabs: {
    name: 'Tabs',
    description: 'Underline-style tabs with a 2px active indicator. Smooth transitions between states with content panels below.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <Tabs items={[
              { label: 'Overview', content: 'Kaze ships 12 primitives: Button, Input, Badge, Toggle, Card, Accordion, Tabs, Dialog, Avatar, Separator, CodeBlock, and Tooltip. Each is composable, accessible, and under 2kb.' },
              { label: 'Installation', content: 'Run npx kazeui init in your project root. It scaffolds a /components/ui directory, injects CSS variables into globals.css, and adds font imports. Zero config.' },
              { label: 'Customization', content: 'Every token is a CSS variable. Swap --kaze-accent from stone to blue and the entire system shifts. Override at component level with standard Tailwind classes.' },
            ]} />
          </div>
        ),
      },
    ],
    code: `import { Tabs } from "kazeui"

<Tabs items={[
  { label: "Tab 1", content: "Content for tab 1" },
  { label: "Tab 2", content: "Content for tab 2" },
  { label: "Tab 3", content: "Content for tab 3" },
]} />`,
    props: [
      { name: 'items', type: '{ label: string; content: string }[]', default: '—' },
    ],
  },

  toggle: {
    name: 'Toggle',
    description: 'A switch control with smooth thumb transition and two sizes. Renders as a button with proper ARIA switch role.',
    examples: [
      {
        title: 'States',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <Toggle label="Enable notifications" defaultChecked />
            <Toggle label="Dark mode" size="sm" />
            <Toggle label="Auto-save drafts" size="md" defaultChecked />
          </div>
        ),
      },
    ],
    code: `import { Toggle } from "kazeui"

<Toggle label="Enable notifications" defaultChecked />
<Toggle label="Dark mode" size="sm" />`,
    props: [
      { name: 'defaultChecked', type: 'boolean', default: 'false' },
      { name: 'size', type: '"sm" | "md"', default: '"md"' },
      { name: 'label', type: 'string', default: '—' },
    ],
  },
}

// ─── Interactive Demos ───

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm action">
        <p style={{ fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
          This will permanently remove the selected items. This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Dialog>
    </>
  )
}

function AvatarAnimatedDemo() {
  const [key, setKey] = useState(0)
  const items = people('Abderrahim G', 'Sarah Chen', 'Dan Abramov', 'Evan You', 'Ryan Dahl')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} key={key}>
        {items.map(({ name, src }, i) => (
          <Avatar key={name} name={name} src={src} size={42} animate delay={i * 60} status={i === 0 ? 'online' : undefined} ring={i < 2} />
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)} style={{ alignSelf: 'flex-start' }}>
        Replay animation
      </Button>
    </div>
  )
}

function AvatarGroupAnimatedDemo() {
  const [key, setKey] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div key={key}>
        <AvatarGroup
          items={people('Abderrahim G', 'Sarah Chen', 'Dan Abramov', 'Evan You', 'Ryan Dahl', 'Guillermo Rauch', 'Rich Harris')}
          size={38}
          max={5}
          animate
        />
      </div>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)} style={{ alignSelf: 'flex-start' }}>
        Replay animation
      </Button>
    </div>
  )
}
