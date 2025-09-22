import { useState } from 'react'
import {initialState, makeMove} from './tictactoe.ts'
// import './App.css'

function App() {

  const [gameState, setGameState] = useState(initialState)
  const indices = [0,1,2]

  const handleClick = (row: number, col: number) => {
    if(gameState.winner){
      setGameState(gameState)
    }
    //Update game state: place a legal move on a board, check if there is a winner.
    setGameState(makeMove(gameState, gameState.currentPlayer, row, col))
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <p>It is {gameState.currentPlayer}'s turn.</p>

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

      <div>
        {gameState.winner ? <p>Player {gameState.winner} wins!</p> : null}
      </div>

      <div>
        <button onClick={()=>setGameState(initialState)}>New Game</button>
      </div>
      
    </div>
  )
}

  
export default App
