import Button from './Button'
import SaveGameButton from './SaveGameButton'
import type { GameData, GameEndStatus } from '../../models/savedGame'

interface Props {
  setRulesVisible: () => void
  rulesAreVisible: boolean
  gameEndStatus: GameEndStatus
  setSavedGameId: (id: number) => void
  savedGameId?: number
  savedGameData: GameData
}

export default function GameOptions({
  setRulesVisible,
  rulesAreVisible,
  gameEndStatus,
  setSavedGameId,
  savedGameId,
  savedGameData,
}: Props) {
  return (
    <div className="side-nav">
      <ul>
        <li>
          <Button
            fn={setRulesVisible}
            content={<>{rulesAreVisible ? 'Hide rules' : 'Show rules'}</>}
          />
        </li>
        <li>
          {gameEndStatus === 'ongoing' && (
            <SaveGameButton
              gameData={savedGameData}
              {...(savedGameId && { id: savedGameId })}
              setGameId={setSavedGameId}
            />
          )}
        </li>
      </ul>
    </div>
  )
}
