import { Outlet } from 'react-router-dom'
import HeaderHL from '../../common/HeaderHL/HeaderHL'
import SideBar from '../../components/SideBar/SideBar'

const LayoutAboutHIT = () => {
  return (
    <>
      <div className='layout-sidebar'>
        <SideBar />
      </div>
      <Outlet />
    </>
  )
}
export default LayoutAboutHIT
