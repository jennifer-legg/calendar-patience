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
  const [isHidden, setisHidden] = useState<boolean>(false)
  const [gameLost, setGameLost] = useState<boolean>(false)
  const [gameEnded, setGameEnded] = useState<boolean>(false)
  const [openCard, setOpenCard] = useState<Card | null>(null)

  const handlePileClick = (
    pileNumber: number,
    card: Card,
    pileIsActive: boolean,
  ) => {
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

  const hideOpenCard = (isHidden: boolean) => {
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
    //Get indexes of all active piles
    activePiles.forEach((value, i) => {
      if (value === true) {
        indexes.push(i)
      }
    })
    //Remove indexes that match the king's pile (0) and the current pile
    //Remove current pile index because state hasn't updated yet to show it is inactive
    const filteredIndexes = indexes.filter(
      (num) => num != 0 && num != pileNumber,
    )
    if (filteredIndexes.length == 0) {
      setGameEnded(true)
    }
  }

  return (
    <div>
      <div className="circle-container" key={deckId}>
        {clockPiles.map((pileCards: Card[], i) => {
          let pileType: string = ''
          switch (i) {
            case 0:
              pileType = 'king'
              break
            case 1:
              pileType = 'ace'
              break
            case 11:
              pileType = 'jack'
              break
            case 12:
              pileType = 'queen'
              break
            default:
              pileType = `${i}`
          }
          return (
            <div key={`pile${i}-${deckId}`}>
              <ClockPile
                pileNumber={i}
                pileType={pileType}
                handlePileClick={handlePileClick}
                hideOpenCard={hideOpenCard}
                gameLost={handleGameLost}
                pileCards={pileCards}
              />
            </div>
          )
        })}
      </div>
      {!isHidden && openCard && <DraggableCard openCard={openCard} />}
      {gameEnded && (
        <GameEndMessage gameLost={gameLost} resetGame={handleResetGame} />
      )}
    </div>
  )
}
