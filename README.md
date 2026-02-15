# ToolKit.dev

A native macOS developer utility app with 34 tools. Built with Next.js, Tailwind CSS, and Tauri. Everything runs client-side — no data ever leaves your machine.

## Tools

| Encoders & Decoders | Formatters & Minifiers | Generators |
|---|---|---|
| Base64 Encode/Decode | JSON Formatter & Validator | UUID Generator |
| URL Encode/Decode | SQL Formatter | Lorem Ipsum Generator |
| HTML Entity Encoder | CSS Minifier | Password Generator |
| JWT Decoder | SVG Optimizer | Placeholder Image Generator |
| Image to Base64 | Markdown Preview | |
| Text to Binary/ASCII/Hex | | |

| Converters | Calculators & Utilities | Visual CSS Tools |
|---|---|---|
| JSON to YAML | Chmod Calculator | Box Shadow Generator |
| Color Converter (HEX/RGB/HSL) | Cron Expression Parser | Gradient Generator |
| Number Base Converter | Aspect Ratio Calculator | |
| String Case Converter | Character & Word Counter | |
| Timestamp Converter | | |

| References | Comparison |
|---|---|
| HTTP Status Codes | Text Diff Checker |
| Regex Cheat Sheet | |
| Regex Tester | |
| Keyboard Shortcuts (Mac, VS Code, Chrome, Terminal) | |
| Markdown Table Generator | |
| Browser & Device Info | |
| Hash Generator (SHA-1/256/384/512) | |

## Tech Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Desktop:** Tauri 2 (native macOS WebView, ~5MB binary)
- **Dependencies:** Zero runtime dependencies beyond React/Next.js — all tools are implemented from scratch

## Getting Started

### Prerequisites

- Node.js 18+
- Rust (install via [rustup](https://rustup.rs))

### Install

```bash
cd toolkit-dev
npm install
```

### Development

```bash
# Web dev server (localhost:3000)
npm run dev

# Desktop app dev mode (hot reload)
npm run tauri:dev
```

### Build

```bash
# Static web export (outputs to /out)
npm run build

# macOS .app bundle (outputs to src-tauri/target/release/bundle/macos/)
npm run tauri:build
```

The built `.app` is at:
```
src-tauri/target/release/bundle/macos/ToolKit.app
```

## Adding a New Tool

1. Create a directory under `src/app/your-tool-slug/`
2. Add `page.tsx` (the tool UI) and `layout.tsx` (SEO metadata)
3. Register it in `src/lib/tools.ts`
4. Rebuild

Each tool is a standalone React page. No shared state between tools.

## Project Structure

```
toolkit-dev/
├── src/
│   ├── app/                  # Next.js App Router pages (one folder per tool)
│   ├── components/           # Shared components (Navbar, Footer, CopyButton, etc.)
│   └── lib/
│       └── tools.ts          # Tool registry (name, description, slug, icon)
├── src-tauri/                # Tauri native shell
│   ├── src/                  # Rust entry point
│   ├── tauri.conf.json       # App config (window size, identifier, etc.)
│   └── icons/                # App icons
├── next.config.ts            # Static export config
├── postcss.config.mjs        # Tailwind PostCSS config
└── package.json
```

## License

ISC
