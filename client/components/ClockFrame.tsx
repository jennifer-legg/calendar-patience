import { useState } from 'react'
import ClockRules from './ClockRules.tsx'
import { useParams } from 'react-router'
import NewGame from './NewGame.tsx'
import SavedGame from './SavedGame.tsx'

export default function ClockFrame() {
  const [rulesAreVisible, setRulesVisible] = useState(false)
  const { gameStatus } = useParams()

  const handleClick = () => {
    setRulesVisible(rulesAreVisible ? false : true)
  }

  if (!gameStatus) {
    return <p>Error loading game</p>
  }

  return (
    <main>
      <button onClick={handleClick}>
        {rulesAreVisible ? `Hide the rules` : `Show the rules`}
      </button>
      {rulesAreVisible && <ClockRules />}
      {gameStatus === 'newGame' && <NewGame />}
      {gameStatus === 'saved' && <SavedGame />}
    </main>
  )
}
