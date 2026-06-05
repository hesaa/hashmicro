# Hashmicro Technical Test

Node.js + Express.js + TypeScript MVC application with Prisma ORM (SQLite) and Zod validation.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma (SQLite)
- **Validation:** Zod
- **Docs:** Swagger UI

## Project Structure

```
src/
├── config/
│   ├── env.ts              # Environment config
│   └── swagger.ts          # OpenAPI spec
├── controllers/
│   ├── product.controller.ts
│   └── comparison.controller.ts
├── middleware/
│   ├── error.middleware.ts      # Global error handler
│   └── validate.middleware.ts   # Zod validation
├── models/
│   ├── base.model.ts           # Abstract base model (OOP)
│   └── product.model.ts        # Extends BaseModel
├── routes/
│   ├── index.ts
│   ├── product.routes.ts
│   └── comparison.routes.ts
├── schemas/
│   └── product.schema.ts       # Zod schemas
├── services/
│   ├── product.service.ts      # Business logic
│   └── comparison.service.ts   # String comparison
├── types/
│   └── index.ts
├── app.ts
└── server.ts
```

## Setup

```bash
# Install dependencies
npm install

# Setup database
npx prisma db push

# Seed 1000 products
npx tsx prisma/seed.ts

# Start dev server
npm run dev
```

Server runs at `http://localhost:4000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/products` | List products (pagination + search) |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/stats` | Statistics by category (nested loop) |
| POST | `/api/products/discount` | Discount calculation (nested if + math) |
| POST | `/api/comparison` | String comparison (sensitive/non-sensitive) |

## Swagger Docs

Open `http://localhost:4000/api-docs` for interactive API documentation.

## Features

- **OOP Inheritance:** `BaseModel` → `ProductModel`
- **Nested Loop:** Product statistics aggregation by category
- **Nested If:** Discount logic based on price tier, stock, and membership
- **Mathematics:** Percentage calculation in string comparison
- **CRUD:** Full product management
- **String Comparison:** Sensitive and non-sensitive case matching with percentage output
- **Form Validation:** Zod schemas with reusable middleware
- **1000 seeded products** across 10 categories

## Scripts

```bash
npm run dev          # Dev server with hot reload
npm run build        # Compile TypeScript
npm run start        # Run production build
npm run typecheck    # Type checking
npm run db:push      # Push Prisma schema to DB
npm run db:studio    # Open Prisma Studio
```
