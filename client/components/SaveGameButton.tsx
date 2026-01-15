import { Game, GameData } from '../../models/savedGame'
import { useAddSave } from '../hooks/useSaveGame'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  gameData: GameData | Game
}

export default function SaveGameButton({ gameData }: Props) {
  const { user, isAuthenticated } = useAuth0()
  const saveGame = useAddSave()

  const handleSave = () => {
    if (user && user.sub) {
      saveGame.mutate({ ...gameData, userId: user.sub })
    }
  }

  if (isAuthenticated && user && user.sub) {
    return <button onClick={handleSave}>Save Game</button>
  }
}
