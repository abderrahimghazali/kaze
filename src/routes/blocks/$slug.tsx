import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { tokens } from '@/lib/tokens'
import { Icons } from '@/lib/icons'
import { Button, Input, Badge, Avatar, AvatarGroup, Card, Toggle, Checkbox, CodeBlock, Separator } from '@/components/ui'
import { Check } from 'lucide-react'

export const Route = createFileRoute('/blocks/$slug')({
  component: BlockPage,
})

// ─── Block registry ───
const blocks: Record<string, { name: string; description: string; preview: React.ReactNode; code: string }> = {

  hero: {
    name: 'Hero — Aurora',
    description: 'A dramatic hero with animated aurora gradient blobs, floating badge, and typewriter headline.',
    preview: <HeroAurora />,
    code: `"use client"

import { useState, useEffect } from "react"
import { Button, Badge, AvatarGroup } from "@/components/ui"

const words = ["effortlessly", "instantly", "beautifully"]

export function HeroAurora() {
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2500)
    return () => clearInterval(iv)
  }, [])

  return (
    <section style={{
      padding: "80px 40px 64px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Aurora blobs — pure CSS animated gradients */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.2), transparent 70%)",
          top: -100, right: -50,
          animation: "glow-pulse 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,130,255,0.15), transparent 70%)",
          bottom: -80, left: -40,
          animation: "glow-pulse 8s ease-in-out infinite 2s",
        }} />
        <div style={{
          position: "absolute", width: 250, height: 250, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,150,100,0.12), transparent 70%)",
          top: 40, left: "40%",
          animation: "glow-pulse 7s ease-in-out infinite 1s",
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ animation: "float 4s ease-in-out infinite", marginBottom: 24 }}>
          <Badge variant="info">Introducing KazeUI v0.2</Badge>
        </div>

        <h1 style={{
          fontFamily: "var(--kaze-font-serif)", fontSize: 52, fontWeight: 300,
          letterSpacing: "-0.05em", lineHeight: 1.1,
        }}>
          Build beautiful interfaces
        </h1>

        {/* Rotating word */}
        <div style={{ fontSize: 52, fontStyle: "italic", height: 60, marginBottom: 20 }}>
          <span key={wordIdx} style={{ animation: "fadeInUp 400ms ease" }}>
            {words[wordIdx]}
          </span>
        </div>

        <p style={{ fontSize: 17, maxWidth: 440, margin: "0 auto 36px" }}>
          A design system that stays out of your way.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="outline" size="lg">GitHub</Button>
        </div>
      </div>
    </section>
  )
}`,
  },

  navbar: {
    name: 'Navbar',
    description: 'A sticky navigation bar with logo, links, and action buttons.',
    preview: (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', width: '100%',
        borderRadius: 'var(--kaze-radius-lg)',
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: tokens.colors.text, display: 'flex' }}>{Icons.wind}</span>
          <span style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.03em', color: tokens.colors.text }}>
            acme<span style={{ fontWeight: 300 }}>corp</span>
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 4 }}>
          {['Products', 'Pricing', 'Docs', 'Blog'].map((item) => (
            <span key={item} style={{
              fontSize: 14, color: tokens.colors.textSecondary, padding: '6px 12px',
              borderRadius: 'var(--kaze-radius-sm)', cursor: 'pointer',
              fontFamily: 'var(--kaze-font-sans)', transition: 'all var(--kaze-transition)',
            }}>{item}</span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>
      </div>
    ),
    code: `"use client"

import { Button } from "@/components/ui/button"

const links = ["Products", "Pricing", "Docs", "Blog"]

export function Navbar() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 24px", borderRadius: 20,
      background: "var(--kaze-surface)",
      border: "1px solid var(--kaze-border)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--kaze-font-serif)", fontSize: 16, fontWeight: 500 }}>
          acme<span style={{ fontWeight: 300 }}>corp</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 4 }}>
        {links.map(link => (
          <a key={link} href="#" style={{
            fontSize: 14, color: "var(--kaze-text-secondary)",
            padding: "6px 12px", borderRadius: 10, textDecoration: "none",
          }}>
            {link}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Get Started</Button>
      </div>
    </nav>
  )
}`,
  },

  footer: {
    name: 'Footer',
    description: 'A multi-column footer with logo, link groups, and copyright.',
    preview: (
      <div style={{ width: '100%', padding: '40px 32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ color: tokens.colors.text, display: 'flex' }}>{Icons.wind}</span>
              <span style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.03em', color: tokens.colors.text }}>
                kaze<span style={{ fontWeight: 300 }}>ui</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: tokens.colors.textTertiary, lineHeight: 1.6, maxWidth: 240 }}>
              A minimal, composable design system. Clean defaults, sharp details.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Components', 'Blocks', 'Templates', 'Changelog'] },
            { title: 'Resources', links: ['Documentation', 'GitHub', 'Discord', 'Twitter'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 600, color: tokens.colors.text, letterSpacing: '0.02em', marginBottom: 12 }}>{col.title}</div>
              {col.links.map((link) => (
                <div key={link} style={{ fontSize: 13, color: tokens.colors.textSecondary, padding: '4px 0', cursor: 'pointer' }}>{link}</div>
              ))}
            </div>
          ))}
        </div>
        <Separator />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
          <span style={{ fontSize: 12, color: tokens.colors.textTertiary, fontFamily: 'var(--kaze-font-mono)' }}>
            &copy; 2026 KazeUI. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            {[Icons.github].map((icon, i) => (
              <span key={i} style={{ color: tokens.colors.textTertiary, display: 'flex', cursor: 'pointer' }}>{icon}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `"use client"

import { Separator } from "@/components/ui/separator"

const columns = [
  { title: "Product", links: ["Components", "Blocks", "Templates", "Changelog"] },
  { title: "Resources", links: ["Documentation", "GitHub", "Discord", "Twitter"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
]

export function Footer() {
  return (
    <footer style={{ padding: "40px 32px 24px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32,
        marginBottom: 32,
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "var(--kaze-font-serif)", fontSize: 16, fontWeight: 500,
            marginBottom: 12,
          }}>
            kaze<span style={{ fontWeight: 300 }}>ui</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--kaze-text-tertiary)", lineHeight: 1.6, maxWidth: 240 }}>
            A minimal, composable design system. Clean defaults, sharp details.
          </p>
        </div>

        {/* Link columns */}
        {columns.map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              {col.title}
            </div>
            {col.links.map(link => (
              <a key={link} href="#" style={{
                display: "block", fontSize: 13,
                color: "var(--kaze-text-secondary)", padding: "4px 0",
                textDecoration: "none",
              }}>
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <Separator />

      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", paddingTop: 8,
      }}>
        <span style={{
          fontSize: 12, color: "var(--kaze-text-tertiary)",
          fontFamily: "var(--kaze-font-mono)",
        }}>
          &copy; 2026 KazeUI. All rights reserved.
        </span>
      </div>
    </footer>
  )
}`,
  },

  testimonials: {
    name: 'Testimonials',
    description: 'An infinite-scrolling masonry of testimonial cards in two columns moving at different speeds. No pause, no repeat pattern.',
    preview: <TestimonialsBlock />,
    code: `"use client"

import { Avatar, Badge } from "@/components/ui"

// Two columns of testimonials scrolling at different speeds
// Uses CSS marquee animation with duplicated content for seamless loop

const col1 = [
  { name: "Sarah Chen", role: "Frontend Engineer at Vercel", src: "...", quote: "Kaze replaced our entire component library in a weekend. The defaults just work — we barely had to customize anything.", highlight: true },
  { name: "Dan Abramov", role: "Open Source Developer", src: "...", quote: "Finally a design system that gets out of the way. Copy-paste, no npm install, no version conflicts." },
  { name: "Evan You", role: "Creator of Vue.js", src: "...", quote: "The dark mode implementation is brilliant. One attribute and every token adapts. No theme provider needed." },
  { name: "Guillermo Rauch", role: "CEO at Vercel", src: "...", quote: "The inline styles approach is underrated. No CSS-in-JS runtime, no class name conflicts, just works." },
]

const col2 = [
  { name: "Ryan Dahl", role: "Creator of Node & Deno", src: "...", quote: "Zero runtime dependencies. CSS variables for theming. This is how component libraries should be built." },
  { name: "Rich Harris", role: "Creator of Svelte", src: "...", quote: "Copy-paste components that you own. No dependency updates, no breaking changes. Refreshing approach.", highlight: true },
  { name: "Theo Browne", role: "CEO at Ping.gg", src: "...", quote: "The CLI is chef's kiss. npx kazeui add button and it's in your codebase. No config, no setup." },
  { name: "Abderrahim G", role: "Creator of KazeUI", src: "...", quote: "I built Kaze because I was tired of fighting with component libraries. Now I just copy, paste, and ship." },
]

export function Testimonials() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, overflow: "hidden", height: 500 }}>
      {/* Column 1: scrolls up */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, var(--kaze-bg), transparent)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, var(--kaze-bg), transparent)", zIndex: 1 }} />
        <div style={{ animation: "scroll-up 30s linear infinite" }}>
          {[...col1, ...col1].map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
      {/* Column 2: scrolls down (reversed) */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* same fade edges + animation: scroll-down */}
        <div style={{ animation: "scroll-down 35s linear infinite" }}>
          {[...col2, ...col2].map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
    </div>
  )
}

/* Requires in your CSS:
@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scroll-down {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
} */`,
  },

  login: {
    name: 'Login',
    description: 'A centered login form with email, password, social login, and forgot password link.',
    preview: <LoginBlock />,
    code: `"use client"

import { Button, Input, Card, Checkbox, Separator } from "@/components/ui"
import { Github } from "lucide-react"

export function LoginForm() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <Card padding="32px">
        <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <h2 style={{
              fontFamily: "var(--kaze-font-serif)", fontSize: 24,
              fontWeight: 400, letterSpacing: "-0.03em",
            }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 14, color: "var(--kaze-text-tertiary)" }}>
              Sign in to your account
            </p>
          </div>

          <Button variant="outline" icon={<Github size={16} />}
            style={{ width: "100%", justifyContent: "center" }}>
            Continue with GitHub
          </Button>

          <Separator label="or" />

          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Checkbox label="Remember me" />
            <a href="#" style={{ fontSize: 13, color: "var(--kaze-accent)" }}>
              Forgot password?
            </a>
          </div>

          <Button variant="primary"
            style={{ width: "100%", justifyContent: "center" }}>
            Sign in
          </Button>

          <p style={{ fontSize: 13, color: "var(--kaze-text-tertiary)", textAlign: "center" }}>
            Don't have an account?{" "}
            <a href="#" style={{ color: "var(--kaze-accent)", fontWeight: 500 }}>Sign up</a>
          </p>
        </div>
      </Card>
    </div>
  )
}`,
  },

  signup: {
    name: 'Sign Up',
    description: 'A registration form with name, email, password, terms checkbox, and social options.',
    preview: <SignupBlock />,
    code: `"use client"

import { Button, Input, Card, Checkbox, Separator } from "@/components/ui"
import { Github } from "lucide-react"

export function SignUpForm() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <Card padding="32px">
        <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <h2 style={{
              fontFamily: "var(--kaze-font-serif)", fontSize: 24,
              fontWeight: 400, letterSpacing: "-0.03em",
            }}>
              Create an account
            </h2>
            <p style={{ fontSize: 14, color: "var(--kaze-text-tertiary)" }}>
              Get started with KazeUI
            </p>
          </div>

          <Button variant="outline" icon={<Github size={16} />}
            style={{ width: "100%", justifyContent: "center" }}>
            Continue with GitHub
          </Button>

          <Separator label="or" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Checkbox label="I agree to the Terms and Privacy Policy" />

          <Button variant="primary"
            style={{ width: "100%", justifyContent: "center" }}>
            Create account
          </Button>

          <p style={{ fontSize: 13, color: "var(--kaze-text-tertiary)", textAlign: "center" }}>
            Already have an account?{" "}
            <a href="#" style={{ color: "var(--kaze-accent)", fontWeight: 500 }}>Sign in</a>
          </p>
        </div>
      </Card>
    </div>
  )
}`,
  },

  bento: {
    name: 'Bento Grid',
    description: 'An asymmetric card grid with varied heights and content types — the modern SaaS layout.',
    preview: <BentoBlock />,
    code: `"use client"

import { Badge } from "@/components/ui"

export function BentoGrid() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto auto", gap: 12, padding: 24,
    }}>
      {/* Tall feature — spans 2 rows */}
      <div style={{
        gridRow: "span 2", padding: 24,
        borderRadius: 20, border: "1px solid var(--kaze-border)",
        background: "var(--kaze-surface)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🌊</div>
          <h3 style={{ fontFamily: "var(--kaze-font-serif)", fontSize: 22 }}>
            Fluid by nature
          </h3>
          <p style={{ fontSize: 14, color: "var(--kaze-text-secondary)" }}>
            Components adapt to any context. Light, dark, compact, spacious.
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
          <Badge variant="success">Stable</Badge>
          <Badge variant="info">v0.2</Badge>
        </div>
      </div>

      {/* Metric card */}
      <div style={{ padding: 24, borderRadius: 20, border: "1px solid var(--kaze-border)", background: "var(--kaze-surface)" }}>
        <div style={{ fontFamily: "var(--kaze-font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--kaze-text-tertiary)", marginBottom: 8 }}>
          Components
        </div>
        <div style={{ fontFamily: "var(--kaze-font-serif)", fontSize: 48, fontWeight: 300 }}>19</div>
      </div>

      {/* Icon card */}
      <div style={{ padding: 24, borderRadius: 20, border: "1px solid var(--kaze-border)", background: "var(--kaze-surface)", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>⚡</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Zero Runtime</div>
        <div style={{ fontSize: 12, color: "var(--kaze-text-tertiary)" }}>No CSS-in-JS overhead</div>
      </div>

      {/* Wide card — spans 2 columns */}
      <div style={{
        gridColumn: "span 2", padding: 24,
        borderRadius: 20, border: "1px solid var(--kaze-border)",
        background: "var(--kaze-surface)",
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Built for dark mode</h3>
          <p style={{ fontSize: 13, color: "var(--kaze-text-secondary)" }}>
            One attribute toggles every token. No theme provider, no context.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "#FAFAF9", border: "2px solid #E7E5E4" }} />
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "#0D1117", border: "2px solid #1E2736" }} />
        </div>
      </div>
    </div>
  )
}`,
  },

  pricing: {
    name: 'Pricing',
    description: 'Three-tier pricing cards with feature lists, popular highlight, and CTA buttons.',
    preview: <PricingBlock />,
    code: `"use client"

import { Button } from "@/components/ui"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter", price: "$0", desc: "For side projects",
    features: ["5 components", "Light mode", "Community support", "MIT license"],
    popular: false,
  },
  {
    name: "Pro", price: "$49", desc: "For production apps",
    features: ["All components", "Dark mode", "All blocks", "Priority support", "Figma tokens"],
    popular: true,
  },
  {
    name: "Team", price: "$149", desc: "For teams at scale",
    features: ["Everything in Pro", "Unlimited seats", "Custom tokens", "Slack channel", "Design system audit"],
    popular: false,
  },
]

export function Pricing() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16, padding: "48px 24px", alignItems: "start",
    }}>
      {plans.map(plan => (
        <div key={plan.name} style={{
          padding: 32, borderRadius: 20,
          border: plan.popular ? "2px solid var(--kaze-accent)" : "1px solid var(--kaze-border)",
          background: "var(--kaze-surface)",
          boxShadow: plan.popular ? "var(--kaze-shadow-lg)" : "none",
          transform: plan.popular ? "scale(1.03)" : "none",
          position: "relative",
        }}>
          {plan.popular && (
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
              background: "var(--kaze-accent)", color: "var(--kaze-accent-text)",
              fontSize: 11, fontWeight: 600, padding: "4px 14px",
              borderRadius: 9999, textTransform: "uppercase",
            }}>
              Popular
            </div>
          )}
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{plan.name}</h3>
          <p style={{ fontSize: 13, color: "var(--kaze-text-tertiary)", marginBottom: 24 }}>{plan.desc}</p>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--kaze-font-serif)", fontSize: 40, fontWeight: 300 }}>{plan.price}</span>
            <span style={{ fontSize: 14, color: "var(--kaze-text-tertiary)" }}>/mo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {plan.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                <Check size={14} style={{ color: "var(--kaze-success)" }} />
                {f}
              </div>
            ))}
          </div>
          <Button variant={plan.popular ? "primary" : "outline"}
            style={{ width: "100%", justifyContent: "center" }}>
            Get started
          </Button>
        </div>
      ))}
    </div>
  )
}`,
  },

  features: {
    name: 'Feature Grid',
    description: 'A bento-style feature grid where each cell has a live mini illustration — chat bubbles, code editor, theme toggle, component cards — not just icons.',
    preview: <FeatureGridBlock />,
    code: `"use client"

import { Avatar, Badge, Button, Toggle, Card } from "@/components/ui"

// Each feature cell contains a live mini-scene built from real components.
// The grid uses mixed column spans for visual rhythm.

export function FeatureGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: 16 }}>

      {/* Chat — spans 1 col, tall */}
      <div style={{
        padding: 24, borderRadius: 20,
        border: "1px solid var(--kaze-border)",
        background: "var(--kaze-surface)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {/* Mini chat scene */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {/* Incoming */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <Avatar name="Sarah" size={24} src="..." />
            <div style={{
              background: "var(--kaze-surface-hover)", padding: "8px 12px",
              borderRadius: "14px 14px 14px 4px", fontSize: 13, maxWidth: "80%",
            }}>
              Hey! Are you free for a quick call?
            </div>
          </div>
          {/* Outgoing */}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <div style={{
              background: "var(--kaze-accent)", color: "var(--kaze-accent-text)",
              padding: "8px 12px", borderRadius: "14px 14px 4px 14px",
              fontSize: 13, maxWidth: "80%",
            }}>
              Sure, give me 5 minutes!
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>Real time messaging</h3>
          <p style={{ fontSize: 13, color: "var(--kaze-text-tertiary)" }}>
            Send and receive messages in real time.
          </p>
        </div>
      </div>

      {/* Theme toggle — spans 1 col */}
      <div style={{ padding: 24, borderRadius: 20, border: "...", background: "..." }}>
        {/* Mini theme scene with light/dark swatches */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 80, borderRadius: 12, background: "#FAFAF9", border: "..." }} />
          <div style={{ flex: 1, height: 80, borderRadius: 12, background: "#0D1117", border: "..." }} />
        </div>
        <h3>Dark mode built in</h3>
        <p>One attribute toggles every token.</p>
      </div>

      {/* Code editor — spans 1 col, tall */}
      <div style={{ padding: 20, borderRadius: 20, border: "...", background: "..." }}>
        {/* Mini code editor scene */}
        <div style={{ background: "#0D0D0D", borderRadius: 12, padding: 12 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
          </div>
          {/* Colored code lines */}
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </div>
        <h3>Copy-paste components</h3>
        <p>You own every line of code.</p>
      </div>

      {/* Testimonials row — spans 3 cols */}
      <div style={{ gridColumn: "span 3", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {testimonials.map(t => (
          <Card key={t.name} padding="20px">
            <p>"{t.quote}"</p>
            <Avatar name={t.name} size={28} />
            <span>{t.name}</span>
          </Card>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ gridColumn: "span 2", padding: 24, borderRadius: 20, border: "..." }}>
        <h3>Loved by developers</h3>
        <p>Trusted by thousands of developers worldwide.</p>
      </div>
      <div style={{ padding: 24, borderRadius: 20, border: "..." }}>
        <h3>Team collaboration</h3>
        <p>Collaborate with your team in shared workspaces.</p>
      </div>
    </div>
  )
}`,
  },

  'logo-cloud': {
    name: 'Logo Cloud',
    description: 'An infinite-scrolling logo marquee with fade edges — the trust signal section.',
    preview: <LogoCloudBlock />,
    code: `"use client"

const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "GitHub", "Supabase", "Railway"]

export function LogoCloud() {
  return (
    <div style={{ padding: "48px 0", textAlign: "center" }}>
      <p style={{
        fontSize: 13, fontFamily: "var(--kaze-font-mono)",
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: "var(--kaze-text-tertiary)", marginBottom: 24,
      }}>
        Trusted by teams at
      </p>

      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 80,
          background: "linear-gradient(to right, var(--kaze-surface), transparent)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 80,
          background: "linear-gradient(to left, var(--kaze-surface), transparent)",
          zIndex: 1,
        }} />

        {/* Requires @keyframes marquee in your CSS:
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } */}
        <div style={{
          display: "flex",
          animation: "marquee 25s linear infinite",
          width: "max-content",
        }}>
          {[...logos, ...logos, ...logos, ...logos].map((name, i) => (
            <div key={i} style={{
              padding: "0 32px", fontSize: 18, fontWeight: 600,
              color: "var(--kaze-text-tertiary)", opacity: 0.5,
              whiteSpace: "nowrap",
            }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },

  stats: {
    name: 'Stats',
    description: 'Animated counters with labels and decorative elements for social proof.',
    preview: <StatsBlock />,
    code: `"use client"

import { useState, useEffect } from "react"

function AnimCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1400
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [to])
  return <>{count.toLocaleString()}{suffix}</>
}

const stats = [
  { value: 19, suffix: "+", label: "Components", sub: "and growing" },
  { value: 2000, suffix: "+", label: "Developers", sub: "using kaze" },
  { value: 0, suffix: "kb", label: "Bundle Size", sub: "copy-paste" },
  { value: 100, suffix: "%", label: "Accessible", sub: "WAI-ARIA" },
]

export function Stats() {
  return (
    <div style={{ padding: "56px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "var(--kaze-font-serif)", fontSize: 32, fontWeight: 400 }}>
          Numbers speak louder
        </h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 1, borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--kaze-border)",
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            padding: "32px 24px", textAlign: "center",
            background: "var(--kaze-surface)",
            borderRight: i < stats.length - 1 ? "1px solid var(--kaze-border)" : "none",
          }}>
            <div style={{
              fontFamily: "var(--kaze-font-serif)", fontSize: 40,
              fontWeight: 300, lineHeight: 1, marginBottom: 8,
            }}>
              <AnimCounter to={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "var(--kaze-text-tertiary)" }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}`,
  },

  cta: {
    name: 'CTA — Spotlight',
    description: 'A CTA with animated radial spotlight that follows a slow orbit, grain texture, and glowing border.',
    preview: <CTASpotlight />,
    code: `"use client"

export function CTASpotlight() {
  return (
    <div style={{
      padding: "80px 40px", textAlign: "center",
      background: "#0D0D0D", borderRadius: 20,
      position: "relative", overflow: "hidden",
    }}>
      {/* Orbiting spotlight — requires @keyframes orbit in CSS:
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); } */}
      <div style={{
        position: "absolute", width: 300, height: 300,
        borderRadius: "50%", top: "50%", left: "50%",
        marginTop: -150, marginLeft: -150,
        background: "radial-gradient(circle, rgba(88,166,255,0.15), transparent 60%)",
        animation: "orbit 12s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Film grain — noise SVG overlay */}
      <div style={{
        position: "absolute", inset: -100, opacity: 0.03,
        backgroundImage: "url(\\"data:image/svg+xml,...\\")", // fractalNoise SVG
        animation: "grain 8s steps(10) infinite",
        pointerEvents: "none",
      }} />

      {/* Faint ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 500, height: 500, marginTop: -250, marginLeft: -250,
        borderRadius: "50%", border: "1px solid rgba(88,166,255,0.08)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "var(--kaze-font-serif)", fontSize: 40,
          fontWeight: 300, color: "#F5F5F5", marginBottom: 12,
        }}>
          Ready to build something<br />
          <em style={{ fontStyle: "italic" }}>beautiful?</em>
        </h2>
        <p style={{ fontSize: 16, color: "rgba(245,245,245,0.5)", maxWidth: 380, margin: "0 auto 32px" }}>
          Start with our CLI and add components in seconds.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button style={{
            padding: "12px 24px", borderRadius: 10,
            background: "#FAFAF9", color: "#0D0D0D", border: "none",
            cursor: "pointer", fontWeight: 500,
            boxShadow: "0 0 20px rgba(250,250,249,0.1)",
          }}>
            Get started free
          </button>
          <button style={{
            padding: "12px 24px", borderRadius: 10,
            background: "transparent", color: "rgba(245,245,245,0.7)",
            border: "1px solid rgba(245,245,245,0.12)",
            cursor: "pointer", fontWeight: 500,
          }}>
            View on GitHub
          </button>
        </div>
      </div>
    </div>
  )
}`,
  },

  '3d-card': {
    name: '3D Card Effect',
    description: 'A card that tilts toward the mouse with perspective transform. Child elements float at different Z depths on hover.',
    preview: <ThreeDCardBlock />,
    code: `"use client"

import { useState, useRef } from "react"

function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(
      \`perspective(1000px) rotateY(\${x * 20}deg) rotateX(\${-y * 20}deg) scale3d(1.03, 1.03, 1.03)\`
    )
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform("")}
      style={{
        transform,
        transition: transform ? "none" : "transform 600ms ease",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}

// Items inside use translateZ for depth:
function FloatItem({ z, children }) {
  return (
    <div style={{ transform: \`translateZ(\${z}px)\`, transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}

export function Demo() {
  return (
    <Card3D>
      <div style={{ padding: 24, border: "1px solid #E7E5E4", borderRadius: 20 }}>
        <FloatItem z={50}>
          <h3>Make things float in air</h3>
        </FloatItem>
        <FloatItem z={60}>
          <p>Hover over this card to unleash the power of CSS perspective</p>
        </FloatItem>
        <FloatItem z={100}>
          <img src="..." style={{ borderRadius: 12, width: "100%" }} />
        </FloatItem>
        <FloatItem z={20}>
          <button>Try now →</button>
          <button>Sign up</button>
        </FloatItem>
      </div>
    </Card3D>
  )
}`,
  },

  'orbit': {
    name: 'Orbiting Icons',
    description: 'Icons that orbit around a central element with staggered timing — perfect for tech stack or integration showcases.',
    preview: <OrbitBlock />,
    code: `"use client"

import { useState, useEffect } from "react"

// 3 orbital planes tilted at different angles — like atomic electron shells
const orbits = [
  { tiltX: 70, tiltZ: 0, radius: 130, icons: [
    { src: "/logos/react.png", label: "React", startAngle: 0, speed: 0.012 },
    { src: "/logos/vercel.png", label: "Vercel", startAngle: 180, speed: 0.012 },
  ]},
  { tiltX: 70, tiltZ: 60, radius: 130, icons: [
    { src: "/logos/tailwind.png", label: "Tailwind", startAngle: 90, speed: 0.01 },
    { src: "/logos/github.png", label: "GitHub", startAngle: 270, speed: 0.01 },
  ]},
  { tiltX: 70, tiltZ: -60, radius: 130, icons: [
    { src: "/logos/typescript.png", label: "TypeScript", startAngle: 45, speed: 0.014 },
    { src: "/logos/figma.png", label: "Figma", startAngle: 225, speed: 0.014 },
    { src: "/logos/vite.png", label: "Vite", startAngle: 135, speed: 0.014 },
  ]},
]

export function OrbitingIcons() {
  const [positions, setPositions] = useState([])
  const size = 380
  const cx = size / 2
  const cy = size / 2

  useEffect(() => {
    let frame
    let t = 0
    const animate = () => {
      t += 1
      const allPos = []
      for (const orbit of orbits) {
        const tiltXRad = (orbit.tiltX * Math.PI) / 180
        const tiltZRad = (orbit.tiltZ * Math.PI) / 180
        for (const icon of orbit.icons) {
          const angle = ((icon.startAngle * Math.PI) / 180) + t * icon.speed
          // Position on flat circle
          const px = Math.cos(angle) * orbit.radius
          const py = Math.sin(angle) * orbit.radius
          // Tilt the orbital plane in 3D (rotateX then rotateZ)
          const y1 = py * Math.cos(tiltXRad)
          const z1 = py * Math.sin(tiltXRad)
          const x2 = px * Math.cos(tiltZRad) - y1 * Math.sin(tiltZRad)
          const y2 = px * Math.sin(tiltZRad) + y1 * Math.cos(tiltZRad)
          allPos.push({ x: x2, y: y2, z: z1, src: icon.src, label: icon.label })
        }
      }
      setPositions(allPos)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Sort by z for correct front/back overlap
  const sorted = [...positions].sort((a, b) => a.z - b.z)

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Center logo */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 56, height: 56, borderRadius: 16,
        background: "var(--kaze-surface)",
        border: "1px solid var(--kaze-border)",
        boxShadow: "var(--kaze-shadow-lg)", zIndex: 20,
      }}>
        {/* Your logo */}
      </div>

      {/* Orbiting icons with 3D depth */}
      {sorted.map(pos => {
        const depth = (pos.z + 130) / 260 // 0=far, 1=near
        const scale = 0.6 + depth * 0.5
        const opacity = 0.3 + depth * 0.7
        return (
          <div key={pos.label} style={{
            position: "absolute",
            left: cx + pos.x - 22,
            top: cy + pos.y - 22,
            width: 44, height: 44, borderRadius: 14,
            background: "var(--kaze-surface)",
            border: "1px solid var(--kaze-border)",
            boxShadow: "var(--kaze-shadow-md)",
            transform: \`scale(\${scale})\`,
            opacity, zIndex: Math.round(depth * 30),
          }} title={pos.label}>
            <img src={pos.src} alt={pos.label}
              style={{ width: 22, height: 22, objectFit: "contain" }} />
          </div>
        )
      })}
    </div>
  )
}`,
  },

  terminal: {
    name: 'Terminal Playground',
    description: 'A fake terminal that types commands live with a blinking cursor and animated output lines. Click Run to replay.',
    preview: <TerminalBlock />,
    code: `"use client"

import { useState, useEffect } from "react"

const steps = [
  { type: "cmd", text: "npx kazeui-cli init" },
  { type: "out", text: "✓ Created kaze.json" },
  { type: "out", text: "✓ Added tokens.ts + icons.tsx" },
  { type: "out", text: "✓ Appended CSS variables to globals.css" },
  { type: "cmd", text: "npx kazeui-cli add button dialog toast" },
  { type: "out", text: "✓ Button → src/components/ui/button.tsx" },
  { type: "out", text: "✓ Dialog → src/components/ui/dialog.tsx" },
  { type: "out", text: "✓ Toast → src/components/ui/toast.tsx" },
  { type: "out", text: "" },
  { type: "out", text: "Done! 3 components added." },
]

export function Terminal() {
  const [visible, setVisible] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running || visible >= steps.length) return
    const delay = steps[visible]?.type === "cmd" ? 800 : 300
    const t = setTimeout(() => setVisible(v => v + 1), delay)
    return () => clearTimeout(t)
  }, [visible, running])

  const replay = () => { setVisible(0); setRunning(true) }

  return (
    <div style={{
      background: "#0D0D0D", borderRadius: 16, overflow: "hidden",
      fontFamily: "var(--kaze-font-mono)", fontSize: 13,
    }}>
      <div style={{
        padding: "10px 16px", borderBottom: "1px solid #1E1E1E",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
        </div>
        <span style={{ color: "#555", fontSize: 11 }}>terminal</span>
        <button onClick={replay} style={{
          background: "#222", border: "none", color: "#888",
          padding: "2px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11,
        }}>
          Replay
        </button>
      </div>
      <div style={{ padding: 16, minHeight: 260 }}>
        {steps.slice(0, visible).map((s, i) => (
          <div key={i} style={{
            color: s.type === "cmd" ? "#22C55E" : "#888",
            marginBottom: 4, lineHeight: 1.6,
          }}>
            {s.type === "cmd" ? "$ " : "  "}{s.text}
          </div>
        ))}
        {visible < steps.length && (
          <span style={{
            display: "inline-block", width: 8, height: 16,
            background: "#22C55E", animation: "blink 1s step-end infinite",
          }} />
        )}
      </div>
    </div>
  )
}`,
  },

  'before-after': {
    name: 'Before / After Slider',
    description: 'A draggable divider that reveals unstyled HTML on the left and kaze-styled UI on the right. Drag the handle to compare.',
    preview: <BeforeAfterBlock />,
    code: `"use client"

import { useState, useRef } from "react"

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50) // percent

  const handleMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1 || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div ref={ref} onMouseMove={handleMove}
      style={{ position: "relative", overflow: "hidden", height: 300, cursor: "ew-resize", userSelect: "none" }}>
      {/* Left: unstyled */}
      <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        {/* raw HTML content */}
      </div>

      {/* Right: styled — clipped by pos */}
      <div style={{
        position: "absolute", inset: 0,
        clipPath: \`inset(0 0 0 \${pos}%)\`,
        background: "var(--kaze-surface)",
      }}>
        {/* kaze-styled content */}
      </div>

      {/* Drag handle */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: \`\${pos}%\`, width: 3,
        background: "var(--kaze-accent)", transform: "translateX(-50%)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 36, height: 36, borderRadius: "50%",
          background: "var(--kaze-accent)", color: "var(--kaze-accent-text)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 600, boxShadow: "var(--kaze-shadow-lg)",
        }}>
          ⇔
        </div>
      </div>
    </div>
  )
}`,
  },

  dock: {
    name: 'Magnetic Dock',
    description: 'macOS-style dock where icons magnify based on mouse proximity. Smooth spring-like scaling with distance falloff.',
    preview: <DockBlock />,
    code: `"use client"

import { useState, useRef } from "react"

const icons = ["⚛️", "📦", "🎨", "⚡", "🔷", "🌙", "♿", "🔌", "🚀"]

export function MagneticDock() {
  const [mouse, setMouse] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMouse(e.clientX - rect.left)
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setMouse(null)}
      style={{ display: "flex", gap: 4, padding: "16px 20px", borderRadius: 20, background: "rgba(0,0,0,0.05)", justifyContent: "center", alignItems: "flex-end" }}>
      {icons.map((icon, i) => {
        const center = i * 56 + 28
        const dist = mouse !== null ? Math.abs(mouse - center) : 999
        const scale = Math.max(1, 1.6 - dist / 150) // closer = bigger
        return (
          <div key={i} style={{
            width: 44, height: 44, borderRadius: 12,
            background: "var(--kaze-surface)", border: "1px solid var(--kaze-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "var(--kaze-shadow-md)",
            transform: \`scale(\${scale}) translateY(\${(scale - 1) * -16}px)\`,
            transition: mouse !== null ? "transform 150ms ease" : "transform 400ms ease",
          }}>
            {icon}
          </div>
        )
      })}
    </div>
  )
}`,
  },

  'layer-stack': {
    name: 'Layer Stack',
    description: 'An exploded 3D view of a UI. Hover to pull apart layers (background, card, content, overlay) floating in perspective space.',
    preview: <LayerStackBlock />,
    code: `"use client"

import { useState } from "react"

const layers = [
  { label: "Background", color: "#FAFAF9", z: 0 },
  { label: "Card", color: "#FFFFFF", z: 40 },
  { label: "Content", color: "#F5F5F4", z: 80 },
  { label: "Overlay", color: "rgba(0,0,0,0.04)", z: 120 },
]

export function LayerStack() {
  const [exploded, setExploded] = useState(false)

  return (
    <div
      onMouseEnter={() => setExploded(true)}
      onMouseLeave={() => setExploded(false)}
      style={{
        perspective: 800, display: "flex", justifyContent: "center",
        alignItems: "center", padding: "60px 0", cursor: "default",
      }}
    >
      <div style={{
        position: "relative", width: 260, height: 180,
        transformStyle: "preserve-3d",
        transform: "rotateY(-20deg) rotateX(10deg)",
      }}>
        {layers.map((layer, i) => (
          <div key={layer.label} style={{
            position: "absolute", inset: 0, borderRadius: 16,
            background: layer.color,
            border: "1px solid var(--kaze-border)",
            transform: \`translateZ(\${exploded ? layer.z : i * 2}px)\`,
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontFamily: "var(--kaze-font-mono)",
            color: "var(--kaze-text-tertiary)",
          }}>
            {layer.label}
          </div>
        ))}
      </div>
    </div>
  )
}`,
  },

  morph: {
    name: 'Component Morph',
    description: 'One element that smoothly morphs between Button, Input, Badge, and Card states. Shows the token system in action.',
    preview: <MorphBlock />,
    code: `"use client"

import { useState, useEffect } from "react"

const states = [
  { label: "Button", width: 140, height: 40, radius: 10, bg: "var(--kaze-accent)", color: "var(--kaze-accent-text)", text: "Click me", fontSize: 14, fontWeight: 500 },
  { label: "Input", width: 260, height: 40, radius: 10, bg: "var(--kaze-surface)", color: "var(--kaze-text-tertiary)", text: "Type something...", fontSize: 14, fontWeight: 400, border: true },
  { label: "Badge", width: 80, height: 28, radius: 9999, bg: "var(--kaze-surface-active)", color: "var(--kaze-text)", text: "New", fontSize: 12, fontWeight: 500 },
  { label: "Card", width: 280, height: 120, radius: 20, bg: "var(--kaze-surface)", color: "var(--kaze-text-secondary)", text: "Card content here", fontSize: 13, fontWeight: 400, border: true },
]

export function ComponentMorph() {
  const [idx, setIdx] = useState(0)
  const s = states[idx]

  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % states.length), 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ textAlign: "center", padding: "48px 20px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: s.width, height: s.height, borderRadius: s.radius,
        background: s.bg, color: s.color,
        fontSize: s.fontSize, fontWeight: s.fontWeight,
        border: s.border ? "1px solid var(--kaze-border)" : "none",
        transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {s.text}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: "var(--kaze-text-tertiary)" }}>
        {s.label}
      </div>
    </div>
  )
}`,
  },

  spotlight: {
    name: 'Spotlight Cursor',
    description: 'A dark section where the only light is your cursor. Move to reveal hidden content underneath like a flashlight.',
    preview: <SpotlightBlock />,
    code: `"use client"

import { useState, useRef } from "react"

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div ref={ref} onMouseMove={handleMove}
      style={{ position: "relative", height: 300, overflow: "hidden", borderRadius: 20, cursor: "none" }}>
      {/* Hidden content */}
      <div style={{ position: "absolute", inset: 0, padding: 40 }}>
        <h2>Hidden content revealed by your cursor</h2>
        <p>Move your mouse to explore</p>
        {/* ...more content */}
      </div>

      {/* Dark mask with radial cutout */}
      <div style={{
        position: "absolute", inset: 0,
        background: \`radial-gradient(circle 100px at \${pos.x}% \${pos.y}%, transparent 0%, rgba(0,0,0,0.95) 100%)\`,
        pointerEvents: "none",
      }} />
    </div>
  )
}`,
  },
}

// ─── Advanced block components ───

function BentoBlock() {
  const cell = (content: React.ReactNode, style?: React.CSSProperties): React.CSSProperties & { children?: React.ReactNode } => ({
    padding: 24, borderRadius: 'var(--kaze-radius-lg)',
    border: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface,
    transition: 'all var(--kaze-transition)', ...style,
  })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto auto', gap: 12, padding: 24, width: '100%' }}>
      {/* Large feature */}
      <div style={{ ...cell(null, { gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }) }}>
        <div>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🌊</div>
          <h3 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 22, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 8 }}>
            Fluid by nature
          </h3>
          <p style={{ fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6 }}>
            Components adapt to any context. Light, dark, compact, spacious — they just work.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
          <Badge variant="success">Stable</Badge>
          <Badge variant="info">v0.2</Badge>
        </div>
      </div>

      {/* Metric */}
      <div style={cell(null)}>
        <div style={{ fontFamily: 'var(--kaze-font-mono)', fontSize: 10, color: tokens.colors.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Components</div>
        <div style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 48, fontWeight: 300, letterSpacing: '-0.04em', color: tokens.colors.text, lineHeight: 1 }}>19</div>
      </div>

      {/* Icon card */}
      <div style={cell(null, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' })}>
        <div style={{ width: 48, height: 48, borderRadius: 'var(--kaze-radius-md)', background: tokens.colors.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 24 }}>⚡</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em' }}>Zero Runtime</div>
        <div style={{ fontSize: 12, color: tokens.colors.textTertiary, marginTop: 4 }}>No CSS-in-JS overhead</div>
      </div>

      {/* Wide card */}
      <div style={cell(null, { gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 20 })}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em', marginBottom: 6 }}>Built for dark mode</h3>
          <p style={{ fontSize: 13, color: tokens.colors.textSecondary, lineHeight: 1.6 }}>
            One attribute toggles every token. No theme provider, no context, no re-renders. Pure CSS.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--kaze-radius-md)', background: '#FAFAF9', border: '2px solid #E7E5E4' }} />
          <div style={{ width: 40, height: 40, borderRadius: 'var(--kaze-radius-md)', background: '#0D1117', border: '2px solid #1E2736' }} />
        </div>
      </div>
    </div>
  )
}

function PricingBlock() {
  const plans = [
    { name: 'Starter', price: '$0', desc: 'For side projects', features: ['5 components', 'Light mode', 'Community support', 'MIT license'], popular: false },
    { name: 'Pro', price: '$49', desc: 'For production apps', features: ['All components', 'Dark mode', 'All blocks', 'Priority support', 'Figma tokens'], popular: true },
    { name: 'Team', price: '$149', desc: 'For teams at scale', features: ['Everything in Pro', 'Unlimited seats', 'Custom tokens', 'Slack channel', 'Design system audit'], popular: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: '48px 24px', width: '100%', alignItems: 'start' }}>
      {plans.map((plan) => (
        <div key={plan.name} style={{
          padding: 32, borderRadius: 'var(--kaze-radius-lg)',
          border: plan.popular ? `2px solid ${tokens.colors.accent}` : `1px solid ${tokens.colors.border}`,
          background: tokens.colors.surface,
          boxShadow: plan.popular ? 'var(--kaze-shadow-lg)' : 'none',
          position: 'relative',
          transform: plan.popular ? 'scale(1.03)' : 'none',
        }}>
          {plan.popular && (
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: tokens.colors.accent, color: tokens.colors.accentText,
              fontSize: 11, fontWeight: 600, padding: '4px 14px',
              borderRadius: 'var(--kaze-radius-full)',
              fontFamily: 'var(--kaze-font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Popular</div>
          )}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em', marginBottom: 4 }}>{plan.name}</h3>
            <p style={{ fontSize: 13, color: tokens.colors.textTertiary }}>{plan.desc}</p>
          </div>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 40, fontWeight: 300, letterSpacing: '-0.04em', color: tokens.colors.text }}>{plan.price}</span>
            <span style={{ fontSize: 14, color: tokens.colors.textTertiary }}>/mo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {plan.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: tokens.colors.textSecondary }}>
                <Check size={14} style={{ color: tokens.colors.success, flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>
          <Button variant={plan.popular ? 'primary' : 'outline'} style={{ width: '100%', justifyContent: 'center' }}>
            Get started
          </Button>
        </div>
      ))}
    </div>
  )
}

function LogoCloudBlock() {
  const logos = [
    { name: 'Vercel', src: '/logos/vercel.png' },
    { name: 'Stripe', src: '/logos/stripe.png' },
    { name: 'Linear', src: '/logos/linear.png' },
    { name: 'Notion', src: '/logos/notion.png' },
    { name: 'Figma', src: '/logos/figma.png' },
    { name: 'GitHub', src: '/logos/github.png' },
    { name: 'Supabase', src: '/logos/supabase.png' },
    { name: 'Railway', src: '/logos/railway.png' },
  ]
  return (
    <div style={{ padding: '48px 0', width: '100%', textAlign: 'center' }}>
      <p style={{ fontSize: 13, color: tokens.colors.textTertiary, marginBottom: 24, fontFamily: 'var(--kaze-font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Trusted by teams at
      </p>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${tokens.colors.surface}, transparent)`, zIndex: 1 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${tokens.colors.surface}, transparent)`, zIndex: 1 }} />
        <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ padding: '0 28px', display: 'flex', alignItems: 'center', gap: 10, opacity: 0.6 }}>
              <img src={logo.src} alt={logo.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--kaze-font-sans)', fontSize: 16, fontWeight: 600, color: tokens.colors.textTertiary, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnimCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1400
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [to])
  return <>{count.toLocaleString()}{suffix}</>
}

function StatsBlock() {
  const stats = [
    { value: 19, suffix: '+', label: 'Components', sub: 'and growing' },
    { value: 2000, suffix: '+', label: 'Developers', sub: 'using kaze' },
    { value: 0, suffix: 'kb', label: 'Bundle Size', sub: 'copy-paste' },
    { value: 100, suffix: '%', label: 'Accessible', sub: 'WAI-ARIA' },
  ]
  return (
    <div style={{ padding: '56px 32px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.035em', color: tokens.colors.text, marginBottom: 8 }}>
          Numbers speak louder
        </h2>
        <p style={{ fontSize: 15, color: tokens.colors.textSecondary }}>Built for performance, designed for developers.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 1, borderRadius: 'var(--kaze-radius-lg)', overflow: 'hidden', border: `1px solid ${tokens.colors.border}` }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            padding: '32px 24px', textAlign: 'center', background: tokens.colors.surface,
            borderRight: i < stats.length - 1 ? `1px solid ${tokens.colors.border}` : 'none',
          }}>
            <div style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 40, fontWeight: 300, letterSpacing: '-0.04em', color: tokens.colors.text, lineHeight: 1, marginBottom: 8 }}>
              <AnimCounter to={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.01em', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: tokens.colors.textTertiary }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Interactive blocks ───
function LoginBlock() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px', width: '100%' }}>
      <Card padding="32px">
        <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 4 }}>
            <h2 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 4 }}>Welcome back</h2>
            <p style={{ fontSize: 14, color: tokens.colors.textTertiary }}>Sign in to your account</p>
          </div>
          <Button variant="outline" icon={Icons.github} style={{ width: '100%', justifyContent: 'center' }}>Continue with GitHub</Button>
          <Separator label="or" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Checkbox label="Remember me" />
            <span style={{ fontSize: 13, color: tokens.colors.accent, cursor: 'pointer', fontFamily: 'var(--kaze-font-sans)' }}>Forgot password?</span>
          </div>
          <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Sign in</Button>
          <p style={{ fontSize: 13, color: tokens.colors.textTertiary, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span style={{ color: tokens.colors.accent, cursor: 'pointer', fontWeight: 500 }}>Sign up</span>
          </p>
        </div>
      </Card>
    </div>
  )
}

function SignupBlock() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px', width: '100%' }}>
      <Card padding="32px">
        <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 4 }}>
            <h2 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 4 }}>Create an account</h2>
            <p style={{ fontSize: 14, color: tokens.colors.textTertiary }}>Get started with KazeUI</p>
          </div>
          <Button variant="outline" icon={Icons.github} style={{ width: '100%', justifyContent: 'center' }}>Continue with GitHub</Button>
          <Separator label="or" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Checkbox label="I agree to the Terms and Privacy Policy" />
          <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Create account</Button>
          <p style={{ fontSize: 13, color: tokens.colors.textTertiary, textAlign: 'center' }}>
            Already have an account?{' '}
            <span style={{ color: tokens.colors.accent, cursor: 'pointer', fontWeight: 500 }}>Sign in</span>
          </p>
        </div>
      </Card>
    </div>
  )
}

// ─── Hero Aurora ───
function HeroAurora() {
  const words = ['effortlessly', 'instantly', 'beautifully']
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{
      padding: '80px 40px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: tokens.colors.surface, minHeight: 420,
    }}>
      {/* Aurora blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(88,166,255,0.2) 0%, transparent 70%)',
          top: -100, right: -50, animation: 'glow-pulse 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,130,255,0.15) 0%, transparent 70%)',
          bottom: -80, left: -40, animation: 'glow-pulse 8s ease-in-out infinite 2s',
        }} />
        <div style={{
          position: 'absolute', width: 250, height: 250, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,150,100,0.12) 0%, transparent 70%)',
          top: 40, left: '40%', animation: 'glow-pulse 7s ease-in-out infinite 1s',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ animation: 'float 4s ease-in-out infinite', marginBottom: 24 }}>
          <Badge variant="info">Introducing KazeUI v0.2</Badge>
        </div>
        <h1 style={{
          fontFamily: 'var(--kaze-font-serif)', fontSize: 52, fontWeight: 300,
          letterSpacing: '-0.05em', lineHeight: 1.1, color: tokens.colors.text,
          marginBottom: 8, maxWidth: 560,
        }}>
          Build beautiful interfaces
        </h1>
        <div style={{
          fontFamily: 'var(--kaze-font-serif)', fontSize: 52, fontWeight: 300,
          letterSpacing: '-0.05em', lineHeight: 1.1, fontStyle: 'italic',
          height: 60, marginBottom: 20, position: 'relative',
        }}>
          <span key={wordIdx} style={{
            color: tokens.colors.accent,
            animation: 'fadeInUp 400ms cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'inline-block',
          }}>
            {words[wordIdx]}
          </span>
        </div>
        <p style={{
          fontSize: 17, lineHeight: 1.65, color: tokens.colors.textSecondary,
          maxWidth: 440, marginBottom: 36, margin: '0 auto 36px',
        }}>
          A design system that stays out of your way. Copy components, customize tokens, ship faster.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="outline" size="lg" icon={Icons.github}>GitHub</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          <AvatarGroup items={[
            { name: 'Abderrahim G', src: '/abderrahim.jpg' },
            { name: 'Sarah Chen', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Dan Abramov', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Evan You', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
          ]} size={28} max={4} />
          <span style={{ fontSize: 13, color: tokens.colors.textTertiary }}>Trusted by 2,000+ developers</span>
        </div>
      </div>
    </div>
  )
}

// ─── CTA Spotlight ───
function CTASpotlight() {
  return (
    <div style={{
      width: '100%', padding: '80px 40px', textAlign: 'center',
      background: '#0D0D0D', borderRadius: 'var(--kaze-radius-lg)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbiting spotlight */}
      <div style={{
        position: 'absolute', width: 300, height: 300,
        borderRadius: '50%', top: '50%', left: '50%',
        marginTop: -150, marginLeft: -150,
        background: 'radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 60%)',
        animation: 'orbit 12s linear infinite',
        pointerEvents: 'none',
      }} />
      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: -100, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: 'grain 8s steps(10) infinite',
        pointerEvents: 'none',
      }} />
      {/* Glowing ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: 500, height: 500,
        marginTop: -250, marginLeft: -250,
        borderRadius: '50%', border: '1px solid rgba(88,166,255,0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: 'var(--kaze-font-serif)', fontSize: 40, fontWeight: 300,
          letterSpacing: '-0.045em', color: '#F5F5F5', marginBottom: 12,
        }}>
          Ready to build something<br /><em style={{ fontStyle: 'italic' }}>beautiful?</em>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(245,245,245,0.5)', marginBottom: 32, maxWidth: 380, margin: '0 auto 32px' }}>
          Start with our CLI and add components in seconds. No lock-in, no bloat.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button style={{
            fontFamily: 'var(--kaze-font-sans)', fontWeight: 500, fontSize: 15,
            padding: '12px 24px', borderRadius: 'var(--kaze-radius-sm)',
            background: '#FAFAF9', color: '#0D0D0D', border: 'none',
            cursor: 'pointer', letterSpacing: '-0.01em',
            transition: 'all 200ms ease', boxShadow: '0 0 20px rgba(250,250,249,0.1)',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(250,250,249,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(250,250,249,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Get started free</button>
          <button style={{
            fontFamily: 'var(--kaze-font-sans)', fontWeight: 500, fontSize: 15,
            padding: '12px 24px', borderRadius: 'var(--kaze-radius-sm)',
            background: 'transparent', color: 'rgba(245,245,245,0.7)', border: '1px solid rgba(245,245,245,0.12)',
            cursor: 'pointer', letterSpacing: '-0.01em',
            transition: 'all 200ms ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,245,245,0.3)'; e.currentTarget.style.color = '#F5F5F5' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,245,245,0.12)'; e.currentTarget.style.color = 'rgba(245,245,245,0.7)' }}
          >View on GitHub</button>
        </div>
      </div>
    </div>
  )
}

// ─── 3D Card ───
function ThreeDCardBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale3d(1.04,1.04,1.04)`)
    setGlare({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 20px', width: '100%' }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTransform('')}
        style={{
          transform, transition: transform ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d', cursor: 'default',
        }}
      >
        <div style={{
          width: 380, padding: 24, borderRadius: 'var(--kaze-radius-lg)',
          border: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface,
          boxShadow: 'var(--kaze-shadow-lg)', position: 'relative', overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}>
          {/* Glare overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            opacity: transform ? 1 : 0, transition: 'opacity 300ms ease',
          }} />

          <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
            <h3 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 22, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 6 }}>
              Make things float in air
            </h3>
          </div>
          <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
            <p style={{ fontSize: 14, color: tokens.colors.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
              Hover over this card to unleash the power of CSS perspective
            </p>
          </div>
          <div style={{ transform: 'translateZ(100px)', transformStyle: 'preserve-3d', marginBottom: 20 }}>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80"
              style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--kaze-radius-md)', display: 'block' }}
              alt="Forest"
            />
          </div>
          <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: tokens.colors.accent, cursor: 'pointer', fontWeight: 500 }}>Try now →</span>
            <Button variant="primary" size="sm">Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Orbiting Icons ───
function OrbitBlock() {
  // 3 orbital planes, each tilted differently
  const orbits = [
    { tiltX: 70, tiltZ: 0, radius: 130, icons: [
      { src: '/logos/react.png', label: 'React', startAngle: 0, speed: 0.012 },
      { src: '/logos/vercel.png', label: 'Vercel', startAngle: 180, speed: 0.012 },
    ]},
    { tiltX: 70, tiltZ: 60, radius: 130, icons: [
      { src: '/logos/tailwind.png', label: 'Tailwind', startAngle: 90, speed: 0.01 },
      { src: '/logos/github.png', label: 'GitHub', startAngle: 270, speed: 0.01 },
    ]},
    { tiltX: 70, tiltZ: -60, radius: 130, icons: [
      { src: '/logos/typescript.png', label: 'TypeScript', startAngle: 45, speed: 0.014 },
      { src: '/logos/figma.png', label: 'Figma', startAngle: 225, speed: 0.014 },
      { src: '/logos/vite.png', label: 'Vite', startAngle: 135, speed: 0.014 },
    ]},
  ]

  const [positions, setPositions] = useState<{ x: number; y: number; z: number; src: string; label: string }[]>([])

  useEffect(() => {
    let frame: number
    let t = 0
    const animate = () => {
      t += 1
      const allPos: typeof positions = []
      for (const orbit of orbits) {
        const tiltXRad = (orbit.tiltX * Math.PI) / 180
        const tiltZRad = (orbit.tiltZ * Math.PI) / 180
        for (const icon of orbit.icons) {
          const angle = ((icon.startAngle * Math.PI) / 180) + t * icon.speed
          // Position on flat circle
          const cx = Math.cos(angle) * orbit.radius
          const cy = Math.sin(angle) * orbit.radius
          // Tilt the plane: rotate around X then Z
          const y1 = cy * Math.cos(tiltXRad)
          const z1 = cy * Math.sin(tiltXRad)
          const x2 = cx * Math.cos(tiltZRad) - y1 * Math.sin(tiltZRad)
          const y2 = cx * Math.sin(tiltZRad) + y1 * Math.cos(tiltZRad)
          allPos.push({ x: x2, y: y2, z: z1, src: icon.src, label: icon.label })
        }
      }
      setPositions(allPos)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const size = 380
  const cx = size / 2
  const cy = size / 2

  // Sort by z for correct overlap
  const sorted = [...positions].sort((a, b) => a.z - b.z)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 0', width: '100%' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Orbit ring ellipses */}
        {orbits.map((orbit, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: orbit.radius * 2, height: orbit.radius * 2,
            marginLeft: -orbit.radius, marginTop: -orbit.radius,
            borderRadius: '50%', border: `1px solid ${tokens.colors.border}`,
            opacity: 0.2,
            transform: `rotateX(${orbit.tiltX}deg) rotateZ(${orbit.tiltZ}deg)`,
            transformStyle: 'preserve-3d',
          }} />
        ))}

        {/* Center logo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 56, height: 56, borderRadius: 16,
          background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--kaze-shadow-lg)', zIndex: 20, color: tokens.colors.text,
        }}>
          {Icons.wind}
        </div>

        {/* Orbiting icons */}
        {sorted.map((pos) => {
          const depth = (pos.z + 130) / 260 // 0 = far, 1 = near
          const scale = 0.6 + depth * 0.5
          const opacity = 0.3 + depth * 0.7
          const zIndex = Math.round(depth * 30)
          return (
            <div key={pos.label} style={{
              position: 'absolute',
              left: cx + pos.x - 22,
              top: cy + pos.y - 22,
              width: 44, height: 44, borderRadius: 14,
              background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--kaze-shadow-md)',
              transform: `scale(${scale})`,
              opacity,
              zIndex,
              transition: 'none',
            }} title={pos.label}>
              <img src={pos.src} alt={pos.label} style={{ width: 22, height: 22, objectFit: 'contain' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Testimonials (Infinite Scroll) ───
function TestimonialCard({ name, role, src, quote, highlight }: { name: string; role: string; src: string; quote: string; highlight?: boolean }) {
  return (
    <div style={{
      padding: 20, borderRadius: 'var(--kaze-radius-lg)',
      border: `1px solid ${highlight ? tokens.colors.accent : tokens.colors.border}`,
      background: tokens.colors.surface,
      marginBottom: 12,
      boxShadow: highlight ? 'var(--kaze-shadow-md)' : 'none',
    }}>
      <p style={{ fontSize: 14, color: tokens.colors.text, lineHeight: 1.65, marginBottom: 16 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={name} src={src} size={32} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em' }}>{name}</div>
          <div style={{ fontSize: 11, color: tokens.colors.textTertiary }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsBlock() {
  const col1 = [
    { name: 'Sarah Chen', role: 'Frontend Engineer at Vercel', src: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'Kaze replaced our entire component library in a weekend. The defaults just work — we barely had to customize anything.', highlight: true },
    { name: 'Dan Abramov', role: 'Open Source Developer', src: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'Finally a design system that gets out of the way. Copy-paste, no npm install, no version conflicts. This is how it should be.' },
    { name: 'Evan You', role: 'Creator of Vue.js', src: 'https://randomuser.me/api/portraits/men/75.jpg', quote: 'The dark mode implementation is brilliant. One data attribute and every single token adapts. No theme provider, no context.' },
    { name: 'Guillermo Rauch', role: 'CEO at Vercel', src: 'https://randomuser.me/api/portraits/men/67.jpg', quote: 'Inline styles with CSS variables is underrated. No CSS-in-JS runtime, no class conflicts. Kaze nails this approach.' },
  ]
  const col2 = [
    { name: 'Ryan Dahl', role: 'Creator of Node & Deno', src: 'https://randomuser.me/api/portraits/men/46.jpg', quote: 'Zero runtime dependencies. CSS variables for theming. Inline styles for components. This is how libraries should be built.' },
    { name: 'Rich Harris', role: 'Creator of Svelte', src: 'https://randomuser.me/api/portraits/men/22.jpg', quote: 'Copy-paste components that you own. No dependency updates breaking your app, no version lockfiles. Refreshing.', highlight: true },
    { name: 'Theo Browne', role: 'CEO at Ping.gg', src: 'https://randomuser.me/api/portraits/men/85.jpg', quote: 'The CLI is incredible. npx kazeui-cli add button and the source code lands in your project. No config needed.' },
    { name: 'Abderrahim G', role: 'Creator of KazeUI', src: '/abderrahim.jpg', quote: 'I built Kaze because I was tired of fighting with component libraries. Now I just copy, paste, and ship.' },
  ]

  const fadeTop: React.CSSProperties = { position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to bottom, ${tokens.colors.bg}, transparent)`, zIndex: 2, pointerEvents: 'none' }
  const fadeBottom: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to top, ${tokens.colors.bg}, transparent)`, zIndex: 2, pointerEvents: 'none' }

  return (
    <div style={{ padding: '32px 16px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 6 }}>
          Loved by developers
        </h2>
        <p style={{ fontSize: 14, color: tokens.colors.textTertiary }}>Don&apos;t just take our word for it.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, height: 480, overflow: 'hidden' }}>
        {/* Column 1 — scrolls up */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={fadeTop} />
          <div style={fadeBottom} />
          <div style={{ animation: 'scroll-up 28s linear infinite' }}>
            {[...col1, ...col1].map((t, i) => <TestimonialCard key={`a${i}`} {...t} />)}
          </div>
        </div>
        {/* Column 2 — scrolls down */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={fadeTop} />
          <div style={fadeBottom} />
          <div style={{ animation: 'scroll-down 32s linear infinite' }}>
            {[...col2, ...col2].map((t, i) => <TestimonialCard key={`b${i}`} {...t} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Feature Grid (Illustrated Bento) ───
function FeatureGridBlock() {
  const cell: React.CSSProperties = {
    padding: 24, borderRadius: 'var(--kaze-radius-lg)',
    border: `1px solid ${tokens.colors.border}`, background: tokens.colors.surface,
    overflow: 'hidden',
  }
  const title: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: tokens.colors.text, letterSpacing: '-0.02em', marginBottom: 4 }
  const desc: React.CSSProperties = { fontSize: 13, color: tokens.colors.textTertiary, lineHeight: 1.5 }

  // Chat bubble helper
  const bubble = (text: string, outgoing: boolean) => (
    <div style={{ display: 'flex', gap: 8, alignItems: outgoing ? 'flex-end' : 'flex-start', justifyContent: outgoing ? 'flex-end' : 'flex-start' }}>
      {!outgoing && <Avatar name="Sarah Chen" src="https://randomuser.me/api/portraits/women/44.jpg" size={22} />}
      <div style={{
        background: outgoing ? tokens.colors.accent : tokens.colors.surfaceHover,
        color: outgoing ? tokens.colors.accentText : tokens.colors.text,
        padding: '7px 12px', fontSize: 12, lineHeight: 1.5, maxWidth: '78%',
        borderRadius: outgoing ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
      }}>{text}</div>
      {outgoing && <Avatar name="Abderrahim G" src="/abderrahim.jpg" size={22} />}
    </div>
  )

  // Code line helper
  const codeLine = (num: number, colors: string[], widths: number[]) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <span style={{ width: 20, textAlign: 'right', fontSize: 10, color: '#555', marginRight: 8, fontFamily: 'var(--kaze-font-mono)' }}>{num}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ width: widths[i], height: 6, borderRadius: 3, background: c }} />
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, padding: 16, width: '100%' }}>

      {/* Chat scene */}
      <div style={{ ...cell, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {bubble('Hey! Are you free for a quick call?', false)}
          {bubble('Sure, give me 5 minutes!', true)}
          {bubble('Sounds good 👍', false)}
          {bubble("I'm not sure if I can make it.", true)}
        </div>
        <div>
          <div style={title}>Real time messaging</div>
          <div style={desc}>Send and receive messages in real time with text.</div>
        </div>
      </div>

      {/* Theme scene */}
      <div style={{ ...cell, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* Light card */}
          <div style={{
            flex: 1, height: 100, borderRadius: 'var(--kaze-radius-md)', background: '#FAFAF9',
            border: '1px solid #E7E5E4', padding: 12, display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ width: '60%', height: 6, borderRadius: 3, background: '#E7E5E4' }} />
            <div style={{ width: '40%', height: 6, borderRadius: 3, background: '#E7E5E4' }} />
            <div style={{ width: 40, height: 18, borderRadius: 6, background: '#1C1917', marginTop: 'auto' }} />
          </div>
          {/* Dark card */}
          <div style={{
            flex: 1, height: 100, borderRadius: 'var(--kaze-radius-md)', background: '#0D1117',
            border: '1px solid #1E2736', padding: 12, display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ width: '60%', height: 6, borderRadius: 3, background: '#1E2736' }} />
            <div style={{ width: '40%', height: 6, borderRadius: 3, background: '#1E2736' }} />
            <div style={{ width: 40, height: 18, borderRadius: 6, background: '#58A6FF', marginTop: 'auto' }} />
          </div>
        </div>
        <div>
          <div style={title}>Dark mode built in</div>
          <div style={desc}>One attribute toggles every token. Pure CSS.</div>
        </div>
      </div>

      {/* Code editor scene */}
      <div style={{ ...cell, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{
          background: '#0D0D0D', borderRadius: 'var(--kaze-radius-md)', padding: 10,
          marginBottom: 20, flex: 1, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {codeLine(1, ['#C678DD', '#E06C75'], [36, 50])}
            {codeLine(2, ['#61AFEF'], [70])}
            {codeLine(3, ['#C678DD', '#98C379'], [28, 44])}
            {codeLine(4, [], [])}
            {codeLine(5, ['#C678DD', '#E5C07B', '#ABB2BF'], [32, 48, 20])}
            {codeLine(6, ['#61AFEF', '#98C379'], [40, 56])}
            {codeLine(7, ['#E06C75', '#D19A66'], [26, 38])}
            {codeLine(8, ['#ABB2BF', '#C678DD'], [20, 30])}
            {codeLine(9, ['#61AFEF'], [54])}
            {codeLine(10, ['#E5C07B'], [34])}
          </div>
          {/* Cursor avatars */}
          <div style={{ display: 'flex', gap: -4, marginTop: 'auto', paddingTop: 8, justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#16A34A', borderRadius: 8, padding: '2px 8px 2px 2px' }}>
              <Avatar name="Abderrahim G" src="/abderrahim.jpg" size={18} />
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 500 }}>You</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#2563EB', borderRadius: 8, padding: '2px 8px 2px 2px', marginLeft: 4 }}>
              <Avatar name="Sarah Chen" src="https://randomuser.me/api/portraits/women/44.jpg" size={18} />
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 500 }}>Sarah</span>
            </div>
          </div>
        </div>
        <div>
          <div style={title}>Copy-paste components</div>
          <div style={desc}>You own every line of code. No npm dependency.</div>
        </div>
      </div>

      {/* Testimonials row — spans 3 columns */}
      <div style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { name: 'Abderrahim G', role: 'Creator of KazeUI', src: '/abderrahim.jpg', quote: 'Kaze is the component library I always wanted — minimal, composable, and truly yours.' },
          { name: 'Sarah Chen', role: 'Frontend Engineer', src: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'The components are beautifully designed and saved us hundreds of hours of development time.' },
          { name: 'Dan Abramov', role: 'Open Source Dev', src: 'https://randomuser.me/api/portraits/men/32.jpg', quote: "I've tried many UI libraries, but Kaze stands out with its attention to detail and smooth animations." },
        ].map((t) => (
          <div key={t.name} style={{ ...cell, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, color: tokens.colors.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name={t.name} src={t.src} size={28} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: tokens.colors.text }}>{t.name}</div>
                <div style={{ fontSize: 11, color: tokens.colors.textTertiary }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom left — spans 2 columns */}
      <div style={{ ...cell, gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div>
          <div style={title}>Loved by developers</div>
          <div style={desc}>Trusted by thousands of developers and teams worldwide.</div>
        </div>
        <div style={{ display: 'flex', flexShrink: 0 }}>
          <AvatarGroup items={[
            { name: 'Abderrahim G', src: '/abderrahim.jpg' },
            { name: 'Sarah Chen', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Dan Abramov', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Evan You', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
            { name: 'Ryan Dahl', src: 'https://randomuser.me/api/portraits/men/46.jpg' },
            { name: 'Rich Harris', src: 'https://randomuser.me/api/portraits/men/22.jpg' },
          ]} size={30} max={5} />
        </div>
      </div>

      {/* Bottom right */}
      <div style={{ ...cell, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {['React', 'TypeScript', 'Tailwind', 'Vite'].map((t) => (
            <img key={t} src={`/logos/${t.toLowerCase()}.png`} alt={t} title={t} style={{ width: 28, height: 28, objectFit: 'contain', padding: 4, borderRadius: 8, border: `1px solid ${tokens.colors.border}`, background: tokens.colors.surfaceHover }} />
          ))}
        </div>
        <div>
          <div style={title}>Built on modern stack</div>
          <div style={desc}>React 19, TypeScript, Tailwind v4, Vite.</div>
        </div>
      </div>
    </div>
  )
}

// ─── Terminal ───
function TerminalBlock() {
  const steps = [
    { type: 'cmd', text: 'npx kazeui-cli init' },
    { type: 'out', text: '✓ Created kaze.json' },
    { type: 'out', text: '✓ Added tokens.ts + icons.tsx' },
    { type: 'out', text: '✓ Appended CSS variables to globals.css' },
    { type: 'cmd', text: 'npx kazeui-cli add button dialog toast' },
    { type: 'out', text: '✓ Button → src/components/ui/button.tsx' },
    { type: 'out', text: '✓ Dialog → src/components/ui/dialog.tsx' },
    { type: 'out', text: '✓ Toast → src/components/ui/toast.tsx' },
    { type: 'out', text: '' },
    { type: 'out', text: 'Done! 3 components added.' },
  ]
  const [visible, setVisible] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running || visible >= steps.length) { setRunning(false); return }
    const delay = steps[visible]?.type === 'cmd' ? 800 : 300
    const t = setTimeout(() => setVisible((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [visible, running])

  const replay = () => { setVisible(0); setRunning(true) }

  return (
    <div style={{ background: '#0D0D0D', borderRadius: 'var(--kaze-radius-lg)', overflow: 'hidden', fontFamily: 'var(--kaze-font-mono)', fontSize: 13 }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
        </div>
        <span style={{ color: '#555', fontSize: 11 }}>terminal</span>
        <button onClick={replay} style={{ background: '#222', border: 'none', color: '#888', padding: '2px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11 }}>Replay</button>
      </div>
      <div style={{ padding: 16, minHeight: 280 }}>
        {steps.slice(0, visible).map((s, i) => (
          <div key={i} style={{ color: s.type === 'cmd' ? '#22C55E' : '#888', marginBottom: 4, lineHeight: 1.6, animation: 'fadeIn 150ms ease' }}>
            {s.type === 'cmd' ? '$ ' : '  '}{s.text}
          </div>
        ))}
        {visible < steps.length && running && (
          <span style={{ display: 'inline-block', width: 8, height: 16, background: '#22C55E', animation: 'blink 1s step-end infinite' }} />
        )}
      </div>
    </div>
  )
}

// ─── Before/After ───
function BeforeAfterBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updatePos = (clientX: number) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)))
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updatePos(e.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging])

  // Shared card content — rendered twice with different styling
  const beforeCard = (
    <div style={{ padding: '40px 48px', height: '100%', background: '#FEFEFE' }}>
      <span style={{ background: '#F0F0F0', padding: '3px 10px', fontSize: 11, fontFamily: 'monospace', color: '#888', borderRadius: 4, marginBottom: 20, display: 'inline-block' }}>BEFORE</span>
      <h3 style={{ fontFamily: 'Times New Roman, serif', fontSize: 24, marginBottom: 6, color: '#333' }}>Dashboard</h3>
      <p style={{ fontFamily: 'Times New Roman, serif', fontSize: 14, color: '#888', marginBottom: 20, lineHeight: 1.5 }}>Welcome back, manage your projects and team members.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={{ padding: '3px 10px', fontSize: 12, background: '#E8E8E8', color: '#555', fontFamily: 'Arial', borderRadius: 2 }}>Active</span>
        <span style={{ padding: '3px 10px', fontSize: 12, background: '#E8E8E8', color: '#555', fontFamily: 'Arial', borderRadius: 2 }}>3 Projects</span>
      </div>
      <input type="text" placeholder="Search projects..." readOnly style={{ padding: '8px 12px', border: '1px solid #DDD', fontSize: 13, fontFamily: 'Arial', width: 260, display: 'block', marginBottom: 12, background: '#FAFAFA' }} />
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={{ padding: '8px 20px', background: '#333', color: '#FFF', border: 'none', fontSize: 13, fontFamily: 'Arial', cursor: 'default' }}>Create</button>
        <button style={{ padding: '8px 20px', background: '#FFF', color: '#333', border: '1px solid #DDD', fontSize: 13, fontFamily: 'Arial', cursor: 'default' }}>Import</button>
      </div>
    </div>
  )

  const afterCard = (
    <div style={{ padding: '40px 48px', height: '100%', background: tokens.colors.surface }}>
      <div style={{ marginBottom: 20 }}><Badge variant="info">AFTER</Badge></div>
      <h3 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 6 }}>Dashboard</h3>
      <p style={{ fontSize: 14, color: tokens.colors.textSecondary, marginBottom: 20, lineHeight: 1.5 }}>Welcome back, manage your projects and team members.</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        <Badge variant="success">Active</Badge>
        <Badge>3 Projects</Badge>
      </div>
      <div style={{ marginBottom: 12, maxWidth: 260 }}>
        <Input placeholder="Search projects..." icon={Icons.search} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Button variant="primary" size="sm">Create</Button>
        <Button variant="outline" size="sm">Import</Button>
      </div>
    </div>
  )

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', height: 340, userSelect: 'none', width: '100%' }}>
      {/* After — full width, always visible underneath */}
      <div style={{ position: 'absolute', inset: 0 }}>{afterCard}</div>

      {/* Before — clipped, visible from left edge to slider */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{beforeCard}</div>

      {/* Slider handle */}
      <div
        onMouseDown={() => setDragging(true)}
        style={{
          position: 'absolute', top: 0, bottom: 0, left: `${pos}%`,
          transform: 'translateX(-50%)', zIndex: 10, cursor: 'ew-resize',
          width: 14, display: 'flex', justifyContent: 'center',
        }}
      >
        <div style={{ width: 2, height: '100%', background: tokens.colors.border }} />
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          width: 24, height: 40, borderRadius: 12,
          background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
          boxShadow: 'var(--kaze-shadow-md)', cursor: 'ew-resize',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', gap: 2 }}>
            <div style={{ width: 1.5, height: 12, borderRadius: 1, background: tokens.colors.textTertiary, opacity: 0.5 }} />
            <div style={{ width: 1.5, height: 12, borderRadius: 1, background: tokens.colors.textTertiary, opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Magnetic Dock ───
function DockBlock() {
  const icons = [
    '/logos/react.png', '/logos/vite.png', '/logos/tailwind.png',
    '/logos/typescript.png', '/logos/vercel.png', '/logos/github.png',
    '/logos/figma.png', '/logos/stripe.png', '/logos/supabase.png',
  ]
  const [mouse, setMouse] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMouse(e.clientX - rect.left)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 20px', width: '100%' }}>
      <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setMouse(null)}
        style={{
          display: 'flex', gap: 4, padding: '14px 20px',
          borderRadius: 'var(--kaze-radius-lg)',
          background: tokens.colors.surfaceHover,
          border: `1px solid ${tokens.colors.border}`,
          alignItems: 'flex-end',
        }}>
        {icons.map((icon, i) => {
          const itemWidth = 52
          const center = i * itemWidth + itemWidth / 2
          const dist = mouse !== null ? Math.abs(mouse - center) : 999
          const scale = Math.max(1, 1.8 - dist / 120)
          return (
            <div key={i} style={{
              width: 44, height: 44, borderRadius: 'var(--kaze-radius-md)',
              background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: scale > 1.1 ? 'var(--kaze-shadow-lg)' : 'var(--kaze-shadow-sm)',
              transform: `scale(${scale}) translateY(${(scale - 1) * -18}px)`,
              transition: mouse !== null ? 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 120ms ease' : 'transform 400ms ease, box-shadow 400ms ease',
              transformOrigin: 'bottom center',
            }}>
              <img src={icon} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Layer Stack ───
function LayerStackBlock() {
  const [exploded, setExploded] = useState(false)
  const layers = [
    { label: 'Background', color: tokens.colors.bg, z: 0, content: null },
    { label: 'Card', color: tokens.colors.surface, z: 50, content: (
      <div style={{ padding: 20 }}>
        <div style={{ width: 120, height: 8, background: tokens.colors.surfaceActive, borderRadius: 4, marginBottom: 8 }} />
        <div style={{ width: 80, height: 8, background: tokens.colors.surfaceActive, borderRadius: 4 }} />
      </div>
    )},
    { label: 'Content', color: 'transparent', z: 90, content: (
      <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: tokens.colors.accent }} />
        <div>
          <div style={{ width: 80, height: 6, background: tokens.colors.text, borderRadius: 3, marginBottom: 6, opacity: 0.6 }} />
          <div style={{ width: 50, height: 6, background: tokens.colors.textTertiary, borderRadius: 3, opacity: 0.4 }} />
        </div>
      </div>
    )},
    { label: 'Dialog', color: 'rgba(0,0,0,0.06)', z: 140, content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ width: 100, height: 60, borderRadius: 'var(--kaze-radius-md)', background: tokens.colors.surface, border: `1px solid ${tokens.colors.border}`, boxShadow: 'var(--kaze-shadow-md)' }} />
      </div>
    )},
  ]

  return (
    <div onMouseEnter={() => setExploded(true)} onMouseLeave={() => setExploded(false)}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', perspective: 800, width: '100%', cursor: 'default' }}>
      <div style={{ position: 'relative', width: 260, height: 180, transformStyle: 'preserve-3d', transform: 'rotateY(-25deg) rotateX(15deg)', transition: 'transform 500ms ease' }}>
        {layers.map((layer, i) => (
          <div key={layer.label} style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--kaze-radius-lg)',
            background: layer.color, border: `1px solid ${tokens.colors.border}`,
            transform: `translateZ(${exploded ? layer.z : i * 3}px)`,
            transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: exploded ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
            overflow: 'hidden',
          }}>
            {layer.content}
            <span style={{
              position: 'absolute', bottom: 6, right: 8,
              fontSize: 9, fontFamily: 'var(--kaze-font-mono)', color: tokens.colors.textTertiary,
              opacity: exploded ? 1 : 0, transition: 'opacity 300ms ease',
            }}>{layer.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Component Morph ───
function MorphBlock() {
  const states = [
    { label: 'Button', width: 140, height: 40, radius: 10, bg: tokens.colors.accent, color: tokens.colors.accentText, text: 'Click me', fontSize: 14, fontWeight: 500, border: false },
    { label: 'Input', width: 260, height: 40, radius: 10, bg: tokens.colors.surface, color: tokens.colors.textTertiary, text: 'Type something...', fontSize: 14, fontWeight: 400, border: true },
    { label: 'Badge', width: 72, height: 26, radius: 9999, bg: tokens.colors.surfaceActive, color: tokens.colors.text, text: 'New', fontSize: 12, fontWeight: 500, border: false },
    { label: 'Card', width: 280, height: 100, radius: 20, bg: tokens.colors.surface, color: tokens.colors.textSecondary, text: 'Card content here', fontSize: 13, fontWeight: 400, border: true },
  ]
  const [idx, setIdx] = useState(0)
  const s = states[idx]

  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % states.length), 2200)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '56px 20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: s.width, height: s.height, borderRadius: s.radius,
          background: s.bg, color: s.color, fontSize: s.fontSize, fontWeight: s.fontWeight,
          border: s.border ? `1px solid ${tokens.colors.border}` : 'none',
          fontFamily: 'var(--kaze-font-sans)', letterSpacing: '-0.01em',
          boxShadow: s.border ? 'var(--kaze-shadow-sm)' : 'none',
          transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          {s.text}
        </div>
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {states.map((st, i) => (
          <button key={st.label} onClick={() => setIdx(i)} style={{
            fontSize: 12, fontFamily: 'var(--kaze-font-mono)', padding: '4px 10px',
            borderRadius: 'var(--kaze-radius-full)', border: `1px solid ${tokens.colors.border}`,
            background: idx === i ? tokens.colors.accent : 'transparent',
            color: idx === i ? tokens.colors.accentText : tokens.colors.textTertiary,
            cursor: 'pointer', transition: 'all var(--kaze-transition)',
          }}>{st.label}</button>
        ))}
      </div>
    </div>
  )
}

// ─── Spotlight Cursor ───
function SpotlightBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
      style={{ position: 'relative', overflow: 'hidden', height: 340, borderRadius: 'var(--kaze-radius-lg)', cursor: 'none', width: '100%', background: tokens.colors.surface }}>
      {/* Content underneath */}
      <div style={{ position: 'absolute', inset: 0, padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em', color: tokens.colors.text }}>
          Discover what&apos;s hidden
        </h2>
        <p style={{ fontSize: 15, color: tokens.colors.textSecondary, maxWidth: 360, lineHeight: 1.6 }}>
          Move your cursor to explore. Every component is waiting to be found in the dark.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Button variant="primary" size="sm">Explore</Button>
          <Button variant="outline" size="sm">Learn more</Button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Badge variant="success">New</Badge>
          <Badge variant="info">Featured</Badge>
          <Badge variant="warning">Beta</Badge>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <Avatar name="Abderrahim G" src="/abderrahim.jpg" size={36} status="online" />
          <Avatar name="Sarah Chen" src="https://randomuser.me/api/portraits/women/44.jpg" size={36} />
          <Avatar name="Dan Abramov" src="https://randomuser.me/api/portraits/men/32.jpg" size={36} />
        </div>
      </div>

      {/* Dark mask with spotlight cutout */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: active
          ? `radial-gradient(circle 90px at ${pos.x}% ${pos.y}%, transparent 0%, rgba(0,0,0,0.92) 100%)`
          : 'rgba(0,0,0,0.92)',
        transition: active ? 'none' : 'background 500ms ease',
      }} />

      {/* Hint */}
      {!active && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--kaze-font-sans)' }}>
            Move your cursor here
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Block page ───
const slugs = Object.keys(blocks)

function BlockPage() {
  const { slug } = Route.useParams()
  const block = blocks[slug]

  if (!block) {
    return (
      <div style={{ animation: 'fadeInUp 400ms both', padding: '40px 0' }}>
        <h1 style={{ fontFamily: 'var(--kaze-font-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 12 }}>
          Block not found
        </h1>
        <Link to="/" style={{ fontSize: 14, color: tokens.colors.accent, textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to home
        </Link>
      </div>
    )
  }

  const idx = slugs.indexOf(slug)
  const prev = idx > 0 ? slugs[idx - 1] : null
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : null

  return (
    <div style={{ animation: 'fadeInUp 400ms both cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <h1 style={{
        fontFamily: 'var(--kaze-font-serif)', fontSize: 32, fontWeight: 400,
        letterSpacing: '-0.03em', color: tokens.colors.text, marginBottom: 8,
      }}>
        {block.name}
      </h1>
      <p style={{
        fontSize: 16, color: tokens.colors.textSecondary, lineHeight: 1.6,
        letterSpacing: '-0.01em', marginBottom: 36,
      }}>
        {block.description}
      </p>

      {/* Preview */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel>Preview</SectionLabel>
        <div style={{
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 'var(--kaze-radius-lg)',
          background: tokens.colors.surface,
          overflow: 'hidden',
        }}>
          {block.preview}
        </div>
      </div>

      {/* Code */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel>Code</SectionLabel>
        <CodeBlock code={block.code} />
      </div>

      {/* Prev/Next */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        paddingTop: 24, borderTop: `1px solid ${tokens.colors.border}`,
      }}>
        {prev ? (
          <Link to="/blocks/$slug" params={{ slug: prev }} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, color: tokens.colors.textTertiary }}>Previous</span>
            <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500 }}>&larr; {blocks[prev].name}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to="/blocks/$slug" params={{ slug: next }} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: tokens.colors.textTertiary }}>Next</span>
            <span style={{ fontSize: 14, color: tokens.colors.text, fontWeight: 500 }}>{blocks[next].name} &rarr;</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--kaze-font-mono)', fontSize: 11, fontWeight: 500,
      color: tokens.colors.textTertiary, letterSpacing: '0.06em',
      textTransform: 'uppercase', marginBottom: 12,
    }}>{children}</h3>
  )
}
