import { Command } from "commander"
import fs from "fs"
import path from "path"
import readline from "readline"

const REGISTRY_URL = "https://raw.githubusercontent.com/abderrahimghazali/kaze/main/registry"
const CONFIG_FILE = "kaze.json"

// ─── Colors ───
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
}

function log(msg: string) { console.log(msg) }
function success(msg: string) { log(`${c.green}✓${c.reset} ${msg}`) }
function warn(msg: string) { log(`${c.yellow}!${c.reset} ${msg}`) }
function error(msg: string) { log(`${c.red}✗${c.reset} ${msg}`) }

// ─── Prompt ───
function ask(question: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const suffix = defaultValue ? ` ${c.dim}(${defaultValue})${c.reset}` : ""
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      rl.close()
      resolve(answer.trim() || defaultValue || "")
    })
  })
}

// ─── Fetch from registry ───
async function fetchRegistry(): Promise<any> {
  const res = await fetch(`${REGISTRY_URL}/registry.json`)
  if (!res.ok) throw new Error("Failed to fetch registry")
  return res.json()
}

async function fetchFile(filePath: string): Promise<string> {
  const res = await fetch(`${REGISTRY_URL}/${filePath}`)
  if (!res.ok) throw new Error(`Failed to fetch ${filePath}`)
  return res.text()
}

// ─── Config ───
type Config = { componentsDir: string; libDir: string; cssPath: string; aliases: { lib: string } }

function readConfig(): Config | null {
  if (!fs.existsSync(CONFIG_FILE)) return null
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"))
}

function writeConfig(config: Config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + "\n")
}

// ─── Write file with directory creation ───
function writeFile(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
}

// ─── Replace import paths ───
function rewriteImports(source: string, config: Config): string {
  return source.replace(/@\/lib\/kaze\//g, `${config.aliases.lib}/`)
}

// ─── INIT COMMAND ───
async function init() {
  log("")
  log(`${c.bold}kazeui init${c.reset}`)
  log(`${c.dim}Configure KazeUI for your project${c.reset}`)
  log("")

  const componentsDir = await ask("Components directory", "src/components/ui")
  const libDir = await ask("Lib directory", "src/lib/kaze")
  const cssPath = await ask("Global CSS path", "src/styles/globals.css")
  const aliasLib = await ask("Import alias for lib", "@/lib/kaze")

  const config: Config = { componentsDir, libDir, cssPath, aliases: { lib: aliasLib } }

  log("")

  // Write config
  writeConfig(config)
  success(`Created ${CONFIG_FILE}`)

  // Fetch and write lib files
  const tokens = await fetchFile("lib/tokens.ts")
  const icons = await fetchFile("lib/icons.tsx")

  writeFile(path.join(libDir, "tokens.ts"), rewriteImports(tokens, config))
  success(`Created ${libDir}/tokens.ts`)

  writeFile(path.join(libDir, "icons.tsx"), rewriteImports(icons, config))
  success(`Created ${libDir}/icons.tsx`)

  // Fetch and write CSS
  const css = await fetchFile("styles/globals.css")

  if (fs.existsSync(cssPath)) {
    const existing = fs.readFileSync(cssPath, "utf-8")
    if (existing.includes("--kaze-bg")) {
      warn(`${cssPath} already has kaze tokens, skipping`)
    } else {
      fs.appendFileSync(cssPath, "\n" + css)
      success(`Appended kaze tokens to ${cssPath}`)
    }
  } else {
    writeFile(cssPath, css)
    success(`Created ${cssPath}`)
  }

  // Create components dir
  fs.mkdirSync(componentsDir, { recursive: true })
  success(`Created ${componentsDir}/`)

  log("")
  log(`${c.bold}Done!${c.reset} Add components with:`)
  log(`  ${c.cyan}npx kazeui add button${c.reset}`)
  log(`  ${c.cyan}npx kazeui add card dialog${c.reset}`)
  log("")
}

// ─── ADD COMMAND ───
async function add(components: string[]) {
  const config = readConfig()
  if (!config) {
    error("No kaze.json found. Run `npx kazeui init` first.")
    process.exit(1)
  }

  if (components.length === 0) {
    error("Specify at least one component: npx kazeui add button")
    process.exit(1)
  }

  log("")

  const registry = await fetchRegistry()
  const toInstall = new Set<string>()

  // Resolve dependencies
  function resolve(name: string) {
    if (toInstall.has(name)) return
    const entry = registry.components[name]
    if (!entry) { error(`Unknown component: ${name}`); return }
    toInstall.add(name)
    for (const dep of entry.registryDependencies || []) resolve(dep)
  }

  for (const name of components) resolve(name)

  // Fetch and write each component
  for (const name of toInstall) {
    const entry = registry.components[name]
    for (const file of entry.files) {
      const source = await fetchFile(`components/${file}`)
      const rewritten = rewriteImports(source, config)
      const dest = path.join(config.componentsDir, file)

      if (fs.existsSync(dest)) {
        warn(`${dest} already exists, overwriting`)
      }

      writeFile(dest, rewritten)
      success(`${entry.name} → ${dest}`)
    }
  }

  log("")
}

// ─── LIST COMMAND ───
async function list() {
  const registry = await fetchRegistry()
  log("")
  log(`${c.bold}Available components${c.reset}`)
  log("")
  for (const [slug, entry] of Object.entries<any>(registry.components)) {
    const deps = entry.registryDependencies?.length
      ? ` ${c.dim}→ ${entry.registryDependencies.join(", ")}${c.reset}`
      : ""
    log(`  ${c.cyan}${slug.padEnd(14)}${c.reset} ${entry.description}${deps}`)
  }
  log("")
}

// ─── CLI ───
const program = new Command()
  .name("kazeui")
  .description("Add KazeUI components to your project")
  .version("0.1.0")

program
  .command("init")
  .description("Initialize KazeUI in your project")
  .action(init)

program
  .command("add")
  .description("Add components to your project")
  .argument("<components...>", "Component names to add")
  .action(add)

program
  .command("list")
  .description("List all available components")
  .action(list)

program.parse()
