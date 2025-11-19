import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const synergiesRouter = createTRPCRouter({
	// Get all synergies
	list: publicProcedure.query(async ({ ctx }) => {
		const synergies = await ctx.db.synergy.findMany({
			orderBy: { name: "asc" },
		});

		return synergies.map((synergy) => ({
			...synergy,
			requiredCharacters: JSON.parse(synergy.requiredCharacters as string),
			statBonus: JSON.parse(synergy.statBonus as string),
		}));
	}),

	// Get single synergy by ID
	get: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const synergy = await ctx.db.synergy.findUnique({
				where: { id: input.id },
			});

			if (!synergy) return null;

			return {
				...synergy,
				requiredCharacters: JSON.parse(synergy.requiredCharacters as string),
				statBonus: JSON.parse(synergy.statBonus as string),
			};
		}),

	// Get active synergies for a list of character IDs
	getActive: publicProcedure
		.input(
			z.object({
				characterIds: z.array(z.string()),
			}),
		)
		.query(async ({ ctx, input }) => {
			const allSynergies = await ctx.db.synergy.findMany();

			const activeSynergies = allSynergies.filter((synergy) => {
				const requiredCharacters = JSON.parse(
					synergy.requiredCharacters as string,
				) as string[];

				// Check if all required characters are in the provided character IDs
				return requiredCharacters.every((requiredId) =>
					input.characterIds.includes(requiredId),
				);
			});

			return activeSynergies.map((synergy) => ({
				...synergy,
				requiredCharacters: JSON.parse(synergy.requiredCharacters as string),
				statBonus: JSON.parse(synergy.statBonus as string),
			}));
		}),

	// Calculate synergies for a team
	calculateForTeam: publicProcedure
		.input(
			z.object({
				teamId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const team = await ctx.db.team.findUnique({
				where: { id: input.teamId },
			});

			if (!team) return [];

			const positions = JSON.parse(team.positions as string);

			// Extract all deployed character IDs from positions
			const deployedCharacterIds = [
				positions.setter?.character?.id,
				positions.middleBlocker1?.character?.id,
				positions.middleBlocker2?.character?.id,
				positions.wingSpiker1?.character?.id,
				positions.wingSpiker2?.character?.id,
				positions.libero?.character?.id,
				positions.opposite?.character?.id,
			].filter(Boolean) as string[];

			// Get all synergies
			const allSynergies = await ctx.db.synergy.findMany();

			// Filter for active synergies
			const activeSynergies = allSynergies.filter((synergy) => {
				const requiredCharacters = JSON.parse(
					synergy.requiredCharacters as string,
				) as string[];

				return requiredCharacters.every((requiredId) =>
					deployedCharacterIds.includes(requiredId),
				);
			});

			return activeSynergies.map((synergy) => ({
				...synergy,
				requiredCharacters: JSON.parse(synergy.requiredCharacters as string),
				statBonus: JSON.parse(synergy.statBonus as string),
			}));
		}),

	// Calculate total stat bonuses from active synergies
	calculateStatBonuses: publicProcedure
		.input(
			z.object({
				characterIds: z.array(z.string()),
			}),
		)
		.query(async ({ ctx, input }) => {
			const allSynergies = await ctx.db.synergy.findMany();

			const activeSynergies = allSynergies.filter((synergy) => {
				const requiredCharacters = JSON.parse(
					synergy.requiredCharacters as string,
				) as string[];

				return requiredCharacters.every((requiredId) =>
					input.characterIds.includes(requiredId),
				);
			});

			// Sum up all stat bonuses
			const totalBonuses = {
				serve: 0,
				spike: 0,
				set: 0,
				receive: 0,
				block: 0,
				save: 0,
			};

			for (const synergy of activeSynergies) {
				const statBonus = JSON.parse(synergy.statBonus as string) as Record<
					string,
					number
				>;

				for (const [stat, bonus] of Object.entries(statBonus)) {
					if (stat in totalBonuses) {
						totalBonuses[stat as keyof typeof totalBonuses] += bonus;
					}
				}
			}

			return {
				totalBonuses,
				activeSynergyCount: activeSynergies.length,
				activeSynergies: activeSynergies.map((synergy) => ({
					id: synergy.id,
					name: synergy.name,
					description: synergy.description,
					requiredCharacters: JSON.parse(synergy.requiredCharacters as string),
					statBonus: JSON.parse(synergy.statBonus as string),
				})),
			};
		}),

	// Get potential synergies (synergies that could be activated with additional characters)
	getPotential: publicProcedure
		.input(
			z.object({
				characterIds: z.array(z.string()),
			}),
		)
		.query(async ({ ctx, input }) => {
			const allSynergies = await ctx.db.synergy.findMany();

			const potentialSynergies = allSynergies.filter((synergy) => {
				const requiredCharacters = JSON.parse(
					synergy.requiredCharacters as string,
				) as string[];

				// Check if at least one required character is present but not all
				const matchingCharacters = requiredCharacters.filter((requiredId) =>
					input.characterIds.includes(requiredId),
				);

				return (
					matchingCharacters.length > 0 &&
					matchingCharacters.length < requiredCharacters.length
				);
			});

			return potentialSynergies.map((synergy) => {
				const requiredCharacters = JSON.parse(
					synergy.requiredCharacters as string,
				) as string[];

				const missingCharacters = requiredCharacters.filter(
					(requiredId) => !input.characterIds.includes(requiredId),
				);

				return {
					...synergy,
					requiredCharacters,
					statBonus: JSON.parse(synergy.statBonus as string),
					missingCharacters,
					completionPercentage: Math.round(
						((requiredCharacters.length - missingCharacters.length) /
							requiredCharacters.length) *
							100,
					),
				};
			});
		}),
});
