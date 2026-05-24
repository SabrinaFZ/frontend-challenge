# Frontend Challenge - Car Inventory

## Project Overview

A Volkswagen fleet management application built with React, TypeScript, and Vite. It covers two resources:

- **Cars** — full CRUD: list, search, sort, add, edit, delete, and detail view.
- **Workshops** — read-only: list and detail view of authorized service centers.

![Car Inventory Application Screenshot](https://i2.paste.pics/ff26ff3f739729b38566b8422d87573b.png?trs=69d13b3b092b22161d69516e322efd6ec959a6beced76d2c72ce340e6036c94b&rand=yYPdxjrmCz)

---

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server (Vite frontend + json-server on port 3001):
   ```sh
   npm run dev:server
   ```
3. Run tests:
   ```sh
   npm test
   ```
4. Run a single test file:
   ```sh
   npx vitest run src/features/add/__tests__/useAdd.spec.tsx
   ```

---

## Technologies

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI and type safety |
| Vite | Dev server and build tooling |
| React Router v7 | Client-side routing with lazy-loaded pages |
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui | Accessible component primitives (Table, Card, Dialog, etc.) |
| Barlow + DM Sans | Typography — loaded from Google Fonts |
| Axios | HTTP client |
| json-server | Local mock API (reads `data/db.json`) |
| Cloudflare Pages + Workers | Production hosting and API (`functions/api/`) |
| Vitest + React Testing Library | Unit tests |
| GitHub Actions | CI — runs tests on push/PR to `main` |

---

## Architecture

### State management

Car data lives in a global `AppContext` (see `src/context/`). The context exposes `add`, `remove`, `update`, `filter`, `sort`, and `get` — all car features read and write through it.

Workshop data is **local state only**: the workshops feature is read-only and doesn't need cross-component sharing, so each hook manages its own `useState` + axios call directly.

### Feature structure

Each feature in `src/features/` is self-contained:

```
src/features/<feature>/
  <Feature>.tsx          # UI component
  use<Feature>.tsx       # Business logic hook
  __tests__/
    <Feature>.spec.tsx   # Component tests
    use<Feature>.spec.tsx# Hook tests
```

Car features: `data-table`, `details`, `add`, `update`, `delete`, `search`, `sort`
Workshop features: `workshops-table`, `workshop-details`

### API

In local development, Vite proxies `/api/*` to `http://localhost:3001` (json-server). In production, Cloudflare Pages routes `/api/*` to the Workers in `functions/api/`:

| File | Route |
|------|-------|
| `functions/api/cars.js` | `GET /api/cars`, `POST /api/cars` |
| `functions/api/cars/[id].js` | `GET /api/cars/:id`, `PUT /api/cars/:id`, `DELETE /api/cars/:id` |

> Note: the production Workers use an in-memory array, so changes don't persist across deployments.

### Routing

All routes are lazy-loaded and nested under a shared `<Layout />`:

| Path | Page |
|------|------|
| `/` | Car list (DataTable) |
| `/details/:id` | Car detail |
| `/workshops` | Workshop list |
| `/workshops/:id` | Workshop detail |
| `*` | 404 Not Found |

---

## Performance

- **Code splitting**: all pages are `lazy()`-loaded with a `<Suspense>` fallback.
- **Memoization**: hooks use `useCallback` to prevent unnecessary re-renders.
- **Debouncing**: the search input debounces at 300 ms before filtering.

---

## Testing approaches showcase (branch `feat/demo-twd`)

This branch is a side-by-side comparison of three testing approaches against the same React app. Each suite has its own folder, vitest/runner config, and npm script so they can be run and inspected independently.

| Approach | Location | Runner | npm script |
|---|---|---|---|
| Vitest + axios mocks (hook-mocked component tests) | `src/tests/unit-mocks-axios/` | `vitest` | `npm run test:unit-mocks-axios` |
| Vitest + MSW (real components + real `AppContext` + intercepted HTTP) | `src/tests/unit-msw/` | `vitest` | `npm run test:unit-msw` |
| TWD flow tests (real browser via twd-relay) | `src/twd-tests/` | `twd-cli` | `npm run test:ci` |

`npm test` runs the two Vitest suites in parallel; the TWD suite runs via `npm run test:ci` (needs `npm run dev:ci` already running in another terminal) or in CI via `.github/workflows/twd-tests.yml`.

### Demo checkpoints

Two tags mark the points worth walking through when explaining the setup:

| Tag | What it shows |
|---|---|
| `01-setup-twd` | TWD installed for the first time — `twd-js` + `twd-relay` added as devDeps, `twd()` + `twdRemote()` registered in `vite.config.ts`, `public/mock-sw.js` initialised, `.claude/twd-patterns.md` written, scaffold smoke test at `src/twd-tests/hello.twd.test.ts`. The entry file (`src/main.tsx`) is intentionally untouched — both plugins inject what they need at dev-server time. |
| `02-solution-complete` | Full state — six TWD flow files covering car CRUD + workshops (`src/twd-tests/*.twd.test.ts`), `twd-cli` + `vite-plugin-istanbul` + `nyc` for CI, `twd.config.json`, and `.github/workflows/twd-tests.yml` running the BRIKEV/twd-cli composite action with coverage. |

Jump to either point with `git checkout <tag>` (and `git checkout feat/demo-twd` to come back).

---

## Author

**Sabrina Fernández Zambrano**
