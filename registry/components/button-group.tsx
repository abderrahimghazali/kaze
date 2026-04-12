"use client"
import React, { Children } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children)
  return (
    <div style={{
      display: "inline-flex",
      borderRadius: "var(--kaze-radius-sm)",
      overflow: "hidden",
      border: `1px solid ${tokens.colors.border}`,
      boxShadow: "var(--kaze-shadow-sm)",
    }}>
      {items.map((child, i) =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            ...(child.props as { style?: React.CSSProperties }).style,
            border: "none", borderRadius: 0, boxShadow: "none",
            borderRight: i < items.length - 1 ? `1px solid ${tokens.colors.border}` : "none",
          },
        }) : child
      )}
    </div>
  )
}
