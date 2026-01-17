import { Game, GameData } from '../../models/savedGame'
import { useAddSave, useEditSave } from '../hooks/useSaveGame'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

interface Props {
  gameData: GameData | Game
  id?: number
}

//If the game is a new game (without an id) this component will save to db as new item.
//If the game is a previously saved game (has an id) the user has an option to
//save as a new save or save over top.
//Save over top - edit/update database. New save - remove id, save to db as new item
export default function SaveGameButton({ gameData, id }: Props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [gameId, setGameId] = useState<number | null>(id ? id : null)
  const saveGame = useAddSave()
  const editSave = useEditSave()

  const handleNewSave = async () => {
    if (user && user.sub) {
      try {
        const token = await getAccessTokenSilently()
        const gameToSave: GameData | Game = { ...gameData, userId: user.sub }
        //Remove id if the game data already has an id for new save
        if ('id' in gameToSave) {
          //eslint-disable-next-line
          const { id, ...gameToSaveWithoutId } = gameToSave
          const newGameId: number = await saveGame.mutateAsync({
            gameToSave: gameToSaveWithoutId,
            token,
          })
          setGameId(newGameId)
        } else {
          const newGameId: number = await saveGame.mutateAsync({
            gameToSave,
            token,
          })
          setGameId(newGameId)
        }
      } catch (err) {
        console.log('Unable to save game')
      }
    }
  }

  const handleEdit = async () => {
    if (user && user.sub && gameId) {
      try {
        const token = await getAccessTokenSilently()
        const gameToSave: Game = { ...gameData, userId: user.sub, id: gameId }
        editSave.mutate({ gameToSave, token })
      } catch (err) {
        console.log('Unable to save game')
      }
    }
  }

  if (isAuthenticated && user && user.sub) {
    return (
      <>
        {!gameId && <button onClick={handleNewSave}>Save Game</button>}
        {/* The button below is only visible if game has already been saved (has id). 
        It removes the id and saves the game as a new game */}
        {gameId && (
          <>
            {' '}
            <button onClick={handleEdit}>Save Game</button>
            <button onClick={handleNewSave}>New Save</button>{' '}
          </>
        )}
      </>
    )
  }
}
