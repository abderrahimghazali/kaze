"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Checkbox({ defaultChecked = false, label, disabled = false }: {
  defaultChecked?: boolean; label?: string; disabled?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1 }}>
      <button role="checkbox" aria-checked={checked} disabled={disabled}
        onClick={() => !disabled && setChecked(!checked)}
        style={{ width: 18, height: 18, borderRadius: "var(--kaze-radius-sm)", border: `1.5px solid ${checked ? tokens.colors.accent : tokens.colors.borderStrong}`, background: checked ? tokens.colors.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", outline: "none", padding: 0, flexShrink: 0, transition: "all var(--kaze-transition)" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={checked ? tokens.colors.accentText : "transparent"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "all var(--kaze-transition)", transform: checked ? "scale(1)" : "scale(0.5)", opacity: checked ? 1 : 0 }}>
          <path d="M2.5 6L5 8.5L9.5 3.5" />
        </svg>
      </button>
      {label && <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: "-0.01em" }}>{label}</span>}
    </label>
  )
}
