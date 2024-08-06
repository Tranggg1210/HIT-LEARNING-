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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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
      <div className='search-container'>
        <div className='box-search'>
          <select
            value={apiEndpoint}
            onChange={handleApiEndpointChange}
            className='api-endpoint-select'>
            <option value='suggest' disabled>
              Gợi ý
            </option>
            <option value='section'>Section</option>
            <option value='item'>Item</option>
            <option value='course'>Course</option>
          </select>
          <div className='search'>
            <i className='fa-solid fa-magnifying-glass'></i>
            <input
              className='input'
              type='text'
              value={searchInput}
              onChange={(e) => handleChange(e.target.value)}
              placeholder='Nhập tìm kiếm...'
            />
          </div>
          {Array.isArray(results) && <SearchResultList result={results} />}
        </div>
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
                      padding: '0',
                    }}
                    className='avatar'>
                    <img src='' alt='' />
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
                      <span onClick={() => navigate('/edit-profile/')}>Chỉnh sửa thông tin </span>
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
