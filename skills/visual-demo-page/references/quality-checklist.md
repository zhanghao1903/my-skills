# Quality Checklist

Run this checklist before delivering a visual demo page.

## Required

- The HTML opens locally without a build step.
- The page has one clear title and one clear core claim.
- Text does not overflow cards, buttons, labels, or diagram nodes.
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
- If the page looks decorative but unclear: remove background effects and add stronger labels.
