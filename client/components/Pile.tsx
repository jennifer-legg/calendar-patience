import { useState } from 'react'
import type { Card } from '../../models/deck'

interface Props {
  pileNumber: number
  deckId: string
  deg: string
  pileType: string
  handlePileClick: (pile: string) => void
  handleDroppedCard: (isVisible: boolean) => void
}

export default function Pile({
  pileNumber,
  deg,
  pileType,
  handlePileClick,
  handleDroppedCard,
}: Props) {
  const [isHighlighted, setHighlight] = useState<boolean>(false)
  const [faceUpCards, setFaceUpCards] = useState<Card[]>([])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setHighlight(true)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    //Play a sound is suggested - could leave blank
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setHighlight(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const cardJSON = event.dataTransfer.getData('application/json')
    const card: Card = JSON.parse(cardJSON)
    console.log(card)
    //Check if card is of correct value for pile.
    //If yes, add it to the pile. If not, don't accept it.
    if (
      card.value.toLowerCase() === pileType.toLowerCase() &&
      faceUpCards.length < 4
    ) {
      event.preventDefault()
      setFaceUpCards([...faceUpCards, card])
      console.log(card, faceUpCards)
      handleDroppedCard(false)
    }
    setHighlight(false)
  }

  return (
    <div
      className={`${deg} circle-item ${isHighlighted ? 'highlight' : 'no-highlight'}`}
      id={`facedown-position-${pileNumber}oclock`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{pileType} </p>
      <div className="stacked-cards">
        {faceUpCards.length > 0 && (
          <div className="card">
            {faceUpCards.map((card: Card) => (
              <img
                key={`${card.code}`}
                alt={`${card.value} of ${card.suit}`}
                src={card.image}
              ></img>
            ))}
          </div>
        )}
        <button
          className="card-container"
          onClick={() => handlePileClick(`pile${pileNumber}`)}
        >
          <img
            src="https://www.deckofcardsapi.com/static/img/back.png"
            alt="Back of a playing card with white and black patterning"
          />
        </button>
      </div>
    </div>
  )
}
