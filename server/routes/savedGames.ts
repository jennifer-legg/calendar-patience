import { Router } from 'express'
import * as db from '../db/savedGames.ts'
import { GameData, Game } from '../../models/savedGame.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/overview', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const overview = await db.getOverviewByUserId(auth0Id)
    res.json(overview)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting overview',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/game/:id', checkJwt, async (req: JwtRequest, res) => {
  const { id } = req.params
  const auth0Id = req.auth?.sub
  if (!id) {
    console.error('No game id provided')
    return res.status(400).send('Bad request')
  }
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const game = await db.getSavedGame(Number(id))
    game ? res.json(game) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting saved game',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const savedGame: GameData = req.body
  const auth0Id = req.auth?.sub
  if (!savedGame) {
    console.error('No game data provided to save')
    return res.status(400).send('Bad request')
  }
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const game = await db.addNewSavedGame(savedGame)
    game[0] ? res.json(game[0]) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new save',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  const savedGame: Game = req.body
  const auth0Id = req.auth?.sub
  if (!savedGame) {
    console.error('No game provided to save')
    return res.status(400).send('Bad request')
  }
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const game = await db.editSavedGame(savedGame)
    game[0] ? res.json(game[0]) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new save',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', checkJwt, async (req: JwtRequest, res) => {
  const { saveId } = req.body
  const auth0Id = req.auth?.sub
  if (!saveId) {
    console.error('No game save id provided')
    return res.status(400).send('Bad request')
  }
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    const isDeleted = await db.deleteSavedGame(saveId)
    isDeleted ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Error deleting save')
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
