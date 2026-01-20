import connection from './connection'

import { GameData, Game } from '../../models/savedGame.ts'

const gameSelect = [
  'id',
  'pile_data as pileData',
  'current_pile as currentPile',
  'open_card as openCard',
  'is_hidden as isHidden',
  'active_piles as activePiles',
  'user_id as userId',
]

export async function getOverviewByUserId(userId: string) {
  return connection('saved_games')
    .where({ user_id: userId })
    .select('id', 'created_at as createdAt', 'updated_at as updatedAt')
}

export async function deleteSavedGame(saveId: number) {
  return connection('saved_games').where({ id: saveId }).del()
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
      return {
        ...response,
        pileData,
        activePiles,
        openCard,
        isHidden,
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
      pile_data: JSON.stringify(newSave.pileData),
      current_pile: newSave.currentPile,
      open_card: JSON.stringify(newSave.openCard),
      is_hidden: newSave.isHidden,
      user_id: newSave.userId,
      active_piles: JSON.stringify(newSave.activePiles),
    })
    .returning([...gameSelect])
}

export async function editSavedGame(updatedSave: Game) {
  return connection('saved_games')
    .where({ id: updatedSave.id })
    .update({
      pile_data: JSON.stringify(updatedSave.pileData),
      current_pile: updatedSave.currentPile,
      open_card: JSON.stringify(updatedSave.openCard),
      is_hidden: updatedSave.isHidden,
      user_id: updatedSave.userId,
      active_piles: JSON.stringify(updatedSave.activePiles),
    })
    .returning([...gameSelect])
}
