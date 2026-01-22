import { Link } from 'react-router'
import LoginOutBtn from './LoginOutBtn'

export default function Nav() {
  return (
    <div className="header">
      <h1>Calendar Patience</h1>
      <nav>
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/new">New game</a>
          </li>
          <li className="right">
            <LoginOutBtn classes={['nav']} />
          </li>
        </ul>
      </nav>
    </div>
  )
}
