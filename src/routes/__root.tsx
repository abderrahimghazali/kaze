import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import { Badge, Toaster } from '@/components/ui'
import { Sidebar } from '@/components/sidebar'

export const Route = createRootRoute({
  component: RootLayout,
})

// ─── Search items ───
const searchItems = [
  { name: 'Introduction', href: '/' },
  { name: 'Theme Switcher', href: '/theme' },
  { name: 'Accordion', href: '/components/accordion' },
  { name: 'Avatar', href: '/components/avatar' },
  { name: 'Badge', href: '/components/badge' },
  { name: 'Button', href: '/components/button' },
  { name: 'Card', href: '/components/card' },
  { name: 'Checkbox', href: '/components/checkbox' },
  { name: 'Code Block', href: '/components/code-block' },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Dropdown', href: '/components/dropdown' },
  { name: 'Input', href: '/components/input' },
  { name: 'Radio Group', href: '/components/radio-group' },
  { name: 'Select', href: '/components/select' },
  { name: 'Separator', href: '/components/separator' },
  { name: 'Skeleton', href: '/components/skeleton' },
  { name: 'Table', href: '/components/table' },
  { name: 'Tabs', href: '/components/tabs' },
  { name: 'Toast', href: '/components/toast' },
  { name: 'Toggle', href: '/components/toggle' },
  { name: 'Hero — Aurora', href: '/blocks/hero' },
  { name: 'CTA — Spotlight', href: '/blocks/cta' },
  { name: '3D Card Effect', href: '/blocks/3d-card' },
  { name: 'Orbiting Icons', href: '/blocks/orbit' },
  { name: 'Bento Grid', href: '/blocks/bento' },
  { name: 'Pricing', href: '/blocks/pricing' },
  { name: 'Feature Grid', href: '/blocks/features' },
  { name: 'Logo Cloud', href: '/blocks/logo-cloud' },
  { name: 'Stats', href: '/blocks/stats' },
  { name: 'Testimonials', href: '/blocks/testimonials' },
  { name: 'Navbar', href: '/blocks/navbar' },
  { name: 'Footer', href: '/blocks/footer' },
  { name: 'Terminal', href: '/blocks/terminal' },
  { name: 'Before / After', href: '/blocks/before-after' },
  { name: 'Magnetic Dock', href: '/blocks/dock' },
  { name: 'Layer Stack', href: '/blocks/layer-stack' },
  { name: 'Component Morph', href: '/blocks/morph' },
  { name: 'Spotlight Cursor', href: '/blocks/spotlight' },
  { name: 'Login', href: '/blocks/login' },
  { name: 'Sign Up', href: '/blocks/signup' },
]

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = query
    ? searchItems.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    : searchItems

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  const go = (href: string) => { navigate({ to: href }); onClose() }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && filtered[active]) { go(filtered[active].href) }
    if (e.key === 'Escape') onClose()
  }

  if (!open) return null

  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: tokens.colors.overlay,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: 120, animation: 'fadeIn 100ms ease',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: tokens.colors.surface,
        borderRadius: 'var(--kaze-radius-lg)',
        boxShadow: 'var(--kaze-shadow-lg)',
        width: '100%', maxWidth: 480,
        border: `1px solid ${tokens.colors.border}`,
        animation: 'scaleIn 150ms cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
      }}>
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `1px solid ${tokens.colors.border}` }}>
          <span style={{ color: tokens.colors.textTertiary, display: 'flex', flexShrink: 0 }}>{Icons.search}</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search components..."
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--kaze-font-sans)', fontSize: 15, color: tokens.colors.text,
              letterSpacing: '-0.01em',
            }}
          />
          <kbd style={{
            fontFamily: 'var(--kaze-font-mono)', fontSize: 11, color: tokens.colors.textTertiary,
            background: tokens.colors.surfaceActive, padding: '2px 6px',
            borderRadius: 'var(--kaze-radius-sm)', border: `1px solid ${tokens.colors.border}`,
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 320, overflowY: 'auto', padding: '6px' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 14, color: tokens.colors.textTertiary }}>
              No results found.
            </div>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              onMouseEnter={() => setActive(i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', border: 'none', cursor: 'pointer',
                borderRadius: 'var(--kaze-radius-sm)',
                background: i === active ? tokens.colors.surfaceHover : 'transparent',
                fontFamily: 'var(--kaze-font-sans)', fontSize: 14,
                color: i === active ? tokens.colors.text : tokens.colors.textSecondary,
                letterSpacing: '-0.01em', textAlign: 'left',
                transition: 'background 80ms ease',
                outline: 'none',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function RootLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark')

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    const favicon = document.getElementById('favicon') as HTMLLinkElement | null
    if (favicon) favicon.href = next ? '/favicon-dark.svg' : '/favicon-light.svg'
  }

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: tokens.colors.bg }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--kaze-header-bg)',
        backdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: `1px solid ${tokens.colors.border}`,
        height: 56,
      }}>
        <div className="kaze-header-inner" style={{
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Mobile menu toggle */}
            <button
              className="kaze-mobile-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, border: 'none', background: 'transparent',
                color: tokens.colors.text, cursor: 'pointer',
                borderRadius: 'var(--kaze-radius-sm)',
              }}
            >
              {menuOpen ? Icons.x : Icons.menu}
            </button>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
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
            <Badge>v0.2.0</Badge>
          </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Search trigger */}
            <button
              className="kaze-search-trigger"
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px 6px 10px', height: 34,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: 'var(--kaze-radius-sm)',
                background: tokens.colors.surface,
                cursor: 'pointer',
                fontFamily: 'var(--kaze-font-sans)', fontSize: 13,
                color: tokens.colors.textTertiary,
                boxShadow: 'var(--kaze-shadow-sm)',
                transition: 'all var(--kaze-transition)',
                letterSpacing: '-0.01em',
                minWidth: 200,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.borderStrong }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border }}
            >
              <span style={{ display: 'flex' }}>{Icons.search}</span>
              <span className="kaze-search-text" style={{ flex: 1, textAlign: 'left' }}>Search...</span>
              <kbd className="kaze-search-kbd" style={{
                fontFamily: 'var(--kaze-font-mono)', fontSize: 11,
                color: tokens.colors.textTertiary, background: tokens.colors.surfaceActive,
                padding: '1px 5px', borderRadius: 4,
                border: `1px solid ${tokens.colors.border}`,
              }}>
                &#8984;K
              </kbd>
            </button>

            {/* Theme toggle */}
            <button
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, border: 'none', background: 'transparent',
                color: tokens.colors.textSecondary, cursor: 'pointer',
                borderRadius: 'var(--kaze-radius-sm)',
                transition: 'all var(--kaze-transition)',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = tokens.colors.text; e.currentTarget.style.background = tokens.colors.surfaceHover }}
              onMouseLeave={(e) => { e.currentTarget.style.color = tokens.colors.textSecondary; e.currentTarget.style.background = 'transparent' }}
            >
              <span
                key={dark ? 'sun' : 'moon'}
                style={{
                  display: 'flex',
                  animation: 'themeIconIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {dark ? Icons.sun : Icons.moon}
              </span>
            </button>

            {/* GitHub icon */}
            <a
              href="https://github.com/abderrahimghazali/kaze"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34,
                color: tokens.colors.textSecondary,
                borderRadius: 'var(--kaze-radius-sm)',
                transition: 'all var(--kaze-transition)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = tokens.colors.text; e.currentTarget.style.background = tokens.colors.surfaceHover }}
              onMouseLeave={(e) => { e.currentTarget.style.color = tokens.colors.textSecondary; e.currentTarget.style.background = 'transparent' }}
            >
              {Icons.github}
            </a>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toaster />

      {/* Mobile sidebar overlay */}
      <div className={`kaze-sidebar-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Body */}
      <div style={{ display: 'flex' }}>
        <Sidebar className={menuOpen ? 'open' : ''} onNavigate={() => setMenuOpen(false)} />
        <main className="kaze-main" style={{ flex: 1, minWidth: 0, padding: '28px 32px' }}>
          <div className="kaze-main-inner" style={{ maxWidth: 860, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
