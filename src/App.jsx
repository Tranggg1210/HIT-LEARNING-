import { useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import MainLayout from './layouts/Layout/MainLayout'
import Login from './pages/Login/Login'
import CourseLeaderItem from './components/ClassesItem/ClassesItem'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
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
      path: '/signin',
      element: <Login />,
    },
    {
      path: '/courseLeader',
      element: <CourseLeaderItem />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ])

  return router
}

export default App
