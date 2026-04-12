"use client"
import { tokens } from "@/lib/kaze/tokens"

export function Table({ columns, rows, striped = false }: {
  columns: { key: string; label: string; align?: "left" | "center" | "right" }[]
  rows: Record<string, React.ReactNode>[]
  striped?: boolean
}) {
  return (
    <div style={{
      border: `1px solid ${tokens.colors.border}`,
      borderRadius: "var(--kaze-radius-md)",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--kaze-font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${tokens.colors.border}`, background: tokens.colors.surfaceHover }}>
            {columns.map((col) => (
              <th key={col.key} style={{
                textAlign: col.align || "left", padding: "10px 16px",
                fontSize: 12, fontWeight: 600, color: tokens.colors.textSecondary, letterSpacing: "0.02em",
              }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{
              borderBottom: i < rows.length - 1 ? `1px solid ${tokens.colors.border}` : "none",
              background: striped && i % 2 === 1 ? tokens.colors.surfaceHover : tokens.colors.surface,
              transition: "background var(--kaze-transition)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = tokens.colors.surfaceHover }}
              onMouseLeave={(e) => { e.currentTarget.style.background = striped && i % 2 === 1 ? tokens.colors.surfaceHover : tokens.colors.surface }}>
              {columns.map((col) => (
                <td key={col.key} style={{
                  textAlign: col.align || "left", padding: "10px 16px",
                  fontSize: 14, color: tokens.colors.text, letterSpacing: "-0.01em",
                }}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
