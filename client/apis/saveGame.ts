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

interface SaveParameters {
  gameToSave: GameData | Game
  token: string
}

export async function saveGame({
  gameToSave,
  token,
}: SaveParameters): Promise<void> {
  await request
    .post(`${rootURL}/savedGames`)
    .set('Authorization', `Bearer ${token}`)
    .send(gameToSave)
}

interface DeleteSaveParameters {
  saveId: number
  token: string
}

export async function deleteSavedGame({
  saveId,
  token,
}: DeleteSaveParameters): Promise<void> {
  await request
    .delete(`${rootURL}/savedGames`)
    .set('Authorization', `Bearer ${token}`)
    .send({ saveId })
}
