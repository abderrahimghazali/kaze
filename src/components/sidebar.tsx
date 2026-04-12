import { Link, useRouterState } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'

const navSections = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/' },
      { name: 'Theme Switcher', href: '/theme' },
    ],
  },
  {
    title: 'Components',
    items: [
      { name: 'Accordion', href: '/components/accordion' },
      { name: 'Avatar', href: '/components/avatar' },
      { name: 'Badge', href: '/components/badge' },
      { name: 'Button', href: '/components/button' },
      { name: 'Card', href: '/components/card' },
      { name: 'Code Block', href: '/components/code-block' },
      { name: 'Dialog', href: '/components/dialog' },
      { name: 'Input', href: '/components/input' },
      { name: 'Separator', href: '/components/separator' },
      { name: 'Tabs', href: '/components/tabs' },
      { name: 'Toggle', href: '/components/toggle' },
    ],
  },
]

export function Sidebar() {
  const { location } = useRouterState()
  const current = location.pathname

  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      borderRight: `1px solid ${tokens.colors.border}`,
      height: 'calc(100vh - 56px)',
      position: 'sticky',
      top: 56,
      overflowY: 'auto',
      padding: '20px 0',
    }}>
      {navSections.map((section) => (
        <div key={section.title} style={{ padding: '0 12px', marginBottom: 24 }}>
          <div style={{
            fontFamily: 'var(--kaze-font-mono)',
            fontSize: 11,
            fontWeight: 500,
            color: tokens.colors.textTertiary,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0 8px',
            marginBottom: 4,
          }}>
            {section.title}
          </div>
          {section.items.map((item) => {
            const isActive = current === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  display: 'block',
                  padding: '6px 8px',
                  borderRadius: 'var(--kaze-radius-sm)',
                  fontSize: 14,
                  textDecoration: 'none',
                  fontFamily: 'var(--kaze-font-sans)',
                  letterSpacing: '-0.01em',
                  transition: 'all var(--kaze-transition)',
                  color: isActive ? tokens.colors.text : tokens.colors.textSecondary,
                  fontWeight: isActive ? 500 : 400,
                  background: isActive ? tokens.colors.surfaceHover : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = tokens.colors.text
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = tokens.colors.textSecondary
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
