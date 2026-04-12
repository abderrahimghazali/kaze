"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Toggle({ defaultChecked = false, size = "md", label }: {
  defaultChecked?: boolean; size?: "sm" | "md"; label?: string
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const s = size === "sm" ? { w: 32, h: 18, thumb: 14, tx: 14 } : { w: 40, h: 22, thumb: 18, tx: 18 }
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <button role="switch" aria-checked={checked} onClick={() => setChecked(!checked)}
        style={{ width: s.w, height: s.h, borderRadius: "var(--kaze-radius-full)", background: checked ? tokens.colors.accent : tokens.colors.borderStrong, border: "none", cursor: "pointer", position: "relative", transition: "background var(--kaze-transition)", outline: "none", padding: 0, flexShrink: 0 }}>
        <span style={{ position: "absolute", top: "50%", left: checked ? s.tx + 2 : 2, transform: "translateY(-50%)", width: s.thumb, height: s.thumb, borderRadius: "50%", background: checked ? tokens.colors.accentText : tokens.colors.surface, boxShadow: "0 1px 3px rgba(0,0,0,0.15)", transition: "left var(--kaze-transition)" }} />
      </button>
      {label && <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: "-0.01em" }}>{label}</span>}
    </label>
  )
}
