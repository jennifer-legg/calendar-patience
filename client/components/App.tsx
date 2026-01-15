import Header from './Header.tsx'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router'

function App() {
  return (
    <div id="site-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
