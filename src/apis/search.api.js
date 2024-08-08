import { apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const searchApi = () => ({
  getAllSuggest: async (value) => apiDefault.get(`${ApiConstant.searchs.getAllSuggest}${value}`),
  getAllSection: async (value) => apiDefault.get(`${ApiConstant.searchs.getAllSection}${value}`),
  getAllItem: async (value) => apiDefault.get(`${ApiConstant.searchs.getAllItem}${value}`),
  getAllCourse: async (value) => apiDefault.get(`${ApiConstant.searchs.getAllCourse}${value}`),
  getAdminCourse: async (name) => apiDefault.get(`${ApiConstant.searchs.getAdminCourse}${name}`),
  getAdminUser: async (name) => apiDefault.get(`${ApiConstant.searchs.getAdminUser}${name}`),
})
export const {
  getAllSuggest,
  getAllSection,
  getAllItem,
  getAllCourse,
  getAdminCourse,
  getAdminUser,
} = searchApi()
