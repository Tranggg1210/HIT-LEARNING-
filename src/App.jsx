import { Route, Router, Routes, useRoutes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
// import Login from './pages/Login/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/signIn' element={<Login />}></Route> */}
      </Routes>
    </>
  )
}

export default App
