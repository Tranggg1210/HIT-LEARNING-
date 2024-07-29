import { useNavigate } from 'react-router-dom'
import './HeaderHL.scss'
import { useState } from 'react'
import logo from '../../assets/images/logo1.png'
import * as React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

const HeaderHL = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const access_token = localStorage.getItem('access_token')
  const handleClickSignIn = () => {
    navigate('/signIn')
  }
  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
    navigate('/')
  }

  return (
    <div className='header-container'>
      <div className='zone'></div>
      <div className='logo' onClick={() => navigate('/')}>
        <div className='box-logo'>
          <img className='img-logo' src={logo} alt='Logo' />
        </div>
      </div>
      <div className='search'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          className='input'
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Search here'
        />
      </div>
      <div className='button-signin'>
        {/* {access_token ? ( */}
        <div className='top-signIn'>
          <PopupState variant='popover' popupId='demo-popup-popover' className='avatar'>
            {(popupState) => (
              <div className='box-avatar'>
                <Button
                  variant='contained'
                  {...bindTrigger(popupState)}
                  sx={{
                    borderRadius: '50px',
                    height: '50px',
                    minWidth: '50px',
                    marginRight: '25px',
                  }}
                  className='avatar'>
                  <i className='fa-regular fa-user'></i>
                </Button>
                <Popover
                  sx={{ width: '300px', marginLeft: '-47px' }}
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}>
                  <Typography sx={{ p: 2, width: '200px' }}>
                    <span onClick={() => navigate('/profile')}>Thông tin cá nhân</span>
                    <span>Thay đổi mật khẩu</span>
                    <button className='btn-top' onClick={handleLogOut}>
                      Logout
                    </button>
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
        {/* ) : (
          <div className='login' onClick={handleClickSignIn}>
            <h4>Đăng nhập</h4>
            <i className='fa-solid fa-user'></i>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default HeaderHL
