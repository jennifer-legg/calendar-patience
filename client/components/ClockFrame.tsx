import { useState } from 'react'
import ClockRules from './ClockRules.tsx'
import { useParams } from 'react-router'
import NewGame from './NewGame.tsx'

export default function ClockFrame() {
  const [rulesAreVisible, setRulesVisible] = useState(false)
  const { type } = useParams()
  console.log(type)

  const handleClick = () => {
    setRulesVisible(rulesAreVisible ? false : true)
  }

  if (!type) {
    return <p>Error loading game</p>
  }

  return (
    <main>
      <button onClick={handleClick}>
        {rulesAreVisible ? `Hide the rules` : `Show the rules`}
      </button>
      {rulesAreVisible && <ClockRules />}
      {type === 'newGame' && <NewGame />}
    </main>
  )
}
