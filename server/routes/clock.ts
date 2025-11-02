import { Router } from 'express'
import * as doc from '../deckOfCardsApiCalls.ts'
import { DrawnCards } from '../../models/deck.ts'

const router = Router()

router.get('/new-deck', async (req, res) => {
  try {
    //Initiate deck and draw all 52 cards
    const newDeck: DrawnCards = await doc.drawCards(52)
    newDeck.deck_id && newDeck.cards
      ? res.status(200).json(newDeck as DrawnCards)
      : res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
