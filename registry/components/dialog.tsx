"use client"
import { createPortal } from "react-dom"
import { tokens } from "@/lib/kaze/tokens"
import { Icons } from "@/lib/kaze/icons"

export function Dialog({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode
}) {
  if (!open) return null
  return createPortal(
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: tokens.colors.overlay, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 150ms ease", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: tokens.colors.surface, borderRadius: "var(--kaze-radius-lg)", boxShadow: "var(--kaze-shadow-lg)", width: "100%", maxWidth: 420, animation: "scaleIn 200ms cubic-bezier(0.22, 1, 0.36, 1)", border: `1px solid ${tokens.colors.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${tokens.colors.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--kaze-font-sans)", letterSpacing: "-0.02em" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: tokens.colors.textTertiary, display: "flex", padding: 4, borderRadius: "var(--kaze-radius-sm)", transition: "all var(--kaze-transition)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = tokens.colors.surfaceHover; e.currentTarget.style.color = tokens.colors.text }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = tokens.colors.textTertiary }}>
            {Icons.x}
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
