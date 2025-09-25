// type GameLobbyProps = {
//   setGameId: () => void
// }
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function GameLobby() {

  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleGame = (name: String) => {
    //make a fetch request to new game, with the id that the player entered. 
    console.log('handle join game')
    navigate(`/play/${name}`)
  }

  return (
    <div>

      <div>
        <h1>Welcome to Tic Tac Toe</h1>
      </div>

      <div>
        <button
          onClick={() => handleGame(name)}>Game Name</button>
        <input
          className='input'
          type="text"
          placeholder="Enter Room Name"
          value={name}
          onChange={e => setName(e?.target.value)}
        />
      </div>

    </div >
  )
}


export default GameLobby