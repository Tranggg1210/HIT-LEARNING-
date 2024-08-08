import { useNavigate } from 'react-router-dom'
import './ForgotPassword.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { forgotPassValid } from '../../utils/forgotPassValid'
import logo from '../../assets/images/logo.jpg'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { verify, sendCode } from '../../apis/auth.api'

const ForgotPassword = ({ username, handleVerify }) => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer)
          setIsResendDisabled(false)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const goBack = () => {
    navigate('/signin')
  }

  const handleResendOTP = async () => {
    try {
      const res = await sendCode({ username })
      if (res.data.data) {
        toast.success('OTP resent successfully')
        setCountdown(60)
        setIsResendDisabled(true)
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
                const res = await verify(username, values.otp)
                if (res.status === 200) {
                  handleVerify()
                } else {
                  toast.error(res.data.message)
                  navigate('/forgot-password/username')
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
                {/* <br /> */}
                <div className='resend-otp'>
                  {isResendDisabled ? (
                    <p>Gửi lại ({countdown}s)</p>
                  ) : (
                    <button type='button' onClick={handleResendOTP}>
                      Gửi lại mã
                    </button>
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