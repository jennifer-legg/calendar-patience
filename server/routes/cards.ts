import { Router } from 'express'
import * as doc from '../deckOfCardsApiCalls.ts'
import { Card } from '../../models/deck.ts'

const router = Router()

router.get('/new-deck', async (req, res) => {
  try {
    //Initiate deck and draw 4 cards
    const newDeck = await doc.drawCards(52)
    //Get new deck id
    const deckId: string = newDeck.body.deck_id
    const cards: string[] = newDeck.body.cards.map((card: Card) => card.code)
    const responseArr = new Array(13)
    //create a pile with 4 cards
    for (let i = 0; i < responseArr.length; i++) {
      responseArr[i] = await doc.addToPile(deckId, `pile${i}`, [
        cards[0 + i * 4],
        cards[1 + i * 4],
        cards[2 + i * 4],
        cards[3 + i * 4],
      ])
      if (i === 12) {
        console.log(responseArr[i].body.piles)
      }
    }
    deckId
      ? res.status(200).json(deckId)
      : res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
