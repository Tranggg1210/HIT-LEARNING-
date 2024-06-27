// import { Route, Router, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import './App.scss'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Login from './pages/Login/Login'
import './styles/index.scss'
import Home from './pages/Home/Home'
import ResetPassword from './pages/ResetPassword/ResetPassword'


const App =() => {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </>
  )
}

export default App
