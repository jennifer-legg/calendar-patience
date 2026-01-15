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
  const [activePiles, setActivePiles] = useState<boolean[]>(
    savedGameData ? savedGameData.activePiles : Array(13).fill(true),
  )
  const [pilesSaveStatus, setPileSaveStatus] = useState<Pile[]>(
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
            buttonIsVisible: false,
            pileNumber: i,
          }
        }),
  )
  const [openCard, setOpenCard] = useState<Card | null>(
    savedGameData ? savedGameData.openCard : null,
  )
  const [currentPile, setCurrentPile] = useState<string | null>(
    savedGameData ? savedGameData.currentPile : null,
  )
  const [isHidden, setisHidden] = useState<boolean>(
    savedGameData ? savedGameData.isHidden : false,
  )
  const [gameLost, setGameLost] = useState<boolean>(
    savedGameData ? savedGameData.gameLost : false,
  )
  const [gameEnded, setGameEnded] = useState<boolean>(
    savedGameData ? savedGameData.gameEnded : false,
  )

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

  const handlePileSaveData = (pile: Pile) => {
    setPileSaveStatus(
      pilesSaveStatus.map((item: Pile, i) =>
        i === pile.pileNumber ? pile : item,
      ),
    )
  }

  const hideDroppableCard = (isHidden: boolean) => {
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
          pileData: pilesSaveStatus,
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
                  hideDroppableCard={hideDroppableCard}
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
