import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Field, Formik, Form } from 'formik'
import { changePass } from '../../utils/changePass'
import logo from '../../assets/images/logo.jpg'
import { changePassword } from '../../apis/auth.api'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const navigate = useNavigate()
  const currentUser = useAuth();
  

  const goBack = () => {
    navigate(-1)
  }
  const handleChangePassword =async(values) =>{
    try{
      const response = await changePassword({
        userId:currentUser?.user?.id,
        oldPassword:values.oldPass,
        newPassword:values.newPass,
        confirmPassword:values.confirmPass
      });
      if(response?.data?.message){
        toast.error(response?.data?.message)
        return
      }
      toast.success('Thay đổi mật khẩu thành công')
      navigate('/profile')
    }catch(error){
      if(error?.code === "ERR_NETWORK"){
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn');
        return;
      }
      toast.error('Thay đổi mật khẩu thất bại, vui lòng thử lại sau');
      

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
            onSubmit={(values ,{setSubmitting}) => {
              handleChangePassword(values);
              setSubmitting(false);
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
