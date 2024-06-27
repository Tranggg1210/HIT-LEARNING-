import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import Layout from '../../layouts/Layout/Layout'
import FooterHL from '../../common/FooterHL/FooterHL'
import Classess from '../../components/Classescopy/Classess'
const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      <Layout />
      <div className='content'>
        <Slider />
        {access_token ? <Classess /> : <Classes />}
      </div>
      <FooterHL />
    </>
  )
}
export default Home
