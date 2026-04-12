"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function Card({ children, padding = "20px", hoverable = false }: {
  children: React.ReactNode; padding?: string; hoverable?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
        borderRadius: "var(--kaze-radius-lg)", padding,
        boxShadow: hovered ? "var(--kaze-shadow-md)" : "var(--kaze-shadow-sm)",
        transition: "all var(--kaze-transition)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >{children}</div>
  )
}
