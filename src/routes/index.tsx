import { createFileRoute, Link } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import { Badge, Button, CodeBlock } from '@/components/ui'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const componentList = [
  { slug: 'button', name: 'Button', desc: 'Five variants, three sizes, icon composable' },
  { slug: 'input', name: 'Input', desc: 'Focus rings, icon slots, optical alignment' },
  { slug: 'badge', name: 'Badge', desc: 'Semantic colors with tinted backgrounds' },
  { slug: 'toggle', name: 'Toggle', desc: 'Switch with smooth thumb transition' },
  { slug: 'accordion', name: 'Accordion', desc: 'Animated expand/collapse with height' },
  { slug: 'card', name: 'Card', desc: 'Surface elevation with hover lift' },
  { slug: 'tabs', name: 'Tabs', desc: 'Underline tabs with active indicator' },
  { slug: 'avatar', name: 'Avatar', desc: 'Initials with deterministic color hash' },
  { slug: 'dialog', name: 'Dialog', desc: 'Modal overlay with scale-in animation' },
  { slug: 'code-block', name: 'Code Block', desc: 'Dark code display with copy button' },
  { slug: 'separator', name: 'Separator', desc: 'Labeled divider for content sections' },
]

function HomePage() {
  return (
    <div style={{ animation: 'fadeInUp 500ms both cubic-bezier(0.22, 1, 0.36, 1)' }}>
      {/* Badges */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Badge variant="info">React + Tailwind</Badge>
        <Badge variant="outline">Open Source</Badge>
      </div>

      {/* Hero */}
      <h1 style={{
        fontFamily: 'var(--kaze-font-serif)',
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: '-0.04em',
        color: tokens.colors.text,
        marginBottom: 16,
      }}>
        Components that feel like{' '}
        <em style={{ fontStyle: 'italic', fontWeight: 300 }}>nothing.</em>
      </h1>
      <p style={{
        fontSize: 16,
        lineHeight: 1.6,
        color: tokens.colors.textSecondary,
        letterSpacing: '-0.01em',
        maxWidth: 480,
        marginBottom: 32,
      }}>
        A minimal, composable design system. Clean defaults, sharp details,
        zero opinions you can&apos;t override.
      </p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 48 }}>
        <Link to="/components/button" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg">Get Started</Button>
        </Link>
        <Button variant="secondary" size="lg" icon={Icons.copy}>npx kazeui init</Button>
      </div>

      {/* Installation */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{
          fontFamily: 'var(--kaze-font-mono)',
          fontSize: 11,
          fontWeight: 500,
          color: tokens.colors.textTertiary,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Installation
        </h2>
        <pre style={{
          fontFamily: 'var(--kaze-font-mono)',
          fontSize: 13,
          lineHeight: 1.7,
          color: tokens.colors.textSecondary,
          background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 'var(--kaze-radius-md)',
          padding: '14px 16px',
          margin: 0,
          overflow: 'auto',
        }}>
{`npx kazeui-cli init
npx kazeui-cli add button card avatar`}
        </pre>
      </div>

      {/* Usage */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontFamily: 'var(--kaze-font-mono)',
          fontSize: 11,
          fontWeight: 500,
          color: tokens.colors.textTertiary,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Usage
        </h2>
        <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button"

<Button variant="primary" icon={<Star />}>
  Star repo
</Button>`} />
      </div>

      {/* Component Grid */}
      <h2 style={{
        fontFamily: 'var(--kaze-font-mono)',
        fontSize: 11,
        fontWeight: 500,
        color: tokens.colors.textTertiary,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Components
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {componentList.map(({ slug, name, desc }) => (
          <Link
            key={slug}
            to="/components/$slug"
            params={{ slug }}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                padding: '16px 18px',
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: 'var(--kaze-radius-md)',
                background: tokens.colors.surface,
                transition: 'all var(--kaze-transition)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tokens.colors.borderStrong
                e.currentTarget.style.boxShadow = 'var(--kaze-shadow-md)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = tokens.colors.border
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: tokens.colors.text,
                fontFamily: 'var(--kaze-font-sans)',
                letterSpacing: '-0.02em',
                marginBottom: 4,
              }}>
                {name}
              </div>
              <div style={{
                fontSize: 13,
                color: tokens.colors.textTertiary,
                fontFamily: 'var(--kaze-font-sans)',
                lineHeight: 1.4,
              }}>
                {desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
