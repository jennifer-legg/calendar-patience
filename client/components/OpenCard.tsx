import { useGetCardFromPile } from '../hooks/useDeck.ts'
import { useState } from 'react'

interface Props {
  deckId: string
  pile: string
}

export default function OpenCard({ deckId, pile }: Props) {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)

  const {
    data: card,
    isError,
    isPending,
    error,
  } = useGetCardFromPile(deckId, pile)

  if (isError) {
    return (
      <div>
        <p>Error {error && <>{error.message}</>}</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (card) {
    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
      setIsBeingDragged(true)
      event.dataTransfer.clearData()
      event.dataTransfer.setData('application/json', JSON.stringify(card))
      event.dataTransfer.effectAllowed = 'move'
    }

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
      setIsBeingDragged(false)
      event.preventDefault()
    }

    return (
      <div
        className={`draggablediv ${isBeingDragged ? 'dragging' : ''} open-card`}
        draggable="true"
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <img
          draggable="false"
          src={card.image}
          alt={`Playing card face-up, the ${card.value} of ${card.suit}`}
        />
      </div>
    )
  }
}
