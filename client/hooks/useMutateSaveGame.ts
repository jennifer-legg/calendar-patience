import { useAuth0 } from '@auth0/auth0-react'
import { Game, GameData, MutationType } from '../../models/savedGame'
import { useMutateSavedGame } from './useSaveGame.ts'

interface Args {
  mutationType: MutationType
  gameData?: GameData | Game
  id?: number
}

export default function useMutateSaveGame() {
  const { editGame, deleteGame, addGame } = useMutateSavedGame()
  const { getAccessTokenSilently, user } = useAuth0()

  const handleMutation = async ({
    mutationType,
    id,
    gameData,
  }: Args): Promise<{
    message: string
    newId?: number
  }> => {
    try {
      const token: string = await getAccessTokenSilently()
      let newId: number | null = null
      const message = `${mutationType === 'save' ? `Save successful` : 'Saved game deleted sucessfully'}`
      switch (mutationType) {
        case 'save':
          if (user && user.sub && gameData) {
            newId = await handleSave(token, gameData, user.sub, id)
            if (newId) {
              return { message, newId }
            } else {
              return { message }
            }
          } else {
            return {
              message: 'Unable to save game. Please ensure you are logged in.',
            }
          }
        case 'delete':
          if (id) {
            await handleDelete(token, id)
            return { message }
          } else {
            return {
              message: 'Error. Game may already have been deleted.',
            }
          }
      }
    } catch (err) {
      return { message: 'Error. Please try again later' }
    }
  }

  //If the game is a new game (without an id) this component will save to db as new item (post)
  //If the game is a previously saved game (has an id) the game will save over top (patch)
  const handleSave = async (
    token: string,
    gameData: GameData | Game,
    userId: string,
    id?: number,
  ): Promise<number | null> => {
    if (id) {
      const gameToSave: Game = { ...gameData, userId, id }
      editGame.mutate({ gameToSave, token }, mutationOptions)
      return null
    } else {
      const gameToSave: GameData = { ...gameData, userId }
      const newGameId: number = await addGame.mutateAsync(
        {
          gameToSave,
          token,
        },
        mutationOptions,
      )
      return newGameId
    }
  }

  const handleDelete = async (token: string, id: number): Promise<void> => {
    deleteGame.mutate({
      saveId: id,
      token,
    })
  }

  const handleMutationError = () => {
    throw new Error('Unable to complete request.')
  }

  const mutationOptions = {
    onError: handleMutationError,
  }

  return handleMutation
}
