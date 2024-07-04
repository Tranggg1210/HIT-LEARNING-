import { Link, useNavigate } from 'react-router-dom'
import './ForgotPassword.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { forgotPassValid } from '../../utils/forgotPassValid'
import logo from '../../assets/images/logo.jpg'

const ForgotPassword = () => {
  const navigate = useNavigate()

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
            onSubmit={(values) => {
              console.log(values)
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field
                    type='text'
                    placeholder='Nhập gmail của bạn'
                    name='email'
                    autoComplete='off'
                  />
                </div>
                {errors.email && touched.email ? <p className='errorMsg'>{errors.email}</p> : null}

                <br />
                <div className='input-group get-otp'>
                  <Field id='otp' type='text' placeholder='Nhập mã OTP' name='otp' />
                  <button className='button-otp'>Lấy mã OTP</button>
                </div>
                {errors.otp && touched.otp ? <p className='errorMsg'>{errors.otp}</p> : null}
                <br />
                <button type='submit' className='button'>
                  <Link to={'/reset-password'}>XÁC THỰC </Link>
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
