import * as Yup from 'yup'

export const forgotPassValid = () =>
  Yup.object({
    otp: Yup.string()
      .required('OTP là bắt buộc')
      .matches(/^[a-zA-Z0-9]{6}$/, 'OTP gồm 6 ký tự bao gồm chữ và số (không có ký tự đặc biệt)'),
  })
