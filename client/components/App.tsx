import { useNewDeck } from '../hooks/useDeck.ts'

function App() {
  const { data } = useNewDeck()

  const deckIdForPractice = 'xdlub0hbxjgg6'
  console.log(deckIdForPractice)

  console.log(data?.deck_id, data?.remaining, data?.shuffled, data?.success)

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate</h1>
      </div>
    </>
  )
}

export default App
