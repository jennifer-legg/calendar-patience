import request from 'superagent'
// import type { ShuffledDeck } from '../../models/deck'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getNewDeck() {
  const response = await request.get(`${rootURL}/deck/new-deck`)
  return response.body
}
