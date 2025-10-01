import { useNewDeck } from '../hooks/useDeck.ts'
import OpenCard from './OpenCard.tsx'
import Pile from './Pile.tsx'
import { useState } from 'react'
import GameEndMessage from './GameEndMessage'

function ClockPatience() {
  const [isDrawn, setisDrawn] = useState<boolean>(false)
  const [currentPile, setCurrentPile] = useState<string | null>(null)
  const [gameLost, setGameLost] = useState<boolean>(false)
  const [gameEnded, setGameEnded] = useState<boolean>(false)

  const { data: deckId, isError, isPending, error, refetch } = useNewDeck()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  //Setup piles
  const clockPosition = [
    'middle',
    'deg300',
    'deg330',
    'deg0',
    'deg30',
    'deg60',
    'deg90',
    'deg120',
    'deg150',
    'deg180',
    'deg210',
    'deg240',
    'deg270',
  ]

  const handlePileClick = (pile: string) => {
    setCurrentPile(pile)
    setisDrawn(true)
  }

  const handleDroppedCard = (isVisible: boolean) => {
    setisDrawn(isVisible)
  }

  const handleResetGame = () => {
    setisDrawn(false)
    setCurrentPile(null)
    refetch()
    setGameEnded(false)
    setGameLost(false)
  }

  const handleGameLost = (isLost: boolean) => {
    setGameLost(isLost)
    setGameEnded(isLost)
  }

  return (
    <>
      <div className="app">
        <h1>Calendar Patience</h1>
        <div className="circle-container" key={deckId}>
          {clockPosition.map((item, i) => {
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
                <Pile
                  pileNumber={i}
                  deg={item}
                  pileType={pileType}
                  handlePileClick={handlePileClick}
                  handleDroppedCard={handleDroppedCard}
                  gameLost={handleGameLost}
                />
              </div>
            )
          })}
        </div>
        {isDrawn && currentPile && (
          <OpenCard deckId={deckId} pile={currentPile} key={deckId} />
        )}
        {gameEnded && (
          <GameEndMessage gameLost={gameLost} resetGame={handleResetGame} />
        )}
      </div>
    </>
  )
}

export default ClockPatience
