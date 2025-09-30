import { useGetCardFromPile } from '../hooks/useDeck.ts'
import type { Card } from '../../models/deck.ts'

interface Props {
  deckId: string
  pile: string
  handleUpdateCard: (card: Card) => void
}

export default function OpenCard({ deckId, pile, handleUpdateCard }: Props) {
  const {
    data: card,
    isError,
    isPending,
    error,
  } = useGetCardFromPile(deckId, `pile${pile}`)

  if (isError) {
    ;<div>
      <p>{error.message}</p>
    </div>
  }

  if (isPending) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (card) {
    handleUpdateCard(card)
    return (
      <div>
        <img
          src={card.image}
          alt={`Playing card face-up, the ${card.value} of ${card.suit}`}
        />
      </div>
    )
  }
}
