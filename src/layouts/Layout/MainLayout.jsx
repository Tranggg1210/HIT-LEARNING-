import { Outlet } from 'react-router-dom'
import HeaderHL from '../../common/HeaderHL/HeaderHL'
import SideBar from '../../components/SideBar/SideBar'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <div className='layout-sidebar'>
        <SideBar />
      </div>
      <div className='content'>
        <HeaderHL />
        <div className='mt-72px'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default MainLayout
