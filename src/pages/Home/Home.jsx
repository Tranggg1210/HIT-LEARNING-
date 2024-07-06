import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import Classess from '../../components/Classes2/Classess'
import FooterHL from '../../common/FooterHL/FooterHL'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import CourseList from '../CourseList/CourseList'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import CreateSubFolder from '../../components/CreateSubFolder/CreateSubFolder'
import CreateNewCourse from '../../components/CreateNewCourse/CreateNewCourse'
import EditSubFolder from '../../components/EditSubFolder/EditSubFolder'
const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      <div className='content'>
        <Slider />
        {/* {access_token ? <Classess /> : <Classes />} */}
        <CourseLeader />
        {/* <CourseList /> */}
        {/* <CreateFolder /> */}
        {/* <CreateSubFolder /> */}
        {/* <CreateNewCourse /> */}
        {/* <EditSubFolder /> */}
      </div>
      {/* <FooterHL /> */}
    </>
  )
}
export default Home
