import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { resetPass } from '../../utils/resetPass'
import logo from '../../assets/images/logo.jpg'
import { resetPassword } from '../../apis/auth.api'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
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
              userId: localStorage.getItem("username"),
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={resetPass}
            onSubmit={async (values) => {
              try{
                const res = await resetPassword(values)
                console.log('res reset', res)
                if(res.data.code === 1000){
                  localStorage.removeItem("username")
                  toast.success('Cập nhật mật khẩu thành công. Vui lòng quay lại trang đăng nhập')
                  navigate('/signin')
                }else{
                  toast.error(res.data.message)
                }
              }catch(err){
                console.log(err)
                toast.error(err.response.data.message)

              }
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập mật khẩu mới' name='newPassword' />
                </div>
                {errors.newPassword && touched.newPassword ? (
                  <p className='errorMsg'>{errors.newPassword}</p>
                ) : null}
                <br />
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập lại mật khẩu mới' name='confirmPassword' />
                </div>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className='errorMsg'>{errors.confirmPassword}</p>
                ) : null}
                <br />

                <button type='submit' className='button'>
                  THAY ĐỔI
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
