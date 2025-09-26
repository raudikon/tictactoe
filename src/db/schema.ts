import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { type GameState } from '../tictactoe.ts'

export const ttc_table = pgTable("ttc", {
    id: varchar({ length: 255 }).primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    gameState: jsonb().$type<GameState>().notNull()
})