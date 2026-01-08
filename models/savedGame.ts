import { Card } from './deck'

export interface GameData {
  gameName: string
  activePiles: boolean[]
  pileData: Pile[]
  currentPile: number
  openCard: string
  isHidden: boolean
  gameLost: boolean
  gameEnded: boolean
  userId: string
}

export interface Game extends GameData {
  id: number
  date: string
}

export interface Pile {
  pileNumber: number
  pileType: string
  pileCards: Card[]
  faceupCards: Card[]
  facedownCards: Card[]
  buttonIsVisible: boolean
  buttonIsClickable: boolean
}
