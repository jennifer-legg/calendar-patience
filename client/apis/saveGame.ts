import request from 'superagent'
import { Game, GameData, SaveOverview } from '../../models/savedGame'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSavedGame(id: number) {
  const response = await request.get(`${rootURL}/savedGames/game/${id}`)
  return response.body as Game
}

export async function getSaveOverviewByUserId(userId: string) {
  const response = await request.get(`${rootURL}/savedGames/overview/${userId}`)
  return response.body as SaveOverview[]
}

export async function saveGame(gameData: GameData | Game): Promise<void> {
  await request.post(`${rootURL}/savedGames`).send(gameData)
}

export async function deleteSavedGame(saveId: number): Promise<void> {
  await request.delete(`${rootURL}/savedGames`).send({ saveId })
}
