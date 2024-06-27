import './Login.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form} from 'formik'
import logo from '../../assets/images/logo.jpg'
const Login = () => {
  const navigate = useNavigate()
  

  const goBack = () => {
    navigate('/')
  }

  const goToForgotPassword = () => {
    navigate('/forgot-password')
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
              studentID: '',
              password: '',
            }}
            validationSchema={loginValidate()}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
          {({errors,touched}) => (
            <Form>
              <div className='input-group'>
                <Field type='text' placeholder='Mã sinh viên' name='studentID' autoComplete="off" required
                /> 
                <span className='icon'>
                  <FaUser />
                </span>
              </div>
              {errors.studentID && touched.studentID ? (
                <p className='errorMsg'>{errors.studentID}</p>) : null}
                <br />
              <div className='input-group pass'>
                <Field type='password' placeholder='Mật khẩu' name='password' required/>
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              <br />
              {errors.password && touched.password ? (
                <p className='errorMsg'>{errors.password}</p>) : null}

              <div className='forgot-password' onClick={goToForgotPassword} >
                  <Link to='/forgot-password'><i>Quên mật khẩu ?</i></Link>
              </div>
              <button type='submit' className='button'>
                ĐĂNG NHẬP
              </button>

            </Form>
          )}
          </Formik>
        
        </div>
      </div>
    </>
  )
}

export default Login
