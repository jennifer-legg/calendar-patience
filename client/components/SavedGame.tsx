import { useParams } from 'react-router'
import { useGetSavedGame } from '../hooks/useSaveGame'
import ClockFrame from './ClockFrame'
import { Card } from '../../models/deck'

//Retrieves a saved game from database to send to the game components
export default function SavedGame() {
  const { id } = useParams()
  const { data, isPending, isError } = useGetSavedGame(Number(id))

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !data || !id) {
    return <p>Error retrieving saved game</p>
  }

  const clockPiles: Card[][] = data.pileData.map((pile) => pile.pileCards)

  return (
    <>
      <ClockFrame deckId={id} savedGameData={data} clockPiles={clockPiles} />
    </>
  )
}
