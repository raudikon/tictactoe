import { useEffect, useState } from 'react'
import {makeMove, type GameState} from './tictactoe.ts'
import './App.css'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'


const Game = ({ id }) => {

  const [gameState, setGameState] = useState<GameState | null>(null) 
  const GAME_ID: string = id 
  //make a fetch request to the server to get initial state
  //YOU ONLY WANT TO DO USE EFFECT AFTER YOU KNOW THE ID. 

  //Getting state 
  const getInitialState = (id: string) => {
    fetch(`/game/${id}`)
    .then(response => response.json())
    .then(data => {setGameState(data), console.log(data)})
    .catch(e => console.log("Getting game from server failed :{"))
  }

  useEffect(() => {
    getInitialState(GAME_ID)
  }, [])

  //Event handlers 
  const handleClick = (row: number, col: number) => {

    if(!gameState){return}

    if(gameState.winner){
      return
    }
    fetch('/move', {
      method: 'POST',
      headers: {    'Content-Type': 'application/json'    },
      body: JSON.stringify([row, col])
    })
    .then(response => response.json())
    .then(data => setGameState(data))
  }

  const handleResetGame = () => {
    fetch("/reset")
    .then(response => response.json())
    .then(data => setGameState(data))
  }


  const indices = [0,1,2]
  if (!gameState) return <div>Loading...</div>

  return (
    <div className='font-serif'>
      <h1 className='m-4'>Tic Tac Toe</h1>
      <p className='m-4'>Current player: {gameState.currentPlayer}</p>
      <p className='m-4'>Game ID: {gameState.id}</p>

      <div>
        {
        indices.map(i => 
          <button onClick={() => handleClick(0, i)}> 
            {gameState.board[0][i]}
          </button>)
        }
      </div>

      <div>
        {
        indices.map(i => 
          <button onClick={() => handleClick(1, i)}> 
            {gameState.board[1][i]}
          </button>)
        }
      </div>

      <div>
        {
        indices.map(i => 
          <button onClick={() => handleClick(2, i)}> 
            {gameState.board[2][i]}
          </button>)
        }
      </div>

      <div className='m-4'>
        {gameState.winner ? <p>Player {gameState.winner} wins!</p> : null}
      </div>

      <div className='m-4'>
        <button onClick={handleResetGame}>Reset</button>
      </div>
      
    </div>
  )
}

  
export default Game