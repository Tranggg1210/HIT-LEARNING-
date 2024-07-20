import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import Classess from '../../components/Classes2/Classess'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import { Outlet } from 'react-router-dom'

const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      <div className='content'>
        <Slider />
        {/* {access_token ? <Classess /> : <Classes />} */}
        <CourseLeader />
      </div>
    </>
  )
}
export default Home
