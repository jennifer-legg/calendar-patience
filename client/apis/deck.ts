import request from 'superagent'
import type { DrawnCards } from '../../models/deck'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getNewDeck() {
  const response = await request.get(`${rootURL}/clock/new-deck`)
  return response.body as DrawnCards
}
