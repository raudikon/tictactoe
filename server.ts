//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { makeMove, initialState, scoutsGame } from "./src/tictactoe.ts"
import type { GameState } from "./src/tictactoe.ts";
// import { v4 as uuidv4 } from "uuid"
const app = express();
ViteExpress.listen(app, 3002, () => console.log("Server is listening... http://localhost:3002"));
app.use(express.json())

//state variable 
let allGames: Record<string, GameState> = { 'scout': scoutsGame, 'fractal': initialState }

let myGame: GameState = initialState

app.get('/game', (_request, response) => {
    response.send(myGame)
})

//get game state for an individual game 
app.get('/game/:id', (request, response) => {

    const gameId = request.params.id

    // did they even send an id lol
    if (!gameId) { return response.send("sorry you did not send an id lol") }

    // if the game already exists, send it.
    const game = allGames[gameId]
    if (game) { return response.send(game) }
    // if the game does not exist. create it and send it.
    const initialGame = structuredClone(initialState)
    let newGame = { ...initialGame, id: gameId, playerName: gameId }
    allGames[gameId] = newGame

    return response.send(newGame)
})

//make a move
app.post('/move', (request, response) => {
    //request contains move info
    const gameId = request.body[0]
    const row = request.body[1]
    const col = request.body[2]

    console.log("hishfosdhoflfnlsdf ", row, col)

    let thisGame = allGames[gameId]
    thisGame = makeMove(thisGame, thisGame.currentPlayer, row, col)
    allGames[gameId] = thisGame
    //response send new state 
    response.send(thisGame)
})

//reset game 
app.post('/reset', (request, response) => {
    const gameId = request.body
    const initialGame = structuredClone(initialState)
    let newGame = { ...initialGame, id: gameId, playerName: gameId }
    allGames[gameId] = newGame

    response.send(allGames[gameId])
})

// // join or create
// app.get('/create/:name', (request, response) => {
//     //update our representation of games. 
//     const name = request.params.name
//     const gameId = name
//     const initialGame = structuredClone(initialState)
//     let newGame = { ...initialGame, id: gameId, playerName: name }
//     allGames[gameId] = newGame

//     //send back new game 
//     response.send(allGames[gameId])
//     // response.send('you tryna join a game.')
// })

// app.get('/create/:name', (request, response) => {
//     const name = request.params.name
//     response.send("You are trying to create a game.")
// })