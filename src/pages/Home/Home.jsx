import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import Classess from '../../components/Classes2/Classess'

const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      zx
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
