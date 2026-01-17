import request from 'superagent'
import { Scores } from '../../models/scores'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getScoreByUserId(token: string) {
  const response = await request
    .get(`${rootURL}/scores`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as Scores
}

interface AddScoreParameters {
  gameLost: boolean
  token: string
}

export async function addScores({
  gameLost,
  token,
}: AddScoreParameters): Promise<void> {
  await request
    .post(`${rootURL}/scores`)
    .set('Authorization', `Bearer ${token}`)
    .send({ gameLost })
}
