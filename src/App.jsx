import { useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import MainLayout from './layouts/Layout/MainLayout'
import Login from './pages/Login/Login'
// import CourseLeaderItem from './components/ClassesItem/ClassesItem'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import AboutHIT from './pages/AboutHIT/AboutHIT'
import SectionList from './pages/SectionList/SectionList'
import CreateFolder from './components/CreateFolder/CreateFolder'
import BasicCourse from './pages/BasicCourse/BasicCourse'
import CreateNewCourse from './components/CreateNewCourse/CreateNewCourse'
import LayoutAboutHIT from './layouts/Layout/LayoutAboutHIT'

import Profile from './pages/Profile/Profile'

import LessonDetail from './pages/LessonDetail/LessonDetail'
import { Toaster } from 'react-hot-toast'
import CourseLeaderList from './components/CourseLeaderList/CourseLeaderList'

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
          path: 'editCourse/:id',
          element: <SectionList />,
        },
        {
          path: '/createFolder',
          element: <CreateFolder />,
        },
        {
          path: '/createNewCourse',
          element: <CreateNewCourse />,
        },
        {
          path: '/course',
          element: <CourseLeaderList />,
        },
      ],
    },
    {
      path: '/signin',
      element: <Login />,
    },
    // {
    //   path: '/courseLeader',
    //   element: <CourseLeaderItem />,
    // },
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
      element: <LayoutAboutHIT />,
      children: [
        {
          path: '',
          element: <AboutHIT />,
        },
      ],
    },
    {
      path: '/profile',
      element: <LayoutAboutHIT />,
      children: [
        {
          path: '',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/lesson/:lessonId',
      element: <LessonDetail />,
    },
  ])

  return (
    <>
      <div>
        <Toaster />
      </div>
      {router}
    </>
  )
}

export default App
