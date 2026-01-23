import DraggableCard from './DraggableCard.tsx'
import ClockPile from './ClockPile.tsx'
import Modal from './Modal.tsx'
import GameOptions from './GameOptions.tsx'
import GameEndMessage from './GameEndMessage'
import { useState } from 'react'
import type { Card } from '../../models/deck.ts'
import { Game, Pile, GameEndStatus } from '../../models/savedGame.ts'
import { useNavigate } from 'react-router'
import { useAddScores } from '../hooks/useScores.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { createBeginningPileData } from '../helpers/util.ts'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck?: () => void
  savedGameData?: Game
  handleDeleteSave: (id: number) => void
}

export default function ClockPatience({
  deckId,
  refreshDeck,
  clockPiles,
  savedGameData,
  handleDeleteSave,
}: Props) {
  const navigate = useNavigate()
  const addScore = useAddScores()
  const { getAccessTokenSilently } = useAuth0()
  //activePiles tracks which of the piles still have cards, used to check if game won/lost
  const [activePiles, setActivePiles] = useState<boolean[]>(
    savedGameData ? savedGameData.activePiles : Array(13).fill(true),
  )
  //pileData status keeps track of all of the piles in order to save the game
  const [pileData, setPileData] = useState<Pile[]>(
    savedGameData
      ? savedGameData.pileData
      : createBeginningPileData(clockPiles),
  )
  const [savedGameId, setSavedGameId] = useState<number | null>(
    savedGameData ? savedGameData.id : null,
  )
  //Selected card. Hidden when no card upturned
  const [openCard, setOpenCard] = useState<Card | null>(
    savedGameData ? savedGameData.openCard : null,
  )
  //Sets which pile is being interacted with
  const [currentPile, setCurrentPile] = useState<string | null>(
    savedGameData ? savedGameData.currentPile : null,
  )
  //Sets whether the openCard is hidden
  const [isHidden, setisHidden] = useState<boolean>(
    savedGameData ? savedGameData.isHidden : false,
  )
  const [gameEndStatus, setGameEndStatus] = useState<GameEndStatus>('ongoing')
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  //Pile component calls this when the pile is clicked
  const handlePileClick = (
    pileType: string,
    pileNumber: number,
    card: Card,
    pileIsActive: boolean,
  ) => {
    setCurrentPile(pileType)
    setOpenCard(card)
    setisHidden(false)
    if (!pileIsActive) {
      checkIfGameWon(pileNumber)
      setActivePiles(
        activePiles.map((currentValue, i) =>
          i === pileNumber ? false : currentValue,
        ),
      )
    }
  }

  //Pile component calls this to update status with pile data for saves
  const handlePileSaveData = (updatedPile: Pile) => {
    setPileData(
      pileData.map((item: Pile, i) =>
        i === updatedPile.pileNumber ? updatedPile : item,
      ),
    )
  }

  //When card is 'dropped', pile component calls this to update status and hide open card
  const hideOpenCard = (isHidden: boolean) => {
    setisHidden(isHidden)
  }

  //Saves whether game is won or lost to database
  const handleAddScores = async (status: GameEndStatus) => {
    try {
      const token = await getAccessTokenSilently()
      addScore.mutate({ token, status: status })
    } catch (err) {
      console.log('Error saving score')
    }
  }

  const handleResetGame = () => {
    setisHidden(true)
    setGameEndStatus('ongoing')
    setActivePiles(Array(13).fill(true))
    refreshDeck ? refreshDeck() : navigate('/new')
  }

  const handleGameLost = () => {
    setGameEndStatus('lost')
    handleAddScores('lost')
    setModalOpen(true)
    if (savedGameId) {
      handleDeleteSave(savedGameId)
    }
  }

  //Game is won if all piles are inactive except for the king pile
  const checkIfGameWon = (pileNumber: number) => {
    const indexes: number[] = []
    activePiles.forEach((value, i) => {
      if (value === true) {
        indexes.push(i)
      }
    })
    //If true, game is won
    if (indexes.filter((num) => num != 0 && num != pileNumber).length === 0) {
      setGameEndStatus('won')
      handleAddScores('won')
      setModalOpen(true)
      if (savedGameId) {
        handleDeleteSave(savedGameId)
      }
    }
  }

  const handleSetSavedGameId = (id: number) => {
    setSavedGameId(id)
    console.log('id set')
  }

  return (
    <>
      <GameOptions
        gameEndStatus={gameEndStatus}
        setSavedGameId={handleSetSavedGameId}
        {...(savedGameId && { id: savedGameId })}
        savedGameData={{
          openCard,
          currentPile,
          isHidden,
          activePiles,
          userId: 'empty',
          pileData,
        }}
      />
      <div>
        <div className="circle-container" key={deckId}>
          {clockPiles.map((pileCards: Card[], i) => {
            const pileType: string =
              i === 0
                ? 'king'
                : i === 1
                  ? 'ace'
                  : i === 11
                    ? 'jack'
                    : i === 12
                      ? 'queen'
                      : `${i}`
            return (
              <div key={`pile${i}-${deckId}`}>
                <ClockPile
                  pileNumber={i}
                  pileType={pileType}
                  handlePileClick={handlePileClick}
                  hideOpenCard={hideOpenCard}
                  updateGameLost={handleGameLost}
                  pileCards={pileCards}
                  savedPileData={savedGameData?.pileData[i]}
                  savePile={handlePileSaveData}
                />
              </div>
            )
          })}
          {!isHidden && openCard && currentPile && (
            <DraggableCard openCard={openCard} pileType={currentPile} />
          )}

          <Modal
            open={modalOpen}
            classes={[
              'alert-message',
              `${gameEndStatus === 'won' ? 'green-bg' : 'grey-bg'}`,
            ]}
            button1={{ function: handleResetGame, text: 'New game' }}
            button2={{ function: () => navigate('/'), text: 'Main menu' }}
            closeModal={() => setModalOpen(false)}
            content={<GameEndMessage gameEndStatus={gameEndStatus} />}
          />
        </div>
      </div>
    </>
  )
}
