import DraggableCard from './DraggableCard.tsx'
import ClockPile from './ClockPile.tsx'
import GameEndMessage from './GameEndMessage'
import { useState } from 'react'
import type { Card } from '../../models/deck.ts'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck: () => void
}

export default function ClockPatience({
  deckId,
  refreshDeck,
  clockPiles,
}: Props) {
  const [activePiles, setActivePiles] = useState<boolean[]>(
    Array(13).fill(true),
  )
  const [openCard, setOpenCard] = useState<Card | null>(null)
  const [currentPile, setCurrentPile] = useState<string | null>(null)
  const [isHidden, setisHidden] = useState<boolean>(false)
  const [gameLost, setGameLost] = useState<boolean>(false)
  const [gameEnded, setGameEnded] = useState<boolean>(false)

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

  const hideDroppableCard = (isHidden: boolean) => {
    setisHidden(isHidden)
  }

  const handleResetGame = () => {
    setisHidden(true)
    refreshDeck()
    setGameEnded(false)
    setGameLost(false)
    setActivePiles(Array(13).fill(true))
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
              />
            </div>
          )
        })}
        {!isHidden && openCard && currentPile && (
          <DraggableCard openCard={openCard} pileType={currentPile} />
        )}
      </div>
      {gameEnded && (
        <GameEndMessage gameLost={gameLost} resetGame={handleResetGame} />
      )}
    </div>
  )
}
