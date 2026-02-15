export interface Tool {
  name: string;
  description: string;
  slug: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON with syntax highlighting",
    slug: "/json-formatter",
    icon: "{ }",
  },
  {
    name: "Base64 Encode/Decode",
    description: "Encode and decode Base64 strings instantly",
    slug: "/base64",
    icon: "B64",
  },
  {
    name: "Regex Tester",
    description: "Test regex patterns with live matching and group highlighting",
    slug: "/regex-tester",
    icon: ".*",
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats",
    slug: "/color-converter",
    icon: "#C",
  },
  {
    name: "URL Encode/Decode",
    description: "Encode and decode URL-safe strings instantly",
    slug: "/url-encode",
    icon: "%U",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, and SHA-256 hashes from text",
    slug: "/hash-generator",
    icon: "#H",
  },
  {
    name: "UUID Generator",
    description: "Generate random v4 UUIDs with bulk generation",
    slug: "/uuid-generator",
    icon: "ID",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text by paragraphs, sentences, or words",
    slug: "/lorem-ipsum",
    icon: "Aa",
  },
  {
    name: "Markdown Preview",
    description: "Write markdown and see a live rendered preview side-by-side",
    slug: "/markdown-preview",
    icon: "MD",
  },
  {
    name: "JWT Decoder",
    description: "Decode JWT tokens and inspect header, payload, and expiration",
    slug: "/jwt-decoder",
    icon: "JW",
  },
  {
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    slug: "/timestamp",
    icon: "TS",
  },
  {
    name: "CSS Minifier",
    description: "Minify CSS by stripping whitespace and comments",
    slug: "/css-minifier",
    icon: "{}",
  },
  {
    name: "Text Diff",
    description: "Compare two blocks of text and highlight the differences",
    slug: "/text-diff",
    icon: "+-",
  },
  {
    name: "Number Base Converter",
    description: "Convert between binary, octal, decimal, and hexadecimal",
    slug: "/base-converter",
    icon: "10",
  },
  {
    name: "HTML Entity Encoder",
    description: "Encode and decode HTML entities like &amp; &lt; &gt;",
    slug: "/html-entities",
    icon: "&;",
  },
  {
    name: "JSON to YAML",
    description: "Convert between JSON and YAML formats instantly",
    slug: "/json-yaml",
    icon: "YM",
  },
  {
    name: "Cron Parser",
    description: "Parse cron expressions and see next run times in plain English",
    slug: "/cron-parser",
    icon: "CR",
  },
  {
    name: "Chmod Calculator",
    description: "Calculate Unix file permissions — rwx to octal and back",
    slug: "/chmod",
    icon: "RW",
  },
  {
    name: "SQL Formatter",
    description: "Format and prettify SQL queries for readability",
    slug: "/sql-formatter",
    icon: "SQ",
  },
  {
    name: "String Case Converter",
    description: "Convert between camelCase, snake_case, kebab-case, PascalCase",
    slug: "/case-converter",
    icon: "Cc",
  },
  {
    name: "Password Generator",
    description: "Generate secure random passwords with customizable rules",
    slug: "/password-generator",
    icon: "**",
  },
  {
    name: "Character Counter",
    description: "Count characters, words, sentences, paragraphs, and reading time",
    slug: "/char-counter",
    icon: "WC",
  },
  {
    name: "Image to Base64",
    description: "Convert images to Base64 data URIs for embedding in code",
    slug: "/image-base64",
    icon: "IM",
  },
  {
    name: "Markdown Table",
    description: "Visual table editor that outputs markdown table syntax",
    slug: "/markdown-table",
    icon: "TB",
  },
  {
    name: "SVG Optimizer",
    description: "Minify SVG code by removing metadata and unnecessary attributes",
    slug: "/svg-optimizer",
    icon: "SV",
  },
  {
    name: "Box Shadow Generator",
    description: "Visual CSS box-shadow builder with live preview",
    slug: "/box-shadow",
    icon: "BS",
  },
  {
    name: "Gradient Generator",
    description: "Visual CSS gradient builder with angle, stops, and code output",
    slug: "/gradient",
    icon: "GR",
  },
  {
    name: "Aspect Ratio Calculator",
    description: "Calculate aspect ratios and resize dimensions proportionally",
    slug: "/aspect-ratio",
    icon: "AR",
  },
  {
    name: "IP Address Info",
    description: "Show your public IP, user agent, and browser details",
    slug: "/ip-info",
    icon: "IP",
  },
  {
    name: "Text to Binary",
    description: "Convert text to binary, ASCII codes, or hex representation",
    slug: "/text-binary",
    icon: "01",
  },
  {
    name: "Placeholder Image",
    description: "Generate placeholder images by size, color, and text overlay",
    slug: "/placeholder-image",
    icon: "PH",
  },
  {
    name: "HTTP Status Codes",
    description: "Reference for all HTTP status codes with descriptions",
    slug: "/http-status",
    icon: "HT",
  },
  {
    name: "Regex Cheat Sheet",
    description: "Quick reference for regex syntax with searchable examples",
    slug: "/regex-cheatsheet",
    icon: "RX",
  },
  {
    name: "Keyboard Shortcuts",
    description: "Common keyboard shortcuts for Mac, VS Code, Chrome, and more",
    slug: "/keyboard-shortcuts",
    icon: "KB",
  },
];
