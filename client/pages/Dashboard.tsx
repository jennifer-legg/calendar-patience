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
          <div className="container">
            <Button
              classes={['new-game', 'dashboard']}
              fn={() => navigate('/new')}
              content={<h1>New game</h1>}
            />
            <Scores />
          </div>
          <div className="container">
            <SaveOverview />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
