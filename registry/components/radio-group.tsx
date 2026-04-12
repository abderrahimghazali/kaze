"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function RadioGroup({ options, defaultValue, name, disabled = false }: {
  options: { value: string; label: string }[]; defaultValue?: string; name?: string; disabled?: boolean
}) {
  const [selected, setSelected] = useState(defaultValue ?? "")
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map((opt) => {
        const active = selected === opt.value
        return (
          <label key={opt.value} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1 }}>
            <button role="radio" aria-checked={active} disabled={disabled}
              onClick={() => !disabled && setSelected(opt.value)}
              style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${active ? tokens.colors.accent : tokens.colors.borderStrong}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", outline: "none", padding: 0, flexShrink: 0, transition: "all var(--kaze-transition)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: active ? tokens.colors.accent : "transparent", transition: "all var(--kaze-transition)", transform: active ? "scale(1)" : "scale(0)" }} />
            </button>
            <span style={{ fontSize: 14, color: tokens.colors.text, letterSpacing: "-0.01em" }}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}
