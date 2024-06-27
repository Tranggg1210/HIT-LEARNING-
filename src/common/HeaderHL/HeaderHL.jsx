import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo1.png'
import './HeaderHL.scss'
import { useState } from 'react'

const HeaderHL = () => {
  const navigate = useNavigate()
  const [click, setClick] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [count, setCount] = useState(1)

  //
  const access_token = localStorage.getItem('access_token')
  const handleClickSignIn = () => {
    navigate('/signIn')
  }
  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
    navigate('/')
  }
  //

  const handleClick = () => {
    setCount(count + 1)
    console.log(count)
    if (count % 2 != 0) {
      setClick(true)
    } else {
      setClick(false)
    }
  }
  console.log(click)
  return (
    <div className='header-container'>
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
      <div className='button'>
        {access_token ? (
          <div className='top-signIn'>
            <div className='avatar' onClick={handleClick}>
              <i className='fa-regular fa-user'></i>

              {click ? (
                <div className='box-avatar'>
                  <p>Trang cá nhân</p>
                  <button className='btn-top' onClick={handleLogOut}>
                    Logout
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          <div className='top-login'>
            <div className='login' onClick={handleClickSignIn}>
              <h4>Login</h4>
              <i className='fa-solid fa-user'></i>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderHL
