---
name: visual-demo-page
description: Generate standalone HTML visual demo pages from user-provided content, articles, PRDs, technical plans, project introductions, architecture notes, or teaching material. Use when the user wants a visual presentation page, animated explanation page, concept flow, architecture map, product demo story page, recruiter-facing proof page, or reusable visualization based on the AI_Animation template style.
---

# Visual Demo Page

Create a polished, standalone HTML page that turns content into a visual explanation. Optimize for screen sharing, product demos, portfolio pages, and short recorded walkthroughs.

## Workflow

1. Extract the message: audience, core claim, supporting evidence, sequence, entities, risks, and desired call-to-action.
2. Pick one mode using `references/mode-selection.md`.
3. Convert the content into scenes with `references/content-to-scenes.md`.
4. Generate a single HTML file:
   - Prefer `scripts/create-demo.mjs` for fast, self-contained output.
   - Use `scripts/dynamic-archify/` when the result needs a rigorous architecture, workflow, lifecycle, dataflow, or sequence diagram.
   - Use files in `assets/ppt-animation/`, `assets/flowchart/`, and `assets/scholar-notes/` as visual references or copyable template starting points.
5. Verify with `references/quality-checklist.md` before delivering.

## Modes

- `slide-demo`: narrative presentation with 3-6 visual sections. Use for product stories, PRDs, portfolio evidence, and article-to-demo conversions.
- `concept-flow`: causal flow or explanation map. Use when the content has inputs, transformations, dependencies, decisions, or before/after logic.
- `architecture-map`: systems, components, event flow, lifecycle, workflow, dataflow, and sequence diagrams. Use `scripts/dynamic-archify/` for strict diagram output.
- `visual-note`: article or research note turned into a readable one-page board. Use only when the user asks for a note-like artifact.

## Fast Path

Create an input JSON:

```json
{
  "mode": "slide-demo",
  "title": "Agent Context Governance",
  "subtitle": "How task context becomes an execution contract",
  "audience": "AI product manager recruiters",
  "sections": [
    {
      "eyebrow": "Problem",
      "title": "Raw chat history is not a product contract",
      "body": "Agent products need structured state, permission boundaries, and evidence views.",
      "points": ["Task state", "Execution boundary", "Audit trail"]
    }
  ],
  "steps": [
    { "label": "User goal", "description": "Ambiguous natural-language request" },
    { "label": "Task context", "description": "Structured contract for execution" },
    { "label": "Agent loop", "description": "Actions, observations, and recovery" }
  ],
  "links": [
    { "label": "Case study", "url": "https://example.com" }
  ]
}
```

Run:

```bash
node /path/to/visual-demo-page/scripts/create-demo.mjs input.json output.html
```

The output is a standalone HTML file with inline CSS and JavaScript.

## Architecture Diagrams

For structured architecture work, use the upstream renderer bundle in `scripts/dynamic-archify/`.

1. Read `scripts/dynamic-archify/schemas/README.md`.
2. Choose a schema from `scripts/dynamic-archify/schemas/`.
3. Start from a close example in `scripts/dynamic-archify/examples/`.
4. Run the relevant renderer from `scripts/dynamic-archify/renderers/`.
5. Fix every renderer layout error before delivering, especially edge crossings,
   reused route segments, diagonal `via` segments, label collisions, and
   unreadably dense areas.

If the renderer needs npm dependencies, install them inside `scripts/dynamic-archify/` before running. Keep generated output outside the skill directory unless updating the skill itself.

## Visual Rules

- Default to 16:9, responsive, and readable on 1440px desktop and 390px mobile.
- Use real content hierarchy: one main claim, 3-6 sections, no dense paragraph walls.
- Prefer visual explanation over decoration. Every shape, edge, label, and image should explain something.
- Keep code, data, and architecture labels short enough to fit their containers.
- For architecture/dataflow maps, route the primary flow left-to-right with
  minimal crossings. Align `via` points to source/target anchors so explicit
  routes stay horizontal/vertical; use `route: "straight"` only when a diagonal
  line is intentional and readable.
- Separate dense secondary flows with distinct rows, `channelX`/`channelY`
  values, or explicit `via` channels. If the renderer reports crossings or
  reused route segments, adjust the JSON before regenerating the HTML.
- For recruiter-facing demos, put evidence first: project outcome, metric, product value, then implementation detail.
- Avoid copying suspicious/phishing/security lookalike examples from the upstream repository into user-facing work.

## Attribution

This skill bundles selected templates and renderers from `Unclecheng-li/AI_Animation` under MIT license. Preserve `assets/upstream-source/AI_Animation-MIT-LICENSE` and `references/upstream-source.md` when redistributing or modifying this skill.
