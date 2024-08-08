import Slider from '../../components/Slider/Slider'
import CouresUserPublic from '../../components/CouresUserPublic/CouresUserPublic'
import './Home.scss'
import CouresUserPrivate from '../../components/CouresUserPrivate/CouresUserPrivate'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import { Outlet } from 'react-router-dom'
import CourseLeaderList from '../../components/CourseLeaderList/CourseLeaderList'
import useAuth from '../../hooks/useAuth'

const Home = () => {
  const currentUser = useAuth()
  const access_token = currentUser.user?.role
  return (
    <>
      <div className='content'>
        <Slider />
        {access_token?.includes('USER') ? <CouresUserPrivate /> : <CouresUserPublic />}
      </div>
    </>
  )
}
export default Home
