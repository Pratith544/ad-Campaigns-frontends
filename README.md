Project Overview

Name: ad-Campaigns-frontends

Purpose:
A Next.js TypeScript frontend for viewing advertising campaigns, featuring client-side search, filtering, sorting, and a creative-detail modal with AI-generated insights. The app uses a secure server-side proxy to call OpenRouter so the API key stays private.
Campaign data is fetched from a FastAPI backend deployed separately.

Tech Stack

Framework: Next.js (App Router), TypeScript

Styling: Tailwind CSS

UI Primitives: Radix UI

Icons: lucide-react

Other: React 18, Recharts (charts), Zod (validation)

Repository Structure (Key Files & Folders)
app/

Contains Next.js app routes and server/client components.

app/api/openrouter/route.ts

Server-side API route that proxies requests to OpenRouter. Reads OPENROUTER_API_KEY from the environment and returns an array of AI insight strings.

components/

Shared UI components.

CampaignsTable.tsx — Campaign listing table with search, filter, and sort. Clicking a row opens the creative dialog.

CreativeCard.tsx — Creative detail view; displays campaign metrics, image (image_url), and AI insights.

FilterDropdown.tsx — Status filter control.

LoadingSpinner.tsx, StatusBadge.tsx, ErrorMessage.tsx, etc.

lib/

Helper utilities.

lib/types.ts — Shared TypeScript types (Campaign, etc.).

lib/api.ts — Campaign fetch utilities.

lib/ai.ts — Handles calls to /api/openrouter and fallback heuristics.

ui/

Base UI primitives built with Radix + Tailwind.

Other config files

next.config.js

tsconfig.json

tailwind.config.ts

Key Features
✔ Campaign Table

Search by name or ID

Status filter: All / Active / Paused

Sort by name, clicks, cost, impressions

Click a row to open detailed creative view

✔ Creative Detail View (CreativeCard)

Shows campaign banner image (image_url) or placeholder

Displays clicks, cost, impressions

Retrieves AI insights from OpenRouter via server route

Environment & Secrets

Required server-side environment variable:

OPENROUTER_API_KEY=sk-...your_key...


Never commit this key.

Example .env.local:

OPENROUTER_API_KEY=sk-...

How OpenRouter Integration Works

Client calls generateInsights(campaign) from lib/ai.ts.

This sends a POST request to /api/openrouter.

Server route:

Prepares a structured prompt

Includes campaign.image_url when available

Calls OpenRouter at https://openrouter.ai/api/v1/chat/completions

Parses and returns { insights: string[] }

On error, lib/ai.ts generates local fallback insights.

Running the Project (Development)

Install dependencies:

pnpm install


Start dev server:

pnpm dev


App runs at:

http://localhost:3000

Build / Production
pnpm build
pnpm start

Type Checking & Linting
pnpm run typecheck
pnpm run lint

Troubleshooting
Insights not showing?

Ensure OPENROUTER_API_KEY is set

Check server output for OpenRouter errors

If parsing fails, fallback insights are shown automatically

Images not loading?

Ensure backend returns image_url

Ensure CreativeCard uses campaign.image_url

Contributing

Use small, focused commits

Update documentation for public components

Run lint & typecheck before PR
