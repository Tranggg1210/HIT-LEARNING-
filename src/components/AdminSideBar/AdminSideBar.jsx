import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { IconHome, IconUsers, IconNews, IconLogout } from '@tabler/icons-react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import './AdminSideBar.scss'
import logo from '../../assets/images/logo3.png'
const AdminSideBar = () => {
  const navigate = useNavigate()

  return (
    <div className='admin-sidebar'>
      <NavLink to='/admin' className='admin-sidebar-logo'>
        <div className='admin-box-logo'>
          <img className='admin-img-logo' src={logo} alt='Logo' />
        </div>
      </NavLink>
      <List>
        <ListItem button component={NavLink} to='/admin' exact='true' activeClassName='active'>
          <ListItemIcon>
            <IconHome size={24} className='icon' />
          </ListItemIcon>
          <ListItemText primary='Trang chủ' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/admin-course'
          exact='true'
          activeClassName='active'>
          <ListItemIcon>
            <IconNews size={24} className='icon' />
          </ListItemIcon>
          <ListItemText primary='Quản trị khoá học' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/admin-account'
          exact='true'
          activeClassName='active'>
          <ListItemIcon>
            <IconUsers size={24} className='icon' />
          </ListItemIcon>
          <ListItemText primary='Quản trị tài khoản' />
        </ListItem>
        <ListItem button>
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
