import { drizzle } from 'drizzle-orm/postgres-js'
import { ttc_table } from './db/schema.ts'
import { makeMove } from './tictactoe.ts'
import { v4 as uuidv4 } from 'uuid';
import type { GameState } from "./tictactoe.ts";
import { eq } from 'drizzle-orm';


const db = drizzle(process.env.DATABASE_URL!);

export async function db_createGame(playerName: string) {

    //check if the name already exists. 
    const game_row = await db.select().from(ttc_table).where(eq(ttc_table.name, playerName))

    //a game with this name already exists
    if (game_row.length > 0) {
        return game_row
    }

    //this name doesnt exist, create game and send it 
    else {

        const newGame: typeof ttc_table.$inferInsert = {

            id: uuidv4(),
            name: playerName as string,
            gameState:
            {
                currentPlayer: 'X',
                winner: null,
                board: [['_ ', '_ ', '_ '], ['_ ', '_ ', '_ '], ['_ ', '_ ', '_ ']],
                playerName: playerName
            }
        }


        let game_json = await db.insert(ttc_table).values(newGame).returning()
        console.log('insert new game into db? ;3')

        return game_json
    }
}

export async function db_makeMove(playerName: string, row: number, col: number) {

    const game_row = await db.select().from(ttc_table).where(eq(ttc_table.name, playerName))

    if (game_row.length === 0) {
        throw new Error('Player is not found')
    }

    const currentGame: GameState = game_row[0].gameState

    const updatedGame = makeMove(currentGame, row, col)

    let result = await db.update(ttc_table)
        .set({ gameState: updatedGame })
        .where(eq(ttc_table.name, playerName))
        .returning()

    return result
}

export async function db_resetBoard(playerName: string) {

    const game_row = await db.select().from(ttc_table).where(eq(ttc_table.name, playerName))

    if (game_row.length === 0) {
        throw new Error('Player is not found')
    }

    let result = await db.update(ttc_table)
        .set({
            gameState:
            {
                currentPlayer: 'X',
                winner: null,
                board: [['_ ', '_ ', '_ '], ['_ ', '_ ', '_ '], ['_ ', '_ ', '_ ']],
                playerName: playerName
            }
        })
        .where(eq(ttc_table.name, playerName))
        .returning()

    return result

}