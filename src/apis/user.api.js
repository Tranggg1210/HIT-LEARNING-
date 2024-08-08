import { api, apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const usersApi = () => ({
  getUserById: async (id) => apiDefault.get(`${ApiConstant.users.getUserById}/${id}`),
  getAllAccount: async () => apiDefault.get(ApiConstant.users.getAllAccount),
  createAccount: async (accountData) =>
    apiDefault.post(ApiConstant.users.createAccount, accountData),
  deleteAccount: async (id) => apiDefault.delete(`${ApiConstant.users.deteleAccount}${id}`),
  updateAccount: async (id, accountData) =>
    apiDefault.put(`${ApiConstant.users.deteleAccount}${id}`, accountData),
})

export const { getUserById, getAllAccount, createAccount, deleteAccount, updateAccount } =
  usersApi()
