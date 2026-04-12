import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import { Badge } from '@/components/ui'
import { Sidebar } from '@/components/sidebar'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', background: tokens.colors.bg }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250,250,249,0.85)',
        backdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: `1px solid ${tokens.colors.border}`,
        height: 56,
      }}>
        <div style={{
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ color: tokens.colors.accent, display: 'flex' }}>{Icons.wind}</span>
            <span style={{
              fontFamily: 'var(--kaze-font-serif)',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: tokens.colors.text,
            }}>
              kaze<span style={{ fontWeight: 300 }}>ui</span>
            </span>
            <Badge>v0.1.0</Badge>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              color: tokens.colors.textSecondary,
              textDecoration: 'none',
              fontFamily: 'var(--kaze-font-sans)',
              padding: '6px 12px',
              borderRadius: 'var(--kaze-radius-sm)',
              transition: 'all var(--kaze-transition)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = tokens.colors.text; e.currentTarget.style.background = tokens.colors.surfaceHover }}
            onMouseLeave={(e) => { e.currentTarget.style.color = tokens.colors.textSecondary; e.currentTarget.style.background = 'transparent' }}
          >
            {Icons.github}
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, padding: '40px 48px' }}>
          <div style={{ maxWidth: 720 }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
