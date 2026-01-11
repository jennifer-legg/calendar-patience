import request from 'superagent'
import { Game, GameData } from '../../models/savedGame'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSavedGame() {
  const response = await request.get(`${rootURL}/saveGame`)
  return response.body as Game
}

export async function saveGame(gameData: GameData | Game): Promise<void> {
  await request.post(`${rootURL}/savedGames`).send(gameData)
}
