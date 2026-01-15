import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

export default function Nav() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const handleLogin = () => {
    loginWithRedirect()
  }
  const handleLogout = () => {
    logout()
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/new">New Game</Link>
      {!isAuthenticated && (
        <button onClick={handleLogin}>Login/Register</button>
      )}
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}
