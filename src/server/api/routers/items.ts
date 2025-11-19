import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const itemsRouter = createTRPCRouter({
	// Get all items with optional filtering
	list: publicProcedure
		.input(
			z
				.object({
					type: z.enum(["Memory", "Potential Set"]).optional(),
				})
				.optional(),
		)
		.query(async ({ ctx, input }) => {
			const where: { type?: string } = {};

			if (input?.type) where.type = input.type;

			const items = await ctx.db.item.findMany({
				where,
				orderBy: [{ type: "asc" }, { name: "asc" }],
			});

			return items.map((item) => ({
				...item,
				effects: JSON.parse(item.effects as string),
			}));
		}),

	// Get single item by ID
	get: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const item = await ctx.db.item.findUnique({
				where: { id: input.id },
			});

			if (!item) return null;

			return {
				...item,
				effects: JSON.parse(item.effects as string),
			};
		}),

	// Get items by type
	getByType: publicProcedure
		.input(z.object({ type: z.enum(["Memory", "Potential Set"]) }))
		.query(async ({ ctx, input }) => {
			const items = await ctx.db.item.findMany({
				where: { type: input.type },
				orderBy: { name: "asc" },
			});

			return items.map((item) => ({
				...item,
				effects: JSON.parse(item.effects as string),
			}));
		}),

	// Get all memory items
	getMemories: publicProcedure.query(async ({ ctx }) => {
		const items = await ctx.db.item.findMany({
			where: { type: "Memory" },
			orderBy: { name: "asc" },
		});

		return items.map((item) => ({
			...item,
			effects: JSON.parse(item.effects as string),
		}));
	}),

	// Get all potential set items
	getPotentialSets: publicProcedure.query(async ({ ctx }) => {
		const items = await ctx.db.item.findMany({
			where: { type: "Potential Set" },
			orderBy: { name: "asc" },
		});

		return items.map((item) => ({
			...item,
			effects: JSON.parse(item.effects as string),
		}));
	}),
});
