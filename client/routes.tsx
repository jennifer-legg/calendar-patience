import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import ClockFrame from './components/NewGame'
import Home from './components/Home'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="clock/:type" element={<ClockFrame />} />
  </Route>,
)

export default routes
