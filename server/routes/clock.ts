import { Router } from 'express'
import * as doc from '../deckOfCardsApiCalls.ts'
import {
  Card,
  DrawnFromPile,
  DrawnCards,
  ClockPiles,
} from '../../models/deck.ts'

const router = Router()

router.get('/new-deck', async (req, res) => {
  try {
    //Initiate deck and draw all 52 cards
    const newDeck: DrawnCards = await doc.drawCards(52)
    //Get new deck id
    const deckId: string = newDeck.deck_id
    const cards: Card[] = [...newDeck.cards]
    const piles: Card[][] = new Array(13)
    //create 13 piles with 4 cards each
    for (let i = 0; i < piles.length; i++) {
      piles[i] = [
        cards[0 + i * 4],
        cards[1 + i * 4],
        cards[2 + i * 4],
        cards[3 + i * 4],
      ]
    }
    console.log(piles)
    deckId
      ? res
          .status(200)
          .json({ deckId: deckId, clockPiles: piles } as ClockPiles)
      : res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:deckId/draw-card/:pile', async (req, res) => {
  const { deckId, pile } = req.params
  try {
    //Draw a card from pile
    const drawnCards: DrawnFromPile = await doc.drawFromPile(deckId, pile)
    //Pass the card to the front end
    const card = drawnCards.cards[0]
    console.log(card, deckId)
    res.status(200).json(card)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
