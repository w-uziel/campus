# Campus Sketch Frontend Redesign

## Overview

- Redesign the complete Campus frontend as an original monochrome, hand-drawn student portal.
- Use dbrand Sketch 2D as the primary visual reference for doubled contours, marker lettering, hatch marks, and high-contrast black-and-white rendering.
- Keep Campus dark-only and desktop-first, with intentional support beginning at a 1024px viewport.
- Retain the Campus name while replacing the current geometric lime identity with a new hand-rendered mark and wordmark.
- Preserve all current routes, mock data, dashboard customization, local persistence, assignment state changes, notification state, calendar behavior, and simulated submissions.
- Keep currently inert prototype affordances, including global search and the avatar control, unchanged functionally.
- Remove course-color identity from the interface without introducing replacement colors, symbols, or patterns.
- Use handwritten display typography for branding, headings, annotations, and controls while keeping dense academic content in a conventional readable face.
- Replace visible Lucide artwork with a cohesive custom SVG sketch-icon system.
- Use expressive stroke, scribble, and contour motion throughout the interface.
- Maintain moderate information density while improving hierarchy, rhythm, and breathing room.
- Treat the supplied reference as inspiration rather than copying its product artwork or branded compositions.

## Expected behavior

- Campus opens to a redesigned monochrome dashboard on a near-black surface.
- The persistent top navigation keeps its current information architecture and route behavior.
- The new Campus mark and wordmark remain recognizable at full header size and as a compact mark.
- Cards, popovers, menus, inputs, buttons, tabs, tables, widgets, and status controls share the same hand-rendered construction.
- Major surfaces use deliberately imperfect contours, repeated outline strokes, hatch details, and handwritten labels.
- Body copy, assignment descriptions, dates, grade values, and dense table content remain conventionally typeset and easy to scan.
- Hover, active, open, dragging, resizing, saving, and selection states use animated strokes or scribbled emphasis.
- Dashboard widgets remain movable, hideable, addable, resizable, saveable, cancelable, and resettable.
- Dashboard layout persistence continues to use the existing `campus-demo-v1` browser-storage state.
- Assignment filters, status controls, detail views, mock attachments, and mock submission behavior remain unchanged.
- Calendar month and week navigation continue to use the existing assignment and event data.
- Notification read state remains synchronized between the header popover, dashboard strip, and notifications page.
- Course names and abbreviations remain visible, but course colors and decorative course identity marks do not appear.
- Calendar events and assignment rows identify their course through text rather than colored pips or borders.
- Grades, overdue states, and workflow statuses remain distinguishable through labels, weight, border style, fill, and iconography instead of hue.
- Existing desktop layouts remain usable at 1024px and expand cleanly through wide desktop viewports.
- Viewports below the desktop minimum are not a supported design target.
- Global search and the student avatar keep their current prototype-level behavior.
- Empty, missing-route, and disabled states receive the same finished visual treatment as populated screens.

## Implementation plan

- Update `app/layout.tsx` to load the selected body and handwritten display fonts through the Next.js 16-supported font path, expose font variables, and keep the existing provider and application shell.
- Update `app/globals.css` to replace the lime design tokens with monochrome surface, ink, fill, muted-text, line-weight, shadow, spacing, and motion tokens.
- Split reusable sketch treatments out of page-specific selectors where practical so borders, double contours, hatching, focus rings, underlines, and animated strokes remain consistent.
- Add a reusable background treatment for the chosen black surface, with any grain or distressed marks implemented as lightweight local SVG/CSS assets rather than remote dependencies.
- Add desktop layout tokens for the 1024px minimum, content width, header height, gutters, widget grid, and wide-screen expansion.
- Add shared motion definitions for draw-on strokes, scribble underlines, contour jitter, hover offsets, popover entrance, drag emphasis, and save confirmation.
- Replace `public/campus-mark.svg` and `public/campus-logo.svg` with an original monochrome Campus mark and handwritten wordmark.
- Add local font files under `public/fonts/` if the selected font license and implementation strategy require self-hosting.
- Add reusable texture or construction assets under `public/sketch/`, including only original grain, hatch, underline, and contour artwork needed by the UI.
- Create `components/ui/sketch-icon.tsx` as the typed entry point for the custom icon family.
- Define a `SketchIconName` union covering navigation, dashboard, assignment, calendar, grade, notification, material, file, status, and utility actions.
- Build icons from reusable inline SVG paths so stroke color, weight, size, animation, and accessibility attributes can be controlled consistently.
- Create `components/ui/sketch-frame.tsx` for the shared imperfect border, doubled contour, optional hatch detail, interactive state, and surface variants.
- Expand `components/ui/button.tsx` to support the redesigned default, primary, ghost, danger, icon-only, and disabled appearances without changing its call sites unnecessarily.
- Add shared primitives for sketch inputs, selects, status labels, segmented controls, progress tracks, and icon buttons where repeated raw class names currently diverge.
- Update `components/app-header.tsx` with the new brand, redrawn navigation icons, scribbled active-route state, sketched courses dropdown, notification popover, search field, settings action, and avatar treatment.
- Preserve the existing header route map, click-outside logic, dropdown state, notification state, and inert global-search behavior.
- Update `components/dashboard.tsx` to use the shared sketch primitives and custom icons across normal and Customize modes.
- Restyle widget frames, headers, picker, remove and resize controls, notification strip, course cards, assignment rows, grades, announcements, mini calendar, and progress statistics.
- Keep `@dnd-kit` sensors, collision behavior, draft-versus-saved layout logic, widget visibility, size cycling, and persistence unchanged.
- Ensure expressive widget motion does not interfere with drag transforms or obscure the active drop target.
- Update `components/course-card.tsx` to remove `--course-color`, colored decoration, and colored arrow treatment.
- Keep course cards intentionally spare, using text hierarchy, black-and-white contour variation, and spatial composition without new per-course identities.
- Update `components/course-header.tsx` and `components/course-nav.tsx` with the monochrome course workspace header, current-grade panel, sketched tabs, and redrawn navigation affordances.
- Remove course-color styling from course headers while preserving course name, abbreviation, teacher, room, meeting, grade, and route links.
- Update `components/assignment-list.tsx` to remove course-color pips and communicate course, urgency, type, and status through text, monochrome labels, border treatments, and custom icons.
- Update `components/assignment-detail.tsx` with the new heading hierarchy, status control, instructions surface, attachment area, submitted confirmation, and custom back/upload/attachment/submit icons.
- Preserve assignment filtering, workflow mutations, transient response text, transient attachment names, and submission enablement.
- Update `components/calendar-view.tsx` with monochrome events, custom previous/next icons, hand-drawn day cells, expressive current-day emphasis, and sketched month/week controls.
- Replace color-coded calendar identity with visible course text inside or alongside each event while preserving navigation and date calculations.
- Update `components/grade-detail.tsx` and `app/grades/page.tsx` to use monochrome progress marks, score hierarchy, custom directional icons, and hand-drawn table/card construction.
- Update `components/material-tree.tsx` with custom folder, file, link, page, assignment, and disclosure icons while preserving recursive expansion behavior.
- Update `components/notification-list.tsx` and `app/notifications/page.tsx` with monochrome unread marks, custom action icons, and consistent sketched feed rows.
- Update `app/courses/page.tsx`, `app/assignments/page.tsx`, `app/calendar/page.tsx`, `app/settings/page.tsx`, and course subroutes to remove ad hoc visual styling and compose the new shared primitives.
- Update `app/not-found.tsx` so invalid routes use the new brand voice and visual system without changing its recovery link.
- Audit inline `style` props across route and component files, moving recurring presentation into named classes or primitives while retaining only data-driven dimensions and values inline.
- Update `lib/types.ts` only if typed sketch primitive variants or icon names need shared definitions; do not change the Schoology-shaped domain behavior.
- Leave `lib/mock-data.ts`, `lib/schoology-service.ts`, `lib/utils.ts`, and `components/demo-provider.tsx` behavior intact except for removing presentation-only course-color dependencies from consumers.
- Keep the existing Next.js App Router structure and async dynamic-route parameter handling.
- Read the relevant local Next.js 16 documentation under `node_modules/next/dist/docs/` before implementing font, asset, metadata, or routing changes.
- Do not add light-theme tokens, mobile navigation, real search, profile menus, live Schoology integration, or new product workflows in this pass.

## Implementation phases

- **Phase 1 — Visual foundation and brand**
  - Resolve the remaining surface, layout, typography, and benchmark-screen decisions.
  - Define monochrome tokens, font loading, desktop metrics, sketch construction rules, and motion vocabulary.
  - Replace the Campus mark and wordmark.
  - Build the shared sketch frame, button, form, status, and icon primitives.
  - Produce a small component showcase or benchmark screen to validate the system before broad rollout.
- **Phase 2 — Application shell and dashboard benchmark**
  - Redesign the persistent header, navigation states, menus, notification popover, and page shell.
  - Apply the system to the dashboard and every widget state.
  - Verify drag, resize, add, hide, Save, Cancel, Default, and persisted reload behavior.
  - Tune expressive motion around `@dnd-kit` transforms.
- **Phase 3 — Academic workflows**
  - Redesign the course directory, course shell, materials, assignments, assignment detail, calendars, and grades.
  - Remove course-color presentation from all routes.
  - Add textual course identification wherever color previously carried meaning.
  - Preserve all filters, status changes, expansion, navigation, and simulated submission flows.
- **Phase 4 — Notifications, settings, and edge states**
  - Finish notifications, settings, not-found, empty, disabled, and completed states.
  - Align popovers, dropdowns, forms, tables, and small utility controls with the shared primitives.
  - Remove remaining Lucide imports and inconsistent one-off styles from visible UI.
- **Phase 5 — Visual QA and hardening**
  - Verify every route at 1024px, a representative laptop width, and a wide desktop width.
  - Compare the finished system against the reference qualities: monochrome contrast, doubled contour lines, deliberate irregularity, hatch details, and marker typography.
  - Confirm that no visual treatment reduces scanability of assignments, dates, scores, statuses, or course labels.
  - Run type checking, linting, a production build, and interaction walkthroughs.
  - Fix visual regressions without expanding the agreed product scope.

## Testing strategy

- Keep the existing type-check and ESLint baselines green; both pass before the redesign when invoked with the installed Node runtime.
- Run a production Next.js build after font and static-asset changes to catch unsupported Next.js 16 usage.
- Add component tests for shared sketch buttons, icon rendering, status variants, segmented controls, and frame interaction states if a test runner is introduced.
- Verify that each custom icon renders at supported sizes and inherits the correct monochrome stroke or fill.
- Verify no visible Lucide icon remains after migration.
- Test every primary navigation route and every course-context route.
- Test header dropdown dismissal, notification popover behavior, notification read state, and settings navigation.
- Test dashboard Customize mode, drag ordering, size cycling, hide/show, Save, Cancel, Default, reload persistence, and reset behavior.
- Test assignment search, course filter, status filter, status mutation, transient response text, mock attachments, and mock submission.
- Test calendar month/week switching, previous/next movement, Today, course-scoped calendars, and events containing textual course identification.
- Test material folder expansion and nested item rendering.
- Test grades, completed assignments, overdue assignments, notifications, empty states, and invalid routes without relying on color alone.
- Perform visual regression checks for the header, default dashboard, Customize mode, course overview, assignment list, assignment detail, calendar, grades, notifications, settings, and not-found page.
- Check the supported desktop widths at 1024px, 1280px, 1440px, and a wide viewport.
- Confirm that controls remain reachable and content does not overlap, clip, or create unintended horizontal scrolling at the 1024px minimum.
- Exercise animated hover, open, active, submit, dragging, and resizing states to catch transform conflicts and distracting motion stacking.
- Confirm browser-storage hydration does not visually flash the wrong dashboard layout or notification state.
- Treat behavior differences, broken persistence, route failures, unreadable academic data, and missing interaction states as release blockers.

## Open questions

- Choose whether the base surface is flat black, subtly paper-grained, or visibly scratched and distressed.
- Decide whether implementation may recompose page layouts or should primarily restyle their existing structure.
- Choose the handwritten font and asset strategy: self-hosted open-source font plus SVGs, conventional font plus bespoke display lettering, fully bespoke SVG lettering, or a practical hybrid.
- Choose the first visual benchmark: dashboard, course overview, assignment detail, or the shared shell and component system.
- Confirm whether the chosen handwritten font license permits bundling and redistribution in this project.
