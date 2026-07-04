#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const usage = `Usage:
  node create-demo.mjs input.json output.html

Input JSON fields:
  mode      slide-demo | concept-flow | architecture-map | visual-note
  title     required string
  subtitle  optional string
  audience  optional string
  sections  array of { eyebrow, title, body, points[] }
  steps     array of { label, description }
  links     array of { label, url }
  theme     optional { accent, background }
`;

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath || inputPath === "--help") {
  console.log(usage);
  process.exit(inputPath === "--help" ? 0 : 1);
}

const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const output = renderPage(normalize(input));
fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Created ${outputPath}`);

function normalize(raw) {
  const mode = raw.mode || "slide-demo";
  const sections = Array.isArray(raw.sections) && raw.sections.length > 0
    ? raw.sections
    : [{ eyebrow: "Core", title: raw.title || "Visual Demo", body: raw.subtitle || "", points: [] }];

  return {
    mode,
    title: String(raw.title || "Visual Demo"),
    subtitle: String(raw.subtitle || ""),
    audience: String(raw.audience || ""),
    sections: sections.slice(0, 8).map((section, index) => ({
      eyebrow: String(section.eyebrow || `Scene ${index + 1}`),
      title: String(section.title || ""),
      body: String(section.body || ""),
      points: Array.isArray(section.points) ? section.points.slice(0, 5).map(String) : [],
    })),
    steps: Array.isArray(raw.steps) ? raw.steps.slice(0, 8).map((step, index) => ({
      label: String(step.label || `Step ${index + 1}`),
      description: String(step.description || ""),
    })) : [],
    links: Array.isArray(raw.links) ? raw.links.slice(0, 4).map((link) => ({
      label: String(link.label || "Open"),
      url: String(link.url || "#"),
    })) : [],
    theme: {
      accent: raw.theme?.accent || "#2563eb",
      background: raw.theme?.background === "dark" ? "dark" : "light",
    },
  };
}

function renderPage(data) {
  const dark = data.theme.background === "dark";
  const background = dark ? "#080b12" : "#f7f9fc";
  const surface = dark ? "#111827" : "#ffffff";
  const text = dark ? "#f8fafc" : "#172033";
  const muted = dark ? "#a8b3c7" : "#607089";
  const line = dark ? "rgba(148, 163, 184, 0.24)" : "rgba(92, 112, 138, 0.2)";

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.title)}</title>
  <style>
    :root {
      --accent: ${escapeAttr(data.theme.accent)};
      --bg: ${background};
      --surface: ${surface};
      --text: ${text};
      --muted: ${muted};
      --line: ${line};
      --warm: #f59e0b;
      --cool: #14b8a6;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background: var(--bg);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 30%),
        radial-gradient(circle at 80% 0%, rgba(20, 184, 166, 0.12), transparent 26%),
        var(--bg);
    }
    main {
      width: min(1180px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 36px 0;
    }
    .stage {
      position: relative;
      min-height: min(720px, calc(100vh - 72px));
      border: 1px solid var(--line);
      border-radius: 24px;
      overflow: hidden;
      background: color-mix(in srgb, var(--surface) 90%, transparent);
      box-shadow: 0 26px 80px rgba(15, 23, 42, 0.14);
    }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
      gap: 28px;
      padding: 44px;
      align-items: center;
    }
    .kicker {
      color: var(--cool);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }
    h1 {
      margin: 12px 0 14px;
      font-size: clamp(40px, 7vw, 86px);
      line-height: 0.98;
      letter-spacing: 0;
    }
    .subtitle {
      margin: 0;
      max-width: 680px;
      color: var(--muted);
      font-size: clamp(17px, 2.2vw, 24px);
      line-height: 1.5;
    }
    .audience {
      display: inline-flex;
      margin-top: 22px;
      padding: 9px 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
      background: color-mix(in srgb, var(--surface) 80%, transparent);
    }
    .flow-panel {
      padding: 22px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 9%, var(--surface)), var(--surface));
    }
    .flow {
      display: grid;
      gap: 12px;
    }
    .step {
      position: relative;
      padding: 16px 16px 16px 46px;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: color-mix(in srgb, var(--surface) 88%, transparent);
      animation: rise 520ms ease both;
    }
    .step::before {
      content: "";
      position: absolute;
      left: 18px;
      top: 20px;
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent) 14%, transparent);
    }
    .step strong {
      display: block;
      font-size: 15px;
      margin-bottom: 4px;
    }
    .step span {
      display: block;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      padding: 0 44px 44px;
    }
    .card {
      min-height: 188px;
      padding: 20px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      animation: rise 520ms ease both;
    }
    .card:nth-child(2n) {
      transform: translateY(14px);
    }
    .card .eyebrow {
      color: var(--accent);
      font-size: 12px;
      font-weight: 850;
      text-transform: uppercase;
    }
    .card h2 {
      margin: 10px 0 10px;
      font-size: clamp(18px, 2vw, 25px);
      line-height: 1.18;
      letter-spacing: 0;
    }
    .card p {
      margin: 0;
      color: var(--muted);
      line-height: 1.58;
      font-size: 15px;
    }
    .points {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
      padding: 0;
      list-style: none;
    }
    .points li {
      max-width: 100%;
      padding: 7px 10px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--text);
      font-size: 12px;
      font-weight: 750;
      background: color-mix(in srgb, var(--accent) 8%, transparent);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 0 44px 44px;
    }
    .links a {
      color: white;
      background: var(--accent);
      text-decoration: none;
      font-weight: 800;
      padding: 11px 15px;
      border-radius: 12px;
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 860px) {
      main { width: min(100vw - 20px, 720px); padding: 10px 0; }
      .stage { border-radius: 16px; }
      .hero { grid-template-columns: 1fr; padding: 24px; }
      .cards { grid-template-columns: 1fr; padding: 0 24px 24px; }
      .card:nth-child(2n) { transform: none; }
      .links { padding: 0 24px 24px; }
    }
  </style>
</head>
<body>
  <main>
    <section class="stage" aria-label="${escapeAttr(data.title)}">
      <div class="hero">
        <div>
          <div class="kicker">${escapeHtml(modeLabel(data.mode))}</div>
          <h1>${escapeHtml(data.title)}</h1>
          ${data.subtitle ? `<p class="subtitle">${escapeHtml(data.subtitle)}</p>` : ""}
          ${data.audience ? `<div class="audience">${escapeHtml(data.audience)}</div>` : ""}
        </div>
        ${renderFlow(data)}
      </div>
      <div class="cards">
        ${data.sections.map(renderSection).join("\n")}
      </div>
      ${renderLinks(data.links)}
    </section>
  </main>
</body>
</html>`;
}

function renderFlow(data) {
  const steps = data.steps.length > 0
    ? data.steps
    : data.sections.slice(0, 4).map((section) => ({ label: section.eyebrow, description: section.title }));

  return `<aside class="flow-panel" aria-label="Flow">
    <div class="flow">
      ${steps.map((step, index) => `<div class="step" style="animation-delay:${index * 80}ms">
        <strong>${escapeHtml(step.label)}</strong>
        <span>${escapeHtml(step.description)}</span>
      </div>`).join("\n")}
    </div>
  </aside>`;
}

function renderSection(section, index) {
  return `<article class="card" style="animation-delay:${120 + index * 80}ms">
    <div class="eyebrow">${escapeHtml(section.eyebrow)}</div>
    <h2>${escapeHtml(section.title)}</h2>
    ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}
    ${section.points.length > 0 ? `<ul class="points">${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
  </article>`;
}

function renderLinks(links) {
  if (links.length === 0) return "";
  return `<nav class="links" aria-label="Links">
    ${links.map((link) => `<a href="${escapeAttr(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("\n")}
  </nav>`;
}

function modeLabel(mode) {
  return {
    "slide-demo": "Visual demo",
    "concept-flow": "Concept flow",
    "architecture-map": "Architecture map",
    "visual-note": "Visual note",
  }[mode] || "Visual demo";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
