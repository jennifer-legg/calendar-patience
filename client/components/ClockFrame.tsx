import { useNewDeck } from '../hooks/useDeck.ts'
import ClockPatience from './ClockPatience.tsx'

export default function ClockFrame() {
  const {
    data: deckId,
    isError,
    isPending,
    error,
    refetch,
    isFetching,
  } = useNewDeck()

  if (isPending || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  const refreshDeck = () => {
    refetch()
  }

  return (
    <div>
      <h1>Calendar Patience</h1>
      <ClockPatience deckId={deckId} refreshDeck={refreshDeck} />
    </div>
  )
}
