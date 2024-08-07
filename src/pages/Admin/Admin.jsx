import './Admin.scss'
import BackgroundProfile from '../../assets/images/F8.png'
import ChuNhiem1 from '../../assets/images/chu_nhiem.jpg'
const Admin = () => {
  return (
    <>
      <div className='header-profile1'>
        <div className='background-profile1'>
          <img src={BackgroundProfile} alt='Background' />
        </div>
        <div className='profile1'>
          <div className='profile-pic1'>
            <div className='profile-img1'>
              <img src={ChuNhiem1} alt='Profile' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Admin
