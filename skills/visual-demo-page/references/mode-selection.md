# Mode Selection

Use this file only when choosing the visualization format.

## Decision Table

| User content | Best mode | Output shape |
| --- | --- | --- |
| Project intro, resume proof, product case, PRD summary | `slide-demo` | Hero claim, evidence blocks, short scene flow |
| Teaching an idea, explaining cause and effect, comparing states | `concept-flow` | Flow track, decision points, before/after blocks |
| System architecture, Agent loop, workflow, event lifecycle, dataflow | `architecture-map` | Nodes, lanes, edges, state transitions |
| Article notes, literature notes, digest board | `visual-note` | Dense but organized one-page note |

## Selection Heuristics

- If the user says "demo", "portfolio", "presentation", "showcase", or "video recording", start with `slide-demo`.
- If the user says "flow", "process", "why", "principle", or "from A to B", start with `concept-flow`.
- If the content has named systems, services, stores, queues, tools, or runtime states, consider `architecture-map`.
- If the user provides a long article and asks for a visual summary, use `visual-note` only if a note board is better than a presentation.

## Escalation

When content is unclear, infer a reasonable mode and state the assumption in the final response. Do not stop to ask unless the wrong mode would waste substantial work.
