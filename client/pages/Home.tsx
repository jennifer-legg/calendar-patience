import SaveOverview from '../components/SaveOverview'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import Scores from '../components/Scores'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <main>
      <Link to={'new'}>New game</Link>
      <div>
        <h2>Your saved games</h2>
        {isLoading && <p>Loading...</p>}
        {!isAuthenticated && <p>Please log in to display saved games</p>}
        {isAuthenticated && <SaveOverview />}
        {isAuthenticated && <Scores />}
      </div>
    </main>
  )
}
