# hashmicro Platform - Monorepo Structure

## Overview

hashmicro Platform is a **pnpm monorepo** managed with **Turborepo** for build orchestration.

## Directory Structure

```
hashmicro/
├── apps/
│   ├── api/              # @hashmicro/api - Express + Prisma API
│   ├── web/              # hashmicro/web - Next.js 16 frontend
├── packages/
│   ├── shared-types/     # @hashmicro/shared-types - TypeScript types
│   └── shared-utils/     # @hashmicro/shared-utils - Shared utilities
├── package.json          # Root - Turbo scripts
├── pnpm-workspace.yaml   # Workspace config
├── turbo.json            # Turborepo pipeline
└── tsconfig.json         # Base TypeScript config
```

## Key Technologies

| App | Stack |
|-----|-------|
| **api** | Express, Prisma, TypeScript, ts-node-dev |
| **web** | Next.js 16, React 19, Tailwind CSS, Radix UI |
| **shared** | TypeScript types & utilities (workspace links) |

## Running the Project

### Start Everything (Recommended)

```bash
# Root directory
npm run dev
```

This runs `turbo run dev` which starts **all** apps in parallel via Turborepo.

- api: `http://localhost:3000` (or configured port)
- Web: `http://localhost:3000` (Next.js default, check `next.config.ts`)

### Start Individually

```bash
# api only
cd apps/api
npm run dev

# Web only
cd apps/web
npm run dev
```

## api Scripts (`apps/api`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `ts-node-dev --respawn --transpile-only src/index.ts` | Hot-reload dev server |
| `start` | `node dist/index.js` | Production server |
| `db:migrate` | `prisma migrate dev` | Run Prisma migrations |
| `db:seed` | `ts-node prisma/seed.ts` | Seed database |
| `db:studio` | `prisma studio` | Open Prisma Studio GUI |
| `build` | `tsc` | Compile TypeScript |
| `lint` | `eslint src/` | Lint api code |
| `type-check` | `tsc --noEmit` | Type checking only |

## Web Scripts (`apps/web`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Next.js dev server with HMR |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Lint frontend code |

## Root Scripts (via Turborepo)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `turbo run dev` | Start all apps in parallel |
| `build` | `turbo run build` | Build all apps (respects deps) |
| `lint` | `turbo run lint` | Lint all apps |
| `type-check` | `turbo run type-check` | Type check all apps |
| `clean` | `turbo run clean && rm -rf node_modules` | Clean all builds + node_modules |

## Package Manager

```bash
# Install dependencies
pnpm install

# Add dependency to specific app
pnpm add <package> --filter @hashmicro/api
pnpm add <package> --filter @hashmicro/web

# Add shared dependency to root
pnpm add -w <package>
```

## How Turborepo Works

- **Parallel execution**: Runs tasks across apps simultaneously
- **Dependency graph**: Respects `^build` - builds dependencies first
- **Caching**: Caches build outputs for faster subsequent runs
- **Persistent**: `dev` tasks stay running (no cache, persistent mode)

## Environment Variables

Each app has its own `.env` file:

- `apps/api/.env` - api config (database, Firebase, MinIO, etc.)
- `apps/web/.env` - Frontend config (API URLs, etc.)

Copy from `.env.example` files to set up:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

## Workspace Dependencies

api depends on shared packages:

```json
"@hashmicro/shared-types": "workspace:*"
"@hashmicro/shared-utils": "workspace:*"
```

These are resolved automatically by pnpm from `packages/` directory.
