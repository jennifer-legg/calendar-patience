import { Card } from './deck'

export interface GameData {
  activePiles: boolean[]
  pileData: Pile[]
  currentPile: string | null
  openCard: Card | null
  isHidden: boolean
  gameLost: boolean
  gameEnded: boolean
  userId: string
}

export interface Game extends GameData {
  id: number
}

export interface SaveOverview {
  id: number
  createdAt: string
  updatedAt: string
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
