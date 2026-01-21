import { useNavigate } from 'react-router'
import LoginOutBtn from './LoginOutBtn'

export default function Nav() {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(`${path}`)
  }

  return (
    <nav>
      <button className="logo" onClick={() => handleNavigate('/')}>
        <h1>Calendar Patience</h1>
      </button>

      <div className="nav-icon-container">
        <button onClick={() => handleNavigate('/new')}>New game</button>
        <LoginOutBtn />
      </div>
    </nav>
  )
}
