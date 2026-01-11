import { useParams } from 'react-router'
import { useGetSavedGame } from '../hooks/useSaveGame'
import ClockFrame from './ClockFrame'

export default function SavedGame() {
  const { id } = useParams()
  const { data, isPending, isError } = useGetSavedGame(Number(id))

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !data || !id) {
    return <p>Error retrieving saved game</p>
  }

  return (
    <>
      <ClockFrame deckId={id} clockPiles={data} />
    </>
  )
}
