import { useState } from 'react'
import type { Card } from '../../models/deck'

interface Props {
  pileNumber: number
  pileType: string
  handlePileClick: (pile: string) => void
  handleDroppedCard: (isVisible: boolean) => void
  gameLost: (isLost: boolean) => void
}

export default function Pile({
  pileNumber,
  pileType,
  handlePileClick,
  handleDroppedCard,
  gameLost,
}: Props) {
  const [faceUpCards, setFaceUpCards] = useState<Card[]>([])
  const [buttonIsVisible, setButtonIsVisible] = useState<boolean>(true)
  const [buttonIsClickable, setButtonClickable] = useState<boolean>(
    pileType === 'king' ? true : false,
  )

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const cardJSON = event.dataTransfer.getData('application/json')
    const card: Card = JSON.parse(cardJSON)
    if (
      card.value.toLowerCase() === pileType.toLowerCase() &&
      faceUpCards.length < 4
    ) {
      event.preventDefault()
      setButtonClickable(true)
      setFaceUpCards([...faceUpCards, card])
      handleDroppedCard(false)
    }
    if (pileType === 'king' && faceUpCards.length >= 3) {
      setButtonIsVisible(false)
      gameLost(true)
    }
  }

  return (
    <div
      className={`place-${pileType} circle-item`}
      id={`facedown-position-${pileNumber}oclock`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="stacked-cards">
        {buttonIsVisible && (
          <button
            className={`card-button card ${buttonIsClickable ? 'glow-blue' : 'glow-black'}`}
            onClick={() => {
              if (buttonIsClickable) {
                handlePileClick(`pile${pileNumber}`)
                if (faceUpCards.length >= 4) {
                  setButtonIsVisible(false)
                }
                setButtonClickable(false)
              }
            }}
          >
            <img
              className={`${buttonIsClickable ? 'inner-glow' : 'plain'}`}
              src="https://www.deckofcardsapi.com/static/img/back.png"
              alt="Back of a playing card with white and black patterning"
            />
          </button>
        )}

        {faceUpCards.length > 0 && (
          <>
            {faceUpCards.map((card: Card) => (
              <div key={`${card.code}`} className="card">
                <img
                  alt={`${card.value} of ${card.suit}`}
                  src={card.image}
                ></img>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
