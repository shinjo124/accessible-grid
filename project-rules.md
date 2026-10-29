# Project Rules

## Stack
- Vite + TypeScript.

## Banned patterns
- Do not use `var`; use `const` or `let`.
- Do not use `keypress`, `keyCode`, or inline event handlers such as `onclick`.
- Do not use raw `innerHTML`; build DOM safely or use framework rendering.

## AI workflow
- One AI prompt = one sub-task. Do not ask AI to implement multiple tasks at once.
- Verify every AI output before accepting it, including reviewing the diff and checking behavior.

## Homework scope
- Implement an accessible data grid with sorting, filtering, pagination, keyboard navigation, semantic table markup, WCAG 2.2 AA accessibility, and Lighthouse checks.
