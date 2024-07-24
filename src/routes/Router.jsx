import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import Results from '../pages/Results'
import Leaderboard from '../pages/Leaderboard'
import Layout from '../pages/Layout'


const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='quiz' element={<Quiz />} />
      <Route path='results' element={<Results />} />
      <Route path='leaderboard' element={<Leaderboard />} />
      <Route path="*" element={<Navigate replace to='/' />} />
    </Route>
  )
)

export default Router
