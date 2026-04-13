import { createFileRoute, Link } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import { CodeBlock } from '@/components/ui'
import { registry } from '@/lib/registry'

export const Route = createFileRoute('/components/$slug')({
  component: ComponentPage,
})

function ComponentPage() {
  const { slug } = Route.useParams()
  const entry = registry[slug]

  if (!entry) {
    return (
      <div style={{ animation: 'fadeInUp 400ms both', padding: '40px 0' }}>
        <h1 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 12 }}>
          Component not found
        </h1>
        <p style={{ fontSize: 15, color: tokens.colors.textSecondary, marginBottom: 24 }}>
          There&apos;s no component called &ldquo;{slug}&rdquo;.
        </p>
        <Link to="/" style={{ fontSize: 14, color: tokens.colors.accent, textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to home
        </Link>
      </div>
    )
  }

  // Find adjacent components for prev/next nav
  const slugs = Object.keys(registry)
  const idx = slugs.indexOf(slug)
  const prev = idx > 0 ? slugs[idx - 1] : null
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : null

  return (
    <div style={{ animation: 'fadeInUp 400ms both cubic-bezier(0.22, 1, 0.36, 1)' }}>
      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--kaze-font-serif)',
        fontSize: 32,
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: tokens.colors.text,
        marginBottom: 8,
      }}>
        {entry.name}
      </h1>
      <p style={{
        fontSize: 16,
        color: tokens.colors.textSecondary,
        lineHeight: 1.6,
        letterSpacing: '-0.01em',
        marginBottom: 36,
      }}>
        {entry.description}
      </p>

      {/* Examples */}
      {entry.examples.map((example, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <SectionLabel>{example.title}</SectionLabel>
          <div style={{
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 'var(--kaze-radius-lg)',
            padding: 24,
            background: tokens.colors.surface,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: example.align || 'center',
            flexDirection: example.direction || 'row',
            overflow: example.overflow === false ? 'visible' : 'auto',
          }}>
            {example.content}
          </div>
        </div>
      ))}

      {/* Usage */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel>Usage</SectionLabel>
        <CodeBlock code={entry.code} />
      </div>

      {/* Props Table */}
      {entry.props.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Props</SectionLabel>
          <div style={{
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: 'var(--kaze-radius-md)',
            overflow: 'hidden',
            background: tokens.colors.surface,
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${tokens.colors.border}`, background: tokens.colors.surfaceHover }}>
                  {['Prop', 'Type', 'Default'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '10px 16px',
                      fontFamily: 'var(--kaze-font-sans)', fontSize: 12, fontWeight: 600,
                      color: tokens.colors.textSecondary, letterSpacing: '0.02em',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.props.map((prop, i) => (
                  <tr key={i} style={{ borderBottom: i < entry.props.length - 1 ? `1px solid ${tokens.colors.border}` : 'none' }}>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 13, color: tokens.colors.text, fontWeight: 500 }}>
                      {prop.name}
                    </td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 12, color: tokens.colors.textSecondary }}>
                      {prop.type}
                    </td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 12, color: tokens.colors.textTertiary }}>
                      {prop.default}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prev/Next Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 24,
        borderTop: `1px solid ${tokens.colors.border}`,
      }}>
        {prev ? (
          <Link to="/components/$slug" params={{ slug: prev }} style={{
            textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            <span style={{ fontSize: 12, color: tokens.colors.textTertiary, fontFamily: 'var(--kaze-font-sans)' }}>Previous</span>
            <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500, fontFamily: 'var(--kaze-font-sans)' }}>
              &larr; {registry[prev].name}
            </span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to="/components/$slug" params={{ slug: next }} style={{
            textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right',
          }}>
            <span style={{ fontSize: 12, color: tokens.colors.textTertiary, fontFamily: 'var(--kaze-font-sans)' }}>Next</span>
            <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500, fontFamily: 'var(--kaze-font-sans)' }}>
              {registry[next].name} &rarr;
            </span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--kaze-font-mono)',
      fontSize: 11,
      fontWeight: 500,
      color: tokens.colors.textTertiary,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginBottom: 12,
    }}>
      {children}
    </h3>
  )
}
