/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import NewGame from './components/NewGame'
import SavedGame from './components/SavedGame'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/new" element={<NewGame />}></Route>
    <Route path="/save/:id" element={<SavedGame />}></Route>
  </Route>,
)

export default routes
