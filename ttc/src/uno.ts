type Deck = Card[]
type Pile = Card[]
type Hand = Card[]

type PlayerID = string

type Player = {
    id: PlayerID
    hand: Hand,
}

type Game = {
    deck: Deck,
    pile: Pile,
    players: Player[]
    currentPlayer: PlayerID
}

type Card = ??


const sampleUno = {
    deck: [{
        color: 'blue',
        value: '8',
        type: 'number'
    }, 'r8', '+4w', 'w', 'rreverse', 'breverse']
}