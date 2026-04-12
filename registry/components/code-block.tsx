"use client"
import { useState } from "react"
import { Icons } from "@/lib/kaze/icons"

const SYN = { keyword: "#C678DD", string: "#98C379", tag: "#E06C75", attr: "#D19A66", comment: "#5C6370", func: "#61AFEF", punct: "#ABB2BF", text: "#E7E5E4" }

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

export function CodeBlock({ code, language = "jsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  return (
    <div style={{ background: "var(--kaze-code-bg)", borderRadius: "var(--kaze-radius-md)", overflow: "hidden", border: "1px solid var(--kaze-code-border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid var(--kaze-code-border)" }}>
        <span style={{ fontFamily: "var(--kaze-font-mono)", fontSize: 11, color: "var(--kaze-code-muted)" }}>{language}</span>
        <button onClick={handleCopy} style={{ background: "transparent", border: "none", cursor: "pointer", color: copied ? "#4ADE80" : "var(--kaze-code-muted)", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontFamily: "var(--kaze-font-mono)", transition: "color var(--kaze-transition)" }}>
          {copied ? Icons.check : Icons.copy}{copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ padding: "14px 16px", margin: 0, overflow: "auto", fontFamily: "var(--kaze-font-mono)", fontSize: 13, lineHeight: 1.6, color: SYN.text }}><code>{highlight(code)}</code></pre>
    </div>
  )
}
