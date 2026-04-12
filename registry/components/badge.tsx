"use client"
import { tokens } from "@/lib/kaze/tokens"

export function Badge({ children, variant = "default" }: {
  children: React.ReactNode
  variant?: "default" | "success" | "destructive" | "info" | "warning" | "outline"
}) {
  const v: Record<string, React.CSSProperties> = {
    default: { background: tokens.colors.surfaceActive, color: tokens.colors.text },
    success: { background: tokens.colors.successLight, color: tokens.colors.success },
    destructive: { background: tokens.colors.destructiveLight, color: tokens.colors.destructive },
    info: { background: tokens.colors.infoLight, color: tokens.colors.info },
    warning: { background: tokens.colors.warningLight, color: tokens.colors.warning },
    outline: { background: "transparent", color: tokens.colors.textSecondary, border: `1px solid ${tokens.colors.border}` },
  }
  return (
    <span style={{
      fontFamily: "var(--kaze-font-sans)", fontSize: 12, fontWeight: 500,
      padding: "2px 8px", borderRadius: "var(--kaze-radius-full)",
      display: "inline-flex", alignItems: "center", gap: 4,
      letterSpacing: "0.01em", lineHeight: "20px",
      border: "1px solid transparent", ...v[variant],
    }}>{children}</span>
  )
}
