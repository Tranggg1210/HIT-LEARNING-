import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const itemsApi = () => ({
  getAllitem: async () => apiDefault.get(ApiConstant.items.getAll),
  createItem: async (ItemData) => apiDefault.post(ApiConstant.items.createItem, ItemData),
  deleteItem: async (id) => apiDefault.delete(`${ApiConstant.items.deleteItem}${id}`),
})
export const { getAllItem, createItem, deleteItem } = coursesApi()
