import type { Card } from '../../models/deck'

interface Props {
  pileNumber: number
  pileType: string
  handleUpdatePile: (card: Card) => void
}

export default function DropZone({
  pileType,
  pileNumber,
  handleUpdatePile,
}: Props) {
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
    if (card.value.toLowerCase() === pileType.toLowerCase()) {
      event.preventDefault()
      handleUpdatePile(card)
    }
  }

  return (
    <div
      className="dropzone"
      id={`dropzone-${pileNumber}oclock`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    ></div>
  )
}
