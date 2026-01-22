import { Link } from 'react-router'
import LoginOutBtn from './LoginOutBtn'
import { useLocation } from 'react-router'
import { IfAuthenticated } from './Auth0'

export default function Nav() {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className="header">
      <h1>Calendar Patience</h1>
      <nav>
        <ul className="nav">
          <IfAuthenticated>
            {pathname !== '/' && (
              <li>
                <Link to="/">Dashboard</Link>
              </li>
            )}
          </IfAuthenticated>
          {pathname !== '/new' && (
            <li>
              <Link to="/new">New game</Link>
            </li>
          )}
          <li className="right">
            <LoginOutBtn classes={['nav']} />
          </li>
        </ul>
      </nav>
    </div>
  )
}
