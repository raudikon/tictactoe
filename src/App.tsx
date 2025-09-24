import { useEffect, useState } from 'react'
import {makeMove, type GameState} from './tictactoe.ts'
import './App.css'

function App() {

  const [gameState, setGameState] = useState<GameState | null>(null) 

  //make a fetch request to the server to get initial state
  useEffect(() => {
    fetch("/game")
    .then(response => response.json())
    .then(data => setGameState(data))
    .catch(e => console.log("Getting game from server failed :{"))
  }, [])


  const indices = [0,1,2]

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

  const newGame = () => {
    fetch("new")
    .then(response => response.json())
    .then(data => setGameState(data))
  }

  if (!gameState) return <div>Loading...</div>

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
        <button onClick={newGame}>New Game</button>
      </div>
      
    </div>
  )
}

  
export default App