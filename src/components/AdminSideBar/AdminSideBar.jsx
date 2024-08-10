import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { IconHome, IconUsers, IconNews, IconLogout, IconHorseToy } from '@tabler/icons-react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import './AdminSideBar.scss'
import logo from '../../assets/images/logo3.png'
import useAuth from '../../hooks/useAuth'
import { logout } from '../../apis/auth.api'
import { confirmAlert } from 'react-confirm-alert'

const AdminSideBar = () => {
  const navigate = useNavigate()
  const currentUser = useAuth()
  const handleLogOut = async () => {
    try {
      await logout(currentUser?.user?.token)
      currentUser.clearUser()
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Đã xảy ra lỗi khi đăng xuất!')
    }
  }
  const confirmLogout = () => {
    confirmAlert({
      title: 'Xác nhận đăng xuất',
      message: 'Bạn có chắc chắn muốn đăng xuất không?',
      buttons: [
        {
          label: 'Không',
          onClick: () => {},
        },
        {
          label: 'Có',
          onClick: () => handleLogOut(),
        },
      ],
    })
  }
  return (
    <div className='admin-sidebar'>
      <NavLink to='/admin' className='admin-sidebar-logo'>
        <div className='admin-box-logo'>
          <img className='admin-img-logo' src={logo} alt='Logo' />
        </div>
      </NavLink>
      <List sx={{ padding: '8px 12px' }}>
        <NavLink to='/admin' className={({ isActive }) => (isActive ? 'active' : '')}>
          <ListItem button>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <IconHome size={24} className='icon' />
            </ListItemIcon>
            <ListItemText primary='Trang chủ' />
          </ListItem>
        </NavLink>
        <NavLink to='/admin/admin-course' className={({ isActive }) => (isActive ? 'active' : '')}>
          <ListItem button>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <IconNews size={24} className='icon' />
            </ListItemIcon>
            <ListItemText primary='Quản trị khoá học' />
          </ListItem>
        </NavLink>
        <NavLink to='/admin/admin-account' className={({ isActive }) => (isActive ? 'active' : '')}>
          <ListItem button>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <IconUsers size={24} className='icon' />
            </ListItemIcon>
            <ListItemText primary='Quản trị tài khoản' />
          </ListItem>
        </NavLink>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
          <ListItem button>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <IconHorseToy size={24} className='icon' />
            </ListItemIcon>
            <ListItemText primary='Trang chủ khoá học' />
          </ListItem>
        </NavLink>
        <ListItem button onClick={confirmLogout}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <IconLogout size={24} className='icon' />
          </ListItemIcon>
          <ListItemText primary='Đăng xuất' />
        </ListItem>
      </List>
    </div>
  )
}

export default AdminSideBar
