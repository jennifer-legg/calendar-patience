import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'
import { useAuth0 } from '@auth0/auth0-react'

export default function Home() {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated && <Dashboard />}
      {!isAuthenticated && <LandingPage />}
    </>
  )
}
