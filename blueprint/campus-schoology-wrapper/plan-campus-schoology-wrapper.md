# Campus Schoology Wrapper

## Overview

- Build a desktop-only student portal named Campus as a calmer interface over Schoology-shaped data.
- Start with realistic mock data while isolating all reads and mutations behind a typed service boundary.
- Use Next.js App Router, React, TypeScript, Tailwind CSS, and editable shadcn/ui primitives.
- Open directly into a sample student dashboard without authentication.
- Use a dark-only visual system inspired by the clarity and restraint of Linear and Notion.
- Follow the supplied dashboard sketch for the default layout.
- Make the dashboard modular through grid-snapped, hideable, movable, and resizable widgets.
- Keep messaging, mobile layouts, formal accessibility conformance, and real Schoology authentication out of the first release.

## Expected behavior

- Campus opens on the sample student's dashboard.
- The top navigation links to Dashboard, Courses, Assignments, Calendar, Grades, and Notifications.
- Course-specific pages add contextual navigation for Overview, Materials, Assignments, Calendar, and Grades.
- The default dashboard shows a notification strip, a large Courses widget, an Upcoming widget, and a Grades widget.
- The Courses widget displays minimal cards with the teacher-configured Schoology course identity.
- Courses without a configured identity use a generic course icon.
- Students can enter a dedicated Customize mode from the dashboard.
- Customize mode exposes drag handles, resize handles, widget visibility controls, Save, and Cancel.
- Widgets snap to defined grid columns and row increments during movement and resizing.
- Saving stores the dashboard layout and visible widgets in browser storage.
- Cancel restores the last saved arrangement.
- Restore default layout returns the dashboard to the supplied sketch-based arrangement.
- Students can add Announcements, Mini Calendar, and Assignment Progress widgets.
- The Upcoming widget groups work by urgency and places overdue assignments in a red section at the top.
- Assignments can move through not started, in progress, ready to submit, submitted, and graded states.
- Overdue assignments remain editable after their deadlines.
- The assignment index defaults to urgency groups and supports course and status filters.
- Assignment details support a temporary text response and simulated file attachments.
- Submission response text and attachment selections are discarded after leaving or refreshing the flow.
- Course workspaces show the current grade, upcoming assignments, calendar events, materials, and folders.
- Materials use expandable folders containing mock files, links, pages, and assignments.
- Grades show a percentage and letter grade at dashboard, course, and detailed gradebook levels.
- Grade details show assignment-level scores and point totals without hypothetical calculations.
- The calendar supports month and week views using the same assignment and event data as the rest of the app.
- A notification strip shows unread count and the newest Schoology-style notification.
- The notification strip can open a quick dropdown feed.
- A full Notifications page shows older items and supports marking items as read.
- Mock state changes other than submission content persist in browser storage.
- Reset demo data restores seeded workflow states, notification read states, and dashboard preferences.
- The demo contains four courses and approximately fifteen assignments with varied deadlines and statuses.

## Implementation plan

- Create `package.json` with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui dependencies, a grid-layout library, date utilities, and test tooling.
- Create `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, and `components.json` for the base application and UI tooling.
- Create `app/layout.tsx` for global metadata, the dark-only document shell, providers, and persistent application chrome.
- Create `app/globals.css` for dark design tokens, typography, spacing, course accents, urgency colors, widget states, and grid resize affordances.
- Create `app/page.tsx` as the sample-student dashboard route.
- Create `app/courses/page.tsx` for the course directory.
- Create `app/courses/[courseId]/layout.tsx` for course identity and contextual navigation.
- Create `app/courses/[courseId]/page.tsx` for the course workspace overview.
- Create `app/courses/[courseId]/materials/page.tsx` for expandable folders and material items.
- Create `app/courses/[courseId]/assignments/page.tsx` for course-scoped assignment lists.
- Create `app/courses/[courseId]/calendar/page.tsx` for course-scoped events.
- Create `app/courses/[courseId]/grades/page.tsx` for the course grade and assignment breakdown.
- Create `app/assignments/page.tsx` for cross-course urgency groups and filters.
- Create `app/assignments/[assignmentId]/page.tsx` for instructions, status changes, and the temporary submission experience.
- Create `app/calendar/page.tsx` for month and week calendar views.
- Create `app/grades/page.tsx` for all-course grade summaries and drill-down links.
- Create `app/notifications/page.tsx` for the complete notification feed and read-state controls.
- Create `components/shell/app-header.tsx` for top navigation, active route state, search affordance, notification trigger, and student menu.
- Create `components/shell/course-nav.tsx` for course-specific sections.
- Create `components/dashboard/dashboard-grid.tsx` to render normal and editable grid states.
- Create `components/dashboard/dashboard-toolbar.tsx` for Customize, Save, Cancel, Add widget, and Restore default actions.
- Create `components/dashboard/widget-frame.tsx` for shared titles, drag handles, resize affordances, hide controls, and widget sizing.
- Create `components/dashboard/widget-picker.tsx` for showing hidden widgets and adding optional widgets.
- Create widget components for Courses, Upcoming, Grades, Notifications, Announcements, Mini Calendar, and Assignment Progress.
- Keep the Courses widget visually minimal and limited to course identity plus navigation.
- Render the Upcoming widget in overdue, today, this week, and later groups.
- Create `components/courses/course-card.tsx` with configured identity and fallback icon variants.
- Create `components/courses/course-overview.tsx` to compose grade, upcoming work, events, and material shortcuts.
- Create `components/materials/material-tree.tsx` with expandable folders and typed item renderers.
- Create `components/assignments/assignment-list.tsx` and `assignment-filters.tsx` for reusable cross-course and course-scoped views.
- Create `components/assignments/assignment-status-control.tsx` for the five workflow states.
- Create `components/assignments/submission-composer.tsx` with nonpersistent text and simulated attachments.
- Create `components/calendar/academic-calendar.tsx` with month and week modes.
- Create `components/grades/grade-summary.tsx` and `grade-breakdown.tsx` for percentage, letter, points, and assignment rows.
- Create `components/notifications/notification-strip.tsx`, `notification-popover.tsx`, and `notification-list.tsx` for summary and full-feed behavior.
- Add required shadcn/ui primitives under `components/ui/`, including Button, Card, Popover, Dropdown Menu, Dialog, Tabs, Select, Badge, Progress, Tooltip, and Scroll Area.
- Create `lib/domain/student.ts` with `Student` and student preference types.
- Create `lib/domain/course.ts` with `Course`, `CourseIdentity`, and course navigation types.
- Create `lib/domain/assignment.ts` with `Assignment`, `AssignmentStatus`, `SubmissionDraft`, score, deadline, and urgency types.
- Create `lib/domain/calendar.ts` with academic event and calendar-view types.
- Create `lib/domain/material.ts` with discriminated file, link, page, folder, and assignment material types.
- Create `lib/domain/grade.ts` with course grade, letter grade, grading period, and scored-item types.
- Create `lib/domain/notification.ts` with Schoology-style notification categories, destinations, timestamps, and read state.
- Create `lib/domain/dashboard.ts` with widget IDs, visibility, positions, grid dimensions, layout snapshots, and edit-state types.
- Create `lib/services/schoology-service.ts` as the typed interface for student, course, assignment, material, calendar, grade, and notification operations.
- Keep service methods asynchronous so mock calls can later be replaced by authenticated network requests.
- Create `lib/services/mock-schoology-service.ts` to implement the interface over fixtures and persisted client state.
- Create `lib/services/service-provider.tsx` to expose the active Schoology service without coupling components to fixtures.
- Create `lib/fixtures/` modules for one sample student, four courses, approximately fifteen assignments, materials, grades, events, announcements, and notifications.
- Include overdue, due-today, upcoming, submitted, and graded examples in the assignment fixtures.
- Create `lib/dashboard/default-layout.ts` to encode the supplied sketch as a deterministic grid arrangement.
- Create `lib/dashboard/widget-registry.ts` to define available widgets, supported grid sizes, minimum dimensions, and default visibility.
- Create `lib/storage/demo-storage.ts` with versioned keys, schema validation, safe browser checks, reset behavior, and fallback handling for corrupt values.
- Create `lib/state/demo-state-provider.tsx` to coordinate assignment workflow, notification read state, and demo reset actions.
- Create `lib/state/dashboard-state-provider.tsx` to manage draft layouts separately from saved layouts so Save and Cancel behave predictably.
- Create `lib/utils/assignment-urgency.ts` to classify overdue, today, this week, and later work consistently.
- Create `lib/utils/grades.ts` to format percentages, letter grades, earned points, and possible points.
- Create `lib/utils/dates.ts` to centralize relative labels, calendar ranges, and deterministic fixture-date offsets.
- Use URL routes for primary navigation and URL search parameters for shareable assignment filters where practical.
- Prevent server-rendering mismatches by loading browser-stored layout and mock mutations after client hydration.
- Provide intentional loading, empty, and not-found states for lists and dynamic routes.
- Keep real credentials, API endpoints, OAuth flows, and proxy routes outside the mock implementation.

## Implementation phases

- **Phase 1 — Foundation**
  - Scaffold Next.js, TypeScript, Tailwind CSS, shadcn/ui, linting, and tests.
  - Establish the dark-only token system and top-navigation shell.
  - Define all domain types and the typed Schoology service contract.
  - Add coherent fixtures for the sample student and four courses.
- **Phase 2 — Read-only academic experience**
  - Build Courses, course workspaces, Materials, Assignments, Grades, and Notifications routes.
  - Add month and week calendar views.
  - Verify cross-page consistency for assignments, grades, events, and notification destinations.
- **Phase 3 — Default dashboard**
  - Implement the sketch-based dashboard grid.
  - Add Courses, Upcoming, Grades, and Notification widgets.
  - Add red overdue treatment and urgency grouping.
  - Add optional Announcements, Mini Calendar, and Assignment Progress widgets.
- **Phase 4 — Customization and local state**
  - Add Customize mode, grid-snapped drag and resize behavior, widget visibility, Save, and Cancel.
  - Persist saved layouts, assignment states, and notification read states.
  - Add Restore default layout and Reset demo data actions.
- **Phase 5 — Student interactions**
  - Add assignment status changes and filters.
  - Add temporary text submissions and simulated file attachments.
  - Add the notification dropdown and read-state synchronization with the full page.
- **Phase 6 — Polish and verification**
  - Finish loading, empty, invalid-route, and corrupt-storage states.
  - Tune dark-theme hierarchy, widget density, course identity fallbacks, and desktop breakpoints.
  - Run the full automated suite and complete desktop browser walkthroughs.

## Testing strategy

- Use Vitest for domain utilities, fixture validation, service behavior, and browser-storage logic.
- Test urgency boundaries for overdue, today, end of week, later, and timezone transitions.
- Test grade formatting for percentage, letter, earned points, missing grades, and zero-point assignments.
- Test course identity fallback behavior when Schoology provides no configured identity.
- Test widget registry constraints and default-layout validity.
- Test versioned storage migration, corrupt JSON, unavailable storage, and demo reset behavior.
- Use React Testing Library for assignment filters, status changes, material expansion, notification read state, and submission composer reset behavior.
- Test dashboard Customize mode independently from the saved layout.
- Test Save, Cancel, hide, show, move, resize, Restore default, and reload persistence behavior.
- Verify the overdue group remains first and uses the red danger treatment.
- Verify the notification strip, dropdown, and full page share a consistent unread count.
- Verify mock submission content is not restored after navigation or refresh.
- Use Playwright for critical desktop flows across Dashboard, Courses, Assignments, Calendar, Grades, and Notifications.
- Add a Playwright flow that customizes the dashboard, reloads, verifies persistence, and restores the default.
- Add a Playwright flow that changes an assignment state and confirms the change across dashboard, assignment index, and course page.
- Add visual snapshots for the default dashboard, Customize mode, overdue work, course workspace, calendar modes, gradebook, and notification dropdown.
- Test supported desktop viewport widths and document intentional behavior below the desktop minimum.
- Run type checking, linting, unit tests, component tests, and end-to-end tests in continuous integration.

## Open questions

- Confirm the minimum supported desktop viewport before visual implementation begins.
- Confirm whether teacher-configured course identity maps to a color, image, icon, or whichever value Schoology supplies.
- Confirm which real Schoology API and authentication mechanism will eventually replace the mock service.
- Confirm Schoology notification categories and payload fields when live integration work begins.
- Decide whether dashboard layouts should eventually sync across devices instead of remaining browser-local.
- Decide whether submission drafts should become persistent when a real Schoology connection is added.
