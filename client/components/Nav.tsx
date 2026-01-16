import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

export default function Nav() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const handleLogin = () => {
    loginWithRedirect()
  }
  const handleLogout = () => {
    logout()
  }

  const handleNavigate = (path: string) => {
    navigate(`${path}`)
  }

  return (
    <nav>
      <button onClick={() => handleNavigate('/')}>Home</button>
      <button onClick={() => handleNavigate('/new')}>New game</button>
      {!isAuthenticated && (
        <button onClick={handleLogin}>Login/Register</button>
      )}
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}
