import { Router } from 'express'
import * as doc from '../deckOfCardsApiCalls.ts'
import { DrawnCards } from '../../models/deck.ts'

const router = Router()

router.get('/new-deck', async (req, res) => {
  try {
    //Initiate deck and draw all 52 cards
    const newDeck: DrawnCards = await doc.drawCards(52)
    console.log(newDeck.cards)
    newDeck.deck_id && newDeck.cards
      ? res.status(200).json(newDeck as DrawnCards)
      : res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// router.get('/:deckId/draw-card/:pile', async (req, res) => {
//   const { deckId, pile } = req.params
//   try {
//     //Draw a card from pile
//     const drawnCards: DrawnFromPile = await doc.drawFromPile(deckId, pile)
//     //Pass the card to the front end
//     const card = drawnCards.cards[0]
//     console.log(card, deckId)
//     res.status(200).json(card)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// })

export default router
