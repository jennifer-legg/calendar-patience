import Button from './Button'
import SaveGameButton from './SaveGameButton'
import ClockRules from './ClockRules'
import type { GameData, GameEndStatus } from '../../models/savedGame'
import { useState } from 'react'

interface Props {
  gameEndStatus: GameEndStatus
  setSavedGameId: (id: number) => void
  id?: number
  savedGameData: GameData
}

export default function GameOptions({
  gameEndStatus,
  setSavedGameId,
  id,
  savedGameData,
}: Props) {
  const [rulesAreVisible, setRulesVisible] = useState(false)

  const handleClick = () => {
    setRulesVisible(rulesAreVisible ? false : true)
  }

  return (
    <>
      <div className="second-nav">
        <ul className="second-nav">
          <li>
            <Button
              fn={handleClick}
              content={<>{rulesAreVisible ? 'Hide rules' : 'Show rules'}</>}
            />
          </li>
          {gameEndStatus === 'ongoing' && (
            <SaveGameButton
              gameData={savedGameData}
              {...(id && { id: id })}
              setGameId={setSavedGameId}
            />
          )}
        </ul>
      </div>
      {rulesAreVisible && <ClockRules />}
    </>
  )
}
