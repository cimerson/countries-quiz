import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import Results from '../pages/Results'
import Leaderboard from '../pages/Leaderboard'
import Lay from '../pages/Lay'


const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Lay />}>
      <Route index element={<Home />} />
      <Route path='quiz' element={<Quiz />} />
      <Route path='results' element={<Results />} />
      <Route path='leaderboard' element={<Leaderboard />} />
    </Route>
  )
)

export default Router
