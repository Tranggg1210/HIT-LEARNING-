import * as Yup from 'yup'

export const resetPass = () => (
    Yup.object({
        newPass:Yup.string().required('Mật khẩu là bắt buộc').matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Mật khẩu có ít nhất 8 ký tự bao gồm ít nhất 1 ký tự viết hoa, ít nhất 1 số'),
        confirmPass:Yup.string().required('Xác nhận mật khẩu mới là bắt buộc').oneOf([Yup.ref('newPass'), null], 'Mật khẩu không trùng khớp')
    })
)