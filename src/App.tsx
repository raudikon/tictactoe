import { useEffect, useState } from 'react'
import { makeMove, type GameState } from './tictactoe.ts'
import './App.css'
import Game from './Game.tsx'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import GameLobby from './GameLobby.tsx'

//jump back in: 
// MAKE IT SO THAT WHEN U CLICK THE JOIN GAME BUTTON, YOU WILL BE TAKEN TO SCOUTS GAME. THEN REFRESH, GO BACK, CLICK JOIN GAME AND SEE SCOUTS GAME AGAIN. 

const queryClient = new QueryClient()


function App() {

    const [gameId, setGameId] = useState(undefined)

    return (
        <QueryClientProvider client={queryClient}>
            <div className='homepage'>
                {gameId && <Game id={gameId} />}
                {!gameId && <GameLobby setGameId={setGameId} />}
            </div>
        </QueryClientProvider>
    )

}

export default App

// const RenderGame = () => 
//this actually works. LMAO 
// return(
//     <div>
//         <h1>WOOOHOO</h1>
//         <Game/>
//     </div>


// )