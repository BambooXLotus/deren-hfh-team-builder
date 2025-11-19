// ===========================
// Enums and Type Definitions
// ===========================

export type Position = 'S' | 'MB' | 'WS' | 'L' | 'OP';
export type Rarity = 'UR' | 'SSR' | 'SP' | 'SR' | 'R';
export type TeamType = 'Quick' | 'Power' | 'Block' | 'Reception';
export type School =
  | 'Karasuno'
  | 'Nekoma'
  | 'Shiratorizawa'
  | 'Aoba Johsai'
  | 'Fukurodani'
  | 'Inarizaki'
  | 'Date Tech'
  | 'Johzenji'
  | 'Wakutani South'
  | 'Itachiyama'
  | 'Other';

// ===========================
// Character Interfaces
// ===========================

export interface CharacterStats {
  serve: number;
  spike: number;
  set: number;
  receive: number;
  block: number;
  save: number;
}

export interface Skill {
  name: string;
  description: string;
  cooldown?: number;
  power?: string; // e.g., "120% - 320%"
}

export interface Character {
  id: string;
  name: string;
  rarity: Rarity;
  position: Position;
  school: School;
  imageUrl?: string;
  releaseDate?: Date;
  stats: CharacterStats;
  skills: Skill[];
  bonds: string[]; // Bond group names
  symbols: string[]; // Icon identifiers (quick, serve, setter, etc.)
}

// ===========================
// Team Interfaces
// ===========================

export interface Item {
  id: string;
  name: string;
  type: 'Memory' | 'Potential Set';
  effects: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
}

export interface SlotData {
  character: Character | null;
  items: Item[];
}

export interface BenchSlot {
  character: Character | null;
  items: Item[];
}

export interface TeamPositions {
  setter: SlotData; // S (1 required)
  middleBlocker1: SlotData; // MB (2 required)
  middleBlocker2: SlotData;
  wingSpiker1: SlotData; // WS (2 required)
  wingSpiker2: SlotData;
  libero: SlotData; // L (1 required)
  opposite: SlotData; // OP (1 required)
}

export interface Team {
  id: string;
  userId: string;
  name: string;
  positions: TeamPositions;
  bench: BenchSlot[];
  synergies: ActiveSynergy[];
  teamType?: TeamType;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================
// Synergy Interfaces
// ===========================

export interface Synergy {
  id: string;
  name: string;
  requiredCharacters: string[]; // Character IDs
  statBonus: Partial<CharacterStats>;
  description: string;
}

export interface ActiveSynergy extends Synergy {
  activeCharacters: Character[]; // Characters that activated this synergy
}

// ===========================
// Recommendation Interfaces
// ===========================

export interface RecommendationWeights {
  synergy: number; // 0-5 (default: 3.0)
  anchor: number; // 0-5 (default: 1.0)
  teamType: number; // 0-5 (default: 1.5)
  stats: number; // 0-5 (default: 1.0)
  allowCrossRole: boolean;
  preferredTypes: TeamType[];
}

export interface CharacterRecommendation {
  character: Character;
  score: number;
  reasoning: {
    synergyScore: number;
    anchorScore: number;
    teamTypeScore: number;
    statsScore: number;
  };
  potentialSynergies: Synergy[];
}

// ===========================
// User Interfaces
// ===========================

export interface User {
  id: string;
  email: string;
  name?: string;
  teams: Team[];
  preferences?: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  userId: string;
  recommendationWeights: RecommendationWeights;
  theme: 'dark' | 'light';
}

// ===========================
// Utility Types
// ===========================

export type PositionKey = keyof TeamPositions;

export interface TeamValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ===========================
// Constants
// ===========================

export const POSITIONS: Position[] = ['S', 'MB', 'WS', 'L', 'OP'];
export const RARITIES: Rarity[] = ['UR', 'SSR', 'SP', 'SR', 'R'];
export const TEAM_TYPES: TeamType[] = ['Quick', 'Power', 'Block', 'Reception'];

export const POSITION_NAMES: Record<Position, string> = {
  S: 'Setter',
  MB: 'Middle Blocker',
  WS: 'Wing Spiker',
  L: 'Libero',
  OP: 'Opposite',
};

export const REQUIRED_POSITIONS: Record<Position, number> = {
  S: 1,
  MB: 2,
  WS: 2,
  L: 1,
  OP: 1,
};

export const DEFAULT_RECOMMENDATION_WEIGHTS: RecommendationWeights = {
  synergy: 3.0,
  anchor: 1.0,
  teamType: 1.5,
  stats: 1.0,
  allowCrossRole: false,
  preferredTypes: [],
};
