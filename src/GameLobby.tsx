

type GameLobbyProps = {
  setGameId: () => void
}
function GameLobby({ setGameId }: GameLobbyProps) {
  const handleJoinGame = () => {
    console.log('join game clicked')
  }

  return (
    <div>
      <div>
        <h1>Welcome to Tic Tac Toe</h1>
      </div>

      <div>
        <button>Create New Game</button>
        <input className='input' type="text" placeholder="Enter Player Name" />
      </div>

      <div>
        <button onClick={handleJoinGame}>Join Game</button>
        <input
          className='input'
          type="text"
          placeholder="Enter Game ID" />
      </div>
    </div>
  )
}


export default GameLobby