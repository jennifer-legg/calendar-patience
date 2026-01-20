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
  ) => void
  hideOpenCard: (isHidden: boolean) => void
  updateGameLost: () => void
  pileCards: Card[]
  savedPileData: Pile | undefined
  savePile: (updatedPile: Pile) => void
}

export default function ClockPile({
  pileNumber,
  pileType,
  handlePileClick,
  hideOpenCard,
  updateGameLost,
  pileCards,
  savedPileData,
  savePile,
}: Props) {
  useEffect(() => {
    pileCards.forEach((card) => {
      const img = new Image()
      img.src = card.image
    })
  }, [pileCards])
  const [faceupCards, setFaceUpCards] = useState<Card[]>(
    savedPileData ? savedPileData.faceupCards : [],
  )
  const [buttonIsVisible, setButtonIsVisible] = useState<boolean>(
    savedPileData ? savedPileData.buttonIsVisible : true,
  )
  const [buttonIsClickable, setButtonClickable] = useState<boolean>(
    savedPileData
      ? savedPileData.buttonIsClickable
      : pileType === 'king'
        ? true
        : false,
  )
  const [facedownCards, setFaceDownCards] = useState<Card[]>(
    savedPileData ? savedPileData.facedownCards : pileCards,
  )

  const handleUpdatePile = (card: Card) => {
    setButtonClickable(true)
    setFaceUpCards([...faceupCards, card])
    hideOpenCard(true)
    if (pileType === 'king' && faceupCards.length >= 3) {
      setButtonIsVisible(false)
      updateGameLost()
    }
    savePile({
      faceupCards: [...faceupCards, card],
      facedownCards,
      buttonIsClickable: true,
      buttonIsVisible:
        pileType === 'king' && faceupCards.length >= 3 ? false : true,
      pileNumber,
      pileType,
      pileCards,
    })
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
      )
      if (faceupCards.length >= 4 || facedownCards.length == 0) {
        setButtonIsVisible(false)
      }
      if (pileType === 'king' && faceupCards.length == 3) {
        setButtonIsVisible(false)
      }
      setButtonClickable(false)
      savePile({
        faceupCards,
        facedownCards: remainingCards,
        buttonIsClickable: false,
        buttonIsVisible:
          faceupCards.length >= 4 ||
          facedownCards.length == 0 ||
          (pileType === 'king' && faceupCards.length == 3)
            ? false
            : true,
        pileNumber,
        pileType,
        pileCards,
      })
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
        {faceupCards.length > 0 && (
          <>
            {faceupCards.map((card: Card) => (
              <CardFace key={`${card.code}`} card={card} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
