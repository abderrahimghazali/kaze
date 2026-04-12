"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Check, XCircle, Info, TriangleAlert } from "lucide-react"
import { tokens } from "@/lib/kaze/tokens"
import { Icons } from "@/lib/kaze/icons"

type ToastItem = { id: number; title: string; description?: string; variant?: "default" | "success" | "destructive" | "info" | "warning" }

let toastListeners: ((toasts: ToastItem[]) => void)[] = []
let toastQueue: ToastItem[] = []
let toastId = 0

export function toast(opts: Omit<ToastItem, "id">) {
  const item = { ...opts, id: ++toastId }
  toastQueue = [...toastQueue, item]
  toastListeners.forEach((fn) => fn(toastQueue))
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== item.id)
    toastListeners.forEach((fn) => fn(toastQueue))
  }, 4000)
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    toastListeners.push(setToasts)
    return () => { toastListeners = toastListeners.filter((fn) => fn !== setToasts) }
  }, [])

  if (toasts.length === 0) return null

  const vs: Record<string, { border: string; icon: React.ReactNode }> = {
    default: { border: tokens.colors.border, icon: null },
    success: { border: tokens.colors.success, icon: <Check size={16} /> },
    destructive: { border: tokens.colors.destructive, icon: <XCircle size={16} /> },
    info: { border: tokens.colors.info, icon: <Info size={16} /> },
    warning: { border: tokens.colors.warning, icon: <TriangleAlert size={16} /> },
  }

  return createPortal(
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1100, display: "flex", flexDirection: "column", gap: 8, maxWidth: 380 }}>
      {toasts.map((t) => {
        const v = vs[t.variant || "default"]
        return (
          <div key={t.id} style={{
            background: tokens.colors.surface, border: `1px solid ${v.border}`,
            borderRadius: "var(--kaze-radius-md)", boxShadow: "var(--kaze-shadow-lg)",
            padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10,
            animation: "fadeInUp 250ms cubic-bezier(0.22, 1, 0.36, 1)", minWidth: 280,
          }}>
            {v.icon && <span style={{ display: "flex", flexShrink: 0, marginTop: 1, color: v.border }}>{v.icon}</span>}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.text, fontFamily: "var(--kaze-font-sans)", letterSpacing: "-0.01em" }}>{t.title}</div>
              {t.description && <div style={{ fontSize: 13, color: tokens.colors.textSecondary, marginTop: 2, fontFamily: "var(--kaze-font-sans)", lineHeight: 1.4 }}>{t.description}</div>}
            </div>
            <button onClick={() => { toastQueue = toastQueue.filter((x) => x.id !== t.id); toastListeners.forEach((fn) => fn(toastQueue)) }}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: tokens.colors.textTertiary, display: "flex", padding: 2, flexShrink: 0, transition: "color var(--kaze-transition)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = tokens.colors.text }}
              onMouseLeave={(e) => { e.currentTarget.style.color = tokens.colors.textTertiary }}>{Icons.x}</button>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
