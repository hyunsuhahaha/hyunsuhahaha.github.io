---
name: HyunSu Lee Project Index
description: A compact, document-like portfolio where the project record is the profile.
colors:
  ink: "#151515"
  muted: "#707070"
  line: "#e7e7e7"
  paper: "#ffffff"
  focus: "#4a4a4a"
typography:
  display:
    fontFamily: '"BIZ UDPGothic", "Helvetica Neue", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2.15rem, 5vw, 3.05rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"BIZ UDPGothic", "Helvetica Neue", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"BIZ UDPGothic", "Helvetica Neue", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"BIZ UDPGothic", "Helvetica Neue", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: '"BIZ UDPGothic", "Helvetica Neue", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  row: "14px"
  lg: "24px"
  xl: "32px"
  section: "58px"
  header: "68px"
components:
  project-disclosure:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 2px"
    height: "59px"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.75rem"
---

# Design System: HyunSu Lee Project Index

## Overview

**Creative North Star: "The Technical Index"**

The root portfolio behaves like a concise project ledger: white paper, charcoal type, muted annotations, and hairline rules. The interface recedes so visitors can scan evidence quickly, then open only the records they need.

It is compact without feeling compressed. Hierarchy comes from weight, spacing, and alignment—not decoration—and the project itself remains the profile.

**Key Characteristics:**

- A centered single-column index with a firm 900px ceiling.
- Project names lead; summaries and metadata remain quiet.
- Native disclosure behavior with one restrained arrow gesture.
- Flat, square, monochrome construction throughout.

## Colors

The palette is strictly neutral: paper creates openness, ink establishes hierarchy, and two grays separate annotation from structure.

### Primary

- **Charcoal Ink:** Primary text, headings, selection fill, and the skip-link surface.

### Neutral

- **White Paper:** The only page and component background.
- **Annotation Gray:** Supporting summaries, labels, affiliation, and privacy status.
- **Hairline Gray:** Project-row dividers only.
- **Focus Graphite:** High-contrast keyboard focus outlines.

**The No Accent Rule.** Do not introduce brand, status, or decorative color into this index.

## Typography

**Display Font:** BIZ UDPGothic with a system sans-serif fallback stack  
**Body Font:** The same sans-serif stack

**Character:** Direct, contemporary, and documentation-like. A single family keeps Korean and English records visually continuous; size and weight carry the hierarchy.

### Hierarchy

- **Display** (700, fluid 2.15–3.05rem, 1): Owner name only.
- **Headline** (700, 1.45rem): Project-group headings.
- **Title** (700, 1.12rem): Project names in disclosure rows.
- **Body** (400, 1rem, 1.55): Summaries and general reading text; detail copy steps down to 0.9rem.
- **Label** (400, 0.82rem): Definition terms and privacy metadata.

**The Weight Before Ornament Rule.** Establish hierarchy with weight and scale; underlining appears only as an interaction cue.

## Layout

The index is centered at a maximum width of 900px with 40px total desktop gutter and generous vertical edges. Identity and contact links share the first row; project groups follow at 58px intervals. Each desktop project summary uses three columns—name, summary, arrow—and detail content is capped at 720px with a 120px label column.

At 700px and below, the gutter contracts to 28px, identity and navigation stack, project summaries become a two-column name/arrow layout with the summary below, and definition rows collapse to one column. Word breaks stay phrase-aware for Korean copy.

## Elevation & Depth

There are no shadows, overlays, gradients, or raised surfaces. Depth is intentionally absent; section spacing and one-pixel rules create all separation.

**The Flat Ledger Rule.** Every project remains on the shared paper plane in every state.

## Shapes

The system is rectilinear and unboxed. Corners have no radius, rows have no enclosing cards, and one-pixel horizontal rules are the only recurring geometry.

## Components

### Identity Header

The owner name and affiliation anchor the left edge while plain GitHub and Email links sit opposite. Links underline on hover and stack beneath the identity on mobile.

### Project Disclosure

Each project is a native `details` record with a three-column desktop summary. Hover underlines the project name and translates the arrow 4px; the open state rotates the same arrow 90 degrees. The 180ms ease-out transition is removed for reduced-motion users.

Expanded content uses a compact definition list for role, work, stack, and repository status. Public evidence is a bold link; unavailable repositories are muted text, never fabricated calls to action.

### Skip Link

The keyboard skip link is fixed off-canvas until focus, then appears as white text on charcoal with a square silhouette.

### Focus State

All focus-visible elements receive a 2px graphite outline with 4px offset. Focus remains structural and monochrome.

## Do's and Don'ts

### Do:

- **Do** keep the root index within its 900px single-column frame.
- **Do** use hairline rules, spacing, and typographic weight to express structure.
- **Do** preserve native `details`/`summary` behavior and the single arrow interaction.
- **Do** keep private project evidence visibly private and non-clickable.

### Don't:

- **Don't** introduce cards, shadows, rounded corners, gradients, imagery, or accent colors.
- **Don't** add ornamental motion beyond arrow translation and rotation.
- **Don't** apply this root-index system to the legacy MES case-study stylesheet.
- **Don't** invent controls or component variants absent from the implementation.
