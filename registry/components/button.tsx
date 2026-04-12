"use client"
import { tokens } from "@/lib/kaze/tokens"

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  onClick,
  style = {},
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--kaze-font-sans)", fontWeight: 500,
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    borderRadius: "var(--kaze-radius-sm)", border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1,
    transition: "all var(--kaze-transition)", whiteSpace: "nowrap",
    letterSpacing: "-0.01em", lineHeight: 1, outline: "none",
  }
  const sizes: Record<string, React.CSSProperties> = {
    sm: { fontSize: 13, padding: "6px 12px", height: 32 },
    md: { fontSize: 14, padding: "8px 16px", height: 36 },
    lg: { fontSize: 15, padding: "10px 20px", height: 40 },
  }
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: tokens.colors.accent, color: tokens.colors.accentText, border: `1px solid ${tokens.colors.accent}`, boxShadow: "0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)" },
    secondary: { background: tokens.colors.surface, color: tokens.colors.text, border: `1px solid ${tokens.colors.border}`, boxShadow: "var(--kaze-shadow-sm)" },
    ghost: { background: "transparent", color: tokens.colors.textSecondary, border: "1px solid transparent" },
    destructive: { background: tokens.colors.destructive, color: "#fff", border: `1px solid ${tokens.colors.destructive}`, boxShadow: "0 1px 2px rgba(220,38,38,0.2)" },
    outline: { background: "transparent", color: tokens.colors.text, border: `1px solid ${tokens.colors.borderStrong}` },
  }
  return (
    <button disabled={disabled} onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={(e) => { if (disabled) return; const el = e.currentTarget; if (variant === "primary") el.style.background = tokens.colors.accentHover; if (["secondary","ghost","outline"].includes(variant)) el.style.background = tokens.colors.surfaceHover; if (variant !== "primary" && variant !== "destructive") el.style.transform = "translateY(-0.5px)" }}
      onMouseLeave={(e) => { if (disabled) return; const el = e.currentTarget; el.style.background = variants[variant].background as string; el.style.transform = "translateY(0)" }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </button>
  )
}
