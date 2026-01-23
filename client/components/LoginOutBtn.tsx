import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  classes?: string[]
}

export default function LoginOutBtn({ classes }: Props) {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <button
      className={classes && classes[0] ? classes.join(' ') : ''}
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  )
}
