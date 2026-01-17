import connection from './connection'

import { Scores } from '../../models/scores'

const scoreSelect = ['id', 'wins', 'losses', 'user_id as userId']

export async function getScoreByUserId(
  userId: string,
): Promise<Scores | undefined> {
  return connection('scores')
    .where({ user_id: userId })
    .select(...scoreSelect)
    .first()
}

export async function addScores(gameLost: boolean, userId: string) {
  //Search database to see if userId already exists
  const userExists = await connection('scores')
    .where({ user_id: userId })
    .select('*')
    .first()
  if (userExists) {
    //Add losses to already existing user scores
    if (gameLost) {
      return connection('scores')
        .where({ user_id: userId })
        .update({ losses: userExists.losses + 1 })
        .returning([...scoreSelect])
    } else {
      //Add win to already existing user scores
      return connection('scores')
        .where({ user_id: userId })
        .update({ wins: userExists.wins + 1 })
        .returning([...scoreSelect])
    }
  } else {
    if (gameLost) {
      return connection('scores')
        .insert({ losses: 1, user_id: userId })
        .returning([...scoreSelect])
    } else {
      //Add win to already existing user scores
      return connection('scores')
        .insert({ wins: 1, user_id: userId })
        .returning([...scoreSelect])
    }
  }
}
