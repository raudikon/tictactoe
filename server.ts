//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { makeMove, initialState } from "./src/tictactoe.ts"
import type { GameState } from "./src/tictactoe.ts";

const app = express();
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
app.use(express.json())

//state variable 
let myGame: GameState = initialState

//get state 
app.get('/game', (_request, response) => {
    response.send(myGame)
})

//make a move
app.post('/move', (request, response) => {
    //request contains move info
    const row = request.body[0]
    const col = request.body[1]

    console.log("hishfosdhoflfnlsdf ", row, col)

    myGame = makeMove(myGame, myGame.currentPlayer, row, col)
    //response send new state 
    response.send(myGame)
})

//new game 
app.get('/new', (request, response) => {
    myGame = initialState
    response.send(myGame)
})