import SaveOverview from './SaveOverview'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/new')
  }
  return (
    <main>
      <button className="new-game-button" onClick={handleClick}>
        Start a new game
      </button>
      <SaveOverview />
    </main>
  )
}
