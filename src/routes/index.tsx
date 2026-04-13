import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import {
  Badge, Button, Card, Avatar, AvatarGroup, Toggle, Input,
  Checkbox, CodeBlock, Skeleton, toast,
} from '@/components/ui'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const allComponents = [
  { slug: 'accordion', name: 'Accordion' }, { slug: 'avatar', name: 'Avatar' },
  { slug: 'badge', name: 'Badge' }, { slug: 'button', name: 'Button' },
  { slug: 'card', name: 'Card' }, { slug: 'checkbox', name: 'Checkbox' },
  { slug: 'code-block', name: 'Code Block' }, { slug: 'data-table', name: 'DataTable' },
  { slug: 'dialog', name: 'Dialog' }, { slug: 'dropdown', name: 'Dropdown' },
  { slug: 'input', name: 'Input' }, { slug: 'radio-group', name: 'Radio Group' },
  { slug: 'select', name: 'Select' }, { slug: 'separator', name: 'Separator' },
  { slug: 'skeleton', name: 'Skeleton' }, { slug: 'table', name: 'Table' },
  { slug: 'tabs', name: 'Tabs' }, { slug: 'toast', name: 'Toast' },
  { slug: 'toggle', name: 'Toggle' },
]

function CopyButton() {
  const [copied, setCopied] = useState(false)
  const cmd = 'npx kazeui-cli init'
  return (
    <Button variant="secondary" size="lg"
      icon={copied ? Icons.check : Icons.copy}
      onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
    >{cmd}</Button>
  )
}

// ─── Animated counter ───
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1200
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [to])
  return <>{count}{suffix}</>
}

function HomePage() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{ animation: 'fadeInUp 600ms both cubic-bezier(0.22, 1, 0.36, 1)', marginBottom: 64 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <Badge variant="info">React + Tailwind</Badge>
          <Badge>v0.2.0</Badge>
        </div>

        <h1 className="kaze-hero-title" style={{
          fontFamily: 'var(--kaze-font-serif)',
          fontSize: 48,
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.045em',
          color: tokens.colors.text,
          marginBottom: 20,
        }}>
          Build interfaces that feel<br />
          like <em style={{ fontStyle: 'italic', fontWeight: 300 }}>nothing is there.</em>
        </h1>

        <p className="kaze-hero-desc" style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: tokens.colors.textSecondary,
          letterSpacing: '-0.01em',
          maxWidth: 520,
          marginBottom: 36,
        }}>
          Copy-paste components with clean defaults, sharp details, and zero opinions.
          No npm dependency — you own every line.
        </p>

        <div className="kaze-hero-actions" style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
          <Link to="/components/button" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">Browse components</Button>
          </Link>
          <CopyButton />
        </div>
      </section>

      {/* ─── LIVE SHOWCASE ─── */}
      <section style={{ animation: 'fadeInUp 600ms 100ms both cubic-bezier(0.22, 1, 0.36, 1)', marginBottom: 64 }}>
        <div style={{
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 'var(--kaze-radius-lg)',
          background: tokens.colors.surface,
          overflow: 'hidden',
        }}>
          {/* Top bar */}
          <div style={{
            padding: '12px 20px',
            borderBottom: `1px solid ${tokens.colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
            </div>
            <span style={{ fontFamily: 'var(--kaze-font-mono)', fontSize: 11, color: tokens.colors.textTertiary }}>
              preview.tsx
            </span>
            <div style={{ width: 46 }} />
          </div>

          {/* Showcase content */}
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Row 1: Buttons + Badges */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">Deploy</Button>
              <Button variant="secondary" size="sm" icon={Icons.star}>Star</Button>
              <Button variant="outline" size="sm">Preview</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
              <div style={{ width: 1, height: 20, background: tokens.colors.border, margin: '0 4px' }} />
              <Badge variant="success">Deployed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="destructive">Failed</Badge>
            </div>

            {/* Row 2: Input + Controls */}
            <div className="kaze-showcase-row" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, maxWidth: 240 }}>
                <Input placeholder="Search components..." icon={Icons.search} />
              </div>
              <Toggle label="Notifications" defaultChecked />
              <Checkbox label="Remember me" defaultChecked />
            </div>

            {/* Row 3: Cards */}
            <div className="kaze-showcase-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <Card padding="16px" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar name="Abderrahim G" src="/abderrahim.jpg" size={32} status="online" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em' }}>Abderrahim G</div>
                    <div style={{ fontSize: 11, color: tokens.colors.textTertiary }}>Maintainer</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: tokens.colors.textSecondary, lineHeight: 1.5 }}>
                  Building design systems that disappear.
                </p>
              </Card>
              <Card padding="16px" hoverable>
                <div style={{ fontSize: 10, fontFamily: 'var(--kaze-font-mono)', color: tokens.colors.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Components</div>
                <div style={{ fontSize: 32, fontWeight: 300, fontFamily: 'var(--kaze-font-serif)', letterSpacing: '-0.04em', color: tokens.colors.text }}>
                  <Counter to={allComponents.length} />
                </div>
                <div style={{ fontSize: 11, color: tokens.colors.textTertiary, marginTop: 2 }}>and growing</div>
              </Card>
              <Card padding="16px" hoverable>
                <div style={{ fontSize: 10, fontFamily: 'var(--kaze-font-mono)', color: tokens.colors.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Bundle Impact</div>
                <div style={{ fontSize: 32, fontWeight: 300, fontFamily: 'var(--kaze-font-serif)', letterSpacing: '-0.04em', color: tokens.colors.text }}>0kb</div>
                <div style={{ fontSize: 11, color: tokens.colors.textTertiary, marginTop: 2 }}>copy-paste, no runtime</div>
              </Card>
            </div>

            {/* Row 4: Skeleton loading */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Skeleton circle height={36} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Skeleton height={12} width="45%" />
                <Skeleton height={10} width="30%" />
              </div>
              <Skeleton height={28} width={80} rounded="full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK START ─── */}
      <section style={{ animation: 'fadeInUp 600ms 200ms both cubic-bezier(0.22, 1, 0.36, 1)', marginBottom: 64 }}>
        <div className="kaze-steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <SectionHeader>1. Initialize</SectionHeader>
            <CodeBlock code={`npx kazeui-cli init`} />
          </div>
          <div>
            <SectionHeader>2. Add components</SectionHeader>
            <CodeBlock code={`npx kazeui-cli add button dialog`} />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <SectionHeader>3. Use</SectionHeader>
          <CodeBlock code={`import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function App() {
  return (
    <Button
      variant="primary"
      onClick={() => toast({ title: "Deployed!", variant: "success" })}
    >
      Deploy now
    </Button>
  )
}`} />
        </div>
      </section>

      {/* ─── PRINCIPLES ─── */}
      <section style={{ animation: 'fadeInUp 600ms 300ms both cubic-bezier(0.22, 1, 0.36, 1)', marginBottom: 64 }}>
        <h2 style={{
          fontFamily: 'var(--kaze-font-serif)',
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: tokens.colors.text,
          marginBottom: 8,
        }}>
          Built different.
        </h2>
        <p style={{
          fontSize: 15,
          color: tokens.colors.textSecondary,
          lineHeight: 1.6,
          maxWidth: 480,
          marginBottom: 24,
        }}>
          Not another component library you install and fight with.
          Kaze gives you the source — adapt it, extend it, make it yours.
        </p>

        <div className="kaze-principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, borderRadius: 'var(--kaze-radius-lg)', overflow: 'hidden', border: `1px solid ${tokens.colors.border}` }}>
          {[
            { title: 'Own the code', desc: 'No npm dependency. Components live in your repo. Fork, edit, ship.' },
            { title: 'Dark mode', desc: 'One data attribute. Every token flips via CSS variables. Zero JS.' },
            { title: 'Accessible', desc: 'ARIA roles, keyboard nav, focus rings. Screen-reader tested.' },
            { title: 'TypeScript', desc: 'Strict types on every prop. Autocomplete for variants and sizes.' },
            { title: 'Composable', desc: 'No providers, no context. Import what you need, nothing more.' },
            { title: 'Zero runtime', desc: 'Inline styles + CSS vars. No CSS-in-JS library. No build step.' },
          ].map((f, i) => (
            <div key={f.title} style={{
              padding: '22px 24px',
              background: tokens.colors.surface,
              borderRight: (i % 3 < 2) ? `1px solid ${tokens.colors.border}` : 'none',
              borderBottom: i < 3 ? `1px solid ${tokens.colors.border}` : 'none',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em', marginBottom: 6, fontFamily: 'var(--kaze-font-sans)' }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: tokens.colors.textTertiary, lineHeight: 1.55, fontFamily: 'var(--kaze-font-sans)' }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPONENTS ─── */}
      <section style={{ animation: 'fadeInUp 600ms 400ms both cubic-bezier(0.22, 1, 0.36, 1)', marginBottom: 64 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{
            fontFamily: 'var(--kaze-font-serif)',
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: tokens.colors.text,
          }}>
            {allComponents.length} components
          </h2>
          <span style={{ fontSize: 13, color: tokens.colors.textTertiary, fontFamily: 'var(--kaze-font-sans)' }}>
            and growing
          </span>
        </div>
        <div className="kaze-component-pills" style={{
          display: 'flex', flexWrap: 'wrap', gap: 6,
        }}>
          {allComponents.map(({ slug, name }) => (
            <Link key={slug} to="/components/$slug" params={{ slug }} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '7px 14px',
                  border: `1px solid ${tokens.colors.border}`,
                  borderRadius: 'var(--kaze-radius-full)',
                  background: tokens.colors.surface,
                  fontSize: 13,
                  fontWeight: 500,
                  color: tokens.colors.text,
                  fontFamily: 'var(--kaze-font-sans)',
                  letterSpacing: '-0.01em',
                  transition: 'all var(--kaze-transition)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tokens.colors.accent
                  e.currentTarget.style.color = tokens.colors.accentText
                  e.currentTarget.style.borderColor = tokens.colors.accent
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = tokens.colors.surface
                  e.currentTarget.style.color = tokens.colors.text
                  e.currentTarget.style.borderColor = tokens.colors.border
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section style={{
        animation: 'fadeInUp 600ms 500ms both cubic-bezier(0.22, 1, 0.36, 1)',
        borderTop: `1px solid ${tokens.colors.border}`,
        paddingTop: 40,
        textAlign: 'center',
        marginBottom: 24,
      }}>
        <h2 style={{
          fontFamily: 'var(--kaze-font-serif)',
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: tokens.colors.text,
          marginBottom: 8,
        }}>
          Start building.
        </h2>
        <p style={{ fontSize: 14, color: tokens.colors.textTertiary, marginBottom: 24, fontFamily: 'var(--kaze-font-sans)' }}>
          Add your first component in under a minute.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Link to="/components/button" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Icons.arrowRight}>Get started</Button>
          </Link>
          <a href="https://github.com/abderrahimghazali/kaze" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={Icons.github}>GitHub</Button>
          </a>
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--kaze-font-mono)',
      fontSize: 11,
      fontWeight: 500,
      color: tokens.colors.textTertiary,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginBottom: 10,
    }}>
      {children}
    </h3>
  )
}
