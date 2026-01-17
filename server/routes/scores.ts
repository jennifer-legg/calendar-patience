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

export default router
