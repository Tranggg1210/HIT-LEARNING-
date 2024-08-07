import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { IconHome, IconUsers, IconNews, IconLogout } from '@tabler/icons-react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import './AdminSideBar.scss'
import logo from '../../assets/images/logo3.png'
import useAuth from '../../hooks/useAuth'

const AdminSideBar = () => {
  const navigate = useNavigate()
  const currentUser = useAuth()

  const access_token = currentUser.user?.token
  const handleLogOut = () => {
    currentUser.clearUser()
    navigate('/')
  }
  return (
    <div className='admin-sidebar'>
      <NavLink to='/admin' className='admin-sidebar-logo'>
        <div className='admin-box-logo'>
          <img className='admin-img-logo' src={logo} alt='Logo' />
        </div>
      </NavLink>
      <List>
        <NavLink to='/admin' className={({ isActive }) => (isActive ? 'active' : '')}>
          {({ isActive }) => (
            <ListItem button className={isActive ? 'active' : ''}>
              <ListItemIcon>
                <IconHome size={24} className='icon' />
              </ListItemIcon>
              <ListItemText primary='Trang chủ' />
            </ListItem>
          )}
        </NavLink>
        <NavLink to='/admin-course' className={({ isActive }) => (isActive ? 'active' : '')}>
          <ListItem button className={({ isActive }) => (isActive ? 'active' : '')}>
            <ListItemIcon>
              <IconNews size={24} className='icon' />
            </ListItemIcon>
            <ListItemText primary='Quản trị khoá học' />
          </ListItem>
        </NavLink>
        <NavLink to='/admin-account' className={({ isActive }) => (isActive ? 'active' : '')}>
          {({ isActive }) => (
            <ListItem button className={isActive ? 'active' : ''}>
              <ListItemIcon>
                <IconUsers size={24} className='icon' />
              </ListItemIcon>
              <ListItemText primary='Quản trị tài khoản' />
            </ListItem>
          )}
        </NavLink>
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <IconLogout size={24} className='icon' />
          </ListItemIcon>
          <ListItemText primary='Đăng xuất' />
        </ListItem>
      </List>
    </div>
  )
}

export default AdminSideBar
