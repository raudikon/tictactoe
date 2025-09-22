import { useState } from 'react'
import {initialState, makeMove} from './tictactoe.ts'
import './App.css'

function App() {

  const [gameState, setGameState] = useState(initialState)
  const indices = [0,1,2]

  const handleClick = (row: number, col: number) => {
    if(gameState.winner){
      return
    }
    //Update game state: place a legal move on a board, check if there is a winner.
    setGameState(makeMove(gameState, gameState.currentPlayer, row, col))
  }

  return (
    <div className='font-serif'>
      <h1 className='m-4'>Tic Tac Toe</h1>
      <p className='m-4'>Current player: {gameState.currentPlayer}</p>

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
        <button onClick={()=>setGameState(initialState)}>New Game</button>
      </div>
      
    </div>
  )
}

  
export default App