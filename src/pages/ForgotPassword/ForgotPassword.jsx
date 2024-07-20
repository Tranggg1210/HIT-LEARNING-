import { useNavigate } from 'react-router-dom'
import './ForgotPassword.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { forgotPassValid } from '../../utils/forgotPassValid'
import logo from '../../assets/images/logo.jpg'
import { useState } from 'react'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0)

  const startTimer = () => {
    setTimer(30)
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  const sendOtp = (email, errors) => {
    if (!email || errors.email) {
      alert('Nhập email hợp lệ')
      return
    }
    setOtpSent(true)
    startTimer()
  }

  const verifyOtp = (inputOtp) => {
    if (inputOtp === '123456') {
      return true
    }
    return false
  }

  const goBack = () => {
    navigate('/signin')
  }

  return (
    <>
      <div className='container'>
        <div className='box'>
          <div className='back'>
            <span onClick={goBack}>
              <IoIosArrowBack /> QUAY LẠI
            </span>
          </div>
          <div className='logo'>
            <img src={logo} alt='HIT Logo' />
          </div>
          <Formik
            initialValues={{
              email: '',
              otp: '',
            }}
            validationSchema={forgotPassValid()}
            onSubmit={async (values) => {
              if (verifyOtp(values.otp)) {
                navigate('/reset-password')
              } else {
                alert('OTP không chính xác')
              }
            }}>
            {({ errors, touched, values }) => (
              <Form>
                <div className='input-group'>
                  <Field
                    type='text'
                    placeholder='Nhập gmail của bạn'
                    name='email'
                    autoComplete='off'
                    disabled={otpSent}
                  />
                </div>
                {errors.email && touched.email ? <p className='errorMsg'>{errors.email}</p> : null}

                <br />
                <div className='input-group get-otp'>
                  <Field
                    id='otp'
                    type='text'
                    placeholder='Nhập mã OTP'
                    name='otp'
                    disabled={!otpSent}
                  />
                  {!otpSent ? (
                    <button
                      type='button'
                      className='button-otp'
                      onClick={() => sendOtp(values.email, errors)}>
                      Lấy mã OTP
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='button-otp'
                      disabled={timer > 0}
                      onClick={() => sendOtp(values.email, errors)}>
                      {timer > 0 ? `Resend(${timer}s)` : 'Gửi lại mã'}
                    </button>
                  )}
                </div>
                {errors.otp && touched.otp ? <p className='errorMsg'>{errors.otp}</p> : null}
                <br />
                <button type='submit' className='button'>
                  XÁC THỰC
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
