import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import FooterHL from '../../common/FooterHL/FooterHL'
import Classess from '../../components/Classes2/Classess'
import CourseLeader from '../../components/CourseLeader/CourseLeader'
import CourseList from '../../components/CourseList/CourseList'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import CreateSubFolder from '../../components/CreateSubFolder/CreateSubFolder'
const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      <div className='content'>
        <Slider />
        {access_token ? <Classess /> : <Classes />}
        {/* <CourseLeader />
        <CourseList /> */}
        {/* <CreateFolder /> */}
        {/* <CreateSubFolder /> */}
      </div>
      {/* <FooterHL /> */}
    </>
  )
}
export default Home
