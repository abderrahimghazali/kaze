"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Input({ placeholder, icon, type = "text", disabled = false }: {
  placeholder?: string; icon?: React.ReactNode; type?: string; disabled?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", width: "100%" }}>
      {icon && <span style={{ position: "absolute", left: 12, color: tokens.colors.textTertiary, display: "flex", alignItems: "center", pointerEvents: "none" }}>{icon}</span>}
      <input type={type} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          fontFamily: "var(--kaze-font-sans)", fontSize: 14, height: 36, width: "100%",
          padding: icon ? "0 12px 0 36px" : "0 12px", borderRadius: "var(--kaze-radius-sm)",
          border: `1px solid ${focused ? tokens.colors.borderStrong : tokens.colors.border}`,
          background: tokens.colors.surface, color: tokens.colors.text, outline: "none",
          transition: "all var(--kaze-transition)",
          boxShadow: focused ? `0 0 0 3px ${tokens.colors.ring}` : "var(--kaze-shadow-sm)",
          opacity: disabled ? 0.45 : 1, letterSpacing: "-0.01em",
        }}
      />
    </div>
  )
}
