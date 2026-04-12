"use client"
import { tokens } from "@/lib/kaze/tokens"

const buttonGroupCSS = `
.kaze-btn-group > button {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.kaze-btn-group > button:not(:last-child) {
  border-right: 1px solid var(--kaze-border) !important;
}
`

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{buttonGroupCSS}</style>
      <div className="kaze-btn-group" style={{
        display: "inline-flex",
        borderRadius: "var(--kaze-radius-sm)",
        overflow: "hidden",
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: "var(--kaze-shadow-sm)",
      }}>
        {children}
      </div>
    </>
  )
}
