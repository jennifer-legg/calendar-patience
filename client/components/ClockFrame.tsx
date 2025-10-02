import { useNewDeck } from '../hooks/useDeck.ts'
import ClockPatience from './ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'

export default function ClockFrame() {
  const { data, isError, isPending, error, refetch, isFetching } = useNewDeck()

  if (isPending || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  const deckId: string = data.deckId
  const clockPiles: Card[][] = data.clockPiles

  console.log(deckId, clockPiles)

  const refreshDeck = () => {
    refetch()
  }

  return (
    <div>
      <h1>Calendar Patience</h1>
      <ClockPatience
        deckId={deckId}
        refreshDeck={refreshDeck}
        clockPiles={clockPiles}
      />
    </div>
  )
}
