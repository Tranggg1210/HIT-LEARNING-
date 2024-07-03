import { Route, Router, Routes, useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import MainLayout from './layouts/Layout/MainLayout'
import AboutHIT from './pages/AboutHIT/AboutHIT'
function App() {
  // const router = useRoutes([
  //   {
  //     path: '/',
  //     element: <MainLayout />,
  //     children: [
  //       {
  //         path: '',
  //         element: <Home />,
  //       },
  //     ],
  //   },
  //   {
  //     path: '/signIn',
  //     element: <Login />,
  //   },
  // ])

  // return router
  return (
    <>
      
      <AboutHIT/>
    </>
  )
}

export default App
