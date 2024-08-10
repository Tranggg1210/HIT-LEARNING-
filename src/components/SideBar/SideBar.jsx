import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo3.png'
import './SideBar.scss'
import useAuth from '../../hooks/useAuth'
import { IconShieldLockFilled } from '@tabler/icons-react'
const SideBar = () => {
  const navigate = useNavigate()
  const currentUser = useAuth()
  const getClassName = ({ isActive }) => (isActive ? 'active' : '')

  const accsess_token = currentUser.user?.role

  return (
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
          {(accsess_token?.includes('LEADER') || accsess_token?.includes('ADMIN')) && (
            <NavLink to='/course' className={getClassName}>
              <i className='fa-solid fa-book'></i>
              <p>Khoá học</p>
            </NavLink>
          )}

          <NavLink to='/club-hit' className={getClassName}>
            <i className='fa-solid fa-users'></i>
            <p>CLB HIT</p>
          </NavLink>
          {accsess_token?.includes('ADMIN') && (
            <NavLink to='/admin' className={getClassName}>
              <IconShieldLockFilled />
              <p>Admin</p>
            </NavLink>
          )}
        </div>
      </div>
    </>
  )
}

export default SideBar
