export type Player = 'X' | 'O' 

export type GameState = {
    currentPlayer: Player, 
    winner: Player | null, 
    board: String[][]
}

export const initialState: GameState= {
    currentPlayer: 'X',
    winner: null, 
    board: [['_ ','_ ' ,'_ '],['_ ','_ ','_ '], ['_ ','_ ','_ ']]
}

export function makeMove(game: GameState, currentPlayer: Player, row: number, col: number): GameState 
{
    let newState = structuredClone(game)

    //make move
    newState.board[row][col] = game.board[row][col] === '_ ' ? currentPlayer : game.board[row][col] 

    //check for a winner 
    newState.winner = winner(newState)

    //change player 
    newState.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X'
    return newState
}

export function winner(game: GameState): Player | null {

    console.log('Checking for winner.')

    let wins = 
    [
        //row wins
        [[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0],[2,1],[2,2]],
        //column wins
        [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
        //diagonal wins
        [[0,0], [1,1], [2,2]], [[2,0], [1,1], [0,2]]
    ]

    for(const combo of wins){
        const first = game.board[combo[0][0]][combo[0][1]]
        const second = game.board[combo[1][0]][combo[1][1]]
        const third = game.board[combo[2][0]][combo[2][1]]
        // console.log(first, second, third)
        if(first != '_ ' && first === second && second === third){
            console.log("Winner found! is ", game.currentPlayer)
            return game.currentPlayer
        }
    }
    
    console.log('returning null')
    return null 

}