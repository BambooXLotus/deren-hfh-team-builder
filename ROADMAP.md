# HFH Team Builder - Development Roadmap

## Project Overview

Rebuilding the [Haikyu Team Builder](https://gondif.github.io/haikyu-team-builder-EN/) as a modern, AI-powered full-stack application using Next.js 15, TypeScript, Turso, shadcn/ui, tRPC, and Claude AI.

**Original Project:** Vanilla JS client-side volleyball team builder for Haikyu Fly High game
**Goal:** Modern, type-safe, AI-enhanced team building platform with persistent storage and intelligent recommendations

---

## Phase 1: Database & Infrastructure Setup

**Goal:** Set up Turso database and define complete data schema

### Tasks:

- [x] ~~Create Turso database account and new database~~ (Using local SQLite for development)
- [x] ~~Get Turso database URL and auth token~~ (Production setup in Phase 13)
- [x] Update `.env` with database credentials (local SQLite)
- [x] Modify `prisma/schema.prisma` to use SQLite provider
- [x] Create database schema:
  - [x] `characters` table (name, rarity, position, school, stats, skills, bonds, images)
  - [x] `teams` table (userId, name, positions, bench, teamType)
  - [x] `synergies` table (name, requiredCharacters, statBonus, description)
  - [x] `items` table (name, type, effects, images)
  - [x] `users` table (basic user info)
  - [x] `userPreferences` table (recommendationWeights, theme)
- [x] Run Prisma migrations: `bun run db:push`
- [x] Test database connection

### TypeScript Types to Define:

```typescript
type Position = 'S' | 'MB' | 'WS' | 'L' | 'OP';
type Rarity = 'UR' | 'SSR' | 'SP' | 'SR' | 'R';
type TeamType = 'Quick' | 'Power' | 'Block' | 'Reception';
type School = 'Karasuno' | 'Nekoma' | 'Shiratorizawa' | ...;

interface Character {
  id: string;
  name: string;
  rarity: Rarity;
  position: Position;
  school: School;
  imageUrl: string;
  releaseDate: Date;
  stats: CharacterStats;
  skills: Skill[];
  bonds: string[];
  symbols: string[];
}

interface CharacterStats {
  serve: number;
  spike: number;
  set: number;
  receive: number;
  block: number;
  save: number;
}

interface Team {
  id: string;
  userId: string;
  name: string;
  positions: TeamPositions;
  bench: BenchSlot[];
  synergies: ActiveSynergy[];
  teamType?: TeamType;
}
```

### Database Schema (Prisma):

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  teams     Team[]
  preferences UserPreferences?
  createdAt DateTime @default(now())
}

model Character {
  id          String   @id @default(cuid())
  name        String
  rarity      String
  position    String
  school      String
  imageUrl    String?
  releaseDate DateTime?
  stats       Json     // CharacterStats
  skills      Json     // Skill[]
  bonds       Json     // string[]
  symbols     Json     // string[]

  @@index([position])
  @@index([school])
  @@index([rarity])
}

model Team {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name      String
  positions Json     // TeamPositions
  bench     Json     // BenchSlot[]
  teamType  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}

model Synergy {
  id                  String @id @default(cuid())
  name                String
  requiredCharacters  Json   // string[] (character IDs)
  statBonus           Json   // Partial<CharacterStats>
  description         String
}

model Item {
  id           String  @id @default(cuid())
  name         String
  type         String  // "Memory" | "Potential Set"
  effects      Json    // string[]
  imageUrl     String?
  thumbnailUrl String?
}

model UserPreferences {
  userId                String @id
  user                  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  recommendationWeights Json   // RecommendationWeights
  theme                 String @default("dark")
}
```

### Deliverables:

- ✅ Local SQLite database created and connected
- ✅ Complete Prisma schema defined (6 models)
- ✅ Database tables created successfully
- ✅ TypeScript types exported from `src/types/index.ts`
- ✅ Production Turso setup documented in Phase 13

**Status:** ✅ **COMPLETED** (2025-01-18)

---

## Phase 2: Seed Character Data

**Goal:** Import all Haikyu characters, synergies, and items from original project

### Tasks:

- [x] Create seed script: `prisma/seed.ts`
- [x] Extract character data from original project (34 characters extracted)
- [x] Define all characters with:
  - [x] Names, rarities, positions
  - [x] School affiliations (Karasuno, Nekoma, Date Tech, Aoba Johsai, Shiratorizawa, Fukurodani)
  - [x] Base stats (Serve, Spike, Set, Receive, Block, Save)
  - [x] Skills (4-6 per character with power percentages)
  - [x] Bond groups (e.g., "Eccentric Duo", "Karasuno Geniuses")
  - [x] Symbol icons (quick, serve, setter, block, receive, power)
- [x] Define all synergies/bonds:
  - [x] Required character combinations
  - [x] Stat bonuses when active
  - [x] Descriptions
- [x] Add equipment items:
  - [x] Memory items (5 items)
  - [x] Potential Sets (5 sets)
- [x] Add `db:seed` script to package.json
- [x] Run seed: `bun run db:seed`
- [x] Verify data in Prisma Studio: `bun run db:studio`

### Key Characters to Include:

- **Karasuno:** Kageyama, Hinata, Tsukishima, Yamaguchi, Tanaka, Nishinoya, Asahi, Daichi, Sugawara
- **Nekoma:** Kenma, Kuroo, Lev, Yaku, Yamamoto
- **Shiratorizawa:** Ushijima, Tendou, Semi, Goshiki, Shirabu
- **Aoba Johsai:** Oikawa, Iwaizumi, Kyotani, Watari
- **Fukurodani:** Bokuto, Akaashi
- **Inarizaki:** Atsumu, Osamu, Suna, Kita
- (Plus multiple rarity versions: UR, SSR, SP, SR, R)

### Example Synergies:

- "Eccentric Duo" (Kageyama + Hinata)
- "Karasuno Geniuses" (Kageyama + Tsukishima)
- "King and Great King" (Kageyama + Oikawa)
- "Trash Heap Connection" (Karasuno + Nekoma players)

### Deliverables:

- ✅ Seed script created (`prisma/seed.ts`)
- ✅ 34 characters seeded (8 UR, 10 SP, 16 SSR)
- ✅ 20 synergies/bonds defined with stat bonuses
- ✅ 10 equipment items added (5 memories, 5 potential sets)
- ✅ Data verified in Prisma Studio
- ✅ Seed script configured in package.json

**Status:** ✅ **COMPLETED** (2025-01-18)

---

## Phase 3: tRPC API Layer

**Goal:** Build type-safe API with tRPC routers for all features

### Tasks:

- [x] Create `src/server/api/routers/characters.ts`:
  - [x] `list` - Get all characters with filters
  - [x] `get` - Get single character by ID
  - [x] `filterByPosition` - Filter by position (S, MB, WS, L, OP)
  - [x] `filterBySchool` - Filter by school
  - [x] `filterByRarity` - Filter by rarity
  - [x] `search` - Search by name
  - [x] `getSchools` - Get all unique schools
- [x] Create `src/server/api/routers/teams.ts`:
  - [x] `list` - Get user's teams
  - [x] `get` - Get team by ID
  - [x] `create` - Create new team
  - [x] `update` - Update team positions/bench
  - [x] `delete` - Delete team
  - [x] `validate` - Check if team is valid (positions filled correctly)
  - [x] `duplicate` - Duplicate existing team
- [x] Create `src/server/api/routers/synergies.ts`:
  - [x] `list` - Get all synergies
  - [x] `get` - Get single synergy by ID
  - [x] `getActive` - Get active synergies for character IDs
  - [x] `calculateForTeam` - Calculate synergies for a team
  - [x] `calculateStatBonuses` - Calculate total stat bonuses
  - [x] `getPotential` - Get potential synergies (partially completed)
- [x] Create `src/server/api/routers/items.ts`:
  - [x] `list` - Get all items
  - [x] `get` - Get single item by ID
  - [x] `getByType` - Filter by Memory/Potential Set
  - [x] `getMemories` - Get all memory items
  - [x] `getPotentialSets` - Get all potential set items
- [x] Create `src/server/api/routers/recommendations.ts`:
  - [x] `suggest` - Get character suggestions for position
  - [x] Input: currentTeam, weights, position, allowCrossRole
  - [x] Algorithm: multi-criteria scoring (synergy + anchor + teamType + stats)
  - [x] Helper functions for scoring (synergy, teamType, stats)
- [x] Update `src/server/api/root.ts` to include all routers
- [x] Zod schemas for validation included in router files

### Example tRPC Router:

```typescript
// src/server/api/routers/characters.ts
export const characterRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        position: z.enum(['S', 'MB', 'WS', 'L', 'OP']).optional(),
        school: z.string().optional(),
        rarity: z.enum(['UR', 'SSR', 'SP', 'SR', 'R']).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.character.findMany({
        where: {
          position: input.position,
          school: input.school,
          rarity: input.rarity,
        },
      })
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.character.findUnique({
        where: { id: input.id },
      })
    }),
})
```

### Deliverables:

- ✅ 5 tRPC routers created (characters, teams, synergies, items, recommendations)
- ✅ 30+ API endpoints implemented
- ✅ Input validation with Zod schemas
- ✅ Type-safe API with full TypeScript support
- ✅ All routers registered in root router
- ✅ JSON field parsing for database objects
- ✅ Multi-criteria recommendation algorithm implemented
- ✅ Synergy detection and calculation logic
- ✅ Team validation with position constraints

**Status:** ✅ **COMPLETED** (2025-01-18)

---

## Phase 4: shadcn/ui Setup

**Goal:** Install and configure shadcn/ui component library

### Tasks:

- [ ] Initialize shadcn/ui: `bunx shadcn@latest init`
- [ ] Install required components:
  - [ ] `bunx shadcn@latest add card`
  - [ ] `bunx shadcn@latest add button`
  - [ ] `bunx shadcn@latest add sheet` (sidebar)
  - [ ] `bunx shadcn@latest add dialog` (modals)
  - [ ] `bunx shadcn@latest add tabs`
  - [ ] `bunx shadcn@latest add select`
  - [ ] `bunx shadcn@latest add checkbox`
  - [ ] `bunx shadcn@latest add slider`
  - [ ] `bunx shadcn@latest add progress` (stat bars)
  - [ ] `bunx shadcn@latest add badge`
  - [ ] `bunx shadcn@latest add tooltip`
  - [ ] `bunx shadcn@latest add scroll-area`
  - [ ] `bunx shadcn@latest add dropdown-menu`
  - [ ] `bunx shadcn@latest add form`
- [ ] Configure dark theme in `tailwind.config.ts`
- [ ] Set up custom colors matching original (#222 background, #28a745 green, #ff4d4d red)
- [ ] Test component rendering

### Deliverables:

- ✅ shadcn/ui configured
- ✅ All needed components installed
- ✅ Dark theme set up
- ✅ Custom colors added

---

## Phase 5: Core Team Builder UI

**Goal:** Build main team builder interface with hexagonal layout

### Tasks:

- [ ] Create app layout:
  - [ ] `src/app/(main)/layout.tsx` - Main app shell
  - [ ] Header with team name and save/load buttons
  - [ ] Collapsible sidebar for character selection
- [ ] Create `src/app/(main)/page.tsx` - Team builder page
- [ ] Create components:
  - [ ] `src/components/team-builder/CourtGrid.tsx` - Hexagonal court layout (7 positions)
  - [ ] `src/components/team-builder/PositionSlot.tsx` - Single position (S, MB, WS, L, OP)
  - [ ] `src/components/team-builder/BenchArea.tsx` - Expandable bench slots
  - [ ] `src/components/team-builder/CharacterSidebar.tsx` - Character selection menu
  - [ ] `src/components/team-builder/CharacterCard.tsx` - Character display card
  - [ ] `src/components/team-builder/CharacterFilters.tsx` - School/position/rarity filters
  - [ ] `src/components/team-builder/StatsDisplay.tsx` - 6 stat bars (Serve/Spike/Set/Receive/Block/Save)
- [ ] Install drag-and-drop: `bun add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
- [ ] Implement drag-and-drop:
  - [ ] Drag character from sidebar → court position
  - [ ] Drag character from position → bench
  - [ ] Drag character between positions (with validation)
- [ ] Position validation:
  - [ ] Enforce position constraints (1 Setter, 2 MB, 2 WS, 1 L, 1 OP)
  - [ ] Libero cannot cross-role (hard constraint)
  - [ ] Other positions can cross-role if enabled
- [ ] Character filtering:
  - [ ] Filter by school (dropdown)
  - [ ] Filter by position (checkboxes)
  - [ ] Filter by rarity (checkboxes)
  - [ ] Search by name (text input)
- [ ] Integrate tRPC queries:
  - [ ] `trpc.characters.list.useQuery()` for character list
  - [ ] `trpc.teams.get.useQuery()` for current team
  - [ ] `trpc.teams.update.useMutation()` for saving changes

### Layout Structure:

```
┌─────────────────────────────────────────────┐
│ Header: Team Name | Save | Load | Settings  │
├──────────┬──────────────────────────────────┤
│          │          Court Grid              │
│ Sidebar  │                                  │
│          │      MB1        MB2              │
│ ┌──────┐ │         \      /                 │
│ │Search│ │          \    /                  │
│ └──────┘ │       WS1  S  WS2                │
│ Filters  │            |                     │
│ ☐ S      │            L                     │
│ ☐ MB     │           OP                     │
│ ☐ WS     │                                  │
│ ☐ L      │ Bench: [  ] [  ] [  ] + Add      │
│ ☐ OP     │                                  │
│          │ Synergies: [Active Bonds Panel]  │
│ [Chars]  │                                  │
└──────────┴──────────────────────────────────┘
```

### Deliverables:

- ✅ Main team builder page rendered
- ✅ Hexagonal court layout displaying
- ✅ Character sidebar with filters
- ✅ Drag-and-drop working
- ✅ Position validation enforced
- ✅ Connected to tRPC API

---

## Phase 6: Synergy System

**Goal:** Implement synergy detection, calculation, and visualization

### Tasks:

- [ ] Create `src/lib/synergy.ts` - Synergy calculation utilities
- [ ] Function: `detectActiveSynergies(team: Team, allSynergies: Synergy[])`
  - [ ] Check each synergy's required characters
  - [ ] Match against deployed characters in team
  - [ ] Return list of active synergies
- [ ] Function: `calculateStatBonuses(activeSynergies: Synergy[])`
  - [ ] Sum all stat bonuses from active synergies
  - [ ] Return total bonus stats
- [ ] Create components:
  - [ ] `src/components/synergy/SynergyPanel.tsx` - Display active bonds
  - [ ] `src/components/synergy/SynergyBadge.tsx` - Individual synergy indicator
  - [ ] `src/components/synergy/BondVisualizer.tsx` - Visual connections between characters
- [ ] Add synergy display to team builder page
- [ ] Update `trpc.teams.calculateSynergies` to use detection logic
- [ ] Real-time synergy updates when team changes

### Synergy Detection Algorithm:

```typescript
function detectActiveSynergies(team: Team, allSynergies: Synergy[]) {
  const deployedCharacterIds = [
    team.positions.setter?.character?.id,
    team.positions.middleBlocker1?.character?.id,
    team.positions.middleBlocker2?.character?.id,
    team.positions.wingSpiker1?.character?.id,
    team.positions.wingSpiker2?.character?.id,
    team.positions.libero?.character?.id,
    team.positions.opposite?.character?.id,
  ].filter(Boolean)

  return allSynergies.filter((synergy) => {
    return synergy.requiredCharacters.every((requiredId) =>
      deployedCharacterIds.includes(requiredId),
    )
  })
}
```

### Deliverables:

- ✅ Synergy detection working
- ✅ Active synergies displayed in panel
- ✅ Stat bonuses calculated correctly
- ✅ Visual bond connections showing

---

## Phase 7: Equipment System

**Goal:** Add Memory and Potential Set item assignment

### Tasks:

- [ ] Create `src/components/items/ItemModal.tsx` - Item selection dialog
- [ ] Create `src/components/items/ItemCard.tsx` - Display item with effects
- [ ] Create `src/components/items/ItemBadge.tsx` - Equipped item indicator overlay
- [ ] Add item selection to character cards:
  - [ ] Click character → open item modal
  - [ ] Select Memory item (optional)
  - [ ] Select Potential Set (optional)
  - [ ] Save to team data
- [ ] Display item badges on deployed characters
- [ ] Add item effects to stat calculations (if applicable)
- [ ] Integrate with `trpc.items.list`

### Deliverables:

- ✅ Item modal opens from character card
- ✅ Items can be assigned/unassigned
- ✅ Item badges display on characters
- ✅ Items persist in team data

---

## Phase 8: Recommendation System

**Goal:** Build weighted multi-criteria character recommendation engine

### Tasks:

- [ ] Create `src/lib/recommendations.ts` - Recommendation algorithm
- [ ] Function: `scoreCharacter(character, currentTeam, weights)`
  - [ ] Calculate synergy score (bonds with current team)
  - [ ] Calculate anchor score (bonds with key player)
  - [ ] Calculate team type score (Quick/Power/Block/Reception match)
  - [ ] Calculate stats score (raw stat total)
  - [ ] Apply weights (0-5 scale)
  - [ ] Return weighted total score
- [ ] Create components:
  - [ ] `src/components/recommendations/RecommendationPanel.tsx`
  - [ ] `src/components/recommendations/WeightSlider.tsx` - Adjustable weights (0-5, 0.5 steps)
  - [ ] `src/components/recommendations/TeamTypeSelector.tsx` - Checkboxes for Quick/Power/Block/Reception
  - [ ] `src/components/recommendations/SuggestionList.tsx` - Ranked character suggestions
- [ ] Add recommendation panel to team builder
- [ ] Implement `trpc.recommendations.suggest` router
- [ ] Add "allowCrossRole" toggle
- [ ] Show top 10 character suggestions for selected position

### Recommendation Algorithm:

```typescript
interface RecommendationWeights {
  synergy: number // 0-5 (default: 3.0)
  anchor: number // 0-5 (default: 1.0)
  teamType: number // 0-5 (default: 1.5)
  stats: number // 0-5 (default: 1.0)
  allowCrossRole: boolean
  preferredTypes: TeamType[]
}

function scoreCharacter(
  character: Character,
  currentTeam: Team,
  weights: RecommendationWeights,
): number {
  const synergyScore = calculateSynergyScore(character, currentTeam)
  const anchorScore = calculateAnchorScore(character, currentTeam)
  const teamTypeScore = calculateTeamTypeScore(
    character,
    weights.preferredTypes,
  )
  const statsScore = calculateStatsScore(character)

  return (
    weights.synergy * synergyScore +
    weights.anchor * anchorScore +
    weights.teamType * teamTypeScore +
    weights.stats * statsScore
  )
}
```

### Deliverables:

- ✅ Recommendation panel with weight sliders
- ✅ Character scoring algorithm working
- ✅ Top 10 suggestions displayed
- ✅ Team type preferences applied
- ✅ Cross-role toggle functional

---

## Phase 9: Claude AI Integration

**Goal:** Add AI-powered team analysis and intelligent recommendations

### Tasks:

- [ ] Install Anthropic SDK: `bun add @anthropic-ai/sdk`
- [ ] Add `ANTHROPIC_API_KEY` to `.env`
- [ ] Create `src/lib/claude.ts` - Claude API client
- [ ] Implement AI features:
  - [ ] **Team Analysis**: Analyze team composition and provide strategic insights
  - [ ] **Synergy Explanations**: Explain why certain synergies work well together
  - [ ] **Counter Picks**: Suggest counter-strategies against opponent teams
  - [ ] **Natural Language Queries**: "Build me a defensive Karasuno team"
  - [ ] **Strategic Coaching**: Tips for optimizing team performance
- [ ] Create `src/server/api/routers/ai.ts`:
  - [ ] `analyzeTeam` - Get AI analysis of current team
  - [ ] `explainSynergy` - Explain synergy bonds in detail
  - [ ] `recommendStrategy` - Get strategic recommendations
  - [ ] `buildFromPrompt` - Natural language team building
- [ ] Create components:
  - [ ] `src/components/ai/AIInsightsPanel.tsx` - Display AI analysis
  - [ ] `src/components/ai/AIChat.tsx` - Chat interface for queries
  - [ ] `src/components/ai/StrategicTips.tsx` - Real-time coaching tips
- [ ] Add AI panel to team builder interface
- [ ] Implement streaming responses for better UX

### Example AI Prompts:

```typescript
const TEAM_ANALYSIS_PROMPT = `
You are a volleyball team strategist for Haikyu Fly High.

Analyze this team composition:
${JSON.stringify(team, null, 2)}

Active synergies: ${activeSynergies.map((s) => s.name).join(', ')}

Provide:
1. Team strengths (2-3 points)
2. Team weaknesses (2-3 points)
3. Recommended improvements (2-3 suggestions)
4. Optimal strategy (1 paragraph)
5. Counter-picks to watch out for

Be concise and strategic.
`
```

### Deliverables:

- ✅ Claude API integrated
- ✅ AI team analysis working
- ✅ Synergy explanations available
- ✅ Natural language team building functional
- ✅ AI insights panel displaying

---

## Phase 10: Save/Load Teams

**Goal:** Implement team persistence and multi-team management

### Tasks:

- [ ] Create `src/components/teams/TeamTabs.tsx` - Multi-team tabs UI
- [ ] Create `src/components/teams/SaveTeamDialog.tsx` - Save team modal
- [ ] Create `src/components/teams/LoadTeamDialog.tsx` - Load team list
- [ ] Create `src/components/teams/TeamList.tsx` - Display saved teams
- [ ] Implement save functionality:
  - [ ] Save current team to database via `trpc.teams.create`
  - [ ] Auto-save on changes (debounced)
  - [ ] Manual save button
- [ ] Implement load functionality:
  - [ ] Load team from database via `trpc.teams.get`
  - [ ] Display list of user's teams
  - [ ] Switch between teams
- [ ] Add team operations:
  - [ ] Rename team
  - [ ] Duplicate team
  - [ ] Delete team (with confirmation)
  - [ ] Export team as JSON
  - [ ] Import team from JSON
- [ ] Add team rotation feature (rotate positions)

### Deliverables:

- ✅ Teams save to Turso database
- ✅ Teams load from database
- ✅ Multi-team tabs working
- ✅ Team operations functional

---

## Phase 11: Polish & UX Enhancements

**Goal:** Improve user experience and add quality-of-life features

### Tasks:

- [ ] Mobile responsive design:
  - [ ] Adapt hexagonal layout for small screens
  - [ ] Touch-friendly drag-and-drop
  - [ ] Collapsible panels on mobile
- [ ] Undo/redo functionality:
  - [ ] Track team state history
  - [ ] Ctrl+Z / Ctrl+Shift+Z support
  - [ ] Undo/redo buttons
- [ ] Keyboard shortcuts:
  - [ ] S = open sidebar
  - [ ] Escape = close modals
  - [ ] Ctrl+S = save team
  - [ ] Ctrl+N = new team
- [ ] Loading states:
  - [ ] Skeleton loaders for character cards
  - [ ] Loading spinners for AI requests
  - [ ] Suspense boundaries
- [ ] Error handling:
  - [ ] Error boundaries
  - [ ] Toast notifications for errors
  - [ ] Retry failed requests
- [ ] Animations:
  - [ ] Smooth drag-and-drop transitions
  - [ ] Fade in/out for modals
  - [ ] Hover effects on cards
- [ ] Accessibility:
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Screen reader support
- [ ] Theme toggle (dark/light) - optional
- [ ] Add team sharing:
  - [ ] Generate shareable URL
  - [ ] Public team gallery
  - [ ] Copy team to clipboard

### Deliverables:

- ✅ Mobile responsive
- ✅ Keyboard shortcuts working
- ✅ Loading states implemented
- ✅ Error handling robust
- ✅ Smooth animations
- ✅ Accessible UI

---

## Phase 12: Testing Strategy (AI-Powered + Traditional)

**Goal:** Implement comprehensive testing with AI assistance

### Automated Testing

#### Unit Tests with Vitest

- [ ] Install testing dependencies:
  - [ ] `bun add -d vitest @vitest/ui`
  - [ ] `bun add -d @testing-library/react @testing-library/jest-dom`
- [ ] Configure Vitest in `vitest.config.ts`
- [ ] Create tests for utility functions:
  - [ ] `src/lib/synergy.test.ts` - Test synergy detection algorithm
  - [ ] `src/lib/recommendations.test.ts` - Test recommendation scoring
  - [ ] `src/lib/validation.test.ts` - Test team validation rules
- [ ] Test tRPC routers:
  - [ ] `src/server/api/routers/characters.test.ts`
  - [ ] `src/server/api/routers/teams.test.ts`
  - [ ] `src/server/api/routers/synergies.test.ts`
- [ ] Add test script to `package.json`: `"test": "vitest"`

#### AI-Assisted Test Generation

- [ ] Use Claude to generate test cases:
  - [ ] Prompt: "Generate comprehensive unit tests for synergy detection"
  - [ ] Prompt: "What edge cases should I test for team validation?"
  - [ ] Prompt: "Write Vitest tests for the recommendation scoring algorithm"
- [ ] Claude generates test scenarios you might miss:
  - [ ] Empty team edge cases
  - [ ] Invalid character combinations
  - [ ] Synergy conflicts
  - [ ] Cross-role validation edge cases
- [ ] Review and refine AI-generated tests

#### End-to-End Testing with Playwright

- [ ] Install Playwright: `bun add -d @playwright/test`
- [ ] Initialize Playwright: `bunx playwright install`
- [ ] Create E2E tests:
  - [ ] `tests/e2e/team-building.spec.ts` - Full team building flow
  - [ ] `tests/e2e/character-selection.spec.ts` - Character filtering and selection
  - [ ] `tests/e2e/synergy-detection.spec.ts` - Synergy activation
  - [ ] `tests/e2e/save-load.spec.ts` - Team persistence
  - [ ] `tests/e2e/ai-recommendations.spec.ts` - AI features
- [ ] Use Claude to write Playwright scripts:
  - [ ] Describe user flow in natural language
  - [ ] Claude generates Playwright test code
  - [ ] Example: "Write a Playwright test that drags Kageyama to setter position, Hinata to wing spiker, and verifies Eccentric Duo synergy activates"

#### Component Testing

- [ ] Install React Testing Library (already added)
- [ ] Test critical components:
  - [ ] `CharacterCard.test.tsx` - Renders correctly, handles clicks
  - [ ] `PositionSlot.test.tsx` - Drag-drop behavior, validation
  - [ ] `SynergyPanel.test.tsx` - Displays active synergies
  - [ ] `RecommendationPanel.test.tsx` - Weight sliders, suggestions
- [ ] Test accessibility (a11y):
  - [ ] Install: `bun add -d @axe-core/playwright`
  - [ ] Run axe tests in Playwright

### Manual Testing with AI Assistance

#### AI-Generated Test Plans

- [ ] Use Claude to create comprehensive test checklists:
  - [ ] Prompt: "Create a QA test plan for volleyball team builder with 7 positions"
  - [ ] Prompt: "Generate edge cases for drag-drop team building"
  - [ ] Prompt: "Create user acceptance criteria for synergy system"
- [ ] Claude provides structured test cases:
  - [ ] Functional tests (all features work)
  - [ ] Usability tests (intuitive UX)
  - [ ] Compatibility tests (browsers, devices)
  - [ ] Performance tests (loading times, responsiveness)

#### Manual Test Scenarios

- [ ] Team Building Flow:
  - [ ] Create new team
  - [ ] Drag characters to all 7 positions
  - [ ] Verify position constraints enforced
  - [ ] Add characters to bench (expand slots)
  - [ ] Verify Libero cannot cross-role
  - [ ] Test other positions with cross-role enabled
- [ ] Character Selection:
  - [ ] Filter by school (select Karasuno, verify only Karasuno shown)
  - [ ] Filter by position (select Setter, verify only Setters shown)
  - [ ] Filter by rarity (select UR, verify only UR cards shown)
  - [ ] Search by name (type "Kageyama", verify results)
  - [ ] Clear filters, verify all characters return
- [ ] Synergy System:
  - [ ] Deploy Kageyama + Hinata, verify "Eccentric Duo" activates
  - [ ] Remove Hinata, verify synergy deactivates
  - [ ] Deploy 3+ Karasuno players, verify school synergy
  - [ ] Check stat bonuses apply correctly
- [ ] Recommendations:
  - [ ] Select empty Setter position
  - [ ] Adjust synergy weight to 5, verify high-synergy characters ranked first
  - [ ] Adjust stats weight to 5, verify high-stat characters ranked first
  - [ ] Toggle team type preferences, verify suggestions change
  - [ ] Enable cross-role, verify non-Setter positions show in Setter suggestions
- [ ] AI Features:
  - [ ] Click "Analyze Team", verify Claude provides insights
  - [ ] Request synergy explanation, verify detailed response
  - [ ] Ask "Build defensive team", verify Claude suggests appropriate characters
  - [ ] Test strategic recommendations
- [ ] Save/Load:
  - [ ] Build team, click Save, name it "Team A"
  - [ ] Build second team, save as "Team B"
  - [ ] Switch to Team A tab, verify correct team loads
  - [ ] Refresh page, verify teams persist
  - [ ] Delete team, verify confirmation dialog and deletion
- [ ] Equipment:
  - [ ] Click character, open item modal
  - [ ] Assign Memory item, verify badge appears
  - [ ] Assign Potential Set, verify second badge
  - [ ] Remove items, verify badges disappear
- [ ] Browser Testing:
  - [ ] Test in Chrome (desktop)
  - [ ] Test in Firefox (desktop)
  - [ ] Test in Safari (desktop)
  - [ ] Test in Chrome Mobile (Android)
  - [ ] Test in Safari Mobile (iOS)
- [ ] Mobile Responsiveness:
  - [ ] Verify hexagonal layout adapts
  - [ ] Test touch drag-drop
  - [ ] Verify sidebar collapses on mobile
  - [ ] Test all modals on small screens

### AI Code Review

#### Pre-Deployment Review

- [ ] Use Claude to review code before each phase:
  - [ ] Security audit: "Review this code for security vulnerabilities"
  - [ ] Performance check: "Analyze this component for performance issues"
  - [ ] Best practices: "Does this follow React and TypeScript best practices?"
  - [ ] Accessibility: "Is this component accessible?"
- [ ] Claude identifies:
  - [ ] SQL injection risks (tRPC input validation)
  - [ ] XSS vulnerabilities
  - [ ] Memory leaks (useEffect cleanup)
  - [ ] N+1 query problems
  - [ ] Unused dependencies
  - [ ] Type safety gaps

#### Continuous Testing Throughout Development

- [ ] After each phase, use Claude to:
  - [ ] Generate test cases for new features
  - [ ] Review code for bugs
  - [ ] Suggest improvements
  - [ ] Identify edge cases
- [ ] Example workflow:
  1. Implement Phase 6 (Synergy System)
  2. Ask Claude: "Review my synergy detection code and suggest test cases"
  3. Claude provides 10+ test scenarios
  4. Write tests based on Claude's suggestions
  5. Run tests, fix bugs
  6. Move to Phase 7

### Test Coverage Goals

- [ ] Aim for 80%+ code coverage on utility functions
- [ ] 100% coverage on critical paths (synergy detection, team validation)
- [ ] All tRPC routers have at least basic tests
- [ ] All user flows covered by E2E tests

### Deliverables:

- ✅ Vitest configured and running
- ✅ Unit tests for all utility functions
- ✅ Component tests for critical UI
- ✅ E2E tests for all user flows
- ✅ AI-generated test cases implemented
- ✅ Manual test checklist completed
- ✅ Code reviewed by Claude
- ✅ 80%+ test coverage achieved

---

## Phase 13: Performance & Deployment

**Goal:** Optimize performance and deploy to production

### Production Database Setup (Turso)

**Goal:** Migrate from local SQLite to Turso for production deployment

#### Install Turso CLI (Windows)

Since Turso CLI is not available via npm/bun, you must install it manually:

- [ ] Download Turso CLI for Windows:
  - [ ] Visit: https://github.com/tursodatabase/turso-cli/releases
  - [ ] Download the latest Windows executable (turso-cli-windows-amd64.exe)
  - [ ] Rename to `turso.exe` and add to PATH
  - [ ] Or use bash installation (WSL/Git Bash): `curl -sSfL https://get.tur.so/install.sh | bash`
- [ ] Verify installation: `turso --version`

#### Create Turso Database

- [ ] Login to Turso:
  ```bash
  turso auth login
  ```
- [ ] Create production database:
  ```bash
  turso db create hfh-team-builder
  ```
- [ ] Get database URL:
  ```bash
  turso db show hfh-team-builder --url
  ```
  - [ ] Copy output (e.g., `libsql://hfh-team-builder-yourorg.turso.io`)
- [ ] Generate auth token:
  ```bash
  turso db tokens create hfh-team-builder
  ```
  - [ ] Copy token (starts with `eyJ...`)

#### Update Prisma Schema for Turso

- [ ] Modify `prisma/schema.prisma` provider:

  ```prisma
  datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
  }
  ```

  Note: Keep provider as "sqlite" - Turso uses libsql which is SQLite-compatible

- [ ] Update `.env` with Turso credentials:
  ```bash
  # Production Turso Database
  DATABASE_URL="libsql://hfh-team-builder-yourorg.turso.io"
  DATABASE_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
  ```

#### Push Schema to Turso

- [ ] Push Prisma schema to Turso:
  ```bash
  bun run db:push
  ```
- [ ] Verify connection:
  ```bash
  turso db shell hfh-team-builder
  ```
  - [ ] Run: `.tables` to see created tables
  - [ ] Run: `.exit` to close shell

#### Migrate Data from Local SQLite (Optional)

If you have existing data in local SQLite:

- [ ] Export local data:
  ```bash
  # Create seed script from existing data
  bun run prisma db seed
  ```
- [ ] Or manually export tables:
  ```bash
  sqlite3 prisma/db.sqlite ".dump" > data.sql
  ```
- [ ] Import to Turso:
  ```bash
  turso db shell hfh-team-builder < data.sql
  ```

Note: For this project, you'll seed data in Phase 2, so migration may not be necessary.

### Performance Optimization

- [ ] Image optimization:
  - [ ] Use Next.js `<Image>` component for all character images
  - [ ] Convert PNGs to WebP format
  - [ ] Add responsive image sizes
  - [ ] Lazy load off-screen images
- [ ] Code optimization:
  - [ ] Analyze bundle size: `bun run build`
  - [ ] Code splitting for large components
  - [ ] Lazy load modals and dialogs
  - [ ] Use React.lazy() for heavy components
  - [ ] Tree-shake unused dependencies
- [ ] Database optimization:
  - [ ] Add indexes to Prisma schema (position, school, rarity)
  - [ ] Use Turso edge locations for low latency
  - [ ] Cache frequently accessed data (character list)
- [ ] React Query optimization:
  - [ ] Set appropriate staleTime and cacheTime
  - [ ] Use query prefetching for predictable user flows
  - [ ] Implement optimistic updates for mutations
- [ ] Loading states:
  - [ ] Add Suspense boundaries
  - [ ] Skeleton loaders for character cards
  - [ ] Streaming for AI responses
- [ ] Performance monitoring:
  - [ ] Lighthouse audit (aim for 90+ score)
  - [ ] Core Web Vitals check
  - [ ] Bundle analyzer: `bun add -d @next/bundle-analyzer`

### SEO Optimization

- [ ] Meta tags in `app/layout.tsx`:
  - [ ] Title: "HFH Team Builder - AI-Powered Haikyu Team Composition"
  - [ ] Description: "Build optimal volleyball teams with AI recommendations"
  - [ ] Keywords
- [ ] Open Graph tags for social sharing
- [ ] Generate `sitemap.xml`
- [ ] Add `robots.txt`
- [ ] Structured data (JSON-LD) for character/team schema

### Deployment to Vercel

- [ ] Pre-deployment checklist:
  - [ ] Run type checking: `bun run typecheck` ✅
  - [ ] Run linting: `bun run check` ✅
  - [ ] Run tests: `bun run test` ✅
  - [ ] Build successfully: `bun run build` ✅
  - [ ] Test production build: `bun run start` ✅
- [ ] Push to GitHub:
  - [ ] Initialize git: `git init`
  - [ ] Add all files: `git add .`
  - [ ] Commit: `git commit -m "Initial commit"`
  - [ ] Create GitHub repo
  - [ ] Push: `git push -u origin main`
- [ ] Connect Vercel:
  - [ ] Sign up at vercel.com
  - [ ] Import GitHub repository
  - [ ] Configure build settings (auto-detected for Next.js)
- [ ] Environment variables in Vercel:
  - [ ] `DATABASE_URL` (Turso connection string)
  - [ ] `DATABASE_AUTH_TOKEN` (Turso auth token)
  - [ ] `ANTHROPIC_API_KEY` (Claude API key)
  - [ ] `NEXT_PUBLIC_APP_URL` (production URL)
- [ ] Deploy:
  - [ ] Click "Deploy"
  - [ ] Wait for build to complete
  - [ ] Verify deployment at `.vercel.app` URL
- [ ] Custom domain (optional):
  - [ ] Add custom domain in Vercel settings
  - [ ] Configure DNS records
  - [ ] Enable SSL certificate

### Post-Deployment Testing

- [ ] Smoke tests on production:
  - [ ] Load homepage ✅
  - [ ] Create new team ✅
  - [ ] Add characters to team ✅
  - [ ] Verify synergies activate ✅
  - [ ] Save team ✅
  - [ ] Load team ✅
  - [ ] Test AI recommendations ✅
  - [ ] Test on mobile device ✅
- [ ] Monitor errors:
  - [ ] Check Vercel logs
  - [ ] Optional: Set up Sentry for error tracking
- [ ] Performance check:
  - [ ] Run Lighthouse on production URL
  - [ ] Check Core Web Vitals
  - [ ] Test from different geographic locations
- [ ] Analytics (optional):
  - [ ] Set up Vercel Analytics
  - [ ] Track user flows
  - [ ] Monitor popular features

### Deliverables:

- ✅ Performance optimized (Lighthouse 90+)
- ✅ SEO configured
- ✅ Deployed to Vercel
- ✅ Environment variables set
- ✅ Production tests passing
- ✅ Custom domain configured (optional)
- ✅ Monitoring in place

---

## Future Enhancements (Post-Launch)

### Phase 13+: Advanced Features

- [ ] User authentication (NextAuth.js or Clerk)
- [ ] Team comparisons (side-by-side)
- [ ] Win rate predictions
- [ ] Team effectiveness scoring
- [ ] Public team leaderboard
- [ ] Community team sharing
- [ ] Team comments and upvotes
- [ ] Advanced analytics dashboard
- [ ] Character usage statistics
- [ ] Meta analysis (most popular synergies)
- [ ] Team templates/presets
- [ ] Export team as image/card
- [ ] Real-time collaboration (multiplayer team building)
- [ ] Tournament bracket builder
- [ ] Match simulation

---

## Tech Stack Summary

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | Next.js 15 (App Router, Turbo) |
| Language         | TypeScript 5.8                 |
| Runtime          | Bun                            |
| Database         | Turso (edge SQLite)            |
| ORM              | Prisma 6.6                     |
| API              | tRPC v11                       |
| State Management | TanStack Query v5              |
| UI Components    | shadcn/ui                      |
| Styling          | Tailwind CSS v4                |
| Drag-Drop        | dnd-kit                        |
| AI               | Claude (Anthropic)             |
| Deployment       | Vercel                         |
| Linter           | Biome                          |
| Validation       | Zod                            |

---

## Current Status

**Phase:** Phase 3 Complete ✅ (Ready for Phase 4)
**Last Updated:** 2025-01-18

### Completed Phases:

✅ **Phase 1:** Database & Infrastructure Setup
- Local SQLite database configured
- Prisma schema with 6 models
- TypeScript types defined

✅ **Phase 2:** Seed Character Data
- 34 characters seeded
- 20 synergies/bonds defined
- 10 equipment items added

✅ **Phase 3:** tRPC API Layer
- 5 routers with 30+ endpoints
- Multi-criteria recommendation algorithm
- Synergy detection and team validation
- Full type-safety with Zod validation

### Next Steps:

1. **Phase 4:** Install and configure shadcn/ui component library
2. **Phase 5:** Build core team builder UI with hexagonal layout
3. Continue with phases sequentially
4. Test each phase before moving to next

---

## Notes

- Work phase by phase, don't skip ahead
- Test thoroughly after each phase
- Update README.md with progress
- Keep types in sync between database, tRPC, and UI
- Prioritize UX and performance
- Use Claude AI for intelligent features, not just basic recommendations
- Reference original project for game mechanics accuracy
