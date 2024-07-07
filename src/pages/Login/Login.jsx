import './Login.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form } from 'formik'
import logo from '../../assets/images/logo.jpg'
import { toast } from 'react-toastify'
import axios from 'axios'
import { loginUser } from '../../apis'

const Login = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/')
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
              username: '',
              password: '',
            }}
            validationSchema={loginValidate()}
            onSubmit={async (values) => {
              try {
                const response = await axios.post('https://reqres.in/api/login', values)
                const { token } = response.data
                if (token) {
                  localStorage.setItem('token', token)
                  toast.success('Đăng nhập thành công')
                  navigate('/')
                }
              } catch (error) {
                toast.error('Đăng nhập thất bại')
              }
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field
                    type='text'
                    placeholder='Mã sinh viên'
                    name='username'
                    autoComplete='off'
                  />
                  <span className='icon'>
                    <FaUser />
                  </span>
                </div>
                {errors.username && touched.username ? (
                  <p className='errorMsg'>{errors.username}</p>
                ) : null}
                <br />
                <div className='input-group pass'>
                  <Field type='password' placeholder='Mật khẩu' name='password' />
                  <span className='icon'>
                    <FaLock />
                  </span>
                </div>
                {errors.password && touched.password ? (
                  <p className='errorMsg'>{errors.password}</p>
                ) : null}

                <div className='forgot-password'>
                  <Link to='/forgot-password'>
                    <i>Quên mật khẩu ?</i>
                  </Link>
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
