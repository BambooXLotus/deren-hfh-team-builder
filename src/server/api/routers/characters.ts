import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const charactersRouter = createTRPCRouter({
	// Get all characters with optional filters
	list: publicProcedure
		.input(
			z
				.object({
					position: z
						.enum(["S", "MB", "WS", "L", "OP"])
						.optional(),
					school: z.string().optional(),
					rarity: z.enum(["UR", "SSR", "SP", "SR", "R"]).optional(),
					search: z.string().optional(),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const where: {
				position?: string;
				school?: string;
				rarity?: string;
				name?: { contains: string; mode: "insensitive" };
			} = {};

			if (input?.position) where.position = input.position;
			if (input?.school) where.school = input.school;
			if (input?.rarity) where.rarity = input.rarity;
			if (input?.search) {
				where.name = {
					contains: input.search,
					mode: "insensitive" as const,
				};
			}

			const characters = await ctx.db.character.findMany({
				where,
				orderBy: [{ rarity: "asc" }, { name: "asc" }],
			});

			// Parse JSON fields and return as proper objects
			return characters.map((char) => ({
				...char,
				stats: JSON.parse(char.stats as string),
				skills: JSON.parse(char.skills as string),
				bonds: JSON.parse(char.bonds as string),
				symbols: JSON.parse(char.symbols as string),
			}));
		}),

	// Get single character by ID
	get: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const character = await ctx.db.character.findUnique({
				where: { id: input.id },
			});

			if (!character) return null;

			return {
				...character,
				stats: JSON.parse(character.stats as string),
				skills: JSON.parse(character.skills as string),
				bonds: JSON.parse(character.bonds as string),
				symbols: JSON.parse(character.symbols as string),
			};
		}),

	// Filter characters by position
	filterByPosition: publicProcedure
		.input(z.object({ position: z.enum(["S", "MB", "WS", "L", "OP"]) }))
		.query(async ({ ctx, input }) => {
			const characters = await ctx.db.character.findMany({
				where: { position: input.position },
				orderBy: [{ rarity: "asc" }, { name: "asc" }],
			});

			return characters.map((char) => ({
				...char,
				stats: JSON.parse(char.stats as string),
				skills: JSON.parse(char.skills as string),
				bonds: JSON.parse(char.bonds as string),
				symbols: JSON.parse(char.symbols as string),
			}));
		}),

	// Filter characters by school
	filterBySchool: publicProcedure
		.input(z.object({ school: z.string() }))
		.query(async ({ ctx, input }) => {
			const characters = await ctx.db.character.findMany({
				where: { school: input.school },
				orderBy: [{ rarity: "asc" }, { name: "asc" }],
			});

			return characters.map((char) => ({
				...char,
				stats: JSON.parse(char.stats as string),
				skills: JSON.parse(char.skills as string),
				bonds: JSON.parse(char.bonds as string),
				symbols: JSON.parse(char.symbols as string),
			}));
		}),

	// Filter characters by rarity
	filterByRarity: publicProcedure
		.input(z.object({ rarity: z.enum(["UR", "SSR", "SP", "SR", "R"]) }))
		.query(async ({ ctx, input }) => {
			const characters = await ctx.db.character.findMany({
				where: { rarity: input.rarity },
				orderBy: { name: "asc" },
			});

			return characters.map((char) => ({
				...char,
				stats: JSON.parse(char.stats as string),
				skills: JSON.parse(char.skills as string),
				bonds: JSON.parse(char.bonds as string),
				symbols: JSON.parse(char.symbols as string),
			}));
		}),

	// Search characters by name
	search: publicProcedure
		.input(z.object({ query: z.string() }))
		.query(async ({ ctx, input }) => {
			const characters = await ctx.db.character.findMany({
				where: {
					name: {
						contains: input.query,
						mode: "insensitive" as const,
					},
				},
				orderBy: { name: "asc" },
			});

			return characters.map((char) => ({
				...char,
				stats: JSON.parse(char.stats as string),
				skills: JSON.parse(char.skills as string),
				bonds: JSON.parse(char.bonds as string),
				symbols: JSON.parse(char.symbols as string),
			}));
		}),

	// Get all unique schools
	getSchools: publicProcedure.query(async ({ ctx }) => {
		const characters = await ctx.db.character.findMany({
			select: { school: true },
			distinct: ["school"],
			orderBy: { school: "asc" },
		});

		return characters.map((c) => c.school);
	}),
});
