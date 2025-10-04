import { useState } from 'react'
import type { Card } from '../../models/deck'
import CardBack from './CardBack'
import CardFace from './CardFace'

interface Props {
  pileNumber: number
  pileType: string
  handlePileClick: (
    pileNumber: number,
    card: Card,
    pileIsActive: boolean,
  ) => void
  hideOpenCard: (isHidden: boolean) => void
  gameLost: (isLost: boolean) => void
  pileCards: Card[]
}

export default function ClockPile({
  pileNumber,
  pileType,
  handlePileClick,
  hideOpenCard,
  gameLost,
  pileCards,
}: Props) {
  const [faceUpCards, setFaceUpCards] = useState<Card[]>([])
  const [buttonIsVisible, setButtonIsVisible] = useState<boolean>(true)
  const [buttonIsClickable, setButtonClickable] = useState<boolean>(
    pileType === 'king' ? true : false,
  )
  const [facedownCards, setFaceDownCards] = useState<Card[]>(
    pileCards.map((card: Card) => {
      return { ...card }
    }),
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
      hideOpenCard(true)
    }
    if (pileType === 'king' && faceUpCards.length >= 3) {
      setButtonIsVisible(false)
      gameLost(true)
    }
  }

  const handleButtonClick = () => {
    if (buttonIsClickable && facedownCards.length > 0) {
      const currentCard: Card = { ...facedownCards[0] }
      const remainingCards = [...facedownCards.slice(1)]
      setFaceDownCards(remainingCards)
      handlePileClick(pileNumber, currentCard, remainingCards.length > 0)
      if (faceUpCards.length >= 4 || facedownCards.length == 0) {
        setButtonIsVisible(false)
      }
      setButtonClickable(false)
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
            onClick={handleButtonClick}
          >
            <CardBack imgGlows={buttonIsClickable} />
          </button>
        )}
        {faceUpCards.length > 0 && (
          <>
            {faceUpCards.map((card: Card) => (
              <CardFace key={`${card.code}`} card={card} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
