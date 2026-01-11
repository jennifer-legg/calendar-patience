import ClockPatience from './ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'
import { useState } from 'react'
import ClockRules from './ClockRules.tsx'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck: () => void
}

export default function ClockFrame({ deckId, clockPiles, refreshDeck }: Props) {
  const [rulesAreVisible, setRulesVisible] = useState(false)

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
