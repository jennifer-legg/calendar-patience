import { Router } from 'express'
import * as doc from '../deckOfCardsApiCalls.ts'
import { Card, PileData, DrawnFromPile, DrawnCards } from '../../models/deck.ts'

const router = Router()

router.get('/new-deck', async (req, res) => {
  try {
    //Initiate deck and draw all 52 cards
    const newDeck: DrawnCards = await doc.drawCards(52)
    console.log(newDeck)
    //Get new deck id
    const deckId: string = newDeck.deck_id
    const cards: string[] = newDeck.cards.map((card: Card) => card.code)
    const responseArr: PileData[] = new Array(13)
    //create 13 piles with 4 cards each
    for (let i = 0; i < responseArr.length; i++) {
      responseArr[i] = await doc.addToPile(deckId, `pile${i}`, [
        cards[0 + i * 4],
        cards[1 + i * 4],
        cards[2 + i * 4],
        cards[3 + i * 4],
      ])
    }
    deckId
      ? res.status(200).json(deckId)
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
