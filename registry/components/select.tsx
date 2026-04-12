"use client"
import { useState, useRef, useEffect } from "react"
import { tokens } from "@/lib/kaze/tokens"
import { Icons } from "@/lib/kaze/icons"

export function Select({ options, defaultValue, placeholder = "Select...", disabled = false, onChange }: {
  options: { value: string; label: string }[]
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue ?? "")
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex", width: "100%" }}>
      <button disabled={disabled} onClick={() => !disabled && setOpen(!open)}
        style={{
          fontFamily: "var(--kaze-font-sans)", fontSize: 14, height: 36, width: "100%", padding: "0 12px",
          borderRadius: "var(--kaze-radius-sm)",
          border: `1px solid ${open ? tokens.colors.borderStrong : tokens.colors.border}`,
          background: tokens.colors.surface, color: selected ? tokens.colors.text : tokens.colors.textTertiary,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer", outline: "none",
          boxShadow: open ? `0 0 0 3px ${tokens.colors.ring}` : "var(--kaze-shadow-sm)",
          transition: "all var(--kaze-transition)", opacity: disabled ? 0.45 : 1,
          letterSpacing: "-0.01em", textAlign: "left",
        }}>
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{ display: "flex", color: tokens.colors.textTertiary, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease" }}>
          {Icons.chevronDown}
        </span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
          borderRadius: "var(--kaze-radius-md)", boxShadow: "var(--kaze-shadow-lg)",
          padding: "4px", zIndex: 50, animation: "scaleIn 120ms cubic-bezier(0.22, 1, 0.36, 1)",
          maxHeight: 220, overflowY: "auto",
        }}>
          {options.map((opt) => {
            const active = opt.value === value
            return (
              <button key={opt.value}
                onClick={() => { setValue(opt.value); onChange?.(opt.value); setOpen(false) }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 10px", border: "none",
                  background: active ? tokens.colors.surfaceHover : "transparent",
                  borderRadius: "var(--kaze-radius-sm)", fontFamily: "var(--kaze-font-sans)", fontSize: 14,
                  color: tokens.colors.text, cursor: "pointer", textAlign: "left",
                  letterSpacing: "-0.01em", outline: "none", transition: "background var(--kaze-transition)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = tokens.colors.surfaceHover }}
                onMouseLeave={(e) => { e.currentTarget.style.background = active ? tokens.colors.surfaceHover : "transparent" }}>
                <span>{opt.label}</span>
                {active && <span style={{ display: "flex", color: tokens.colors.accent }}>{Icons.check}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
