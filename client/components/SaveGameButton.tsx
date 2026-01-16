import { Game, GameData } from '../../models/savedGame'
import { useAddSave } from '../hooks/useSaveGame'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  gameData: GameData | Game
}

export default function SaveGameButton({ gameData }: Props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const saveGame = useAddSave()

  const handleSave = async () => {
    if (user && user.sub) {
      try {
        const token = await getAccessTokenSilently()
        const gameToSave: GameData | Game = { ...gameData, userId: user.sub }
        saveGame.mutate({ gameToSave, token })
      } catch (err) {
        console.log('Unable to save game')
      }
    }
  }

  if (isAuthenticated && user && user.sub) {
    return <button onClick={handleSave}>Save Game</button>
  }
}
