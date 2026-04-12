"use client"
import { useState } from "react"
import { tokens } from "@/lib/kaze/tokens"
import { Icons } from "@/lib/kaze/icons"

const SYN = { keyword: "#8B5CF6", string: "#16A34A", tag: "#DC2626", attr: "#D97706", comment: "#A8A29E", func: "#2563EB", punct: "#78716C" }

function highlight(code: string): React.ReactNode[] {
  const rules: [RegExp, string][] = [
    [/(\/\/.*$|\/\*[\s\S]*?\*\/|{\/\*[\s\S]*?\*\/})/gm, SYN.comment],
    [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, SYN.string],
    [/\b(import|export|from|const|let|var|function|return|if|else|default|new|typeof|void|null|undefined|true|false|async|await|class|extends|interface|type)\b/g, SYN.keyword],
    [/(<\/?)([\w.]+)/g, "_tag"],
    [/\b(useState|useEffect|useRef|console)\b/g, SYN.func],
    [/([\w-]+)(=)/g, "_attr"],
  ]
  type Seg = { text: string; color?: string; start: number }
  const segs: Seg[] = []
  for (const [re, color] of rules) {
    let m: RegExpExecArray | null
    const r = new RegExp(re.source, re.flags)
    while ((m = r.exec(code)) !== null) {
      if (color === "_tag") { segs.push({ text: m[1], color: SYN.punct, start: m.index }); segs.push({ text: m[2], color: SYN.tag, start: m.index + m[1].length }) }
      else if (color === "_attr") { segs.push({ text: m[1], color: SYN.attr, start: m.index }); segs.push({ text: m[2], color: SYN.punct, start: m.index + m[1].length }) }
      else segs.push({ text: m[0], color, start: m.index })
    }
  }
  segs.sort((a, b) => a.start - b.start)
  const used: boolean[] = new Array(code.length).fill(false)
  const clean: Seg[] = []
  for (const s of segs) { let skip = false; for (let i = s.start; i < s.start + s.text.length; i++) if (used[i]) { skip = true; break }; if (skip) continue; for (let i = s.start; i < s.start + s.text.length; i++) used[i] = true; clean.push(s) }
  clean.sort((a, b) => a.start - b.start)
  const res: React.ReactNode[] = []; let c = 0
  for (const s of clean) { if (s.start > c) res.push(code.slice(c, s.start)); res.push(<span key={s.start} style={{ color: s.color }}>{s.text}</span>); c = s.start + s.text.length }
  if (c < code.length) res.push(code.slice(c))
  return res
}

export function CodeBlock({ code }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{
      position: "relative", background: tokens.colors.surface,
      border: `1px solid ${tokens.colors.border}`,
      borderRadius: "var(--kaze-radius-md)", overflow: "hidden",
    }}>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
        style={{
          position: "absolute", top: 8, right: 8,
          background: tokens.colors.surfaceHover, border: `1px solid ${tokens.colors.border}`,
          borderRadius: "var(--kaze-radius-sm)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, color: copied ? tokens.colors.success : tokens.colors.textTertiary,
          transition: "all var(--kaze-transition)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.colors.borderStrong }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border }}>
        {copied ? Icons.check : Icons.copy}
      </button>
      <pre style={{ padding: "14px 16px", margin: 0, overflow: "auto", fontFamily: "var(--kaze-font-mono)", fontSize: 13, lineHeight: 1.7, color: tokens.colors.textSecondary }}>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  )
}
