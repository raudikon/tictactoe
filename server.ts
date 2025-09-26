import express from "express";
import ViteExpress from "vite-express";
import type { GameState } from "./src/tictactoe.ts";

import { db_createGame, db_makeMove, db_resetBoard } from './src/index.ts'

const app = express();
ViteExpress.listen(app, 3002, () => console.log("Server is listening... http://localhost:3002"));
app.use(express.json())


app.get('/game/:id', async (request, response) => {

    //request parameters with player name (as gameId)
    const gameId = request.params.id
    if (!gameId) { return response.send("sorry you did not send an id lol") }

    let db_response: GameState
    const data = await db_createGame(gameId)
    db_response = data[0].gameState

    return response.send(db_response)
})

//make a move
app.post('/move', async (request, response) => {

    const gameId = request.body[0]
    const row = request.body[1]
    const col = request.body[2]

    const result = await db_makeMove(gameId, row, col)
    response.send(result[0].gameState)
})

//reset game 
app.post('/reset', async (request, response) => {
    const gameId = request.body
    const result = await db_resetBoard(gameId)

    response.send(result[0].gameState)
})

