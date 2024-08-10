import './Login.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form } from 'formik'
import logo from '../../assets/images/logo.jpg'
import { toast } from 'react-hot-toast'
import { login } from '../../apis/auth.api'
import useAuth from '../../hooks/useAuth'
import { getUserById } from '../../apis/user.api'

const Login = () => {
  const navigate = useNavigate()
  const authen = useAuth()

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
                const res = await login(values)
                if (res.data.data.tokenContent) {
                  const roles = res.data.data.roleName
                  const userCurrent = await getUserById(res.data.data.userId)
                  if (userCurrent) {
                    authen.saveUser({
                      token: res.data.data.tokenContent,
                      role: roles,
                      id: res.data.data.userId,
                      refreshToken: res.data.data.refreshToken,
                      userName: userCurrent.data.data.username,
                      linkAvatar: userCurrent.data.data.linkAvatar,
                      className: userCurrent.data.data.className,
                      linkFb: userCurrent.data.data.linkFb,
                      email: userCurrent.data.data.email,
                      name: userCurrent.data.data.name,
                      description: userCurrent.data.data.description,
                    })
                  }

                  if (roles.includes('ADMIN')) return navigate('/admin')
                  if (roles.includes('USER')) {
                    return navigate('/')
                  }
                } else {
                  toast.error('Lỗi token')
                }
              } catch (error) {
                toast.error(error.message)
                console.error('API error:', error.response || error.message)
              }
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
                  <Link to='/forgot-password' s>
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
