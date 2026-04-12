"use client"
import { tokens } from "@/lib/kaze/tokens"

export function Skeleton({ width, height = 16, rounded = "md", circle = false }: {
  width?: number | string; height?: number | string
  rounded?: "sm" | "md" | "lg" | "full"; circle?: boolean
}) {
  const r = { sm: "var(--kaze-radius-sm)", md: "var(--kaze-radius-md)", lg: "var(--kaze-radius-lg)", full: "var(--kaze-radius-full)" }
  return (
    <div style={{
      width: circle ? height : (width ?? "100%"), height,
      borderRadius: circle ? "50%" : r[rounded],
      background: `linear-gradient(90deg, ${tokens.colors.surfaceActive} 25%, ${tokens.colors.surfaceHover} 50%, ${tokens.colors.surfaceActive} 75%)`,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s ease-in-out infinite",
    }} />
  )
}
