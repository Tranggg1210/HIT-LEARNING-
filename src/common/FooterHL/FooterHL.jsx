import './FooterHL.scss'
import logo2 from '../../assets/images/logo.jpg'
const FooterHL = () => {
  return (
    <>
      <div className='footerhl'>
        <div className='footer'>
          <div className='infor'>
            <div className='logo-img'>
              <img src={logo2} alt='' />
            </div>
            <div className='infor-icon'>
              <i className='fa-solid fa-envelope'></i>
              <p>hitahaui@gmail.com</p>
            </div>
            <div className='infor-icon'>
              <i className='fa-solid fa-phone'></i>
              <p>+91 91813 23 2309</p>
            </div>
            <div className='infor-icon'>
              <i className='fa-solid fa-location-dot'></i>
              <p>HaNoi university of in dustry</p>
            </div>
          </div>
          <div className='other-infor'>
            <div className='departments'>
              <h2>Các phòng ban</h2>
              <ul>
                <li>Ban quản trị</li>
                <li>Ban thiết kế</li>
                <li>Ban truyền thông và sự kiện</li>
                <li>Ban phát triển</li>
              </ul>
            </div>
            <div className='CLB'>
              <h2>CLB HIT</h2>
              <ul>
                <li>Học tập</li>
                <li>Vui chơi</li>
                <li>Giao tiếp, kết bạn</li>
              </ul>
            </div>
            <div className='icon'>
              <div className='box-icon'>
                <i className='fa-brands fa-facebook'></i>
              </div>
              <div className='box-icon'>
                <i className='fa-brands fa-twitter'></i>
              </div>
              <div className='box-icon'>
                <i className='fa-brands fa-instagram'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='brand'>
          <p>© 2023 Skillbridge. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
export default FooterHL