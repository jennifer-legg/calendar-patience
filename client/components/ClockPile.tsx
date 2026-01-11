import { useEffect, useState } from 'react'
import type { Card } from '../../models/deck'
import CardBack from './CardBack'
import CardFace from './CardFace'
import DropZone from './DropZone'
import { Pile } from '../../models/savedGame'

interface Props {
  pileNumber: number
  pileType: string
  handlePileClick: (
    pileType: string,
    pileNumber: number,
    card: Card,
    pileIsActive: boolean,
    pileData: Pile,
  ) => void
  hideDroppableCard: (isHidden: boolean) => void
  gameLost: (isLost: boolean) => void
  pileCards: Card[]
}

export default function ClockPile({
  pileNumber,
  pileType,
  handlePileClick,
  hideDroppableCard,
  gameLost,
  pileCards,
}: Props) {
  useEffect(() => {
    pileCards.forEach((card) => {
      const img = new Image()
      img.src = card.image
    })
  }, [pileCards])
  const [faceUpCards, setFaceUpCards] = useState<Card[]>([])
  const [buttonIsVisible, setButtonIsVisible] = useState<boolean>(true)
  const [buttonIsClickable, setButtonClickable] = useState<boolean>(
    pileType === 'king' ? true : false,
  )
  const [facedownCards, setFaceDownCards] = useState<Card[]>(pileCards)

  const handleUpdatePile = (card: Card) => {
    setButtonClickable(true)
    setFaceUpCards([...faceUpCards, card])
    hideDroppableCard(true)
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
      handlePileClick(
        pileType,
        pileNumber,
        currentCard,
        remainingCards.length > 0,
        {
          faceupCards: faceUpCards,
          facedownCards: facedownCards,
          buttonIsClickable: buttonIsClickable,
          buttonIsVisible: buttonIsVisible,
          pileNumber: pileNumber,
          pileType: pileType,
          pileCards: pileCards,
        },
      )
      if (faceUpCards.length >= 4 || facedownCards.length == 0) {
        setButtonIsVisible(false)
      }
      if (pileType === 'king' && faceUpCards.length == 3) {
        setButtonIsVisible(false)
      }
      setButtonClickable(false)
    }
  }

  return (
    <div
      className={`place-${pileType} circle-item`}
      id={`facedown-position-${pileNumber}oclock`}
    >
      {!buttonIsClickable && (
        <DropZone
          handleUpdatePile={handleUpdatePile}
          pileNumber={pileNumber}
          pileType={pileType}
        />
      )}
      <div className="stacked-cards">
        {buttonIsVisible && (
          <button
            className={`card-button card ${buttonIsClickable ? 'glow-blue' : 'glow-black'} rounded-corner-tiny`}
            onClick={handleButtonClick}
          >
            <CardBack imgGlows={buttonIsClickable} />
          </button>
        )}
        {facedownCards.length > 0 &&
          facedownCards.map(
            (card, index) =>
              index != 0 && (
                <div className="card" key={card.code}>
                  <CardBack imgGlows={false} />
                </div>
              ),
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
