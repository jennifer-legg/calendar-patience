import request from 'superagent'
import { Game, GameData, SaveOverview } from '../../models/savedGame'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSavedGame(id: number, token: string) {
  const response = await request
    .get(`${rootURL}/savedGames/game/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as Game
}

export async function getSaveOverviewByUserId(token: string) {
  const response = await request
    .get(`${rootURL}/savedGames/overview`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as SaveOverview[]
}

interface NewSaveParameters {
  gameToSave: GameData
  token: string
}

interface EditSaveParameters {
  gameToSave: Game
  token: string
}

export async function saveGame({
  gameToSave,
  token,
}: NewSaveParameters): Promise<number> {
  const response = await request
    .post(`${rootURL}/savedGames`)
    .set('Authorization', `Bearer ${token}`)
    .send(gameToSave)
  console.log(response.body.id)
  return response.body.id as number
}

export async function editSavedGame({
  gameToSave,
  token,
}: EditSaveParameters): Promise<number> {
  const response = await request
    .patch(`${rootURL}/savedGames`)
    .set('Authorization', `Bearer ${token}`)
    .send(gameToSave)
  console.log(response.body.id)
  return response.body.id as number
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
