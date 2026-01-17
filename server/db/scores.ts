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
