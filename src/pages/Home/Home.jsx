import Slider from '../../components/Slider/Slider'
import Classes from '../../components/Classes/Classes'
import './Home.scss'
import Layout from '../../layouts/Layout/MainLayout'
import FooterHL from '../../common/FooterHL/FooterHL'
import Classess from '../../components/Classescopy/Classess'
const Home = () => {
  const access_token = localStorage.getItem('access_token')
  return (
    <>
      {/* <Layout /> */}
      {/* <div className='content'>
        <Slider />
        {access_token ? <Classess /> : <Classes />}
      </div> */}
      {/* <FooterHL /> */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita exercitationem libero
        voluptatibus inventore iste quae nihil corrupti temporibus optio. Omnis, voluptatum dolore
        non obcaecati mollitia accusantium voluptatem voluptas unde neque.
      </p>
    </>
  )
}
export default Home
