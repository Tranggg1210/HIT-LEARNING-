import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderHL.scss'
import logo from '../../assets/images/logo1.png'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import SearchResultList from '../../components/SearchResultList/SearchResultList'
import { getAllSuggest, getAllSection, getAllItem, getAllCourse } from '../../apis/search.api'
import useAuth from '../../hooks/useAuth'

const HeaderHL = () => {
  const navigate = useNavigate()
  const currentUser = useAuth()
  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiEndpoint, setApiEndpoint] = useState('suggest')

  const fetchData = async (value) => {
    if (!value.trim()) {
      setResults([])
      return
    }
    let result = []
    try {
      switch (apiEndpoint) {
        case 'suggest':
          result = await getAllSuggest(value)
          break
        case 'section':
          result = await getAllSection(value)
          break
        case 'item':
          result = await getAllItem(value)
          break
        case 'course':
          result = await getAllCourse(value)
          break
        default:
          break
      }
      setResults(result.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(results)

  const handleChange = (value) => {
    setSearchInput(value)
    fetchData(value)
  }

  const handleApiEndpointChange = (event) => {
    setApiEndpoint(event.target.value)
  }

  const access_token = currentUser.user?.token
  const handleClickSignIn = () => {
    navigate('/signIn')
  }
  const handleLogOut = () => {
    currentUser.clearUser()
    
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
      <div className='box-search'>
        <div className='search'>
          <i className='fa-solid fa-magnifying-glass'></i>
          <input
            className='input'
            type='text'
            value={searchInput}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='Search here'
          />
          <select
            value={apiEndpoint}
            onChange={handleApiEndpointChange}
            className='api-endpoint-select'>
            <option value='suggest'>Suggest</option>
            <option value='section'>Section</option>
            <option value='item'>Item</option>
            <option value='course'>Course</option>
          </select>
        </div>
        {Array.isArray(results) && <SearchResultList result={results} />}
      </div>

      <div className='button-signin'>
        {access_token ? (
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
                    padding:'0',
                  }}
                  className='avatar'>
                  <img src="data:image/jpeg;base64,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" alt="" />
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
                    <span onClick={() => navigate(`/profile/`)}>Thông tin cá nhân</span>
                    <span onClick={()=>navigate('/edit-profile/')}>Chỉnh sửa thông tin </span>
                    <span>Thay đổi mật khẩu</span>
                    <button className='btn-top' onClick={handleLogOut}>
                      Đăng xuất
                    </button>
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
        ) : (
          <div className='login' onClick={handleClickSignIn}>
            <h4>Đăng nhập</h4>
            <i className='fa-solid fa-user'></i>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderHL
