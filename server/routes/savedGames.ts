import { Router } from 'express'
import * as db from '../db/savedGames.ts'
import { GameData } from '../../models/savedGame.ts'

const router = Router()

router.get('/overview/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const overview = await db.getOverviewByUserId(userId)
    overview[0] ? res.json(overview) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting overview',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/game/:id', async (req, res) => {
  try {
    const { id } = req.params
    const game = await db.getSavedGame(Number(id))
    game ? res.json(game) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting saved game',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const savedGame: GameData = req.body
    const game = await db.addNewSavedGame(savedGame)
    game[0] ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new save',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const { saveId } = req.body
    console.log(saveId)
    const isDeleted = await db.deleteSavedGame(saveId)
    isDeleted ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Error deleting save')
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
