import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <div className='admin-layout-sidebar'>
        <AdminSideBar />
      </div>
      <div className='admin-layout-content'>
        <div className='admin-outlet'>
          <div className='admin-box'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminLayout
