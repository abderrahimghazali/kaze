"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"

export function DataTable({ columns, data, pageSize = 5, searchable = true, selectable = false }: {
  columns: { key: string; label: string; align?: "left" | "center" | "right"; sortable?: boolean }[]
  data: Record<string, React.ReactNode>[]
  pageSize?: number
  searchable?: boolean
  selectable?: boolean
}) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const filtered = query
    ? data.filter((row) => columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(query.toLowerCase())))
    : data

  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const av = String(a[sort.key] ?? ""), bv = String(b[sort.key] ?? "")
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    : filtered

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  const toggleSort = (key: string) => {
    if (sort?.key === key) setSort(sort.dir === "asc" ? { key, dir: "desc" } : null)
    else setSort({ key, dir: "asc" })
    setPage(0)
  }

  const allSelected = paged.length > 0 && paged.every((_, i) => selected.has(page * pageSize + i))
  const toggleAll = () => {
    const next = new Set(selected)
    paged.forEach((_, i) => { const idx = page * pageSize + i; if (allSelected) next.delete(idx); else next.add(idx) })
    setSelected(next)
  }
  const toggleRow = (idx: number) => { const next = new Set(selected); if (next.has(idx)) next.delete(idx); else next.add(idx); setSelected(next) }

  const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 12, fontWeight: 600, color: tokens.colors.textSecondary, letterSpacing: "0.02em", whiteSpace: "nowrap" }

  return (
    <div style={{ border: `1px solid ${tokens.colors.border}`, borderRadius: "var(--kaze-radius-md)", overflow: "hidden" }}>
      {(searchable || selectable) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface }}>
          {searchable ? (
            <input placeholder="Search..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(0) }}
              style={{ fontFamily: "var(--kaze-font-sans)", fontSize: 13, height: 32, padding: "0 10px", border: `1px solid ${tokens.colors.border}`, borderRadius: "var(--kaze-radius-sm)", background: tokens.colors.surface, color: tokens.colors.text, outline: "none", width: 220, transition: "border-color var(--kaze-transition)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = tokens.colors.borderStrong }} onBlur={(e) => { e.currentTarget.style.borderColor = tokens.colors.border }} />
          ) : <div />}
          <span style={{ fontSize: 12, color: tokens.colors.textTertiary, fontFamily: "var(--kaze-font-mono)" }}>
            {selected.size > 0 ? `${selected.size} selected · ` : ""}{sorted.length} row{sorted.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--kaze-font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${tokens.colors.border}`, background: tokens.colors.surfaceHover }}>
            {selectable && (
              <th style={{ ...th, width: 40, textAlign: "center", padding: "10px 12px" }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ width: 14, height: 14, cursor: "pointer", accentColor: tokens.colors.accent }} />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} onClick={() => col.sortable !== false && toggleSort(col.key)}
                style={{ ...th, textAlign: col.align || "left", cursor: col.sortable !== false ? "pointer" : "default", userSelect: "none" }}>
                {col.label}{sort?.key === col.key && <span style={{ marginLeft: 4, fontSize: 10 }}>{sort.dir === "asc" ? "▲" : "▼"}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 && (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: "32px 16px", textAlign: "center", fontSize: 14, color: tokens.colors.textTertiary }}>No results found.</td></tr>
          )}
          {paged.map((row, i) => {
            const gi = page * pageSize + i; const sel = selected.has(gi)
            return (
              <tr key={gi} style={{ borderBottom: i < paged.length - 1 ? `1px solid ${tokens.colors.border}` : "none", background: sel ? tokens.colors.surfaceActive : tokens.colors.surface, transition: "background var(--kaze-transition)" }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = tokens.colors.surfaceHover }}
                onMouseLeave={(e) => { e.currentTarget.style.background = sel ? tokens.colors.surfaceActive : tokens.colors.surface }}>
                {selectable && <td style={{ padding: "10px 12px", textAlign: "center" }}><input type="checkbox" checked={sel} onChange={() => toggleRow(gi)} style={{ width: 14, height: 14, cursor: "pointer", accentColor: tokens.colors.accent }} /></td>}
                {columns.map((col) => <td key={col.key} style={{ textAlign: col.align || "left", padding: "10px 16px", fontSize: 14, color: tokens.colors.text, letterSpacing: "-0.01em" }}>{row[col.key]}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface }}>
          <span style={{ fontSize: 12, color: tokens.colors.textTertiary, fontFamily: "var(--kaze-font-mono)" }}>{page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[{ label: "Prev", disabled: page === 0, go: () => setPage(page - 1) }, { label: "Next", disabled: page >= totalPages - 1, go: () => setPage(page + 1) }].map((b) => (
              <button key={b.label} disabled={b.disabled} onClick={b.go}
                style={{ fontFamily: "var(--kaze-font-sans)", fontSize: 13, padding: "4px 10px", border: `1px solid ${tokens.colors.border}`, borderRadius: "var(--kaze-radius-sm)", background: tokens.colors.surface, color: tokens.colors.text, cursor: b.disabled ? "not-allowed" : "pointer", opacity: b.disabled ? 0.4 : 1, transition: "all var(--kaze-transition)", outline: "none" }}
                onMouseEnter={(e) => { if (!b.disabled) e.currentTarget.style.background = tokens.colors.surfaceHover }}
                onMouseLeave={(e) => { e.currentTarget.style.background = tokens.colors.surface }}>{b.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
