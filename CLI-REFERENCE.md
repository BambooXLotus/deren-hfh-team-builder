# CLI Commands Reference

Comprehensive guide to CLI commands for all technologies used in the HFH Team Builder project.

---

## Bun - Package Manager and Runtime

**Official Documentation:** https://bun.sh/docs/cli

### Package Management

```bash
# Install all dependencies
bun install

# Add a package
bun add <package-name>

# Add a dev dependency
bun add -d <package-name>

# Remove a package
bun remove <package-name>

# Update dependencies
bun update

# Update a specific package
bun update <package-name>
```

### Running Scripts

```bash
# Run a package.json script
bun run <script-name>

# Run a TypeScript/JavaScript file directly
bun run <file.ts>

# Execute a file with watch mode
bun --watch <file.ts>
```

### Testing (if using Bun's built-in test runner)

```bash
# Run tests
bun test

# Run tests in watch mode
bun test --watch
```

**Key Features:**

- Drop-in replacement for npm/yarn/pnpm
- 10-25x faster than npm install
- Native TypeScript support

---

## Next.js 15 - React Framework

**Official Documentation:** https://nextjs.org/docs

### Development

```bash
# Start development server (with Turbo mode)
bun run dev
# or
next dev --turbo

# Start on a specific port
next dev -p 3001

# Start with HTTPS (experimental)
next dev --experimental-https
```

### Building & Production

```bash
# Create production build
bun run build
# or
next build

# Start production server
bun run start
# or
next start

# Build and start (preview mode)
bun run preview
```

### Utilities

```bash
# Show Next.js info (version, dependencies)
next info

# Lint the project (if ESLint configured)
next lint
```

**CLI Reference:** https://nextjs.org/docs/app/api-reference/next-cli

---

## Prisma - ORM with Turso Database

**Official Documentation:** https://www.prisma.io/docs/reference/api-reference/command-reference

### Database Setup & Migrations

```bash
# Generate Prisma Client (runs automatically after install)
prisma generate

# Create and apply a migration in development
bun run db:generate
# or
prisma migrate dev

# With custom migration name
prisma migrate dev --name init

# Apply migrations in production
bun run db:migrate
# or
prisma migrate deploy

# Push schema changes without migrations (development)
bun run db:push
# or
prisma db push

# Reset database (WARNING: deletes all data)
prisma migrate reset
```

### Database Utilities

```bash
# Open Prisma Studio (database GUI)
bun run db:studio
# or
prisma studio

# Validate Prisma schema
prisma validate

# Format Prisma schema
prisma format

# Pull schema from existing database
prisma db pull

# Seed the database (if seed script configured)
prisma db seed
```

### Introspection & Debugging

```bash
# View migration status
prisma migrate status

# Generate Prisma Client with custom output
prisma generate --schema=./prisma/schema.prisma
```

**Prisma CLI Reference:** https://www.prisma.io/docs/reference/api-reference/command-reference

---

## Turso - Edge SQLite Database

**Official Documentation:** https://docs.turso.tech/cli

### Installation

```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm get.tur.so/install.ps1 | iex

# Homebrew
brew install tursodatabase/tap/turso
```

### Authentication

```bash
# Sign up/login
turso auth login

# Sign out
turso auth logout

# Show current user
turso auth whoami

# Generate API token
turso auth token
```

### Database Management

```bash
# Create a database
turso db create <database-name>

# List all databases
turso db list

# Show database details
turso db show <database-name>

# Get database URL
turso db show <database-name> --url

# Delete a database
turso db destroy <database-name>
```

### Database Tokens

```bash
# Create a token for database access
turso db tokens create <database-name>

# List tokens
turso db tokens list <database-name>

# Revoke a token
turso db tokens revoke <database-name> <token>
```

### Database Shell & Queries

```bash
# Open interactive SQL shell
turso db shell <database-name>

# Execute SQL query
turso db shell <database-name> "SELECT * FROM users;"

# Execute SQL file
turso db shell <database-name> < schema.sql
```

### Locations & Replication

```bash
# List available locations
turso db locations

# Create database in specific location
turso db create <database-name> --location lhr

# Add replica to database
turso db replicate <database-name> <location-code>
```

### Database Inspection

```bash
# Show database statistics
turso db show <database-name> --stats

# List database instances
turso db instances list <database-name>

# Show database configuration
turso db config show <database-name>
```

### Environment Variables for Turso + Prisma

```bash
# In your .env file:
DATABASE_URL="libsql://[database-name]-[org].turso.io"
DATABASE_AUTH_TOKEN="your-auth-token"
```

**CLI Reference:** https://docs.turso.tech/cli/introduction

---

## shadcn/ui - Component Library

**Official Documentation:** https://ui.shadcn.com/docs/cli

### Installation & Setup

```bash
# Initialize shadcn/ui in your project
bunx shadcn@latest init
```

### Adding Components

```bash
# Add a specific component
bunx shadcn@latest add button

# Add multiple components
bunx shadcn@latest add button card dialog

# Add all components
bunx shadcn@latest add --all

# List available components (interactive)
bunx shadcn@latest add
```

### Common Components to Add

```bash
# Forms & Inputs
bunx shadcn@latest add form input label textarea select checkbox radio-group

# Layout & Navigation
bunx shadcn@latest add card sheet dialog drawer tabs accordion

# Feedback & Display
bunx shadcn@latest add alert badge toast tooltip popover

# Data Display
bunx shadcn@latest add table avatar calendar slider progress scroll-area
```

### Utility Commands

```bash
# Check for component updates
bunx shadcn@latest diff

# Update specific component
bunx shadcn@latest diff <component-name>
```

**CLI Documentation:** https://ui.shadcn.com/docs/cli

---

## Biome - Linter and Formatter

**Official Documentation:** https://biomejs.dev/reference/cli/

### Linting & Formatting

```bash
# Check code (lint + format check)
bun run check
# or
biome check .

# Check and auto-fix issues
bun run check:write
# or
biome check --write .

# Check and apply unsafe fixes
bun run check:unsafe
# or
biome check --write --unsafe .

# Only lint (no formatting)
biome lint .

# Only format
biome format .

# Format and write changes
biome format --write .
```

### File-Specific Operations

```bash
# Check specific files/directories
biome check src/

# Check with custom config
biome check --config-path=./biome.jsonc .

# Show applied fixes
biome check --write --verbose .
```

### CI/CD Usage

```bash
# Check all files (exits with error if issues found)
biome ci .

# Check with diagnostics in GitHub Actions format
biome ci --formatter=github .
```

### Configuration

```bash
# Initialize Biome configuration
biome init

# Migrate from ESLint/Prettier
biome migrate eslint --write
biome migrate prettier --write
```

**CLI Reference:** https://biomejs.dev/reference/cli/

---

## TypeScript

### Type Checking

```bash
# Type check without emitting files
bun run typecheck
# or
tsc --noEmit

# Watch mode
tsc --noEmit --watch

# Type check specific files
tsc --noEmit src/server/api/routers/post.ts
```

---

## tRPC - API Framework

**Official Documentation:** https://trpc.io/docs

tRPC itself doesn't have a dedicated CLI, but here are common development patterns:

### Development Patterns

```bash
# Type check your tRPC routes
bun run typecheck

# Watch mode for type checking
tsc --noEmit --watch
```

### Testing tRPC Routes

```bash
# Run tests with Vitest (if configured)
bun test

# Test specific tRPC router
bun test src/server/api/routers/post.test.ts
```

**Project Structure for tRPC:**

- Routers: `src/server/api/routers/`
- Root router: `src/server/api/root.ts`
- tRPC config: `src/server/api/trpc.ts`
- Client: `src/trpc/react.tsx`

**Documentation:** https://trpc.io/docs/quickstart

---

## Quick Start Workflow

Complete workflow to set up and run the project:

```bash
# 1. Install dependencies
bun install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Turso credentials

# 3. Set up Turso database
turso auth login
turso db create hfh-team-builder
turso db show hfh-team-builder --url
turso db tokens create hfh-team-builder
# Copy DATABASE_URL and DATABASE_AUTH_TOKEN to .env

# 4. Push database schema
bun run db:push

# 5. Run development server
bun run dev

# 6. (Optional) Open Prisma Studio in another terminal
bun run db:studio

# 7. Check code quality
bun run check

# 8. Type check
bun run typecheck
```

---

## CI/CD Pipeline Commands

Commands typically used in automated build pipelines:

```bash
# 1. Install dependencies (with lockfile)
bun install --frozen-lockfile

# 2. Type checking
bun run typecheck

# 3. Linting and formatting
bun run check

# 4. Run tests (if configured)
bun test

# 5. Database migrations (production)
bun run db:migrate

# 6. Build application
bun run build

# 7. Start production server
bun run start
```

---

## Environment Setup

### Required Environment Variables

```bash
# Database (Turso)
DATABASE_URL="libsql://[database-name]-[org].turso.io"
DATABASE_AUTH_TOKEN="your-turso-auth-token"

# AI Integration
ANTHROPIC_API_KEY="your-claude-api-key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Environment Validation

This project uses `@t3-oss/env-nextjs` for type-safe environment variables. Variables are automatically validated on build/dev startup.

Configuration: `src/env.js`

---

## Troubleshooting

### Common Issues

**Prisma Client not generating:**

```bash
prisma generate
```

**Database schema out of sync:**

```bash
bun run db:push
```

**Type errors after dependency update:**

```bash
bun install
bun run typecheck
```

**Port 3000 already in use:**

```bash
# Use different port
next dev -p 3001
```

**Biome formatting conflicts:**

```bash
# Auto-fix formatting issues
bun run check:write
```

---

## Additional Resources

- **T3 Stack Documentation:** https://create.t3.gg/
- **Next.js Documentation:** https://nextjs.org/docs
- **Prisma Documentation:** https://prisma.io/docs
- **Turso Documentation:** https://docs.turso.tech
- **shadcn/ui Documentation:** https://ui.shadcn.com
- **Biome Documentation:** https://biomejs.dev
- **tRPC Documentation:** https://trpc.io
- **Bun Documentation:** https://bun.sh/docs
