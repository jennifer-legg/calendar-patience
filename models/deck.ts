export interface Deck {
  success: boolean
  deck_id: string
  remaining?: number
}
export interface ShuffledDeck extends Deck {
  shuffled: boolean
}

export interface PileData extends Deck {
  piles: { [key: string]: Pile }
  shuffled?: boolean
}

export interface DrawnCards extends Deck {
  cards: Card[]
}

export interface DrawnFromPile extends DrawnCards {
  piles: { [key: string]: Pile }
}

export interface Card {
  code: string
  image: string
  images?: {
    svg: string
    png: string
  }
  value: string
  suit: Suit
}

interface Pile {
  remaining: number
  cards?: Card[]
}

type Suit = 'SPADES' | 'DIAMONDS' | 'HEARTS' | 'CLUBS'
