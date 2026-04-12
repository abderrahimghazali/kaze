import { createFileRoute } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { CodeBlock } from '@/components/ui'

export const Route = createFileRoute('/theme')({
  component: ThemePage,
})

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

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: 'var(--kaze-font-mono)', fontSize: 13,
      background: tokens.colors.surfaceActive, padding: '1px 5px',
      borderRadius: 'var(--kaze-radius-sm)',
    }}>
      {children}
    </code>
  )
}

function ThemePage() {
  return (
    <div style={{ animation: 'fadeInUp 400ms both cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <h1 style={{
        fontFamily: 'var(--kaze-font-serif)',
        fontSize: 32,
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: tokens.colors.text,
        marginBottom: 8,
      }}>
        Theme Switcher
      </h1>
      <p style={{
        fontSize: 16,
        color: tokens.colors.textSecondary,
        lineHeight: 1.6,
        letterSpacing: '-0.01em',
        marginBottom: 36,
      }}>
        Kaze supports light and dark themes via CSS custom properties. Toggle a single attribute and every component adapts — no prop changes needed.
      </p>

      {/* How it works */}
      <div style={{ marginBottom: 36 }}>
        <SectionLabel>How it works</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: tokens.colors.textSecondary, marginBottom: 16 }}>
          Set <Code>data-theme="dark"</Code> on <Code>&lt;html&gt;</Code> to activate dark mode. Remove it or set <Code>data-theme="light"</Code> for light mode. All <Code>--kaze-*</Code> variables update automatically.
        </p>
        <CodeBlock language="html" code={`<!-- Light (default) -->
<html>

<!-- Dark -->
<html data-theme="dark">`} />
      </div>

      {/* Toggle in JS */}
      <div style={{ marginBottom: 36 }}>
        <SectionLabel>Toggle in React</SectionLabel>
        <CodeBlock language="tsx" code={`const [dark, setDark] = useState(false)

function toggleTheme() {
  const next = !dark
  setDark(next)
  document.documentElement.setAttribute(
    'data-theme',
    next ? 'dark' : 'light'
  )
}`} />
      </div>

      {/* Token reference */}
      <div style={{ marginBottom: 36 }}>
        <SectionLabel>Customizing tokens</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: tokens.colors.textSecondary, marginBottom: 16 }}>
          Override any variable at <Code>:root</Code> or <Code>[data-theme="dark"]</Code> to customize the palette.
        </p>
        <CodeBlock language="css" code={`:root {
  --kaze-accent: #2563EB;       /* swap stone for blue */
  --kaze-bg: #FAFAF9;
  --kaze-surface: #FFFFFF;
  --kaze-border: #E8E6E3;
  --kaze-text: #1C1917;
  --kaze-radius-sm: 6px;
  --kaze-radius-lg: 12px;
}

[data-theme="dark"] {
  --kaze-accent: #3B82F6;
  --kaze-bg: #0C0A09;
  --kaze-surface: #1C1917;
  --kaze-border: #292524;
  --kaze-text: #FAFAF9;
}`} />
      </div>

      {/* Token table */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel>Token reference</SectionLabel>
        <div style={{
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 'var(--kaze-radius-md)',
          overflow: 'hidden',
          background: tokens.colors.surface,
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${tokens.colors.border}`, background: tokens.colors.surfaceHover }}>
                {['Token', 'Light', 'Dark'].map((h) => (
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
              {([
                ['--kaze-bg', '#FAFAF9', '#0C0A09'],
                ['--kaze-surface', '#FFFFFF', '#1C1917'],
                ['--kaze-border', '#E8E6E3', '#292524'],
                ['--kaze-text', '#1C1917', '#FAFAF9'],
                ['--kaze-text-secondary', '#78716C', '#A8A29E'],
                ['--kaze-accent', '#18181B', '#FAFAF9'],
                ['--kaze-accent-text', '#FFFFFF', '#0C0A09'],
                ['--kaze-ring', 'rgba(24,24,27,0.12)', 'rgba(250,250,249,0.12)'],
              ] as const).map(([token, light, dark], i, arr) => (
                <tr key={token} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${tokens.colors.border}` : 'none' }}>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 13, color: tokens.colors.text, fontWeight: 500 }}>
                    {token}
                  </td>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 12, color: tokens.colors.textSecondary }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 14, height: 14, borderRadius: 4, background: light, border: '1px solid #E8E6E3', flexShrink: 0 }} />
                      {light}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--kaze-font-mono)', fontSize: 12, color: tokens.colors.textSecondary }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 14, height: 14, borderRadius: 4, background: dark, border: '1px solid #44403C', flexShrink: 0 }} />
                      {dark}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
