import { Game, GameData } from '../../models/savedGame'
import { useAddSave } from '../hooks/useSaveGame'

interface Props {
  gameData: GameData | Game
}

export default function SaveGameButton({ gameData }: Props) {
  const saveGame = useAddSave()
  const handleSave = () => {
    saveGame.mutate(gameData)
  }

  return <button onClick={handleSave}>Save Game</button>
}
