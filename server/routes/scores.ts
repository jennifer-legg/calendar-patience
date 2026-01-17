import { Router } from 'express'
import * as db from '../db/scores.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { Scores } from '../../models/scores.ts'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const scores: Scores | undefined = await db.getScoreByUserId(auth0Id)
    res.json(scores)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting overview',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const gameLost = req.body.gameLost
  console.log(req.body, req.body.gameLost)
  const auth0Id = req.auth?.sub
  if (gameLost === undefined || gameLost === null) {
    console.error('No score data provided')
    return res.status(400).send('Bad request')
  }
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const score = await db.addScores(gameLost, auth0Id)
    score[0] ? res.json(score[0]) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new save',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
