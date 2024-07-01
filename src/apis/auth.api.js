import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ id, password }) =>
    apiDefault.post(ApiConstant.auth.login, {
      id,
      password,
    }),
})

export const { login } = authApi()
