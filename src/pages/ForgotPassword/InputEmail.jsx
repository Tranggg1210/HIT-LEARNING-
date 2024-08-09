import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import logo from '../../assets/images/logo.jpg'
import {sendCode} from '../../apis/auth.api'
import toast from 'react-hot-toast'
import { inputUser } from '../../utils/inputUser'
const InputEmail = () => {
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
              username: '',
            }}
            validationSchema={inputUser}
            onSubmit={async (values) => {
                try {
                  const code = await sendCode(values)
                  if(code.data.data){
                    localStorage.setItem('username',values.username)
                    navigate('/verify-otp')
                  }else{
                      toast.error('Tài khoản không tồn tại')
                  }
                } catch (err) {
                  toast.error(err.message)
                }
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập username' name='username' />
                </div>
                {errors.username && touched.username ? (
                  <p className='errorMsg'>{errors.username}</p>
                ) : null}
                <br />
                <br />
                <button type='submit' className='button'>
                  NHẬN CODE
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default InputEmail
