import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Zod schemas for validation
const slotDataSchema = z.object({
	character: z
		.object({
			id: z.string(),
			name: z.string(),
			rarity: z.string(),
			position: z.string(),
			school: z.string(),
		})
		.nullable(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			type: z.string(),
		}),
	),
});

const teamPositionsSchema = z.object({
	setter: slotDataSchema,
	middleBlocker1: slotDataSchema,
	middleBlocker2: slotDataSchema,
	wingSpiker1: slotDataSchema,
	wingSpiker2: slotDataSchema,
	libero: slotDataSchema,
	opposite: slotDataSchema,
});

const benchSlotSchema = z.object({
	character: z
		.object({
			id: z.string(),
			name: z.string(),
			rarity: z.string(),
			position: z.string(),
			school: z.string(),
		})
		.nullable(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			type: z.string(),
		}),
	),
});

export const teamsRouter = createTRPCRouter({
	// Get all teams for a user
	list: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const teams = await ctx.db.team.findMany({
				where: { userId: input.userId },
				orderBy: { updatedAt: "desc" },
			});

			return teams.map((team) => ({
				...team,
				positions: JSON.parse(team.positions as string),
				bench: JSON.parse(team.bench as string),
			}));
		}),

	// Get single team by ID
	get: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const team = await ctx.db.team.findUnique({
				where: { id: input.id },
			});

			if (!team) return null;

			return {
				...team,
				positions: JSON.parse(team.positions as string),
				bench: JSON.parse(team.bench as string),
			};
		}),

	// Create new team
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				name: z.string().min(1).max(50),
				positions: teamPositionsSchema.optional(),
				bench: z.array(benchSlotSchema).optional(),
				teamType: z.enum(["Quick", "Power", "Block", "Reception"]).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			// Default empty positions
			const defaultPositions = {
				setter: { character: null, items: [] },
				middleBlocker1: { character: null, items: [] },
				middleBlocker2: { character: null, items: [] },
				wingSpiker1: { character: null, items: [] },
				wingSpiker2: { character: null, items: [] },
				libero: { character: null, items: [] },
				opposite: { character: null, items: [] },
			};

			const team = await ctx.db.team.create({
				data: {
					userId: input.userId,
					name: input.name,
					positions: JSON.stringify(input.positions ?? defaultPositions),
					bench: JSON.stringify(input.bench ?? []),
					teamType: input.teamType ?? null,
				},
			});

			return {
				...team,
				positions: JSON.parse(team.positions as string),
				bench: JSON.parse(team.bench as string),
			};
		}),

	// Update team
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1).max(50).optional(),
				positions: teamPositionsSchema.optional(),
				bench: z.array(benchSlotSchema).optional(),
				teamType: z.enum(["Quick", "Power", "Block", "Reception"]).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const updateData: {
				name?: string;
				positions?: string;
				bench?: string;
				teamType?: string | null;
			} = {};

			if (input.name) updateData.name = input.name;
			if (input.positions) updateData.positions = JSON.stringify(input.positions);
			if (input.bench) updateData.bench = JSON.stringify(input.bench);
			if (input.teamType !== undefined)
				updateData.teamType = input.teamType ?? null;

			const team = await ctx.db.team.update({
				where: { id: input.id },
				data: updateData,
			});

			return {
				...team,
				positions: JSON.parse(team.positions as string),
				bench: JSON.parse(team.bench as string),
			};
		}),

	// Delete team
	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.team.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	// Validate team composition
	validate: publicProcedure
		.input(
			z.object({
				positions: teamPositionsSchema,
			}),
		)
		.query(({ input }) => {
			const errors: string[] = [];
			const warnings: string[] = [];

			const positions = input.positions;

			// Check required positions
			if (!positions.setter.character)
				errors.push("Setter position is required");
			if (!positions.libero.character)
				errors.push("Libero position is required");
			if (!positions.opposite.character)
				errors.push("Opposite position is required");

			// Check MB positions (at least 1, ideally 2)
			const mbCount = [
				positions.middleBlocker1.character,
				positions.middleBlocker2.character,
			].filter(Boolean).length;

			if (mbCount === 0) errors.push("At least one Middle Blocker is required");
			if (mbCount === 1)
				warnings.push("Consider adding a second Middle Blocker");

			// Check WS positions (at least 1, ideally 2)
			const wsCount = [
				positions.wingSpiker1.character,
				positions.wingSpiker2.character,
			].filter(Boolean).length;

			if (wsCount === 0) errors.push("At least one Wing Spiker is required");
			if (wsCount === 1) warnings.push("Consider adding a second Wing Spiker");

			// Position validation (check if characters are in correct positions)
			const positionChecks = [
				{
					pos: positions.setter.character,
					expected: "S",
					name: "Setter",
				},
				{
					pos: positions.middleBlocker1.character,
					expected: "MB",
					name: "Middle Blocker 1",
				},
				{
					pos: positions.middleBlocker2.character,
					expected: "MB",
					name: "Middle Blocker 2",
				},
				{
					pos: positions.wingSpiker1.character,
					expected: "WS",
					name: "Wing Spiker 1",
				},
				{
					pos: positions.wingSpiker2.character,
					expected: "WS",
					name: "Wing Spiker 2",
				},
				{
					pos: positions.libero.character,
					expected: "L",
					name: "Libero",
				},
				{
					pos: positions.opposite.character,
					expected: "OP",
					name: "Opposite",
				},
			];

			for (const check of positionChecks) {
				if (check.pos && check.pos.position !== check.expected) {
					warnings.push(
						`${check.name} has character with position ${check.pos.position} instead of ${check.expected}`,
					);
				}
			}

			return {
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}),

	// Duplicate team
	duplicate: publicProcedure
		.input(
			z.object({
				id: z.string(),
				newName: z.string().min(1).max(50),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const original = await ctx.db.team.findUnique({
				where: { id: input.id },
			});

			if (!original) throw new Error("Team not found");

			const duplicate = await ctx.db.team.create({
				data: {
					userId: original.userId,
					name: input.newName,
					positions: original.positions,
					bench: original.bench,
					teamType: original.teamType,
				},
			});

			return {
				...duplicate,
				positions: JSON.parse(duplicate.positions as string),
				bench: JSON.parse(duplicate.bench as string),
			};
		}),
});
