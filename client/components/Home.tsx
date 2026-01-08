import { Link } from 'react-router'
export default function Home() {
  return (
    <>
      <h1>Hello there</h1>
      <Link to="/clock/newGame">Play new game</Link>
      <Link to="/clock/saved">Saved game</Link>
    </>
  )
}
