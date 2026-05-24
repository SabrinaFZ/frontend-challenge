# TWD Project Patterns

## Project Configuration

- **Framework**: React 19
- **Vite base path**: `/`
- **Dev server port**: `5173`
- **Entry point**: `src/main.tsx`
- **Public folder**: `public/`

### Relay Commands

```bash
# Run all tests (default config — base is /, port is 5173)
npx twd-relay run
```

## Standard Imports

```typescript
import { twd, userEvent, screenDom, expect } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";
// Project-specific imports go here (added by user)
```

## Visit Paths

Base path is `/`, so visits are bare paths:

```typescript
await twd.visit("/");
await twd.visit("/details/1");
await twd.visit("/workshops");
await twd.visit("/workshops/1");
```

Routes are defined in `src/main.tsx` — `/` (car list), `/details/:id`, `/workshops`, `/workshops/:id`, `*` (NotFound).

## Standard beforeEach / afterEach

```typescript
beforeEach(() => {
  twd.clearRequestMockRules();
  twd.clearComponentMocks();
});

afterEach(() => {
  twd.clearRequestMockRules();
});
```

No client store reset, server-state cache reset, Sinon restore, or auth setup is needed for this project. Data fetching goes straight through `axios` and component state lives in React local state / `AppContext` — both reset naturally on `twd.visit(...)` since the component tree remounts.

## Portals and Dialogs

This project uses Radix UI for `Dialog` (Add / Update / Delete confirm dialogs) and `Select` (engine, transmission). Both render into portals.

Use `screenDomGlobal` instead of `screenDom` for elements inside those portals:

```typescript
import { screenDomGlobal } from "twd-js";

// After opening a dialog or select:
const dialog = screenDomGlobal.getByRole("dialog");
const engineOption = screenDomGlobal.getByRole("option", { name: "2.0L TSI" });
```
