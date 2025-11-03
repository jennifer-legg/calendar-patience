export interface ScoreData {
  userId: number
  gameName: string
  wins?: number
  highScore?: number
  losses?: number
}

export interface Score extends ScoreData {
  id: number
}
