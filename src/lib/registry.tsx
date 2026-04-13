import { useState } from 'react'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import {
  Button, ButtonGroup, Input, Select, Badge, Toggle, Checkbox, RadioGroup, Accordion, Card,
  Tabs, Avatar, AvatarGroup, Dropdown, Dialog, Table, DataTable, Skeleton, Separator,
  CodeBlock, toast, Toaster,
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
            <ButtonGroup items={[
              { label: 'Day' },
              { label: 'Week' },
              { label: 'Month' },
            ]} />
            <ButtonGroup items={[
              { label: 'Star', icon: Icons.star },
              { label: 'Fork', icon: Icons.copy },
              { label: 'Watch', icon: Icons.search },
            ]} />
            <ButtonGroup size="sm" items={[
              { label: 'Left' },
              { label: 'Center' },
              { label: 'Right' },
            ]} />
          </div>
        ),
      },
    ],
    code: `import { Button, ButtonGroup } from "kazeui"

<Button variant="primary" size="md" icon={<Star />}>
  Star repo
</Button>

<ButtonGroup items={[
  { label: "Day" },
  { label: "Week" },
  { label: "Month" },
]} />

<ButtonGroup items={[
  { label: "Star", icon: <Star /> },
  { label: "Fork", icon: <Copy /> },
]} />`,
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, width: '100%' }}>
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

  dropdown: {
    name: 'Dropdown',
    description: 'A click-triggered popover menu with items, icons, separators, and destructive actions. Closes on outside click.',
    examples: [
      {
        title: 'Default',
        overflow: false,
        minHeight: 220,
        content: (
          <div style={{ display: 'flex', gap: 12 }}>
            <Dropdown
              trigger={<Button variant="outline">Options</Button>}
              items={[
                { label: 'Edit', icon: Icons.copy },
                { label: 'Duplicate', icon: Icons.copy },
                'separator',
                { label: 'Delete', icon: Icons.x, destructive: true },
              ]}
            />
            <Dropdown
              trigger={<Button variant="secondary">Account</Button>}
              items={[
                { label: 'Profile' },
                { label: 'Settings' },
                { label: 'Billing' },
                'separator',
                { label: 'Sign out', destructive: true },
              ]}
            />
          </div>
        ),
      },
      {
        title: 'Right Aligned',
        overflow: false,
        minHeight: 200,
        content: (
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Dropdown
              align="right"
              trigger={<Button variant="ghost" icon={Icons.chevronDown}>More</Button>}
              items={[
                { label: 'Export as CSV' },
                { label: 'Export as JSON' },
                'separator',
                { label: 'Print' },
              ]}
            />
          </div>
        ),
      },
    ],
    code: `import { Dropdown } from "kazeui"

<Dropdown
  trigger={<Button variant="outline">Options</Button>}
  items={[
    { label: "Edit", icon: <Edit /> },
    { label: "Duplicate", icon: <Copy /> },
    "separator",
    { label: "Delete", icon: <Trash />, destructive: true },
  ]}
/>

{/* Right-aligned */}
<Dropdown align="right" trigger={...} items={[...]} />`,
    props: [
      { name: 'trigger', type: 'ReactNode', default: '—' },
      { name: 'items', type: '({ label, icon?, onClick?, destructive? } | "separator")[]', default: '—' },
      { name: 'align', type: '"left" | "right"', default: '"left"' },
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

  select: {
    name: 'Select',
    description: 'A custom select dropdown with check indicator, chevron animation, focus ring, and disabled state. Closes on outside click.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
            <Select
              placeholder="Select a framework..."
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'solid', label: 'Solid' },
                { value: 'angular', label: 'Angular' },
              ]}
            />
            <Select
              defaultValue="comfortable"
              options={[
                { value: 'compact', label: 'Compact' },
                { value: 'comfortable', label: 'Comfortable' },
                { value: 'spacious', label: 'Spacious' },
              ]}
            />
            <Select
              disabled
              placeholder="Disabled"
              options={[{ value: 'x', label: 'Option' }]}
            />
          </div>
        ),
      },
      {
        title: 'Multiple',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
            <Select
              multiple
              placeholder="Select technologies..."
              options={[
                { value: 'react', label: 'React' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'tailwind', label: 'Tailwind CSS' },
                { value: 'vite', label: 'Vite' },
                { value: 'tanstack', label: 'TanStack Router' },
              ]}
            />
            <Select
              multiple
              defaultValues={['design', 'frontend']}
              placeholder="Select tags..."
              options={[
                { value: 'design', label: 'Design' },
                { value: 'frontend', label: 'Frontend' },
                { value: 'backend', label: 'Backend' },
                { value: 'devops', label: 'DevOps' },
              ]}
            />
          </div>
        ),
      },
    ],
    code: `import { Select } from "kazeui"

{/* Single */}
<Select
  placeholder="Select framework..."
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  onChange={(val) => console.log(val)}
/>

{/* Multiple */}
<Select
  multiple
  placeholder="Select tags..."
  defaultValues={["design", "frontend"]}
  options={[
    { value: "design", label: "Design" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ]}
  onChangeMultiple={(vals) => console.log(vals)}
/>`,
    props: [
      { name: 'options', type: '{ value: string; label: string }[]', default: '—' },
      { name: 'defaultValue', type: 'string', default: '—' },
      { name: 'defaultValues', type: 'string[]', default: '—' },
      { name: 'placeholder', type: 'string', default: '"Select..."' },
      { name: 'multiple', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'onChange', type: '(value: string) => void', default: '—' },
      { name: 'onChangeMultiple', type: '(values: string[]) => void', default: '—' },
    ],
  },

  skeleton: {
    name: 'Skeleton',
    description: 'A shimmer loading placeholder with configurable dimensions, border radius, and circle mode. Use to indicate content that is loading.',
    examples: [
      {
        title: 'Shapes',
        direction: 'column',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
            <Skeleton height={16} width="75%" />
            <Skeleton height={16} width="50%" />
            <Skeleton height={12} width="90%" />
            <Skeleton height={40} rounded="lg" />
            <div style={{ display: 'flex', gap: 8 }}>
              <Skeleton circle height={40} />
              <Skeleton circle height={40} />
              <Skeleton circle height={40} />
            </div>
          </div>
        ),
      },
      {
        title: 'Card Skeleton',
        direction: 'column',
        content: (
          <div style={{
            border: `1px solid ${tokens.colors.border}`, borderRadius: 'var(--kaze-radius-lg)',
            padding: 20, width: '100%', maxWidth: 320, background: tokens.colors.surface,
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
              <Skeleton circle height={36} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Skeleton height={14} width="60%" />
                <Skeleton height={10} width="40%" />
              </div>
            </div>
            <Skeleton height={12} width="100%" />
            <div style={{ marginTop: 8 }}><Skeleton height={12} width="85%" /></div>
            <div style={{ marginTop: 8 }}><Skeleton height={12} width="70%" /></div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Skeleton height={24} width={60} rounded="full" />
              <Skeleton height={24} width={72} rounded="full" />
            </div>
          </div>
        ),
      },
    ],
    code: `import { Skeleton } from "kazeui"

{/* Text lines */}
<Skeleton height={16} width="75%" />
<Skeleton height={12} width="50%" />

{/* Circle avatar */}
<Skeleton circle height={40} />

{/* Card placeholder */}
<Skeleton height={200} rounded="lg" />`,
    props: [
      { name: 'width', type: 'number | string', default: '"100%"' },
      { name: 'height', type: 'number | string', default: '16' },
      { name: 'rounded', type: '"sm" | "md" | "lg" | "full"', default: '"md"' },
      { name: 'circle', type: 'boolean', default: 'false' },
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

  table: {
    name: 'Table',
    description: 'A data table with typed columns, row hover highlighting, and optional striped rows. Clean header styling with secondary text.',
    examples: [
      {
        title: 'Default',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <Table
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status' },
                { key: 'commits', label: 'Commits', align: 'right' },
              ]}
              rows={[
                { name: 'Abderrahim G', role: 'Maintainer', status: <Badge variant="success">Active</Badge>, commits: '1,284' },
                { name: 'Sarah Chen', role: 'Contributor', status: <Badge variant="success">Active</Badge>, commits: '847' },
                { name: 'Dan Abramov', role: 'Contributor', status: <Badge variant="warning">Away</Badge>, commits: '423' },
                { name: 'Evan You', role: 'Reviewer', status: <Badge variant="outline">Inactive</Badge>, commits: '156' },
              ]}
            />
          </div>
        ),
      },
      {
        title: 'Striped',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <Table
              striped
              columns={[
                { key: 'component', label: 'Component' },
                { key: 'size', label: 'Size', align: 'right' },
                { key: 'deps', label: 'Dependencies', align: 'right' },
              ]}
              rows={[
                { component: 'Button', size: '1.2kb', deps: '0' },
                { component: 'Dialog', size: '1.8kb', deps: '1' },
                { component: 'Accordion', size: '1.4kb', deps: '0' },
                { component: 'Table', size: '1.1kb', deps: '0' },
                { component: 'Avatar', size: '1.6kb', deps: '0' },
              ]}
            />
          </div>
        ),
      },
      {
        title: 'DataTable — search, sort, pagination, selection',
        direction: 'column',
        content: (
          <div style={{ width: '100%' }}>
            <DataTable
              selectable
              pageSize={4}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status' },
              ]}
              data={[
                { name: 'Abderrahim G', email: 'abderrahim@kaze.dev', role: 'Maintainer', status: <Badge variant="success">Active</Badge> },
                { name: 'Sarah Chen', email: 'sarah@kaze.dev', role: 'Engineer', status: <Badge variant="success">Active</Badge> },
                { name: 'Dan Abramov', email: 'dan@kaze.dev', role: 'Contributor', status: <Badge variant="warning">Away</Badge> },
                { name: 'Evan You', email: 'evan@kaze.dev', role: 'Reviewer', status: <Badge variant="outline">Inactive</Badge> },
                { name: 'Ryan Dahl', email: 'ryan@kaze.dev', role: 'Contributor', status: <Badge variant="success">Active</Badge> },
                { name: 'Rich Harris', email: 'rich@kaze.dev', role: 'Contributor', status: <Badge variant="warning">Away</Badge> },
                { name: 'Guillermo Rauch', email: 'guillermo@kaze.dev', role: 'Advisor', status: <Badge variant="info">Review</Badge> },
                { name: 'Theo Browne', email: 'theo@kaze.dev', role: 'Contributor', status: <Badge variant="success">Active</Badge> },
              ]}
            />
          </div>
        ),
      },
    ],
    code: `import { Table, DataTable } from "kazeui"

{/* Simple table */}
<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
  ]}
  rows={[
    { name: "Sarah", role: "Engineer" },
    { name: "Dan", role: "Reviewer" },
  ]}
  striped
/>

{/* Full data table */}
<DataTable
  selectable
  searchable
  pageSize={5}
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
  ]}
  data={rows}
/>`,
    props: [
      { name: 'columns', type: '{ key: string; label: string; align?: "left" | "center" | "right" }[]', default: '—' },
      { name: 'rows / data', type: 'Record<string, ReactNode>[]', default: '—' },
      { name: 'striped', type: 'boolean', default: 'false' },
      { name: 'searchable', type: 'boolean', default: 'true' },
      { name: 'selectable', type: 'boolean', default: 'false' },
      { name: 'pageSize', type: 'number', default: '5' },
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

  toast: {
    name: 'Toast',
    description: 'Auto-dismissing notification toasts anchored to the bottom-right. Triggered via a global toast() function — no provider wiring needed beyond placing <Toaster /> once.',
    examples: [
      {
        title: 'Variants',
        content: (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Event created', description: 'Your event has been saved.' })}>Default</Button>
            <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Saved successfully', variant: 'success' })}>Success</Button>
            <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' })}>Destructive</Button>
            <Button variant="secondary" size="sm" onClick={() => toast({ title: 'New update available', variant: 'info' })}>Info</Button>
            <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Storage almost full', description: '92% used', variant: 'warning' })}>Warning</Button>
          </div>
        ),
      },
    ],
    code: `import { toast, Toaster } from "kazeui"

{/* Place once in your layout */}
<Toaster />

{/* Trigger from anywhere */}
toast({ title: "Saved successfully", variant: "success" })

toast({
  title: "Something went wrong",
  description: "Please try again later.",
  variant: "destructive",
})`,
    props: [
      { name: 'title', type: 'string', default: '—' },
      { name: 'description', type: 'string', default: '—' },
      { name: 'variant', type: '"default" | "success" | "destructive" | "info" | "warning"', default: '"default"' },
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
