import { Card } from '../../models/deck'

interface Props {
  card: Card
}

export default function CardFace({ card }: Props) {
  return (
    <div className="card">
      <img
        alt={`${card.value} of ${card.suit}`}
        src={card.image}
        draggable="false"
      />
    </div>
  )
}
