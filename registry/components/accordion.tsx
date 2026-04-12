"use client"
import { useState, useRef, useEffect } from "react"
import { tokens } from "@/lib/kaze/tokens"
import { Icons } from "@/lib/kaze/icons"

export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ borderRadius: "var(--kaze-radius-md)", border: `1px solid ${tokens.colors.border}`, overflow: "hidden", background: tokens.colors.surface }}>
      {items.map((item, i) => (
        <AccordionItem key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} isLast={i === items.length - 1} />
      ))}
    </div>
  )
}

function AccordionItem({ item, isOpen, onToggle, isLast }: { item: { title: string; content: string }; isOpen: boolean; onToggle: () => void; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => { if (ref.current) setHeight(ref.current.scrollHeight) }, [isOpen])
  return (
    <div style={{ borderBottom: isLast ? "none" : `1px solid ${tokens.colors.border}` }}>
      <button onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--kaze-font-sans)", fontSize: 14, fontWeight: 500, color: tokens.colors.text, textAlign: "left", letterSpacing: "-0.01em", transition: "background var(--kaze-transition)", outline: "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = tokens.colors.surfaceHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <span>{item.title}</span>
        <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease", display: "flex", color: tokens.colors.textTertiary }}>{Icons.chevronDown}</span>
      </button>
      <div style={{ overflow: "hidden", height: isOpen ? height : 0, transition: "height 250ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div ref={ref} style={{ padding: "0 16px 14px", fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, letterSpacing: "-0.01em" }}>{item.content}</div>
      </div>
    </div>
  )
}
