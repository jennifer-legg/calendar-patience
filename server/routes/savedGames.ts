import { Router } from 'express'
import * as db from '../db/savedGames.ts'
import { GameData } from '../../models/savedGame.ts'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const savedGame: GameData = req.body
    console.log(savedGame)
    const game = await db.addNewSavedGame(savedGame)
    game[0] ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new user',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
