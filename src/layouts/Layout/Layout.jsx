import { Outlet } from 'react-router-dom'
import HeaderHL from '../../common/HeaderHL/HeaderHL'
import Menu from '../../components/Menu/Menu'

const Layout = () => {
  return (
    <>
      <HeaderHL />
      <Menu />
      <Outlet />
    </>
  )
}
export default Layout
