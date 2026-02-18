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

## Author

**Sabrina Fernández Zambrano**
