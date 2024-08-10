import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstant.auth.login, {
      username,
      password,
    }),
    
  resendOTP: async ( username ) =>
  apiDefault.post(`${ApiConstant.auth.sendCode}${username}`),


  resetPassword: async ({userId, newPassword, confirmPassword }) =>
    apiDefault.put(ApiConstant.auth.resetPassword, {
      userId,
      newPassword,
      confirmPassword,
    }),
  changePassword: async ({userId,oldPassword, newPassword, confirmPassword }) =>
    apiDefault.put(ApiConstant.auth.changePassword, {
      userId,oldPassword, newPassword, confirmPassword
    }),
  refreshToken: async (refreshToken) =>
    apiDefault.post(`${ApiConstant.auth.refreshToken}${refreshToken}`),

  sendCode: async ( {username }) =>
    apiDefault.post(`${ApiConstant.auth.sendCode}${username}`),

  verify: async (username, code) =>
    apiDefault.post(`${ApiConstant.auth.verify}${username}/${code}`),

})

export const { login, forgotPassword, resetPassword, refreshToken, sendCode, verify, resendOTP, changePassword } = authApi()
