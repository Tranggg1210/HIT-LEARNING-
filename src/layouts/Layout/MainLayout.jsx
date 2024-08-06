import { Outlet } from 'react-router-dom'
import HeaderHL from '../../common/HeaderHL/HeaderHL'
import SideBar from '../../components/SideBar/SideBar'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <div className='layout-sidebar'>
        <SideBar />
        {/* <AdminSideBar /> */}
      </div>
      <div className='layout-content'>
        <HeaderHL />
        <div className='outlet'>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainLayout
