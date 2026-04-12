"use client"
import { tokens } from "@/lib/kaze/tokens"

export function ButtonGroup({ items, size = "md" }: {
  items: { label: string; icon?: React.ReactNode; onClick?: () => void }[]
  size?: "sm" | "md" | "lg"
}) {
  const s = { sm: { fontSize: 13, padding: "6px 12px" }, md: { fontSize: 14, padding: "8px 14px" }, lg: { fontSize: 15, padding: "10px 18px" } }
  return (
    <div style={{ display: "inline-flex", width: "fit-content", borderRadius: "var(--kaze-radius-sm)", border: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface }}>
      {items.map((item, i) => (
        <button key={i} onClick={item.onClick}
          style={{
            fontFamily: "var(--kaze-font-sans)", fontWeight: 500, ...s[size],
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", color: tokens.colors.text,
            border: "none", borderRight: i < items.length - 1 ? `1px solid ${tokens.colors.border}` : undefined,
            cursor: "pointer", letterSpacing: "-0.01em", lineHeight: 1, outline: "none",
            transition: "background var(--kaze-transition)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = tokens.colors.surfaceHover }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}>
          {item.icon && <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  )
}
