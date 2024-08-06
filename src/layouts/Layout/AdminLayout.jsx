import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <div className='layout-sidebar'>
        <AdminSideBar />
      </div>
      <div className='layout-content'>
        <div className='outlet'>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminLayout
