import connection from './connection'

import { GameData } from '../../models/savedGame.ts'

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
  'user_id as userId',
]

export async function getOverviewByUserId(userId: string) {
  return connection('saved_games')
    .where({ user_id: userId })
    .select('id', 'game_name as gameName', 'date')
}

export async function getSavedGame(id: number) {
  return connection('saved_games')
    .where({ id })
    .select(...gameSelect)
    .first()
}

export async function addNewSavedGame(newSave: GameData) {
  return connection('saved_games')
    .insert({
      game_name: newSave.gameName,
      pile_data: JSON.stringify(newSave.pileData),
      current_pile: newSave.currentPile,
      open_card: newSave.openCard,
      is_hidden: newSave.isHidden,
      game_lost: newSave.gameLost,
      game_ended: newSave.gameEnded,
      user_id: newSave.userId,
      active_piles: JSON.stringify(newSave.activePiles),
    })
    .returning([...gameSelect])
}
