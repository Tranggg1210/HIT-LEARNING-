import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstant.auth.login, {
      username,
      password,
    }),

  // forgotPassword: async ({ email }) =>
  //   apiDefault.post(ApiConstant.auth.forgotPassword, {
  //     email,
  //   }),
  resendOTP: async ({ username }) =>
    apiDefault.post(ApiConstant.auth.resendOTP, {
      username,
    }),

  resetPassword: async ({ newPass, confirmPass }) =>
    apiDefault.put(ApiConstant.auth.resetPassword, {
      newPass,
      confirmPass,
    }),
  refreshToken: async (refreshToken) =>
  apiDefault.post(`${ApiConstant.auth.refreshToken}${refreshToken}`),

  sendCode: async ({username}) =>
    apiDefault.post(`${ApiConstant.auth.sendCode}${username}`),

  verify: async (username,code) =>
    apiDefault.post(`${ApiConstant.auth.verify}${username}/${code}`),

})

export const { login, forgotPassword, resetPassword, refreshToken, sendCode, verify, resendOTP } = authApi()