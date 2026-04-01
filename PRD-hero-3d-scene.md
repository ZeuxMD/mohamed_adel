## Problem Statement

The current hero section uses flat floating SVG decorations that communicate the right general idea but not the right level of craft. They do not create depth, they do not react to user input, and they do not give the hero a memorable interaction model. As a result, the hero undersells the portfolio: the page introduces a frontend developer, but the most visible part of the experience is still a static ornament layer.

The goal is to replace the current floating SVGs with a real 3D hero scene that feels intentional, modern, and site-specific while preserving readability, performance, and the existing content hierarchy. The new scene should reflect Mohamed’s frontend stack, support subtle mouse-driven interaction, and strengthen the hero without turning it into a toy or a demo.

## Solution

Replace the flat floating SVG layer with a hero-scoped WebGL scene containing three stylized, recognizable technology-inspired objects for React, Next.js, and Tailwind CSS. The scene should live inside a single shared canvas clipped to the hero section, remain behind the text and portrait, and respond to pointer movement across the full hero area.

The scene should use restrained motion and a dark semi-matte material language that matches the existing portfolio. On desktop, motion should be mostly cursor-driven with only a very low idle baseline. On direct hover, each object should play a distinct signature animation. On narrow mobile screens, the scene should simplify to two objects by removing the Next.js object first. The hero should also receive a subtle atmospheric backdrop and slight layout refinement so the 3D scene feels integrated rather than bolted on.

## User Stories

1. As a portfolio visitor, I want the hero section to feel visually distinctive, so that I immediately remember the site.
2. As a portfolio visitor, I want the hero decorations to feel alive, so that the page does not read as a static template.
3. As a portfolio visitor, I want the hero scene to react to my cursor, so that the page feels responsive to my presence.
4. As a portfolio visitor, I want the interaction to remain subtle, so that I can still focus on the headline and CTA.
5. As a portfolio visitor, I want the objects to look like real 3D forms, so that the hero feels materially richer than flat SVG icons.
6. As a portfolio visitor, I want the objects to reflect the developer’s actual stack, so that the visuals reinforce the portfolio content.
7. As a portfolio visitor, I want the scene to feature React, Next.js, and Tailwind CSS references, so that the technology theme feels intentional.
8. As a portfolio visitor, I want the scene objects to be stylized rather than literal copied logos, so that the hero feels designed instead of pasted together from brand assets.
9. As a portfolio visitor, I want each object to have a distinct motion identity, so that the scene rewards exploration.
10. As a portfolio visitor, I want the React object to react with orbital energy, so that it feels consistent with the atom-like mental model of the brand.
11. As a portfolio visitor, I want the Next.js object to feel precise and controlled, so that its interaction reads as refined rather than flashy.
12. As a portfolio visitor, I want the Tailwind CSS object to feel fluid and ribbon-like, so that its motion language contrasts well with the other objects.
13. As a portfolio visitor, I want the objects to remain behind the text and portrait, so that the hero stays readable and visually ordered.
14. As a portfolio visitor, I want the hero to keep the portrait visible, so that the page still feels personal and not purely decorative.
15. As a portfolio visitor, I want the portrait to become a quieter anchor, so that it supports rather than competes with the new scene.
16. As a portfolio visitor, I want the scene to be distributed across the hero instead of clustered in one corner, so that the composition feels balanced through asymmetry rather than clutter.
17. As a portfolio visitor, I want the scene to stay inside the hero section, so that it does not spill into the rest of the page.
18. As a portfolio visitor, I want the scene to respond when my cursor is anywhere in the hero, so that I do not encounter dead interaction zones.
19. As a portfolio visitor, I want hover activation to be forgiving, so that decorative interaction feels easy rather than precise.
20. As a portfolio visitor, I want no click interaction on the floating objects, so that I am not misled into thinking they are navigation controls.
21. As a portfolio visitor, I want the background to feel atmospheric, so that the 3D scene looks embedded in the hero instead of floating on a flat color.
22. As a portfolio visitor, I want the scene colors to harmonize with the site, so that the hero still feels like part of the same portfolio.
23. As a portfolio visitor, I want subtle brand hints to remain visible, so that I can still recognize which technologies the objects represent.
24. As a portfolio visitor, I want the camera to feel stable, so that motion adds polish without making the hero feel like a demo reel.
25. As a portfolio visitor, I want the scene to remain calm when I am not interacting, so that the hero does not demand constant attention.
26. As a mobile visitor, I want the hero to preserve spacing and readability, so that the scene does not crowd the stacked mobile layout.
27. As a mobile visitor, I want the scene to simplify when space is limited, so that the design stays intentional instead of shrinking everything blindly.
28. As a mobile visitor, I want mobile motion to remain autonomous and understated, so that the experience works without hover.
29. As a mobile visitor, I want the least legible object removed first on narrow screens, so that the simplified scene still reads clearly.
30. As a visitor with motion sensitivity, I want the scene to respect reduced-motion preferences, so that the site remains comfortable to use.
31. As a visitor on a lower-powered device, I want the scene to degrade gracefully, so that the portfolio still feels smooth.
32. As a visitor on a slower connection, I want the hero to remain usable while the scene initializes, so that I can still read the content and use the CTA.
33. As a recruiter or client, I want the hero to showcase interaction taste without overwhelming the page, so that I trust the developer’s judgment.
34. As a recruiter or client, I want the hero to signal frontend craft immediately, so that the portfolio differentiates itself quickly.
35. As a site owner, I want the new hero scene to replace the existing floating SVG concept without changing the message of the portfolio, so that the redesign remains aligned with the current personal brand.
36. As a site owner, I want the scene to be implemented in maintainable React modules, so that I can keep evolving the portfolio later.
37. As a site owner, I want the most complex interaction logic separated from presentational layout code, so that the feature remains understandable and testable.
38. As a site owner, I want the responsive rules for object count, motion, and degradation to be centralized, so that the hero behavior remains consistent across future changes.
39. As a site owner, I want a clearly defined hover and motion policy, so that future edits do not accidentally make the hero louder than intended.
40. As a site owner, I want the scene stack to be pinned to React 18-compatible dependency versions, so that implementation does not fail on dependency conflicts.

## Implementation Decisions

- Build a single hero-scoped 3D scene instead of multiple independent widgets or a page-wide background layer.
- Replace the current flat SVG decoration concept with one shared WebGL canvas that is clipped to the hero section only.
- Keep all 3D objects fully behind the hero text and portrait; they may approach the edges visually through depth and glow but must not cross in front of content.
- Preserve the portrait as a static anchor while reducing its visual dominance slightly through layout and styling refinements.
- Use three equal-weight stylized objects on desktop: React, Next.js, and Tailwind CSS.
- On narrow mobile screens, reduce the scene to two objects by removing Next.js first.
- Use stylized recognizable forms rather than literal brand-logo meshes.
- Adopt a site-matched visual language: dark semi-matte metallic materials with restrained emissive accents and only subtle brand-color hints.
- Add a subtle atmospheric hero-only backdrop to support the scene; keep the broader page theme unchanged.
- Make the scene intentionally asymmetric and designed rather than symmetrical or evenly mirrored.
- Distribute objects across the hero in a loose triangular composition, with the overall mass slightly biased toward the right side.
- Drive scene input from the full hero section rather than just the visible canvas area.
- Use slightly generous hover zones rather than requiring exact contact with thin geometry.
- Do not add click interactions, tooltips, or navigation behavior to the objects.
- Keep the camera mostly fixed with subtle drift rather than large orbiting movement.
- On desktop, make motion primarily cursor-driven with only a very low idle baseline.
- On mobile, rely on autonomous understated motion because hover is unavailable.
- Give each object a distinct hover identity:
- React object: brighten the core, accelerate and slightly precess the orbit rings, then settle into a faster hovered loop.
- Next.js object: tilt toward the cursor, pulse the carved inner form, and apply a controlled rim spin.
- Tailwind CSS object: loosen ribbon strands, sweep them past each other, then re-tighten into a flowing loop.
- Keep scene lighting minimal and communicate depth through object lighting and backdrop treatment rather than visible cast shadows.
- Pin the 3D dependency stack to React 18-compatible versions rather than installing the latest major releases indiscriminately. Based on npm package metadata checked on March 31, 2026, `@react-three/fiber` 8.x and `@react-three/drei` 9.122.0 are compatible with React 18, while the latest `@react-three/fiber` release line is not.
- Organize the implementation around a small set of separable modules:
- A hero presentation shell responsible for layout, backdrop, content layering, and portrait treatment.
- A scene composition module responsible for camera, lights, breakpoint-specific object placement, and object count decisions.
- Procedural object modules for the React, Next.js, and Tailwind CSS forms and their local hover behaviors.
- A scene controller module or hook responsible for pointer tracking, hover state, responsive degradation, reduced-motion policy, and performance caps.
- Prefer deep modules for policy and behavior over scattering scene math across multiple visual components.

## Testing Decisions

- Good tests should validate externally observable behavior and stable feature rules, not internal implementation details like exact Three.js object trees or pixel-perfect rendering snapshots.
- Test the scene controller behavior in isolation wherever possible:
- Pointer normalization across the hero interaction field.
- Hover-state transitions and the distinction between global cursor drift and stronger direct-hover response.
- Responsive degradation rules, including reducing to two objects on narrow mobile screens.
- Reduced-motion and performance-cap policy decisions.
- Test scene configuration and composition rules as pure inputs/outputs wherever feasible:
- Which objects render at which breakpoints.
- Which object is removed first on narrow screens.
- Whether content-layering rules keep the scene behind text and portrait.
- Add light integration tests for the hero shell to verify that the hero still renders core content, the CTA remains accessible, and the WebGL layer does not break layout or interaction flow.
- Treat detailed visual fidelity, material tuning, and frame-rate validation as manual QA concerns rather than brittle automated assertions.
- There is no prior art for automated tests in the current codebase; the repository currently contains no test files, so this feature will need to establish its own testing pattern.
- If test coverage is introduced, prefer a small, behavior-focused stack that can exercise pure controllers and basic React integration instead of trying to deeply test the rendering internals of the 3D library.

## Out of Scope

- Making the 3D objects clickable.
- Adding object-triggered navigation, tooltips, modals, or content panels.
- Turning the hero into a full interactive demo or game-like playground.
- Reworking the rest of the portfolio sections to match the hero redesign.
- Replacing the portrait with a 3D avatar or animating the portrait itself.
- Introducing literal imported logo models or a separate 3D asset-authoring pipeline as part of this feature.
- Adding complex post-processing, cinematic camera motion, or visually loud effects that would compromise performance.
- Redesigning the site’s overall brand palette away from its current charcoal-and-green foundation.
- Creating a generalized 3D framework for the whole site outside the scope of the hero section.

## Further Notes

- The current repository is a Vite + React 18 portfolio with a simple component structure and no testing setup. The PRD should assume incremental introduction of the 3D scene rather than a broad architecture rewrite.
- The hero redesign should be judged primarily on composition, readability, performance, and taste, not just on technical novelty.
- Because the site owner explicitly prefers a restrained result, implementation should bias toward under-animation rather than over-animation when tradeoffs appear.
- The previous floating SVG layer should be considered fully superseded once the 3D hero scene is in place.
