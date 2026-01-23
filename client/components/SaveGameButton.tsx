import { Game, GameData } from '../../models/savedGame'
import { useAddSave, useEditSave } from '../hooks/useSaveGame'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import Modal from './Modal'

interface Props {
  gameData: GameData | Game
  id?: number
  setGameId: (id: number) => void
}

//If the game is a new game (without an id) this component will save to db as new item (post)
//If the game is a previously saved game (has an id) the game will save over top (patch)
export default function SaveGameButton({ gameData, id, setGameId }: Props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [saveStatusMsg, setSaveStatusMsg] = useState<string>('')
  const [modalIsOpen, setModalOpen] = useState<boolean>(false)
  const saveGame = useAddSave()
  const editSave = useEditSave()

  const handleSave = async () => {
    if (user && user.sub) {
      try {
        const token = await getAccessTokenSilently()
        if (id) {
          const gameToSave: Game = { ...gameData, userId: user.sub, id }
          editSave.mutate({ gameToSave, token }, mutationOptions)
        } else {
          const gameToSave: GameData = { ...gameData, userId: user.sub }
          const newGameId: number = await saveGame.mutateAsync(
            {
              gameToSave,
              token,
            },
            mutationOptions,
          )
          setGameId(newGameId)
        }
      } catch (err) {
        console.log('Unable to save game')
      }
    }
  }

  const handleSetModalClose = () => {
    setModalOpen(false)
  }

  const handleMutationSuccess = () => {
    setSaveStatusMsg('Save successful')
    setModalOpen(true)
  }

  const handleError = () => {
    setSaveStatusMsg('Message unable to save. Please try again later.')
    setModalOpen(true)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }
  console.log(!isAuthenticated)

  return (
    <>
      <li>
        <button
          aria-disabled={!isAuthenticated}
          disabled={!isAuthenticated}
          onClick={handleSave}
          className="tooltip"
        >
          Save Game
          <span className="tooltip-msg">Login to save your game</span>
        </button>
      </li>
      <Modal
        content={<p>{saveStatusMsg}</p>}
        open={modalIsOpen}
        closeModal={handleSetModalClose}
        classes={['grey-bg']}
      />
    </>
  )
}
