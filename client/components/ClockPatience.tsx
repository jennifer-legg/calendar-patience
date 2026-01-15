import DraggableCard from './DraggableCard.tsx'
import ClockPile from './ClockPile.tsx'
import GameEndMessage from './GameEndMessage'
import { useState } from 'react'
import type { Card } from '../../models/deck.ts'
import { Game, Pile } from '../../models/savedGame.ts'
import SaveGameButton from './SaveGameButton.tsx'
import { useNavigate } from 'react-router'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck?: () => void
  savedGameData?: Game
}

export default function ClockPatience({
  deckId,
  refreshDeck,
  clockPiles,
  savedGameData,
}: Props) {
  const navigate = useNavigate()
  //activePiles tracks which of the piles still have cards, used to check if game won/lost
  const [activePiles, setActivePiles] = useState<boolean[]>(
    savedGameData ? savedGameData.activePiles : Array(13).fill(true),
  )
  //pileData status keeps track of all of the piles in order to save the game
  const [pileData, setPileData] = useState<Pile[]>(
    savedGameData
      ? savedGameData.pileData
      : clockPiles.map((pile, i) => {
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
          return {
            pileType,
            pileCards: pile,
            facedownCards: pile,
            faceupCards: [],
            buttonIsClickable: pileType === 'king',
            buttonIsVisible: true,
            pileNumber: i,
          }
        }),
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
  const [gameLost, setGameLost] = useState<boolean>(
    savedGameData ? savedGameData.gameLost : false,
  )
  const [gameEnded, setGameEnded] = useState<boolean>(
    savedGameData ? savedGameData.gameEnded : false,
  )

  console.log(savedGameData?.isHidden)

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

  const handleResetGame = () => {
    setisHidden(true)
    setGameEnded(false)
    setGameLost(false)
    setActivePiles(Array(13).fill(true))
    refreshDeck ? refreshDeck() : navigate('/new')
  }

  const handleGameLost = (isLost: boolean) => {
    setGameLost(isLost)
    setGameEnded(true)
  }

  //Game is ended if all piles are inactive except for the king pile
  const checkIfGameWon = (pileNumber: number) => {
    const indexes: number[] = []
    activePiles.forEach((value, i) => {
      if (value === true) {
        indexes.push(i)
      }
    })
    indexes.filter((num) => num != 0 && num != pileNumber).length === 0
      ? setGameEnded(true)
      : null
  }

  return (
    <>
      <SaveGameButton
        gameData={{
          openCard,
          currentPile,
          isHidden,
          gameLost,
          gameEnded,
          gameName: 'clock',
          activePiles,
          userId: '1',
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
                  gameLost={handleGameLost}
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
          {gameEnded && (
            <GameEndMessage gameLost={gameLost} resetGame={handleResetGame} />
          )}
        </div>
      </div>
    </>
  )
}
