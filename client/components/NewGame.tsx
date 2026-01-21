import ClockFrame from '../pages/ClockFrame.tsx'
import { useNewDeck } from '../hooks/useDeck.ts'
import { Card } from '../../models/deck.ts'

//Retrieves a new deck from the Deck of Cards API to create the piles for a new game
export default function NewGame() {
  const { data, isError, isPending, error, refetch, isFetching } = useNewDeck()
  if (isPending || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  const deckId: string = data.deck_id

  const cards: Card[] = [...data.cards]
  //create 13 piles with 4 cards each
  const clockPiles: Card[][] = new Array(13)
  for (let i = 0; i < clockPiles.length; i++) {
    clockPiles[i] = [
      cards[0 + i * 4],
      cards[1 + i * 4],
      cards[2 + i * 4],
      cards[3 + i * 4],
    ]
  }

  const refreshDeck = () => {
    refetch()
  }

  return (
    <ClockFrame
      deckId={deckId}
      refreshDeck={refreshDeck}
      clockPiles={clockPiles}
    />
  )
}
