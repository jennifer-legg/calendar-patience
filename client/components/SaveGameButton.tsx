import { Game, GameData } from '../../models/savedGame'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import Modal from './Modal'
import useMutateSaveGame from '../hooks/useMutateSaveGame'

interface Props {
  gameData: GameData | Game
  id?: number
  setGameId: (id: number) => void
}

export default function SaveGameButton({ gameData, id, setGameId }: Props) {
  const { isAuthenticated } = useAuth0()
  const [saveStatusMsg, setSaveStatusMsg] = useState<string>('')
  const [modalIsOpen, setModalOpen] = useState<boolean>(false)
  const mutate = useMutateSaveGame()

  const handleSave = async () => {
    const { message, newId } = await mutate({
      mutationType: 'save',
      gameData,
      id,
    })
    if (newId) {
      setGameId(newId)
    }
    setSaveStatusMsg(message)
    setModalOpen(true)
  }

  const handleSetModalClose = () => {
    setModalOpen(false)
  }

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
