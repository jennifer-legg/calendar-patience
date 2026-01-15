import SaveOverview from './SaveOverview'
import { Link } from 'react-router'

export default function Home() {
  return (
    <main>
      <Link to={'new'}>New game</Link>
      <SaveOverview />
    </main>
  )
}
