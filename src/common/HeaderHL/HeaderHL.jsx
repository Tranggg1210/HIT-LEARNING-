import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './HeaderHL.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import SearchResultList from '../../components/SearchResultList/SearchResultList'
import { getAllSuggest, getAllSection, getAllItem, getAllCourse } from '../../apis/search.api'
import useAuth from '../../hooks/useAuth'
import { IconLogout, IconCirclePlus } from '@tabler/icons-react'
import Avatar from '../../assets/images/user.png'
import { getUserById } from '../../apis/user.api'
import toast from 'react-hot-toast'
import { logout } from '../../apis/auth.api'
import { current } from '@reduxjs/toolkit'

const HeaderHL = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useAuth()
  const [user, setUser] = useState(null)
  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiEndpoint, setApiEndpoint] = useState('course')

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
  const getNameUserById = async () => {
    try {
      const reslut = await (await getUserById(currentUser?.user?.id)).data.data
      setUser(reslut)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }
  useEffect(() => {
    getNameUserById()
  }, [])

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
  const handleSearch = () => {
    fetchData(searchInput)
    setSearchInput('')
    setResults([])
    navigate('/result-search', { state: { results } })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLogOut = async () => {
    try {
      await logout(currentUser?.user?.token)
      currentUser.clearUser()
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Đã xảy ra lỗi khi đăng xuất!')
    }
  }

  const handleCreateCourse = () => {
    navigate('/createNewCourse')
  }

  return (
    <>
      <div className='header-container'>
        <div>
          {access_token && location.pathname === '/course' && (
            <Button className='create-course-button' onClick={handleCreateCourse}>
              <IconCirclePlus size={50} color='#f4b81e' />
            </Button>
          )}
        </div>
        <div className='search-container'>
          <div className='box-search'>
            <select
              value={apiEndpoint}
              onChange={handleApiEndpointChange}
              className='api-endpoint-select'>
              <option value='course'>Course</option>
              <option value='suggest' disabled>
                Gợi ý
              </option>
            </select>
            <div className='search'>
              <i className='fa-solid fa-magnifying-glass'></i>
              <input
                className='input'
                type='text'
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Nhập tìm kiếm...'
              />
            </div>
            {searchInput && results.length > 0 && (
              <SearchResultList
                result={results}
                clearSearch={() => {
                  setSearchInput('')
                  setResults([])
                }}
              />
            )}
          </div>
        </div>

        <div className='button-signin'>
          {access_token ? (
            <div className='top-signIn'>
              <PopupState variant='popover' popupId='demo-popup-popover' className='avatar'>
                {(popupState) => (
                  <div className='box-avatar'>
                    <h5>{user?.name}</h5>
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
                      <img src={'https://picsum.photos/200/300' || Avatar} alt='' />
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
                      <Typography sx={{ width: '200px' }}>
                        <span
                          className='btn-dragger'
                          style={{ padding: '12px ' }}
                          onClick={() => navigate(`/profile/`)}>
                          👤 Thông tin cá nhân
                        </span>
                        <span
                          className='btn-dragger'
                          style={{ padding: '12px ' }}
                          onClick={() => navigate('/change-password  ')}>
                          🔒 Thay đổi mật khẩu
                        </span>
                        <button
                          style={{
                            padding: '12px ',
                            color: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                          className='btn-dragger'
                          onClick={handleLogOut}>
                          <IconLogout /> Đăng xuất
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
    </>
  )
}

export default HeaderHL
