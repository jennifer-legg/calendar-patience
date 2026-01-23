import { useNavigate } from 'react-router'
import LoginOutBtn from '../components/LoginOutBtn'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <main>
      <div className="landing">
        <h2>Welcome to</h2>
        <h1>Clock Patience</h1>
        <img
          className="landing"
          src="/images/bluequeen.png"
          alt="Queen of hearts personified"
        />
        <button className="landing" onClick={() => navigate('/new')}>
          Play as guest
        </button>
        <LoginOutBtn classes={['landing']} />
      </div>
    </main>
  )
}
