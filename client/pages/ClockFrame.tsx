import ClockPatience from '../components/ClockPatience.tsx'
import type { Card } from '../../models/deck.ts'
import { Game } from '../../models/savedGame.ts'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'
import useMutateSaveGame from '../hooks/useMutateSaveGame.ts'

interface Props {
  deckId: string
  clockPiles: Card[][]
  refreshDeck?: () => void
  savedGameData?: Game
}

//Component handles deleting saved games when finished
export default function ClockFrame({
  deckId,
  clockPiles,
  refreshDeck,
  savedGameData,
}: Props) {
  const mutate = useMutateSaveGame()

  const handleDeleteSave = async (id: number) => {
    await mutate({ mutationType: 'delete', id })
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
