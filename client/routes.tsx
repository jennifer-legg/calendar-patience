import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import ClockFrame from './components/ClockFrame'
import Home from './components/Home'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="clock/:gameStatus" element={<ClockFrame />} />
  </Route>,
)

export default routes
