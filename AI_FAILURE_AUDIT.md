# AI Failure Audit — HW1 Accessible Data Grid

These entries document three AI-generated implementation failures found during requirement review and browser checks, along with their impact and corrections.

## 1. Row renders dropped keyboard focus

- **Failure:** Replacing table rows during sorting, paging, or selection could remove the focused cell without returning focus.
- **Risk:** Keyboard users could lose their position after an interaction.
- **Detection:** Keyboard review of the roving-tabindex behavior and browser interaction checks after sorting and selection.
- **Correction:** Store the active cell as `(row, col)`, keep exactly one visible cell at `tabindex="0"`, clamp the coordinates to rendered rows, and restore focus after table or pagination renders.
- **Evidence:** Browser checks confirmed focus returned to a data cell after sorting and only one data cell had `tabindex="0"`.

## 2. Filtering discarded the current page

- **Failure:** The first filter handler always reset pagination to page one.
- **Risk:** It discarded a still-valid page and did not meet the requirement to clamp the page index when results shrink.
- **Detection:** Compared the handler with the pagination requirement; then filtered from page two in the browser.
- **Correction:** Keep the page when it remains valid and clamp it to the last available page after filtering and sorting.
- **Evidence:** Filtering from page two down to two matching rows announced “Showing 1-2 of 2”.

## 3. Selection relied on color alone

- **Failure:** The initial selected-row treatment used only a background color and lacked exposed row selection state.
- **Risk:** Selection could be unclear for users who cannot distinguish the color, and screen readers would not be told which row was selected.
- **Detection:** Accessibility review against the no-color-only requirement.
- **Correction:** Set `aria-selected` on rows, announce selection in a polite live region, and show a visible “Selected” text badge.
- **Evidence:** Browser checks confirmed Enter selects (`aria-selected="true"`), Space toggles it off (`aria-selected="false"`), and the browser accessibility tree exposes the grid and cells.
