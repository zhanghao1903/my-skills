# Quality Checklist

Run this checklist before delivering a visual demo page.

## Required

- The HTML opens locally without a build step.
- The page has one clear title and one clear core claim.
- Text does not overflow cards, buttons, labels, or diagram nodes.
- Architecture, workflow, lifecycle, and dataflow arrows do not cross, overlap,
  or reuse the same route segment unless that visual merge is intentional and
  clearly labeled.
- Explicit `via` routes stay horizontal/vertical; use a straight diagonal edge
  only when it is intentional, short, and visually readable.
- Arrows enter each node from the side named by `toSide`: top/bottom edges use
  a vertical final segment, and left/right edges use a horizontal final segment.
- Flow and connection lines do not pass through nodes/components that are not
  their source or target.
- Flow and connection labels do not sit on top of nodes/components, other
  labels, or busy intersections.
- Images and iframes stay within their containers.
- The main stage is readable at desktop width and does not collapse badly on mobile.
- Interactive controls, if any, are keyboard/click accessible.
- External links use `target="_blank"` and `rel="noreferrer"` when appropriate.
- Attribution/license files are preserved if upstream assets are redistributed.

## Recommended Verification

- Open in a browser.
- Check a desktop viewport around 1440x900.
- Check a mobile viewport around 390x844.
- Take a screenshot if the visual result matters.

## Failure Fixes

- If text overflows: shorten labels first, then reduce grid density, then increase container size.
- If a diagram is too dense: split into two scenes or use progressive reveal.
- If arrows cross or overlap: align nodes by row first, then change
  `fromSide`/`toSide`, then assign separate `channelX`/`channelY` values or
  explicit orthogonal `via` points.
- If an explicit route creates a sharp diagonal segment near a node: align the
  last `via` point with the target anchor centerline, or move the node to a
  row that makes the edge horizontal.
- If an arrowhead points sideways while entering a top/bottom anchor: make the
  final `via` point share the target anchor's x coordinate; for left/right
  anchors, make it share the target anchor's y coordinate.
- If a line appears to run under another node or component: split that output
  into its own channel and route around the object instead of relying on
  overlap masking.
- If the page looks decorative but unclear: remove background effects and add stronger labels.
