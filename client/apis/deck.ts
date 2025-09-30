import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getNewDeck() {
  const response = await request.get(`${rootURL}/deck/new-deck`)
  return response.body as string
}
