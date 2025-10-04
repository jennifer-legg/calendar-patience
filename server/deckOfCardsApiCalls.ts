import request from 'superagent'
import type { Deck, DrawnCards, DrawnFromPile, PileData } from '../models/deck'

// Shuffle new deck. Add deck_count to define the number of Decks you want to use.
// The default is 1. Returns type Deck
export async function shuffleNewDeck() {
  const response = await request.get(
    'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
  )
  return response.body as Deck
}

// Draw cards. The count variable defines how many cards to draw from the deck.
// After two weeks, if no actions have been made on the deck then we throw the deckid away.
// Use 'new' instead of a deckid to create a new shuffled deck and draw cards at the same time.
// Returns type DrawnCards
export async function drawCards(numCards: number, deckId: string = 'new') {
  const response = await request.get(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`,
  )
  return response.body as DrawnCards
}

// Reshuffle the current deck.
// If allCards is true, shuffle all cards including those in the piles or drawn cards.
// If allCards is not true, only shuffle the cards in the main stack.
// Returns type Deck
export async function shuffleCards(deckId: string, allCards: boolean) {
  const response =
    allCards === true
      ? await request.get(
          `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`,
        )
      : await request.get(
          `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining:true`,
        )
  return response.body as Deck
}

// Adding to piles. Does not work with multiple decks.
// Piles can be used for discarding, players hands, or whatever else.
// Piles are created on the fly, just give a pile a name and add a drawn card to the pile.
// If the pile didn't exist before, it does now.
// After a card has been drawn from the deck it can be moved from pile to pile.
// Cards parameter can be multiple cards separated by a comma eg "AS,2S"
// Returns type PileData.
export async function addToPile(deckId: string, pile: string, cards: string[]) {
  const response = await request.get(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/add/?cards=${cards.join()}`,
  )
  return response.body as PileData
}

// Shuffle pile. Does not work with multiple decks.
// Returns type PileData
export async function shufflePile(deckId: string, pile: string) {
  const response = await request.get(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/shuffle/`,
  )
  return response.body as PileData
}

//List cards in a pile. Will not work on multiple decks. Returns type PileData
export async function listCardsInPile(deckId: string, pile: string) {
  const response = await request.get(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/list/`,
  )
  return response.body as PileData
}

// Drawing from piles.
// Specify the cards that you want to draw from the pile.
// The default is to just draw off the top of the pile (it's a stack).
// details parameter should be a string of the end of the url.
// ?count:2
// bottom/?cards:3S
// random/?count:2
// Add /bottom/ to the URL to draw from the bottom or /random/ to draw random cards
// both of these also accept the count parameter.
// Returns type DrawnFromPile. See https://www.deckofcardsapi.com/ to check what detail string should be.
export async function drawFromPile(
  deckId: string,
  pile: string,
  details: string | null = null,
) {
  const response = details
    ? await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/draw/${details}/`,
      )
    : await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/draw/`,
      )
  return response.body as DrawnFromPile
}

// Returning drawn cards to the deck.
// Use this call to return cards which have been drawn back to the main deck to re-use.
// Can take the cards parameter for a list of specific cards to return or return all if left blank
// Returns type PileData
export async function returnDrawnCardsToDeck(deckId: string, cards: string[]) {
  const response = cards[0]
    ? await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/return/?${cards}`,
      )
    : await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/return/`,
      )
  return response.body as PileData
}

// Return cards to main deck from a pile
// Can take the cards parameter for a list of cards to return if valid
// Returns type PileData
export async function returnCardsFromPileToDeck(
  deckId: string,
  cards: string[],
  pile: string,
) {
  const response = cards[0]
    ? await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/return/?cards=${cards}`,
      )
    : await request.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/return/`,
      )
  return response.body as PileData
}
