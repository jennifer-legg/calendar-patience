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

export async function addNewSavedGame(newSave: GameData) {
  return connection('saved_games')
    .insert(newSave)
    .returning([...gameSelect])
}
