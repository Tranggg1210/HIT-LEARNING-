import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { Field, Formik, Form} from 'formik'
import {resetPass} from '../../utils/resetPass'
import logo from '../../assets/images/logo.jpg'

const ResetPassword = () => {
    const navigate = useNavigate()

    const goBack = () =>{
        navigate(-1)
    }

  return (
    <>
        <div className='container'>
        <div className='box'>
          <div className='back'>
            <span onClick={goBack}><IoIosArrowBack/> QUAY LẠI</span>
          </div>
          <div className='logo'>
            <img src={logo} alt='HIT Logo' />
          </div>
          <Formik
            initialValues={
              {
                newPass:'',
                confirmPass:''
              }
            }
            validationSchema={resetPass()}
            onSubmit={(values) => {
              console.log(values)
            }}

          >
          {({errors, touched}) => (

          <Form>
            <div className='input-group'>
              <Field type='text' placeholder='Nhập mật khẩu mới' name="newPass" />
            </div>
            {errors.newPass && touched.newPass ? (
              <p className='errorMsg'>{errors.newPass}</p> ): null}
            <br />
            <div className='input-group'>
              <Field type='text' placeholder='Nhập lại mật khẩu mới' name="confirmPass" />
            </div>
            {errors.confirmPass && touched.confirmPass ? (
              <p className='errorMsg'>{errors.confirmPass}</p> ): null}
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