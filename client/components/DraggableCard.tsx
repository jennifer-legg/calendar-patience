import { Card } from '../../models/deck.ts'

interface Props {
  openCard: Card
  pileType: string
}

export default function DraggableCard({ openCard, pileType }: Props) {
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData()
    event.dataTransfer.setData('application/json', JSON.stringify(openCard))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className={`place-${pileType} circle-item draggablediv glow-blue`}
      draggable="true"
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img
        draggable="false"
        src={openCard.image}
        alt={`${openCard.value} of ${openCard.suit}`}
      />
    </div>
  )
}
