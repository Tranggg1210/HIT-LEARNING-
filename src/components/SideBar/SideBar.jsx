import { NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/images/logo3.png'
import './SideBar.scss'

const SideBar = () => {
  const navigate = useNavigate()
  const getClassName = ({ isActive }) => (isActive ? 'active' : '')

  //   const dispatch = useDispatch()
  //   const isAsideOpening = useSelector((state) => state.asideStatus)
  //   const user = useSelector((state) => state.user.account)

  return (
    // <aside className={`aside-container ${isAsideOpening ? 'block' : 'hidden'}`}>
    <>
      <div className='aside-container'>
        <div className='logo-sideabar' onClick={() => navigate('/')}>
          <div className='box-logo'>
            <img className='img-logo' src={logo} alt='Logo' />
          </div>
        </div>
        <div className='navlink-container'>
          <NavLink to='/' className={getClassName}>
            <i className='fa-solid fa-house'></i>
            <p>Trang chủ</p>
          </NavLink>
          <NavLink to='/course' className={getClassName}>
            <i className='fa-solid fa-book'></i>
            <p>Khoá học</p>
          </NavLink>
          <NavLink to='/club-hit' className={getClassName}>
            <i className='fa-solid fa-users'></i>
            <p>CLB HIT</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default SideBar
