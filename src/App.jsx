import { Route, Router, Routes, useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import MainLayout from './layouts/Layout/MainLayout'
import Login from './pages/Login/Login'
import CourseLeaderItem from './components/CourseLeaderItem/CourseLeaderItem'
function App() {
  const router = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
      ],
    },
    {
      path: '/signIn',
      element: <Login />,
    },
  ])

  return router
  
}

export default App
