# Accessible Data Grid

A Vite + TypeScript data grid with sorting, text filtering, pagination, row selection, keyboard navigation, and a responsive table region.

## Run locally

```sh
npm install
npm run dev
```

Build and preview the production bundle:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

## Keyboard controls

- **Tab** follows document order; only one data cell at a time is included in the tab order. The table's labeled scroll region is separately keyboard-focusable.
- **Arrow keys** move focus one cell at a time. Movement stops at the grid edges.
- **Enter** selects the focused row.
- **Space** toggles selection for the focused row.
- Sortable column headers are buttons and can be activated with the normal button keys (Enter or Space).
- Pagination uses the **Prev** and **Next** buttons.

## How it was tested

Checks were run against the Vite Preview build on 2026-10-29, not the dev server:

- `npm run build` passed.
- Lighthouse 13.6.0, Desktop preset: Accessibility **100/100** and Best Practices **100/100**.
- Browser interaction checks confirmed arrow navigation, Enter selection, Space toggling, focus restoration after sorting, filtering from page two clamps to the remaining page, and no browser errors.
- The browser accessibility tree exposed the labeled region, grid, and grid cells.
- At a 320px viewport, the document stayed 320px wide while the table scrolled inside its 288px labeled region (680px scroll width).
- Checked text contrast ratios were at least 7.85:1; the 3px focus ring was at least 4.92:1 against checked surfaces.
- NVDA was not installed, so a real screen-reader pass remains outstanding. The accessibility-tree inspection is not a substitute for NVDA testing.

Evidence:

- [Lighthouse HTML report](artifacts/lighthouse-report.html)
- [Lighthouse JSON report](artifacts/lighthouse.json)
- [Desktop screenshot](artifacts/hw1-preview-desktop.png)
- [320px screenshot](artifacts/hw1-preview-320px.png)

See [AI_FAILURE_AUDIT.md](AI_FAILURE_AUDIT.md) for implementation failures caught and corrected during this work.
