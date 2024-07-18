import * as Yup from 'yup'

export const loginValidate = () =>
  Yup.object({
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
    // .matches(/^[0-9]+$/, 'Mã sinh viên phải là số')
    // .min(10, 'Mã sinh viên tối thiểu là 10 số')
    password: Yup.string().required('Mật khẩu là bắt buộc'),
  })
