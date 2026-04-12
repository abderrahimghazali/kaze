"use client"
import { tokens } from "@/lib/kaze/tokens"

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      borderRadius: "var(--kaze-radius-sm)",
      overflow: "hidden",
      border: `1px solid ${tokens.colors.border}`,
      boxShadow: "var(--kaze-shadow-sm)",
    }}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={{
              borderRight: i < children.length - 1 ? `1px solid ${tokens.colors.border}` : "none",
              display: "flex",
            }}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
