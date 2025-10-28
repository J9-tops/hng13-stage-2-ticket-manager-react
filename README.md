# Ticket Manager — React implementation

This repository contains the React + TypeScript + Vite implementation of the Ticket Manager challenge. The full challenge asks for three separate frontend implementations (React, Vue.js, and Twig) that share the same layout, design language and behavior. This repo currently contains the React implementation only. To see the Vue implementation https://ticketflow-vue.netlify.app/ and Twig implementation https://hng13-stage-2-ticket-manager-twig-production.up.railway.app/

This README explains what is implemented, how to run the app, where key UI pieces live, validation & auth details, accessibility notes.

## Quick overview

- Framework: React 19 + TypeScript
- Bundler: Vite
- UI/utility libraries: `lucide-react` (icons), `sonner` (toasts), `zustand` (lightweight store)
- CSS: SCSS files under `src/styles`

Project scripts (from `package.json`): `dev` (vite), `build`, `preview`, `lint`.

### What this implementation includes

- Landing page with hero, CTA links, and responsive layout (see `src/pages/LandingPage.tsx` and styles in `src/styles`).
- Authentication screens: Sign In and Sign Up with client-side validation and toasts (`src/pages/SignIn.tsx`, `src/pages/SignUp.tsx`).
- Dashboard overview with cards for ticket stats and navigation to Tickets screen (`src/pages/Dashboard.tsx` and `src/components/shared/DashboardLayout.tsx`).
- Ticket management screen (list of ticket cards, create/update/delete flows) with modal components in `src/components/modals/` and ticket card UI in `src/components/ticket-page/TicketCard.tsx`.
- Global modal state using `zustand` (`src/store.ts`).
- Routing: `src/routes.tsx` and a protected route component in `src/components/shared/ProtectedRoute.tsx`.

## How to run (local)

This project uses pnpm (a lockfile is present). You can use npm or yarn too, but the commands below assume pnpm. Run these in PowerShell (Windows):

```powershell
pnpm install
pnpm dev
```

Build for production:

```powershell
pnpm build
pnpm preview
```

If you prefer npm:

```powershell
npm install
npm run dev
```

Then visit `http://localhost:8080` in your browser.

Accessing `http://localhost:8080/dashboard/tickets` first generates sample tickets.

## Authentication & session

- Session storage key used by this React app: `ticketapp_session` (saved in `localStorage`).
- Sign Up stores a `users` array in `localStorage` and sets `ticketapp_session` to the newly created user object. Sign In checks `users` for matching credentials and sets `ticketapp_session` on success.
- Protected routes should be accessed only when `ticketapp_session` exists.

Logout: clear `ticketapp_session` and redirect to the landing page. The Logout modal component exists in `src/components/modals/Logout.tsx`.

Example test credentials (for local testing):

- Create a new account via Sign Up with:
  - Email: test@example.com
  - Password: password123

Or pre-populate `localStorage` manually in the browser console:

```js
localStorage.setItem(
  "users",
  JSON.stringify([{ email: "test@example.com", password: "password123" }])
);
```

Then sign in with the same credentials.

## Validation & business rules

Per the challenge instructions the app must enforce:

- Required fields: `title` and `status` on tickets.
- Allowed status values (challenge spec): `open`, `in_progress`, `closed` (lowercase, underscore for in_progress).
- UI color mapping (status → color):

  - `open` → green tone
  - `in_progress` → amber tone
  - `closed` → gray tone

- Form fields across Sign In / Sign Up and Ticket forms include inline field validation and show errors beneath inputs. Toasts (via `sonner`) provide global success/error feedback.

Validation examples implemented in code:

- Sign In / Sign Up: email format check and minimum password length (6) — see `src/pages/SignIn.tsx` and `src/pages/SignUp.tsx`.
- Ticket forms: real-time validation is implemented in the ticket modal components (see `src/components/modals/UpdateTicket.tsx` and `CreateTicket.tsx`).

## Routing & protected pages

- Routes are defined in `src/routes.tsx`.
- `ProtectedRoute` component (wraps routes that require authentication) is at `src/components/shared/ProtectedRoute.tsx`.

Important: `ProtectedRoute.tsx` currently checks `localStorage.getItem('ticketapp_session')` which does not match the actual session key `ticketapp_session` used by SignIn/SignUp. Update `ProtectedRoute` to use `ticketapp_session` to ensure pages are protected correctly.

## Files & key components

- `src/pages/LandingPage.tsx` — hero section, CTAs, landing layout.
- `src/pages/SignIn.tsx`, `src/pages/SignUp.tsx` — authentication forms with validation and toasts.
- `src/pages/Dashboard.tsx` — dashboard cards and stats.
- `src/pages/Tickets.tsx` — ticket management screen.
- `src/components/modals/` — modal components for Create, Update, Delete, Logout flows.
- `src/components/ticket-page/TicketCard.tsx` — ticket card UI and status tag.
- `src/store.ts` — `zustand` modal state (open/close + modal type).
- `src/styles/` — SCSS files that implement the site design (hero wave, circles, box-cards, max-width container rules, responsive breakpoints).
