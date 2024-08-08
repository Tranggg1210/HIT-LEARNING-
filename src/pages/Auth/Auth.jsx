import InputEmail from '../ForgotPassword/InputEmail'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import { Routes, Route, useNavigate } from 'react-router-dom';
import ResetPassword from '../ResetPassword/ResetPassword';
import { useState } from 'react';
const Auth = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    const handleUser = (username) =>{
        setUsername(username)
        navigate('/forgot-password/verify-otp')
    }
    const handleVerify = () =>{
        navigate('/forgot-password/reset-password')
    }

  return (
    <Routes>
      <Route path="username" element={<InputEmail handleUser={handleUser} />} />
      <Route path="verify-otp" element={<ForgotPassword username={username} handleVerify={handleVerify} />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default Auth