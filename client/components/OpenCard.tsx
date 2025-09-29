import { Card } from '../../models/deck'

interface Props {
  card: Card
}

export default function OpenCard({ card }: Props) {
  return (
    <div>
      <img
        src={card.image}
        alt={`Playing card face-up, the ${card.value} of ${card.suit}`}
      />
    </div>
  )
}
