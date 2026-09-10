---
name: HyunSu Lee Project Map
description: A sparse interactive network graph connecting selected work across five disciplines.
colors:
  paper: "#fafaf8"
  sidebar: "#fdfdfc"
  ink: "#171817"
  muted: "#6f7278"
  line: "#e2e2df"
  blue: "#2867d8"
  security: "#147a52"
  data: "#1686ae"
  infra: "#b26a10"
  ai: "#6636c6"
  game: "#b51f3d"
typography:
  mapTitle: "clamp(2.8rem, 4.1vw, 4.9rem) / 700 / .83"
  mobileTitle: "clamp(3.3rem, 15vw, 5.3rem) / 700 / .84"
  panelTitle: "clamp(2rem, 2.7vw, 3.25rem) / 700 / .96"
  identity: "1.22rem / 700 / 1.2"
  body: ".82rem / 400 / 1.5"
  projectLabel: "clamp(.66rem, .72vw, .78rem) / 700 / 1.2"
  micro: ".63rem–.72rem / 400 / 1.5"
rounded:
  node: "50%"
  tag: "999px"
  none: "0"
---

# Design System: HyunSu Lee Project Map

## Creative North Star

**The Knowledge Graph.** The portfolio is the graph itself: a near-white canvas, fine category-colored edges, large discipline hubs and small project nodes. The visual reference is a sparse technical knowledge atlas, not a dashboard or a prose-led portfolio.

## Composition

Desktop uses a two-part, full-height composition:

- A 215px left index contains identity, five discipline filters and contact links.
- The remaining viewport is a draggable, pannable and zoomable SVG network.
- A right detail sheet appears only after a project node is selected.

The graph has a composed initial topology but every node can be dragged. Empty-space drag pans the canvas, and wheel or controls change zoom. Mobile keeps the graph and converts the sidebar into a compact top rail; project detail becomes a bottom sheet.

## Color

The foundation is near-white and cool neutral: `paper`, `sidebar`, `ink`, `muted`, and `line`. Color has one job—discipline identity. Security is green, AI violet, Game red, Data cyan-blue and Cloud / Infra amber. Blue is reserved for focus, the identity marker and repository links.

All body-size category colors maintain at least 4.5:1 contrast on paper. Lines remain neutral until a category or project selection gives color semantic meaning.

## Typography

One Korean-safe sans-serif stack keeps the system coherent. The oversized, tightly tracked `Project Map` title provides the editorial gesture; project names and interface copy remain compact. Metadata is uppercase and micro-sized only where it acts as coordinate or document notation. Body copy stays at normal tracking.

## Interaction

- Every discipline and project node supports mouse or touch dragging; connected lines update continuously.
- Nodes drift by 2–4 graph units at independent slow phases so the network feels alive without losing label legibility; reduced-motion keeps them still.
- Dragging empty canvas pans the viewport; wheel and bottom controls change zoom or reset the view.
- Selecting a discipline emphasizes its connected projects and lines while dimming the rest.
- Selecting a project emphasizes every discipline it touches and opens the evidence rail.
- Clicking empty canvas, an edge, or non-interactive chrome clears the current selection.
- The close control clears the selection and restores the full topology.
- A single line-arrival animation introduces the map. Panel content uses one short upward settle; reduced-motion removes both.
- Keyboard focus uses a 2px ink outline with a 4px offset.

## Components

### Discipline Hub

A large, double-ring circle carrying the category color and label. Its scale makes the hierarchy obvious without an explanatory legend.

### Project Point

A small colored point paired with a balanced text label. It has no card surface. Projects with several disciplines receive several lines but one point.

### Evidence Rail

A flat side rail showing project type, name, summary, disciplines, role, work, stack and a verified repository or case-study link. Private company repositories are identified as private and never receive fabricated URLs.

### Mobile Graph

The same graph remains interactive below the compact top identity and horizontal discipline filters. Project details open as a bottom sheet.

## Rules

- Keep discipline hubs larger than every project point.
- Preserve the initial topology unless projects are added or relationships change; user-dragged positions remain session-local.
- Use color only to encode disciplines and active relationships.
- Keep project type in detail metadata, not as competing graph hubs.
- Do not add marketing copy, helper sentences, cards, 3D physics, search, or external graph libraries.
- Do not expose company infrastructure, data, identifiers or private repository locations.
