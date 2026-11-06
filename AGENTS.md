<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust-client

Next.js 16.4.3 (App Router, `src/app`) + React 19.3 client app. No test suite, no CI, no pre-commit hooks — verify with lint + typecheck + build.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run lint` — runs flat `eslint` (no args needed); config is `eslint.config.mjs`
- `npx tsc --noEmit` — there is no `typecheck` script; tsconfig has `noEmit: true`
- `npm run build` — final verification (also prints the route table; useful to confirm a new route registered)
- Recommended order: lint → tsc → build
- **`npm run lint` is already red and exits non-zero** before you touch anything: 2 `react-hooks/set-state-in-effect` errors in generated `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus 2 unused-var warnings. Do not "fix" generated shadcn files to chase a green run — just make sure your own files are clean.
- To verify a page actually renders: `npm run build` then `npx next start -p <port>` and curl the route. Prerendering SSRs client components, so runtime import/render errors surface there.

## Conventions that differ from defaults

- shadcn/ui components use **Base UI** (`@base-ui/react`), not Radix — import primitives from `@base-ui/react/*` and style `[style=base-nova]` (see `components.json`). Do not substitute Radix imports or radix `data-*` attributes.
- Generated `src/components/ui/*.tsx` files import `import { cn } from "cn"` (the `cn` npm package, a drop-in for clsx + tailwind-merge). `src/lib/utils.ts` only re-exports it as `@/lib/utils`.
- Tailwind **v4** with CSS-first config: there is no `tailwind.config.js`; theme tokens and CSS variables live in `src/app/globals.css`. Tailwind is loaded as a Turbopack rule in `next.config.ts`, not a PostCSS setup.
- Path alias `@/*` → `src/*` (components `@/components/ui`, hooks `@/hooks`, lib `@/lib`).
- React Compiler is enabled (`reactCompiler: true` + babel plugin in `next.config.ts`): do not hand-write `useMemo`/`useCallback`/manual memoization.
- Layouts/pages use Next 16 types, e.g. `LayoutProps<"/">` instead of hand-typed `children`. Check `node_modules/next/dist/docs/` for current APIs before writing framework code.
- Add shadcn components with the CLI: `npx shadcn add <name>` (schema + aliases in `components.json`; style `base-nova`, icons `lucide`). Avoid hand-editing generated files except for custom variants — everything accepts `data-slot` and uses `cva`.

## Auth (better-auth)

- Server config: `src/lib/auth.ts` (Mongo adapter, `emailAndPassword.enabled: true`). Client: `src/lib/auth-client.ts` (exports both `authClient` and a destructured `signIn`/`signUp`/`signOut`/`useSession` from a *second* client instance — prefer `authClient`).
- Handler mounted at `src/app/api/auth/[...all]/route.ts` → all auth traffic stays on this app's origin.
- **Client method names are `authClient.signUp.email(...)` and `authClient.signIn.email(...)`** (routes `/sign-up/email`, `/sign-in/email` in better-auth 1.7). `signUp.emailAndPassword` does **not** exist in this version — TypeScript will catch it, don't waste time guessing.
- Minimum password length is 8 (better-auth server default `minPasswordLength`); match any client-side hint to it.
- **`src/lib/auth.ts` hardcodes `mongodb://localhost:27017/database`.** `.env` defines `MONGODB_URI` (Atlas) and `BETTER_AUTH_SECRET`/`BETTER_AUTH_URL`, but the URI is never read — sign-up/sign-in only work with a local MongoDB running. Don't assume the `.env` value is in use.

## Project

A travel-destinations landing app ("Wanderlust").

- `src/app/layout.tsx` renders `Navbar` + `Footer` **once for every route**, wrapping `children` in a `min-h-full flex flex-col` body — pages opt into the remaining height with `flex-1` on their `<main>` (see `sign-up`).
- Routes: `/` (landing), `/destinations`, `/destinations/[id]`, `/add-destination`, `/sign-up`, `/sign-in`. `src/app/(auth)/` is a route group (no nested layout) holding the auth pages.
- `/` is composed of section components: `Banner`, `Features`, `Testimonials`, `CallToAction`.
- Font: **Josefin Sans** via `next/font/google`, loaded as CSS variable `--font-geist-mono` (name is as-is; referenced by `--font-mono` in `globals.css`).
- Static images live in `public/images/` (incl. `destinations/`); `next/image` remote loading only from `images.unsplash.com` and `picsum.photos` (see `next.config.ts`).

## Structure

- `src/app/` — routes (`page.tsx`, `layout.tsx`, `globals.css`); keep `metadata` in a server `page.tsx` and put interactive UI in a client component.
- `src/components/home/` — landing sections (`banner`, `features`, `testimonials`, `cta`).
- `src/components/layout/` — `navbar`, `footer`.
- `src/components/destinations/` — cards + edit/delete modals (these POST to the external API).
- `src/components/auth/` — auth forms (e.g. `sign-up-form.tsx`, the client half of `(auth)/sign-up`).
- `src/components/ui/` — generated shadcn components.
- `src/type/` — **singular** directory, e.g. `destinationsType.ts` (default-exports `IDestination`).
- `src/hooks/`, `src/lib/` — hooks (`use-mobile`) and shared utilities.

## Gotchas

- Destination CRUD calls a **separate backend on `https://wanderlust-server-mu-ruddy.vercel.app`** (`/destinations`, `/destination/:id`, `/add-destination`) with hard-coded absolute URLs — it is not part of this repo. Those pages will fail until that service is running.
- Navbar `navLinks` include placeholders for routes that don't exist yet (`/bookings`); `userLinks` Login is still `#login`.
- `next.config.ts` sets `experimental.agentFeedback: true` (source of the block at the top of this file).
- Path: `E:\Ai power web\milestone08\wanderlust-client` (contains a space — quote paths in shell commands).
- Icons: `lucide-react` v1 — prefer current names (`CircleAlert`, not `AlertCircle`; both may exist, but only the current ones are guaranteed).
- Extra libs in use: `embla-carousel-react`, `react-resizable-panels`, `recharts`, `class-variance-authority`.
