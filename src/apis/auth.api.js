import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstant.auth.login, {
      username,
      password,
    }),

  forgotPassword: async ({ email }) =>
    apiDefault.post(ApiConstant.auth.forgotPassword, {
      email,
    }),

  resetPassword: async ({ token, password }) =>
    apiDefault.post(ApiConstant.auth.resetPassword, {
      token,
      password,
    }),
  refreshToken: async (refreshToken) =>
  apiDefault.post(`${ApiConstant.auth.refreshToken}${refreshToken}`)
    
})

export const { login, forgotPassword, resetPassword, refreshToken } = authApi()
