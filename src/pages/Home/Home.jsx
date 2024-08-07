import Slider from '../../components/Slider/Slider'
import CouresUserPublic from '../../components/CouresUserPublic/CouresUserPublic'
import './Home.scss'
import CouresUserPrivate from '../../components/CouresUserPrivate/CouresUserPrivate'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import { Outlet } from 'react-router-dom'
import CourseLeaderList from '../../components/CourseLeaderList/CourseLeaderList'

const Home = () => {
  const access_token = localStorage.getItem('token')
  return (
    <>
      <div className='content'>
        <Slider />
        {/* {access_token ? <CouresUserPrivate /> : <CouresUserPublic />} */}
        {/* <CourseLeader /> */}
        {/* <CourseLeaderList /> */}
        {/* <CouresUserPrivate /> */}
        <CouresUserPublic />
      </div>
    </>
  )
}
export default Home
