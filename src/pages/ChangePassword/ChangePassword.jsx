import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { changePass } from '../../utils/changePass'
import logo from '../../assets/images/logo.jpg'
import { changePassword } from '../../apis/auth.api'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }
  const handleChangePassword = async (values) => {
    try {
      const response = await changePassword({
        oldPass: values.oldPass,
        newPass: values.newPass,
        confirmPass: values.confirmPass,
      })
      toast.success('Thay đổi mật khẩu thành công')
      useNavigate('/profile')
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu')
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
              oldPass: '',
              newPass: '',
              confirmPass: '',
            }}
            validationSchema={changePass()}
            onSubmit={(values, { setSubmitting }) => {
              handleChangePassword(values)
              setSubmitting(false)
            }}>
            {({ errors, touched }) => (
              <Form>
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập mật khẩu cũ' name='oldPass' />
                </div>
                {errors.oldPass && touched.oldPass ? (
                  <p className='errorMsg'>{errors.oldPass}</p>
                ) : null}
                <br />
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập mật khẩu mới' name='newPass' />
                </div>
                {errors.newPass && touched.newPass ? (
                  <p className='errorMsg'>{errors.newPass}</p>
                ) : null}
                <br />
                <div className='input-group'>
                  <Field type='text' placeholder='Nhập lại mật khẩu mới' name='confirmPass' />
                </div>
                {errors.confirmPass && touched.confirmPass ? (
                  <p className='errorMsg'>{errors.confirmPass}</p>
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

export default ChangePassword
