import './Login.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form } from 'formik'
import logo from '../../assets/images/logo.jpg'
import { Toaster, toast } from 'react-hot-toast'
import { loginUser } from '../../apis'
import { login } from '../../apis/auth.api'
import axios from 'axios'


const Login = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/')
  }

  return (
    <>
      <div>
      <Toaster />
      </div>
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
              // try {
              //   const res = await axios.post('https://hitproduct2024-production.up.railway.app/user', values)
              //   // const res = await login(values)
              //   if (res.data.token) {
              //     localStorage.setItem('token', res.data)
              //     localStorage.setItem('role', res.data.role)
              //     toast.success('Đăng nhập thành công')
              //     switch(res.data){
              //       case 'admin':
              //         navigate('/admin')
              //         break
              //       case 'user':
              //         navigate('/user')
              //         break
              //       default:
              //         navigate('/')
              //     }
              //   }
              //     else{
              //       toast.error('Khong nhan duoc token')

              //     }
              // } catch (error) {
              //   toast.error('Đăng nhập thất bại')
              //   console.error('API error:', error.response || error.message)
              // }
              console.log(values)
              navigate('/')
            }}>
            {({ errors, touched }) => (

              <Form>
                <div className='input-group'>
                  <Field
                    type='text'
                    placeholder='Username'
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
