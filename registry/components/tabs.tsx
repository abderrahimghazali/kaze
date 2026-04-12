"use client"
import { useState, useRef, useEffect } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Tabs({ items }: { items: { label: string; content: string }[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const el = tabRefs.current[active]
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active])

  return (
    <div>
      <div style={{ position: "relative", display: "flex", gap: 2, borderBottom: `1px solid ${tokens.colors.border}`, marginBottom: 16 }}>
        {items.map((item, i) => (
          <button key={i} ref={(el) => { tabRefs.current[i] = el }} onClick={() => setActive(i)}
            style={{ fontFamily: "var(--kaze-font-sans)", fontSize: 13, fontWeight: 500, padding: "8px 14px", background: "transparent", border: "none", cursor: "pointer", color: active === i ? tokens.colors.text : tokens.colors.textTertiary, marginBottom: -1, transition: "color var(--kaze-transition)", letterSpacing: "-0.01em", outline: "none", position: "relative", borderBottom: "2px solid transparent" }}>
            {item.label}
          </button>
        ))}
        <span style={{ position: "absolute", bottom: -1, left: indicator.left, width: indicator.width, height: 2, background: tokens.colors.accent, borderRadius: 1, transition: "left 250ms cubic-bezier(0.22, 1, 0.36, 1), width 250ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </div>
      <div style={{ fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, letterSpacing: "-0.01em" }}>{items[active]?.content}</div>
    </div>
  )
}
