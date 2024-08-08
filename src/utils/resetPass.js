import * as Yup from 'yup'

export const resetPass = () =>
  Yup.object({
    newPassword: Yup.string()
      .required('Mật khẩu là bắt buộc')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Mật khẩu có ít nhất 6 ký tự bao gồm ít nhất 1 ký tự viết hoa, ít nhất 1 số',
      ),
    confirmPassword: Yup.string()
      .required('Xác nhận mật khẩu mới là bắt buộc')
      .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
  })


  
