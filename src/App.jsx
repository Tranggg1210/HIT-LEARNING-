import { useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import MainLayout from './layouts/Layout/MainLayout'
import Login from './pages/Login/Login'
import CourseLeaderItem from './components/ClassesItem/ClassesItem'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import AboutHIT from './pages/AboutHIT/AboutHIT'
import CourseList from './pages/CourseList/CourseList'
import CreateFolder from './components/CreateFolder/CreateFolder'
import BasicCourse from './pages/BasicCourse/BasicCourse'
import CreateNewCourse from './components/CreateNewCourse/CreateNewCourse'
import LayoutAboutHIT from './layouts/Layout/LayoutAboutHIT'
import LessonDetail from './pages/LessonDetail/LessonDetail'

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
        {
          path: 'detail-course/:id',
          element: <BasicCourse />,
        },
        {
          path: 'editCours',
          element: <CourseList />,
        },
        {
          path: '/createFolder',
          element: <CreateFolder />,
        },
        {
          path: '/createNewCourse',
          element: <CreateNewCourse />,
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
    {
      path: '/club-hit',
      element: <LayoutAboutHIT/>,
      children: [
        {
          path:"",
          element:<AboutHIT/>
        }
      ]
    },
    {
      path:'/lesson/:lessonId',
      element: <LessonDetail/>,
    }
  ])

  return router
}
export default App
