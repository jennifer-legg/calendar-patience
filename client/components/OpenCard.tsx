import { Card } from '../../models/deck.ts'
import { useState } from 'react'

interface Props {
  openCard: Card
}

export default function OpenCard({ openCard }: Props) {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setIsBeingDragged(true)
    event.dataTransfer.clearData()
    event.dataTransfer.setData('application/json', JSON.stringify(openCard))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsBeingDragged(false)
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
        src={openCard.image}
        alt={`Playing card face-up, the ${openCard.value} of ${openCard.suit}`}
      />
    </div>
  )
}
