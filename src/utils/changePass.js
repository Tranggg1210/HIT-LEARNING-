import * as Yup from 'yup'

export const changePass = () =>
  Yup.object({
    oldPass: Yup.string()
      .required('Mật khẩu cũ là bắt buộc'),
    newPass: Yup.string()
      .required('Mật khẩu mới là bắt buộc')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ thường')
      .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
      .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số')
      .matches(/[@$!%*?&]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
    confirmPass: Yup.string()
      .required('Xác nhận mật khẩu mới là bắt buộc')
      .oneOf([Yup.ref('newPass'), null], 'Mật khẩu không trùng khớp'),
  })
