import { useNewDeck } from '../hooks/useDeck.ts'
import ClockPatience from './ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'
import { useState } from 'react'
import ClockRules from './ClockRules.tsx'

export default function ClockFrame() {
  const { data, isError, isPending, error, refetch, isFetching } = useNewDeck()
  const [rulesAreVisible, setRulesVisible] = useState(false)

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

  const handleClick = () => {
    setRulesVisible(rulesAreVisible ? false : true)
  }

  return (
    <main>
      <button onClick={handleClick}>
        {rulesAreVisible ? `Hide the rules` : `Show the rules`}
      </button>
      {rulesAreVisible && <ClockRules />}
      <ClockPatience
        deckId={deckId}
        refreshDeck={refreshDeck}
        clockPiles={clockPiles}
      />
    </main>
  )
}
