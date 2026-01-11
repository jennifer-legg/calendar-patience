import { GameData } from '../../models/savedGame'

interface Props {
  gameData: GameData
}

export default function SaveGameButton(gameData: Props) {
  const handleSave = () => {}

  return <button onClick={handleSave}>Save Game</button>
}
