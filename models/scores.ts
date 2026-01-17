export interface ScoreData {
  userId: number
  wins?: number
  losses?: number
}

export interface Scores extends ScoreData {
  id: number
}
