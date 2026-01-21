import SaveOverview from '../components/SaveOverview'
import Scores from '../components/Scores'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useNavigate } from 'react-router'

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <main>
        <div className="dashboard">
          <SaveOverview />
          <div>
            <Button
              classes={['new-game', 'dashboard']}
              fn={() => navigate('/')}
              text="New game"
            />
            <Scores />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
