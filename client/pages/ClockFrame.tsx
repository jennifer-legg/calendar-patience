import ClockPatience from '../components/ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'
import { Game } from '../../models/savedGame.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useDeleteSavedGame } from '../hooks/useSaveGame.ts'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck?: () => void
  savedGameData?: Game
}

//Component handles clock page payout and deleting saved games when finished
export default function ClockFrame({
  deckId,
  clockPiles,
  refreshDeck,
  savedGameData,
}: Props) {
  const deleteSave = useDeleteSavedGame()
  const { getAccessTokenSilently } = useAuth0()

  const handleDeleteSave = async (id: number) => {
    try {
      const token = await getAccessTokenSilently()
      deleteSave.mutate({
        saveId: id,
        token,
      })
    } catch (err) {
      console.log('Unable to delete saved game')
    }
  }

  return (
    <>
      <Header />
      <main>
        <ClockPatience
          deckId={deckId}
          refreshDeck={refreshDeck}
          clockPiles={clockPiles}
          savedGameData={savedGameData}
          handleDeleteSave={handleDeleteSave}
        />
      </main>
      <Footer />
    </>
  )
}
