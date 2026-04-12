"use client"
import { tokens } from "@/lib/kaze/tokens"

const AVATAR_COLORS = ["#E11D48", "#7C3AED", "#2563EB", "#059669", "#D97706", "#DC2626"]

export function Avatar({ name, size = 36, src, status, ring, animate, delay = 0 }: {
  name: string; size?: number; src?: string
  status?: "online" | "offline" | "busy" | "away"
  ring?: boolean; animate?: boolean; delay?: number
}) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const color = AVATAR_COLORS[name.length % AVATAR_COLORS.length]
  const statusColors: Record<string, { bg: string; pulse?: boolean }> = {
    online: { bg: "#16A34A", pulse: true }, busy: { bg: "#DC2626" },
    away: { bg: "#D97706" }, offline: { bg: tokens.colors.borderStrong },
  }
  const dot = size >= 28 ? Math.max(8, size * 0.26) : 6
  const border = Math.max(1.5, size * 0.06)

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, animation: animate ? `avatarPop 400ms ${delay}ms both cubic-bezier(0.34, 1.56, 0.64, 1)` : undefined }}>
      {ring && <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: `2px solid ${color}`, opacity: 0.35 }} />}
      <div style={{ width: size, height: size, borderRadius: "50%", background: src ? undefined : color, backgroundImage: src ? `url(${src})` : undefined, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 600, color: "#fff", fontFamily: "var(--kaze-font-sans)", letterSpacing: "0.02em", overflow: "hidden" }}>
        {!src && initials}
      </div>
      {status && statusColors[status] && <span style={{ position: "absolute", bottom: 0, right: 0, width: dot, height: dot, borderRadius: "50%", background: statusColors[status].bg, border: `${border}px solid ${tokens.colors.bg}`, animation: statusColors[status].pulse ? "statusPulse 2s ease-in-out infinite" : undefined }} />}
    </div>
  )
}
