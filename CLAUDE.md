# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A WeWeb custom element component: a **Slider Dropdown** (despite the repo name "flippable-Card"). It renders a collapsible dropdown with an integrated range slider for selecting numeric values. Built with Vue 3 Composition API and the WeWeb CLI framework.

## Commands

- `npm i` — install dependencies
- `npm run serve --port=[PORT]` — local dev (add as custom element in WeWeb editor dev popup)
- `npm run build --name=my-element` — production build

Build is handled entirely by `@weweb/cli`. Do NOT add webpack/vite/babel configs or build dependencies.

## Architecture

Three files matter:

- **`src/wwElement.vue`** — Vue SFC with template, script (Composition API), and scoped SCSS. Receives `uid` and `content` props. All configurable values come through `props.content`.
- **`ww-config.js`** — Defines editor properties (settings + style sections), trigger events (`value-change`, `dropdown-toggle`), and binding validations. This is the schema the WeWeb editor uses.
- **`package.json`** — Only dependency is `@weweb/cli` (devDependency at "latest"). No other deps.

### Data Flow

1. WeWeb editor populates `props.content` from properties defined in `ww-config.js`
2. Component exposes two internal variables via `wwLib.wwVariable.useComponentVariable`: `value` (number) and `isExpanded` (boolean)
3. User interactions emit `trigger-event` with names matching `triggerEvents` in config
4. `initialValue` prop is watched and synced to the internal `value` variable

## Critical WeWeb Rules

- **Optional chaining everywhere**: Always `props.content?.property` — content may be undefined initially
- **`/* wwEditor:start */` / `/* wwEditor:end */`** blocks must be matched in both `.vue` and `ww-config.js`. Mismatched tags break the component. These blocks are stripped in production.
- **No direct `document`/`window`**: Use `wwLib.getFrontDocument()` and `wwLib.getFrontWindow()`
- **No hardcoded width/height on root element**: Root must adapt fluidly to user-set dimensions
- **Reactivity**: Derive from `props.content` using `computed()`, not `ref()` with watchers. All property changes must reflect instantly in the editor.
- **TextSelect format**: Must use `options: { options: [{ value, label }] }` nested structure
- **Internal variables**: Interactive components must use `wwLib.wwVariable.useComponentVariable` with `props.uid`, watch `initialValue`, and emit triggers on change (avoid infinite loops)
- **Dropzones**: Use hidden array properties (`hidden: true, defaultValue: []`) with `<wwLayout path="propertyName" />` in template
- **Package name**: Must NOT contain "ww" or "weweb"
