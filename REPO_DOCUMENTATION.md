**Project Overview**

- **Name:** ad-campaigns-frontend
- **Purpose:** A Next.js TypeScript frontend for viewing advertising campaigns, with client-side table features (search, filter, sort) and a creative-detail view that includes AI-generated insights. The app uses a server-side proxy to call OpenRouter for richer AI insights while keeping the API key private.

**Tech Stack**

- Framework: Next.js (App Router), TypeScript
- Styling: Tailwind CSS
- UI primitives: Radix UI
- Icons: lucide-react
- Other: React 18, Recharts (charts), Sonner (toasts), Zod (validation), Supabase client included but not required by core components

**Repository Structure (key files & folders)**

- `app/` — Next.js app routes and pages. Server and client components live here.

  - `app/api/openrouter/route.ts` — API route that proxies requests to OpenRouter. Expects `OPENROUTER_API_KEY` in server env. Parses and returns an array of insight strings.

- `components/` — Reusable UI components used across the app.

  - `CampaignsTable.tsx` — Campaign listing table with search, filter, and sort. Click a row to open the creative dialog.
  - `CreativeCard.tsx` — Creative detail component shown in a dialog; displays campaign metrics, a creative image placeholder (or campaign `imageUrl` if present), and AI insights.
  - `FilterDropdown.tsx` — Dropdown for status filtering (All / Active / Paused).
  - `LoadingSpinner.tsx`, `StatusBadge.tsx`, `ErrorMessage.tsx`, and other helper components.

- `lib/` — Library helpers and types.

  - `lib/types.ts` — TypeScript types used across the app (e.g., `Campaign`).
  - `lib/api.ts` — Server API fetch helpers (e.g., `fetchCampaigns`).
  - `lib/ai.ts` — Client-facing helper that requests `/api/openrouter` for AI insights and falls back to deterministic heuristics when the server call fails.

- `ui/` — Base UI primitives and wrappers (inputs, dialogs, buttons) composed from Radix/Tailwind.

- Configuration files: `next.config.js`, `tsconfig.json`, `tailwind.config.ts`.

**Key Features**

- Campaign table with:

  - Search by campaign name or id
  - Status filtering (All / Active / Paused)
  - Client-side sorting (name, clicks, cost, impressions) with toggle between ascending/descending
  - Click a row to open a dialog with creative details and AI insights

- Creative detail view (`CreativeCard`) shows:
  - Placeholder or provided image (`imageUrl` if the campaign object contains it)
  - Campaign metrics (clicks, impressions, cost)
  - AI-generated insights sourced from OpenRouter via `app/api/openrouter/route.ts`; falls back to local heuristics if OpenRouter is unavailable

**Environment & Secrets**

- The OpenRouter key must be provided on the server via an environment variable:

  - `OPENROUTER_API_KEY` — API key used by `app/api/openrouter/route.ts`. Keep this secret; do not commit it to source control.

- Example local environment file (`.env.local`):

```
OPENROUTER_API_KEY=sk-...your_openrouter_key...
```

**How the OpenRouter integration works**

- Client code calls `generateInsights(campaign)` in `lib/ai.ts`.
- `lib/ai.ts` attempts a `POST` to `/api/openrouter` with the campaign payload.
- The server route `app/api/openrouter/route.ts` builds a message payload for OpenRouter, optionally includes an `image_url` block when `campaign.imageUrl` is present, calls the OpenRouter chat completions endpoint (`https://openrouter.ai/api/v1/chat/completions`), and returns a parsed array of insight strings: `{ insights: string[] }`.
- If the server or model fails, `lib/ai.ts` returns fallback heuristics (CTR, CPC, spend advice).

**Running the project (development)**

1. Install dependencies:

```powershell
pnpm install
```

2. Add `.env.local` with `OPENROUTER_API_KEY` (see Environment & Secrets above).

3. Start the development server:

```powershell
pnpm dev
```

4. Open the site at `http://localhost:3000` and navigate to the campaigns page.

**Build / Production**

- Build the app:

```powershell
pnpm build
```

- Start the built app:

```powershell
pnpm start
```

**Testing & Type Checking**

- Type checking: `pnpm run typecheck` (this runs `tsc --noEmit`).
- Linting: `pnpm run lint` (Next.js ESLint config).

**Extending the Campaign model (images & richer data)**

- Current `Campaign` type does not contain an `imageUrl` field. To display real creatives instead of placeholders:
  1. Add `imageUrl?: string` to `lib/types.ts` `Campaign` interface.
  2. Ensure the backend `GET /campaigns` endpoint includes an `imageUrl` field in its response.
  3. Update any sample data or fixtures used in development.

**Customizing the AI output**

- The server route uses `openrouter/sherlock-dash-alpha` as the model. To change behavior:
  - Modify the system prompt in `app/api/openrouter/route.ts` to request a different output structure.
  - Optionally accept model name as an environment variable for runtime configuration.

**Security & Privacy Notes**

- The OpenRouter API key is stored server-side and never exposed to the browser.
- The server route forwards only selected campaign metadata and (optionally) an image URL to the model. Review this behavior if your campaigns contain sensitive PII.

**Troubleshooting**

- If insights are not appearing in the creative dialog:
  - Confirm `OPENROUTER_API_KEY` is set and correct in `.env.local`.
  - Check server logs for errors when calling `https://openrouter.ai/api/v1/chat/completions`.
  - If the OpenRouter model returns non-JSON content, the route attempts to parse it; otherwise, `lib/ai.ts` falls back to local heuristics.

**Contributing**

- Follow these guidelines:
  - Add/features via small, focused commits.
  - Update `REPO_DOCUMENTATION.md` and any README content when adding new public components or configuration.
  - Run `pnpm run typecheck` and `pnpm run lint` before creating pull requests.

**Acknowledgements & Notes**

- This file documents the current state of the repository as implemented. If you would like additional sections (API contract, sample backend stubs, or automated tests), I can add them on request.
