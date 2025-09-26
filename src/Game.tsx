import { useEffect, useState } from 'react'
import { type GameState } from './tictactoe.ts'
import './App.css'
import { useParams } from 'react-router-dom'

const Game = () => {

  const [gameState, setGameState] = useState<GameState | null>(null)
  const { id } = useParams()
  let GAME_ID: string = id ? id : 'game_id_missing'

  const getGameState = (id: string) => {

    // what i want to happen is that this always works.
    fetch(`/game/${id}`)
      .then(response => response.json())
      .then(data => { setGameState(data), console.log('Got game succesfully :)') })
      .catch(_e => console.log("Getting game from server failed :{"))

    // setInterval(() => getGameState(GAME_ID), 5000)
  }

  useEffect(() => {
    getGameState(GAME_ID)
    setInterval(() => getGameState(GAME_ID), 100)
  }, [])

  //Event handlers 
  const handleClick = (row: number, col: number) => {

    if (!gameState) { return }

    if (gameState.board[row][col] !== '_ ' || gameState.winner) {
      return
    }

    fetch('/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([gameState.playerName, row, col])
    })
      .then(response => response.json())
      .then(data => setGameState(data))
  }

  const handleResetGame = () => {
    fetch('/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([gameState?.playerName])
    })
      .then(response => response.json())
      .then(data => setGameState(data))
  }


  const indices = [0, 1, 2]
  if (!gameState) return <div>Loading...</div>

  return (
    <div className='font-serif'>
      <h1 className='m-4'>Tic Tac Toe</h1>
      <p className='m-4'>Current player: {gameState.currentPlayer}</p>
      <p className='m-4'>Player Name: {gameState.playerName}</p>

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