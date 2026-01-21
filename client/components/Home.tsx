import { IfAuthenticated, IfNotAuthenticated } from './Auth0'
import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'

export default function Home() {
  return (
    <>
      <IfAuthenticated>
        <Dashboard />
      </IfAuthenticated>
      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}
