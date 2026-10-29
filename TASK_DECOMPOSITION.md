# HW1: Accessible Data Grid — Task Decomposition

## Goal

Build a production-style, accessible data grid with sorting, filtering, pagination, and keyboard navigation using **Vite + TypeScript**. Use native table semantics and meet the lab's WCAG 2.2 AA and Lighthouse requirements.

## Working rules

- Complete one task at a time. One AI prompt must request exactly one task below.
- Before implementation, define or follow the relevant TypeScript contract.
- Review every AI-generated diff and verify its behavior before accepting it.
- Follow `project-rules.md`: no `var`, `keypress`/`keyCode`, raw `innerHTML`, or inline `onclick` handlers.
- Keep commits small and focused; use Conventional Commit messages.

## Work breakdown

- [ ] **1.1 — Bootstrap the app:** Create the Vite + TypeScript project shell and confirm the development server starts.
- [ ] **1.2 — Define data contracts:** Specify generic row, column, sort, filter, pagination, and selection types before building UI behavior.
- [x] **1.3 — Create accessible page structure:** Add the app shell, grid title/accessible name, and native `<table>`, `<thead>`, `<tbody>`, `<th scope="col">`, and button structure. Avoid div-soup.
- [x] **1.4 — Render typed data:** Render column headers and rows from typed input data; provide a clear empty state and stable row identity.
- [x] **1.5 — Add sorting:** Support sortable columns, expose current sort direction accessibly, and keep sort state predictable.
- [x] **1.6 — Add filtering:** Add labeled filter controls and filter rows without losing the user's context.
- [x] **1.7 — Add pagination:** Add page state, page-size handling, and labeled navigation controls; update or clamp the current page when filtering changes the result count.
- [ ] **1.8 — Add keyboard navigation and selection:** Support Up/Down/Left/Right movement among grid cells, Enter to select, and Space to toggle as specified. Use `keydown` and `e.key`/`e.code`; prevent browser scrolling only when an arrow key is handled by the grid.
- [ ] **1.9 — Meet accessibility criteria:** Add appropriate table/grid semantics and ARIA only where needed, visible focus, screen-reader labels/status feedback, and contrast of at least 4.5:1.
- [ ] **1.10 — Responsive and visual polish:** Ensure the grid remains usable at narrow viewport widths and all controls have clear focus, hover, and disabled states.
- [ ] **1.11 — Audit and fix:** Check the implementation against WCAG 2.2 AA expectations and the project rules; record and fix issues found.
- [ ] **1.12 — Lighthouse verification:** Run Lighthouse Accessibility and Best Practices audits, capture the results, and resolve findings until each score is 100/100.
- [ ] **1.13 — Final review:** Review the full diff, manually verify sorting/filtering/pagination/keyboard flows and screen-reader labels, then record completion evidence.

## Acceptance checklist

- [ ] Runs as a Vite + TypeScript application.
- [ ] Uses native table elements and meaningful heading/accessible naming.
- [ ] Sorting, filtering, and pagination work together correctly.
- [ ] Keyboard behavior matches the assignment: arrows navigate, Enter selects, Space toggles.
- [ ] Screen-reader support, visible focus, and 4.5:1 text contrast are addressed.
- [ ] No banned patterns from `project-rules.md` are present.
- [ ] Lighthouse Accessibility and Best Practices each score 100/100, with results recorded.
- [ ] Each AI-generated change has been reviewed and behavior verified before acceptance.

## Notes / decisions to confirm during implementation

- The slides require native table markup and also mention `role="grid"`, `role="row"`, and `role="gridcell"`. Apply roles only if the chosen interaction model warrants them; avoid overriding native table semantics in a way that harms assistive technology.
- The slides state the 100/100 Lighthouse target but do not define a browser version, viewport, or exact audit configuration. Record those settings with the final score.
