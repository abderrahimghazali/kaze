"use client"
import { useState, useRef, useEffect } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Dropdown({ trigger, items, align = "left" }: {
  trigger: React.ReactNode
  items: ({ label: string; icon?: React.ReactNode; onClick?: () => void; destructive?: boolean } | "separator")[]
  align?: "left" | "right"
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "inline-flex" }}>
        {trigger}
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)",
          [align === "right" ? "right" : "left"]: 0,
          minWidth: 180, background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: "var(--kaze-radius-md)",
          boxShadow: "var(--kaze-shadow-lg)",
          padding: "4px", zIndex: 50,
          animation: "scaleIn 120ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          {items.map((item, i) =>
            item === "separator" ? (
              <div key={i} style={{ height: 1, background: tokens.colors.border, margin: "4px 0" }} />
            ) : (
              <button key={i}
                onClick={() => { item.onClick?.(); setOpen(false) }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 10px", border: "none", background: "transparent",
                  borderRadius: "var(--kaze-radius-sm)",
                  fontFamily: "var(--kaze-font-sans)", fontSize: 14,
                  color: item.destructive ? tokens.colors.destructive : tokens.colors.text,
                  cursor: "pointer", textAlign: "left", letterSpacing: "-0.01em",
                  outline: "none", transition: "background var(--kaze-transition)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = item.destructive ? tokens.colors.destructiveLight : tokens.colors.surfaceHover }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}>
                {item.icon && <span style={{ display: "flex", alignItems: "center", color: item.destructive ? tokens.colors.destructive : tokens.colors.textTertiary }}>{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
