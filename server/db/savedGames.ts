import connection from './connection'

import { GameData, Game } from '../../models/savedGame.ts'

const gameSelect = [
  'id',
  'game_name as gameName',
  'date',
  'pile_data as pileData',
  'current_pile as currentPile',
  'open_card as openCard',
  'is_hidden as isHidden',
  'game_lost as gameLost',
  'game_ended as gameEnded',
  'active_piles as activePiles',
  'user_id as userId',
]

export async function getOverviewByUserId(userId: string) {
  return connection('saved_games')
    .where({ user_id: userId })
    .select('id', 'game_name as gameName', 'date')
}

export async function getSavedGame(id: number): Promise<Game | undefined> {
  const response = await connection('saved_games')
    .where({ id })
    .select(...gameSelect)
    .first()

  if (response) {
    try {
      const pileData = JSON.parse(response.pileData)
      const activePiles = JSON.parse(response.activePiles)
      const openCard = JSON.parse(response.openCard)
      const isHidden = Boolean(response.isHidden)
      const gameLost = Boolean(response.gameLost)
      const gameEnded = Boolean(response.gameEnded)
      return {
        ...response,
        pileData,
        activePiles,
        openCard,
        isHidden,
        gameLost,
        gameEnded,
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

export async function addNewSavedGame(newSave: GameData) {
  return connection('saved_games')
    .insert({
      game_name: newSave.gameName,
      pile_data: JSON.stringify(newSave.pileData),
      current_pile: newSave.currentPile,
      open_card: JSON.stringify(newSave.openCard),
      is_hidden: newSave.isHidden,
      game_lost: newSave.gameLost,
      game_ended: newSave.gameEnded,
      user_id: newSave.userId,
      active_piles: JSON.stringify(newSave.activePiles),
    })
    .returning([...gameSelect])
}
