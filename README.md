<div align="center">

# ad-campaigns-frontend

*Insightful campaign analytics, polished creative previews, OpenRouter-powered AI advice.*

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Design%20System-38B2AC?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-ED8B00?logo=pnpm&logoColor=white)

</div>

## Snapshot

- **What**: Next.js 14 + TypeScript experience for browsing advertising campaigns with rich table interactions, AI-generated insights, and an elegant creative detail view.
- **Why**: Give performance marketers an instant pulse on campaign health while keeping the OpenRouter API key safely on the server.
- **How**: Tailwind + Radix UI primitives, client-side search/filter/sort, OpenRouter proxy route with graceful fallback heuristics.

## Feature Highlights

| Surface | Delightful Details |
| --- | --- |
| Campaigns table | Search by name/ID, status filter (All/Active/Paused), toggleable sorting on name/clicks/cost/impressions, row click opens creative dialog. |
| Creative insights | `CreativeCard` blends metrics, preview image or placeholder, and OpenRouter-powered insights with a deterministic fallback path. |
| AI pipeline | `lib/ai.ts` posts to `/api/openrouter`, server route curates OpenRouter messages (including optional `imageUrl`) and returns `{ insights: string[] }`. |
| UI system | Radix UI wrappers in `components/ui`, design tokens in `globals.css`, theming via `ThemeProvider` + `ThemeToggle`. |

## Tech Stack

- **Framework**: Next.js (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, custom themes, CSS variables
- **UI primitives**: Radix UI wrappers, lucide-react icons
- **Data viz & polish**: Recharts, Sonner toasts, Zod validation
- **Tooling**: pnpm, ESLint (Next.js base), `tsc --noEmit`

## Directory Tour

- `app/` – Routes, layouts, API handlers  
  - `app/api/openrouter/route.ts` proxies to OpenRouter using `OPENROUTER_API_KEY`, sanitizes responses into an insights array.
- `components/` – Feature surfaces (`CampaignsTable`, `CreativeCard`, `FilterDropdown`, `LoadingSpinner`, `StatusBadge`, etc.).
- `components/ui/` – Radix + Tailwind building blocks (dialogs, buttons, tables, forms, charts).
- `lib/` – Utilities and types:  
  - `lib/types.ts` centralizes the `Campaign` interface and friends.  
  - `lib/api.ts` fetch helpers for backend data.  
  - `lib/ai.ts` orchestrates insight fetching + fallback heuristics.
- `app/globals.css`, `tailwind.config.ts`, `tsconfig.json`, `next.config.js` – global configuration.

## Architecture at a Glance

```
Client (CampaignsTable / CreativeCard)
        │
        │ generateInsights(campaign)
        ▼
App Route `/api/openrouter`
        │  - Prepares OpenRouter payload
        │  - Injects OPENROUTER_API_KEY
        ▼
OpenRouter Chat Completions
        │
        └──► Parsed insights (string[])
             ↳ `lib/ai.ts` falls back to heuristics if anything fails
```

## Getting Started

1. **Install**
   ```powershell
   pnpm install
   ```
2. **Configure secrets** – create `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-...your_openrouter_key...
   ```
3. **Run dev server**
   ```powershell
   pnpm dev
   ```
4. Visit `http://localhost:3000` → open the campaigns experience.

## Production Workflow

```powershell
pnpm build   # compile Next.js app
pnpm start   # serve the production build
```

## Quality Gates

- `pnpm run typecheck` – strict `tsc --noEmit`
- `pnpm run lint` – Next.js ESLint rules

## Customization Playbook

- **Images & media**: Add `imageUrl?: string` to `Campaign` in `lib/types.ts`, update backend payloads, and CreativeCard will render real creatives.
- **AI tone/model**: Tweak the system prompt or model name inside `app/api/openrouter/route.ts`, or pass a model via env for runtime flexibility.
- **More metrics**: Extend `Campaign` types and surface them in `CampaignsTable` columns + creative dialog cards.

## Troubleshooting

- **No AI insights**: Confirm `OPENROUTER_API_KEY`, inspect `/api/openrouter` server logs, and remember the UI will gracefully fall back to heuristic insights.
- **Model parse errors**: OpenRouter occasionally returns non-JSON text; the route attempts to coerce strings, otherwise the fallback heuristics kick in.
- **Missing creatives**: Ensure backend responses include `imageUrl` (or rely on the built-in placeholder).

## Contributing

- Ship focused, well-scoped commits.
- Update `REPO_DOCUMENTATION.md` + `README.md` when altering public components or setup steps.
- Run `pnpm run typecheck` and `pnpm run lint` before opening a PR.

---

Need API contract docs or backend stubs? Open an issue and we’ll add them.
