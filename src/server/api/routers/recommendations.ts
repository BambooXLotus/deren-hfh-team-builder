import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const recommendationWeightsSchema = z.object({
	synergy: z.number().min(0).max(5).default(3.0),
	anchor: z.number().min(0).max(5).default(1.0),
	teamType: z.number().min(0).max(5).default(1.5),
	stats: z.number().min(0).max(5).default(1.0),
	allowCrossRole: z.boolean().default(false),
	preferredTypes: z
		.array(z.enum(["Quick", "Power", "Block", "Reception"]))
		.default([]),
});

export const recommendationsRouter = createTRPCRouter({
	// Suggest characters for a specific position based on current team
	suggest: publicProcedure
		.input(
			z.object({
				position: z.enum(["S", "MB", "WS", "L", "OP"]),
				currentCharacterIds: z.array(z.string()).default([]),
				weights: recommendationWeightsSchema.optional(),
				limit: z.number().min(1).max(50).default(10),
			}),
		)
		.query(async ({ ctx, input }) => {
			const weights = input.weights ?? {
				synergy: 3.0,
				anchor: 1.0,
				teamType: 1.5,
				stats: 1.0,
				allowCrossRole: false,
				preferredTypes: [],
			};

			// Get all characters
			const allCharacters = await ctx.db.character.findMany();

			// Get all synergies
			const allSynergies = await ctx.db.synergy.findMany();

			// Filter characters based on position and allowCrossRole
			let candidates = allCharacters;

			if (!weights.allowCrossRole || input.position === "L") {
				// Libero cannot cross-role (hard constraint)
				candidates = allCharacters.filter(
					(char) => char.position === input.position,
				);
			}

			// Remove already selected characters
			candidates = candidates.filter(
				(char) => !input.currentCharacterIds.includes(char.id),
			);

			// Score each candidate
			const scoredCandidates = candidates.map((character) => {
				const charData = {
					...character,
					stats: JSON.parse(character.stats as string),
					skills: JSON.parse(character.skills as string),
					bonds: JSON.parse(character.bonds as string),
					symbols: JSON.parse(character.symbols as string),
				};

				// Calculate synergy score
				const synergyScore = calculateSynergyScore(
					character.id,
					input.currentCharacterIds,
					allSynergies,
				);

				// Calculate anchor score (if there's a key player, prioritize synergies with them)
				const anchorScore = synergyScore > 0 ? 1.0 : 0.0;

				// Calculate team type score
				const teamTypeScore = calculateTeamTypeScore(
					charData.symbols,
					weights.preferredTypes,
				);

				// Calculate stats score (normalize by max possible stats ~2000)
				const statsScore = calculateStatsScore(charData.stats);

				// Calculate total weighted score
				const totalScore =
					weights.synergy * synergyScore +
					weights.anchor * anchorScore +
					weights.teamType * teamTypeScore +
					weights.stats * statsScore;

				// Get potential synergies this character would activate
				const potentialSynergies = allSynergies.filter((synergy) => {
					const requiredCharacters = JSON.parse(
						synergy.requiredCharacters as string,
					) as string[];

					// Check if this character is part of the synergy
					if (!requiredCharacters.includes(character.id)) return false;

					// Check if adding this character would complete the synergy
					const otherRequiredChars = requiredCharacters.filter(
						(id) => id !== character.id,
					);
					return otherRequiredChars.every((id) =>
						input.currentCharacterIds.includes(id),
					);
				});

				return {
					character: charData,
					score: totalScore,
					reasoning: {
						synergyScore,
						anchorScore,
						teamTypeScore,
						statsScore,
					},
					potentialSynergies: potentialSynergies.map((synergy) => ({
						id: synergy.id,
						name: synergy.name,
						description: synergy.description,
						requiredCharacters: JSON.parse(
							synergy.requiredCharacters as string,
						),
						statBonus: JSON.parse(synergy.statBonus as string),
					})),
				};
			});

			// Sort by score (descending) and return top N
			scoredCandidates.sort((a, b) => b.score - a.score);

			return scoredCandidates.slice(0, input.limit);
		}),
});

// Helper function to calculate synergy score
function calculateSynergyScore(
	characterId: string,
	currentCharacterIds: string[],
	allSynergies: {
		id: string;
		name: string;
		requiredCharacters: string;
		statBonus: string;
		description: string;
	}[],
): number {
	let score = 0;

	// For each synergy, check if adding this character would complete it
	for (const synergy of allSynergies) {
		const requiredCharacters = JSON.parse(
			synergy.requiredCharacters,
		) as string[];

		// Check if this character is part of the synergy
		if (!requiredCharacters.includes(characterId)) continue;

		// Check if adding this character would complete the synergy
		const otherRequiredChars = requiredCharacters.filter(
			(id) => id !== characterId,
		);
		const wouldComplete = otherRequiredChars.every((id) =>
			currentCharacterIds.includes(id),
		);

		if (wouldComplete) {
			// Higher score for completing synergies
			score += 1.0;
		} else {
			// Partial score for being part of potential synergies
			const matchingChars = otherRequiredChars.filter((id) =>
				currentCharacterIds.includes(id),
			);
			if (matchingChars.length > 0) {
				score += matchingChars.length / requiredCharacters.length;
			}
		}
	}

	// Normalize score to 0-1 range (assume max 3 synergies per character)
	return Math.min(score / 3, 1.0);
}

// Helper function to calculate team type score
function calculateTeamTypeScore(
	symbols: string[],
	preferredTypes: ("Quick" | "Power" | "Block" | "Reception")[],
): number {
	if (preferredTypes.length === 0) return 0.5; // Neutral score if no preference

	let score = 0;

	// Map team types to relevant symbols
	const typeSymbolMap: Record<string, string[]> = {
		Quick: ["quick", "setter"],
		Power: ["power", "serve"],
		Block: ["block"],
		Reception: ["receive"],
	};

	for (const type of preferredTypes) {
		const relevantSymbols = typeSymbolMap[type] ?? [];
		const matchingSymbols = symbols.filter((symbol) =>
			relevantSymbols.includes(symbol),
		);

		if (matchingSymbols.length > 0) {
			score += matchingSymbols.length / relevantSymbols.length;
		}
	}

	// Normalize to 0-1 range
	return Math.min(score / preferredTypes.length, 1.0);
}

// Helper function to calculate stats score
function calculateStatsScore(stats: {
	serve: number;
	spike: number;
	set: number;
	receive: number;
	block: number;
	save: number;
}): number {
	const totalStats =
		stats.serve +
		stats.spike +
		stats.set +
		stats.receive +
		stats.block +
		stats.save;

	// Normalize to 0-1 range (max stats ~11000 for UR characters)
	return Math.min(totalStats / 11000, 1.0);
}
