# HFH Team Builder

An AI-powered team builder application built with the T3 Stack, featuring intelligent team composition using Claude AI.

## Tech Stack

### Core Framework & Runtime

- **[Next.js 15](https://nextjs.org)** - React framework with App Router and Turbo mode
- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development

### UI & Styling

- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Re-usable component library
- **[React 19](https://react.dev)** - UI library

### Backend & Database

- **[Turso](https://turso.tech)** - Edge-hosted SQLite database
- **[Prisma](https://prisma.io)** - Type-safe ORM
- **[tRPC v11](https://trpc.io)** - End-to-end typesafe APIs
- **[TanStack Query v5](https://tanstack.com/query)** - Powerful data fetching and caching

### AI Integration

- **[Claude (Anthropic)](https://claude.ai)** - AI assistant for intelligent team building and recommendations

### Developer Experience

- **[Biome](https://biomejs.dev)** - Fast linter and formatter
- **[Zod](https://zod.dev)** - TypeScript-first schema validation
- **[SuperJSON](https://github.com/blitz-js/superjson)** - JSON serialization with type preservation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

```bash
# Install dependencies
bun install

# Set up your database
bun run db:push

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

### Development

- `bun run dev` - Start development server with Turbo mode
- `bun run db:studio` - Open Prisma Studio (database GUI)
- `bun run typecheck` - Run TypeScript type checking

### Database

- `bun run db:push` - Push database schema changes (development)
- `bun run db:generate` - Create and apply migrations (development)
- `bun run db:migrate` - Apply migrations (production)

### Code Quality

- `bun run check` - Run Biome linting and formatting checks
- `bun run check:write` - Run Biome and auto-fix issues
- `bun run check:unsafe` - Run Biome with unsafe auto-fixes

### Production

- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run preview` - Build and preview production build

For detailed CLI documentation and commands for all tools (Bun, Next.js, Prisma, Turso, shadcn/ui, Biome), see [CLI-REFERENCE.md](./CLI-REFERENCE.md).

## Project Documentation

- **[ROADMAP.md](./ROADMAP.md)** - Complete development roadmap with 13 phases
- **[CLI-REFERENCE.md](./CLI-REFERENCE.md)** - Comprehensive CLI commands for all tools

## Learn More

This project is built on the [T3 Stack](https://create.t3.gg/). Official documentation:

- **[T3 Stack](https://create.t3.gg/)** - Framework documentation
- **[Next.js](https://nextjs.org/docs)** - React framework
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Prisma](https://prisma.io/docs)** - ORM documentation
- **[Turso](https://docs.turso.tech)** - Edge database
- **[shadcn/ui](https://ui.shadcn.com)** - Component library
- **[Biome](https://biomejs.dev)** - Linter and formatter
- **[Bun](https://bun.sh/docs)** - JavaScript runtime

### CLI Documentation

- **[Bun CLI](https://bun.sh/docs/cli)** - Package manager commands
- **[Next.js CLI](https://nextjs.org/docs/app/api-reference/next-cli)** - Framework commands
- **[Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference)** - Database commands
- **[Turso CLI](https://docs.turso.tech/cli)** - Database management
- **[shadcn/ui CLI](https://ui.shadcn.com/docs/cli)** - Component installation
- **[Biome CLI](https://biomejs.dev/reference/cli/)** - Linting and formatting

## Deployment

This application can be deployed to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any platform that supports Next.js applications.

See [ROADMAP.md Phase 13](./ROADMAP.md#phase-13-performance--deployment) for detailed deployment instructions.
