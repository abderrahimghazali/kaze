import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'

// ─── BUTTON ───
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  onClick,
  style = {},
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--kaze-font-sans)',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 'var(--kaze-radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'all var(--kaze-transition)',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
    lineHeight: 1,
    outline: 'none',
  }
  const sizes: Record<string, React.CSSProperties> = {
    sm: { fontSize: 13, padding: '6px 12px', height: 32 },
    md: { fontSize: 14, padding: '8px 16px', height: 36 },
    lg: { fontSize: 15, padding: '10px 20px', height: 40 },
  }
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: tokens.colors.accent,
      color: tokens.colors.accentText,
      border: `1px solid ${tokens.colors.accent}`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
    },
    secondary: {
      background: tokens.colors.surface,
      color: tokens.colors.text,
      border: `1px solid ${tokens.colors.border}`,
      boxShadow: 'var(--kaze-shadow-sm)',
    },
    ghost: {
      background: 'transparent',
      color: tokens.colors.textSecondary,
      border: '1px solid transparent',
    },
    destructive: {
      background: tokens.colors.destructive,
      color: '#fff',
      border: `1px solid ${tokens.colors.destructive}`,
      boxShadow: '0 1px 2px rgba(220,38,38,0.2)',
    },
    outline: {
      background: 'transparent',
      color: tokens.colors.text,
      border: `1px solid ${tokens.colors.borderStrong}`,
    },
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        if (disabled) return
        const el = e.currentTarget
        if (variant === 'primary') el.style.background = tokens.colors.accentHover
        if (variant === 'secondary') el.style.background = tokens.colors.surfaceHover
        if (variant === 'ghost') el.style.background = tokens.colors.surfaceHover
        if (variant === 'outline') el.style.background = tokens.colors.surfaceHover
        if (variant !== 'primary' && variant !== 'destructive') el.style.transform = 'translateY(-0.5px)'
      }}
      onMouseLeave={(e) => {
        if (disabled) return
        const el = e.currentTarget
        el.style.background = variants[variant].background as string
        el.style.transform = 'translateY(0)'
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  )
}

// ─── BUTTON GROUP ───
export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex',
      borderRadius: 'var(--kaze-radius-sm)',
      overflow: 'hidden',
      border: `1px solid ${tokens.colors.border}`,
      boxShadow: 'var(--kaze-shadow-sm)',
    }}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={{
              borderRight: i < children.length - 1 ? `1px solid ${tokens.colors.border}` : 'none',
              display: 'flex',
            }}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}

// ─── INPUT ───
export function Input({
  placeholder,
  icon,
  type = 'text',
  disabled = false,
}: {
  placeholder?: string
  icon?: React.ReactNode
  type?: string
  disabled?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: '100%' }}>
      {icon && (
        <span style={{ position: 'absolute', left: 12, color: tokens.colors.textTertiary, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: 'var(--kaze-font-sans)',
          fontSize: 14,
          height: 36,
          width: '100%',
          padding: icon ? '0 12px 0 36px' : '0 12px',
          borderRadius: 'var(--kaze-radius-sm)',
          border: `1px solid ${focused ? tokens.colors.borderStrong : tokens.colors.border}`,
          background: tokens.colors.surface,
          color: tokens.colors.text,
          outline: 'none',
          transition: 'all var(--kaze-transition)',
          boxShadow: focused ? `0 0 0 3px ${tokens.colors.ring}` : 'var(--kaze-shadow-sm)',
          opacity: disabled ? 0.45 : 1,
          letterSpacing: '-0.01em',
        }}
      />
    </div>
  )
}

// ─── BADGE ───
export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'destructive' | 'info' | 'warning' | 'outline'
}) {
  const v: Record<string, React.CSSProperties> = {
    default: { background: tokens.colors.surfaceActive, color: tokens.colors.text },
    success: { background: tokens.colors.successLight, color: tokens.colors.success },
    destructive: { background: tokens.colors.destructiveLight, color: tokens.colors.destructive },
    info: { background: tokens.colors.infoLight, color: tokens.colors.info },
    warning: { background: tokens.colors.warningLight, color: tokens.colors.warning },
    outline: { background: 'transparent', color: tokens.colors.textSecondary, border: `1px solid ${tokens.colors.border}` },
  }
  return (
    <span style={{
      fontFamily: 'var(--kaze-font-sans)', fontSize: 12, fontWeight: 500,
      padding: '2px 8px', borderRadius: 'var(--kaze-radius-full)',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      letterSpacing: '0.01em', lineHeight: '20px',
      border: '1px solid transparent', ...v[variant],
    }}>
      {children}
    </span>
  )
}

// ─── CHECKBOX ───
export function Checkbox({
  defaultChecked = false,
  label,
  disabled = false,
}: {
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1 }}>
      <button
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && setChecked(!checked)}
        style={{
          width: 18, height: 18, borderRadius: 'var(--kaze-radius-sm)',
          border: `1.5px solid ${checked ? tokens.colors.accent : tokens.colors.borderStrong}`,
          background: checked ? tokens.colors.accent : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none', padding: 0, flexShrink: 0,
          transition: 'all var(--kaze-transition)',
        }}
      >
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke={checked ? tokens.colors.accentText : 'transparent'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'all var(--kaze-transition)', transform: checked ? 'scale(1)' : 'scale(0.5)', opacity: checked ? 1 : 0 }}
        >
          <path d="M2.5 6L5 8.5L9.5 3.5" />
        </svg>
      </button>
      {label && <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: '-0.01em' }}>{label}</span>}
    </label>
  )
}

// ─── RADIO ───
export function RadioGroup({
  options,
  defaultValue,
  name,
  disabled = false,
}: {
  options: { value: string; label: string }[]
  defaultValue?: string
  name?: string
  disabled?: boolean
}) {
  const [selected, setSelected] = useState(defaultValue ?? '')
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((opt) => {
        const active = selected === opt.value
        return (
          <label key={opt.value} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1 }}>
            <button
              role="radio"
              aria-checked={active}
              disabled={disabled}
              onClick={() => !disabled && setSelected(opt.value)}
              style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `1.5px solid ${active ? tokens.colors.accent : tokens.colors.borderStrong}`,
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none', padding: 0, flexShrink: 0,
                transition: 'all var(--kaze-transition)',
              }}
            >
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: active ? tokens.colors.accent : 'transparent',
                transition: 'all var(--kaze-transition)',
                transform: active ? 'scale(1)' : 'scale(0)',
              }} />
            </button>
            <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: '-0.01em' }}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}

// ─── TOGGLE ───
export function Toggle({
  defaultChecked = false,
  size = 'md',
  label,
}: {
  defaultChecked?: boolean
  size?: 'sm' | 'md'
  label?: string
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const s = size === 'sm'
    ? { w: 32, h: 18, thumb: 14, tx: 14 }
    : { w: 40, h: 22, thumb: 18, tx: 18 }
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        style={{
          width: s.w, height: s.h, borderRadius: 'var(--kaze-radius-full)',
          background: checked ? tokens.colors.accent : tokens.colors.borderStrong,
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background var(--kaze-transition)', outline: 'none', padding: 0, flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '50%', left: checked ? s.tx + 2 : 2,
          transform: 'translateY(-50%)', width: s.thumb, height: s.thumb,
          borderRadius: '50%', background: checked ? tokens.colors.accentText : tokens.colors.surface,
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left var(--kaze-transition)',
        }} />
      </button>
      {label && <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: '-0.01em' }}>{label}</span>}
    </label>
  )
}

// ─── ACCORDION ───
export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ borderRadius: 'var(--kaze-radius-md)', border: `1px solid ${tokens.colors.border}`, overflow: 'hidden', background: tokens.colors.surface }}>
      {items.map((item, i) => (
        <AccordionItem key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} isLast={i === items.length - 1} />
      ))}
    </div>
  )
}

function AccordionItem({ item, isOpen, onToggle, isLast }: { item: { title: string; content: string }; isOpen: boolean; onToggle: () => void; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => { if (ref.current) setHeight(ref.current.scrollHeight) }, [isOpen])
  return (
    <div style={{ borderBottom: isLast ? 'none' : `1px solid ${tokens.colors.border}` }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--kaze-font-sans)', fontSize: 14, fontWeight: 500,
          color: tokens.colors.text, textAlign: 'left', letterSpacing: '-0.01em',
          transition: 'background var(--kaze-transition)', outline: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = tokens.colors.surfaceHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <span>{item.title}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease', display: 'flex', color: tokens.colors.textTertiary }}>
          {Icons.chevronDown}
        </span>
      </button>
      <div style={{ overflow: 'hidden', height: isOpen ? height : 0, transition: 'height 250ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <div ref={ref} style={{ padding: '0 16px 14px', fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
          {item.content}
        </div>
      </div>
    </div>
  )
}

// ─── CARD ───
export function Card({ children, padding = '20px', hoverable = false }: { children: React.ReactNode; padding?: string; hoverable?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
        borderRadius: 'var(--kaze-radius-lg)', padding,
        boxShadow: hovered ? 'var(--kaze-shadow-md)' : 'var(--kaze-shadow-sm)',
        transition: 'all var(--kaze-transition)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {children}
    </div>
  )
}

// ─── TABS ───
export function Tabs({ items }: { items: { label: string; content: string }[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const el = tabRefs.current[active]
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [active])

  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', gap: 2, borderBottom: `1px solid ${tokens.colors.border}`, marginBottom: 16 }}>
        {items.map((item, i) => (
          <button
            key={i}
            ref={(el) => { tabRefs.current[i] = el }}
            onClick={() => setActive(i)}
            style={{
              fontFamily: 'var(--kaze-font-sans)', fontSize: 13, fontWeight: 500,
              padding: '8px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
              color: active === i ? tokens.colors.text : tokens.colors.textTertiary,
              marginBottom: -1, transition: 'color var(--kaze-transition)',
              letterSpacing: '-0.01em', outline: 'none', position: 'relative',
              borderBottom: '2px solid transparent',
            }}
          >
            {item.label}
          </button>
        ))}
        {/* Sliding indicator */}
        <span style={{
          position: 'absolute',
          bottom: -1,
          left: indicator.left,
          width: indicator.width,
          height: 2,
          background: tokens.colors.accent,
          borderRadius: 1,
          transition: 'left 250ms cubic-bezier(0.22, 1, 0.36, 1), width 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
      <div style={{ fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
        {items[active]?.content}
      </div>
    </div>
  )
}

// ─── AVATAR ───
const AVATAR_COLORS = ['#E11D48', '#7C3AED', '#2563EB', '#059669', '#D97706', '#DC2626']
function getAvatarColor(name: string) { return AVATAR_COLORS[name.length % AVATAR_COLORS.length] }

export function Avatar({
  name,
  size = 36,
  src,
  status,
  ring,
  animate,
  delay = 0,
}: {
  name: string
  size?: number
  src?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  ring?: boolean
  animate?: boolean
  delay?: number
}) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const color = getAvatarColor(name)

  const statusColors: Record<string, { bg: string; pulse?: boolean }> = {
    online: { bg: '#16A34A', pulse: true },
    busy: { bg: '#DC2626' },
    away: { bg: '#D97706' },
    offline: { bg: tokens.colors.borderStrong },
  }

  const statusDot = size >= 28 ? Math.max(8, size * 0.26) : 6
  const statusBorder = Math.max(1.5, size * 0.06)

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
      animation: animate ? `avatarPop 400ms ${delay}ms both cubic-bezier(0.34, 1.56, 0.64, 1)` : undefined,
    }}>
      {/* Ring */}
      {ring && (
        <div style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          opacity: 0.35,
        }} />
      )}

      {/* Avatar circle */}
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: src ? undefined : color,
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 600,
        color: '#fff',
        fontFamily: 'var(--kaze-font-sans)',
        letterSpacing: '0.02em',
        overflow: 'hidden',
        transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease',
      }}>
        {!src && initials}
      </div>

      {/* Status indicator */}
      {status && statusColors[status] && (
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: statusDot,
          height: statusDot,
          borderRadius: '50%',
          background: statusColors[status].bg,
          border: `${statusBorder}px solid ${tokens.colors.bg}`,
          animation: statusColors[status].pulse ? 'statusPulse 2s ease-in-out infinite' : undefined,
        }} />
      )}
    </div>
  )
}

// ─── AVATAR GROUP ───
export function AvatarGroup({
  names,
  items,
  size = 36,
  max = 5,
  animate,
  spread,
}: {
  names?: string[]
  items?: { name: string; src?: string }[]
  size?: number
  max?: number
  animate?: boolean
  spread?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const all = items ?? (names ?? []).map((n) => ({ name: n }))
  const visible = all.slice(0, max)
  const remaining = all.length - max

  const overlap = size * -0.22
  const hoverSpread = spread !== false ? 4 : 0

  return (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {visible.map((person, i) => (
          <div
            key={person.name + i}
            style={{
              marginLeft: i > 0 ? (hovered ? overlap + hoverSpread : overlap) : 0,
              zIndex: visible.length - i,
              transition: 'margin 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 200ms ease',
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              transitionDelay: hovered ? `${i * 30}ms` : '0ms',
            }}
          >
            <div style={{
              border: `2px solid ${tokens.colors.bg}`,
              borderRadius: '50%',
              transition: 'border-color 200ms ease',
              borderColor: hovered ? tokens.colors.surface : tokens.colors.bg,
            }}>
              <Avatar name={person.name} src={person.src} size={size} animate={animate} delay={animate ? i * 60 : 0} />
            </div>
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <div style={{
          marginLeft: hovered ? overlap + hoverSpread : overlap,
          zIndex: 0,
          transition: 'margin 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          <div style={{
            width: size, height: size, borderRadius: '50%',
            background: tokens.colors.surfaceActive,
            border: `2px solid ${tokens.colors.bg}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.32, fontWeight: 600, color: tokens.colors.textSecondary,
            fontFamily: 'var(--kaze-font-sans)',
            animation: animate ? `avatarPop 400ms ${max * 60}ms both cubic-bezier(0.34, 1.56, 0.64, 1)` : undefined,
          }}>
            +{remaining}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── DIALOG ───
export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000, background: tokens.colors.overlay,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 150ms ease', padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: tokens.colors.surface, borderRadius: 'var(--kaze-radius-lg)',
        boxShadow: 'var(--kaze-shadow-lg)', width: '100%', maxWidth: 420,
        animation: 'scaleIn 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        border: `1px solid ${tokens.colors.border}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: `1px solid ${tokens.colors.border}`,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--kaze-font-sans)', letterSpacing: '-0.02em' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: tokens.colors.textTertiary, display: 'flex', padding: 4, borderRadius: 'var(--kaze-radius-sm)', transition: 'all var(--kaze-transition)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = tokens.colors.surfaceHover; e.currentTarget.style.color = tokens.colors.text }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = tokens.colors.textTertiary }}
          >
            {Icons.x}
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}

// ─── SEPARATOR ───
export function Separator({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0 24px' }}>
      <div style={{ flex: 1, height: 1, background: tokens.colors.border }} />
      {label && (
        <span style={{
          fontFamily: 'var(--kaze-font-mono)', fontSize: 11, fontWeight: 500,
          color: tokens.colors.textTertiary, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: tokens.colors.border }} />
    </div>
  )
}

// ─── SYNTAX HIGHLIGHTING ───
const SYN = {
  keyword: '#C678DD',
  string: '#98C379',
  tag: '#E06C75',
  attr: '#D19A66',
  comment: '#5C6370',
  func: '#61AFEF',
  punct: '#ABB2BF',
  text: '#E7E5E4',
}

function highlight(code: string): React.ReactNode[] {
  const rules: [RegExp, string][] = [
    [/(\/\/.*$|\/\*[\s\S]*?\*\/|{\/\*[\s\S]*?\*\/})/gm, SYN.comment],
    [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, SYN.string],
    [/\b(import|export|from|const|let|var|function|return|if|else|default|new|typeof|void|null|undefined|true|false|async|await|class|extends|interface|type)\b/g, SYN.keyword],
    [/(<\/?)([\w.]+)/g, '_tag'],
    [/\b(useState|useEffect|useRef|console)\b/g, SYN.func],
    [/([\w-]+)(=)/g, '_attr'],
  ]

  type Segment = { text: string; color?: string; start: number }
  const segments: Segment[] = []

  for (const [re, color] of rules) {
    let m: RegExpExecArray | null
    const r = new RegExp(re.source, re.flags)
    while ((m = r.exec(code)) !== null) {
      if (color === '_tag') {
        segments.push({ text: m[1], color: SYN.punct, start: m.index })
        segments.push({ text: m[2], color: SYN.tag, start: m.index + m[1].length })
      } else if (color === '_attr') {
        segments.push({ text: m[1], color: SYN.attr, start: m.index })
        segments.push({ text: m[2], color: SYN.punct, start: m.index + m[1].length })
      } else {
        segments.push({ text: m[0], color, start: m.index })
      }
    }
  }

  segments.sort((a, b) => a.start - b.start)

  // Remove overlapping segments — first match wins
  const used: boolean[] = new Array(code.length).fill(false)
  const clean: Segment[] = []
  for (const seg of segments) {
    const end = seg.start + seg.text.length
    let overlap = false
    for (let i = seg.start; i < end; i++) { if (used[i]) { overlap = true; break } }
    if (overlap) continue
    for (let i = seg.start; i < end; i++) used[i] = true
    clean.push(seg)
  }
  clean.sort((a, b) => a.start - b.start)

  const result: React.ReactNode[] = []
  let cursor = 0
  for (const seg of clean) {
    if (seg.start > cursor) result.push(code.slice(cursor, seg.start))
    result.push(<span key={seg.start} style={{ color: seg.color }}>{seg.text}</span>)
    cursor = seg.start + seg.text.length
  }
  if (cursor < code.length) result.push(code.slice(cursor))
  return result
}

// ─── CODE BLOCK ───
export function CodeBlock({ code, language = 'jsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div style={{ background: 'var(--kaze-code-bg)', borderRadius: 'var(--kaze-radius-md)', overflow: 'hidden', border: '1px solid var(--kaze-code-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--kaze-code-border)' }}>
        <span style={{ fontFamily: 'var(--kaze-font-mono)', fontSize: 11, color: 'var(--kaze-code-muted)' }}>{language}</span>
        <button onClick={handleCopy} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: copied ? '#4ADE80' : 'var(--kaze-code-muted)', display: 'flex', alignItems: 'center',
          gap: 4, fontSize: 11, fontFamily: 'var(--kaze-font-mono)', transition: 'color var(--kaze-transition)',
        }}>
          {copied ? Icons.check : Icons.copy}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ padding: '14px 16px', margin: 0, overflow: 'auto', fontFamily: 'var(--kaze-font-mono)', fontSize: 13, lineHeight: 1.6, color: SYN.text }}>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  )
}
