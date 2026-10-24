# Runforge Runs

Frontend dashboard for reviewing AI agent runs: list, status filters, search, and run details.

## Scripts

```bash
npm install
npm run dev
npm run test:run
npm run build
```

The app starts at the URL Vite prints, usually `http://localhost:5173`.

To see the error state, open `http://localhost:5173/?error=1`. The Retry button removes that flag and reloads the list.

## Stack

- React 19
- Vite
- JavaScript
- CSS Modules
- Vitest and React Testing Library

There is no real backend. `src/api/runsApi.js` returns local mock data with a short delay.

## Project structure

```text
src/
  api/runsApi.js              mock service (Promise + delay)
  data/mockRuns.js            sample runs, all four statuses
  hooks/useRuns.js            list loading, error, retry
  hooks/useRunDetails.js      details loading
  pages/RunsPage.jsx          page: search, filters, list, details
  pages/RunsPage.test.jsx     status filter, search, open details
  components/layout/          workspace shell
  components/runs/            list, filters, search, drawer, states
  components/status/          status badge with text + mark
  utils/                      date, duration, and filter helpers
```

## Manual checks

If you review the UI without tests:

1. Wait for the skeleton, then confirm 7 runs appear.
2. Filter by Failed — only Snapshot preview build stays.
3. Search `payments` — two payment runs stay. Combine Failed + `payments` to see the empty state, then reset.
4. Click Auth refactor — logs are present, result says it is not ready yet. Close with Back to list, overlay click, or Escape.
5. Click Fix checkout tests — logs and a result are present.
6. Open `/?error=1` and press Retry.
