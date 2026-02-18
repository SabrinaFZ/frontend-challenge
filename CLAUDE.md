# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Full local dev (Vite frontend + json-server on port 3001 in parallel)
npm run dev:server

# Frontend only (no API)
npm run dev

# Run all tests once
npm test

# Run a single test file
npx vitest run src/features/add/__tests__/useAdd.spec.tsx

# Type-check + build
npm run build

# Lint
npm run lint
```

## Architecture

### State Management
Global car state lives in `src/context/`: `AppContext.tsx` provides the context, `useAppState.tsx` holds all state logic (add, remove, update, filter, sort, get), and `useAppContext.tsx` exports the consumer hook. Car features read/write through `useAppContext()`.

Workshop features use **local state only** (no context) — they are read-only and don't need cross-component sharing.

### Feature-Based Structure
Each feature in `src/features/` is self-contained:
- `<Feature>.tsx` — UI component
- `use<Feature>.tsx` — business logic hook
- `__tests__/` — colocated Vitest + React Testing Library tests

Car features (`data-table`, `details`, `add`, `update`, `delete`, `search`, `sort`) use `useAppContext` for state. Workshop features (`workshops-table`, `workshop-details`) use local `useState` + axios directly.

### Routing
Routes are defined in `src/main.tsx` with lazy-loaded page components. All routes are nested under `<Layout />`. Current routes:
- `/` → `App` (car list)
- `/details/:id` → `Details`
- `/workshops` → `Workshops` (workshop list)
- `/workshops/:id` → `WorkshopDetail`
- `*` → `NotFound`

### API Layer
- **Local dev**: Vite proxies `/api/*` → `http://localhost:3001` (json-server reads `data/db.json`)
- **Production**: Cloudflare Pages + Workers
- All HTTP calls use axios

### Testing Conventions
- `src/test/setup.ts` globally mocks `axios` and `useAppContext` for all tests
- Component tests mock the feature's hook via `vi.mock('../useXxx')` and mock `Loading`/`Error` with `data-testid` stubs
- Hook tests cast `axios` as `{ get: ReturnType<typeof vi.fn> }` and set up mock return values per test
- Car hook tests also mock `useAppContext` in `beforeEach`; workshop hook tests do not (no context dependency)
- Wrap renders that need routing in `<MemoryRouter>`

### Path Alias
`@` resolves to `./src` — use `@/components/...`, `@/features/...`, etc.
