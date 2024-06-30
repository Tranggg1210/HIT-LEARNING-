import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Menu.scss'

const Menu = () => {
  const navigate = useNavigate()
  //   const dispatch = useDispatch()
  //   const isAsideOpening = useSelector((state) => state.asideStatus)
  //   const user = useSelector((state) => state.user.account)

  return (
    // <aside className={`aside-container ${isAsideOpening ? 'block' : 'hidden'}`}>
    <>
      <div className='aside-container'>
        <ul>
          <li onClick={() => navigate('/')}>
            <i className='fa-solid fa-house'></i>
            <p>Trang chủ</p>
          </li>
          <li onClick={() => navigate('/courses')}>
            <i className='fa-solid fa-book'></i>
            <p>Khoá học</p>
          </li>
          <li onClick={() => navigate('/club-hit')}>
            <i className='fa-solid fa-users'></i>
            <p>Clb HIT</p>
          </li>
        </ul>
      </div>
    </>

    // </aside>
  )
}

export default Menu
