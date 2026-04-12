"use client"
import { tokens } from "@/lib/kaze/tokens"

export function Separator({ label }: { label?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0 24px" }}>
      <div style={{ flex: 1, height: 1, background: tokens.colors.border }} />
      {label && <span style={{ fontFamily: "var(--kaze-font-mono)", fontSize: 11, fontWeight: 500, color: tokens.colors.textTertiary, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: tokens.colors.border }} />
    </div>
  )
}
