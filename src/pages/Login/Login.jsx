import './Login.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form } from 'formik'
import logo from '../../assets/images/logo.jpg'
import { Toaster, toast } from 'react-hot-toast'
// import { loginUser } from '../../apis'
import { login } from '../../apis/auth.api'
// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'

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
              try {
                const res = await login(values)
                console.log('>>res', res)
                if (res.data.data.tokenContent) {
                  const roles = res.data.data.roleName
                  console.log('>>json roles', roles)
                  localStorage.setItem('token', res.data.data.tokenContent)
                  localStorage.setItem('role', JSON.stringify(roles))
                  localStorage.setItem('username', res.data.data.userName)
                  localStorage.setItem('id', res.data.data.userId)
                  // toast.success('Đăng nhập thành công')
                  if (roles.includes('ADMIN')) return navigate('/admin')
                  if (roles.includes('USER')){
                    return toast('Good Job!', {
                      icon: '👏',
                    })
                    // return navigate('/')
                  }
                  // return '/'
                } else {
                  toast.error('Lỗi token')
                }
              } catch (error) {
                toast.error('Đăng nhập thất bại')
                console.error('API error:', error.response || error.message)
              }
              console.log(values)
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field type='text' placeholder='Username' name='username' autoComplete='off' />
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
