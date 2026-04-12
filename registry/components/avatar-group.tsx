"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"
import { Avatar } from "./avatar"

export function AvatarGroup({ names, items, size = 36, max = 5, animate, spread }: {
  names?: string[]; items?: { name: string; src?: string }[]
  size?: number; max?: number; animate?: boolean; spread?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const all = items ?? (names ?? []).map((n) => ({ name: n }))
  const visible = all.slice(0, max)
  const remaining = all.length - max
  const overlap = size * -0.22
  const gap = spread !== false ? 4 : 0

  return (
    <div style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {visible.map((person, i) => (
          <div key={person.name + i} style={{ marginLeft: i > 0 ? (hovered ? overlap + gap : overlap) : 0, zIndex: visible.length - i, transition: "margin 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 200ms ease", transform: hovered ? "translateY(-2px)" : "translateY(0)", transitionDelay: hovered ? `${i * 30}ms` : "0ms" }}>
            <div style={{ border: `2px solid ${tokens.colors.bg}`, borderRadius: "50%", transition: "border-color 200ms ease", borderColor: hovered ? tokens.colors.surface : tokens.colors.bg }}>
              <Avatar name={person.name} src={person.src} size={size} animate={animate} delay={animate ? i * 60 : 0} />
            </div>
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <div style={{ marginLeft: hovered ? overlap + gap : overlap, zIndex: 0, transition: "margin 300ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
          <div style={{ width: size, height: size, borderRadius: "50%", background: tokens.colors.surfaceActive, border: `2px solid ${tokens.colors.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 600, color: tokens.colors.textSecondary, fontFamily: "var(--kaze-font-sans)", animation: animate ? `avatarPop 400ms ${max * 60}ms both cubic-bezier(0.34, 1.56, 0.64, 1)` : undefined }}>
            +{remaining}
          </div>
        </div>
      )}
    </div>
  )
}
