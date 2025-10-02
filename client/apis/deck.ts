import request from 'superagent'
import type { Card, ClockPiles } from '../../models/deck'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getNewDeck() {
  const response = await request.get(`${rootURL}/clock/new-deck`)
  return response.body as ClockPiles
}

export async function drawCardFromPile(deckId: string, pile: string) {
  const response = await request.get(
    `${rootURL}/clock/${deckId}/draw-card/${pile}`,
  )
  return response.body as Card
}
