import { useNavigate } from 'react-router-dom'
import './ForgotPassword.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { forgotPassValid } from '../../utils/forgotPassValid'
import logo from '../../assets/images/logo.jpg'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { verify, sendCode, resendOTP } from '../../apis/auth.api'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  const startCountdown = useCallback(() => {
    setCountdown(60)
    setIsResendDisabled(true)
  })

  useEffect(() => {
    let timer
    if (countdown > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer)
            setIsResendDisabled(false)
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [countdown, isResendDisabled])

  const goBack = () => {
    navigate('/signin')
  }

  const handleResendOTP = async () => {
    try {
      const res = await resendOTP(localStorage.getItem('username'))
      if (res.data.code === 1000) {
        startCountdown()
      } else {
        toast.error('Failed to resend OTP')
      }
    } catch (err) {
      toast.error(err.message)
    }
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
              otp: '',
            }}
            validationSchema={forgotPassValid}
            onSubmit={async (values) => {
              try {
                const res = await verify(localStorage.getItem('username'), values.otp)
                if (res.data.code === 1000) {
                  navigate('/reset-password')
                } else {
                  toast.error(res.data.message)
                  navigate('/forgot-password')
                }
              } catch (err) {
                toast.error(err.message)
              }
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group get-otp'>
                  <Field id='otp' type='text' placeholder='Nhập mã OTP' name='otp' />
                </div>
                {errors.otp && touched.otp ? <p className='errorMsg'>{errors.otp}</p> : null}
                <br />
                <div className='resend-otp'>
                  {isResendDisabled ? (
                    <p>Gửi lại ({countdown}s)</p>
                  ) : (
                    <span
                      style={{ textDecoration: 'underline', color: 'orange ', cursor: 'pointer' }}
                      onClick={handleResendOTP}>
                      Gửi lại mã ({countdown})
                    </span>
                  )}
                </div>
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
