import ClockPatience from './ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'
import { useState } from 'react'
import ClockRules from './ClockRules.tsx'
import { Game } from '../../models/savedGame.ts'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck?: () => void
  savedGameData?: Game
}

//Component controls whether the rules of the game are visible or hidden
//and displays the game, whether new or saved
export default function ClockFrame({
  deckId,
  clockPiles,
  refreshDeck,
  savedGameData,
}: Props) {
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
        savedGameData={savedGameData}
      />
    </main>
  )
}
