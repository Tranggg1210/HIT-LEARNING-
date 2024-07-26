import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const itemsApi = () => ({
  getAllitem: async () => apiDefault.get(ApiConstant.items.getAll),
  createItem: async (ItemData) => apiDefault.post(ApiConstant.items.createItem, ItemData),
  deleteItem: async (id) => apiDefault.delete(`${ApiConstant.items.deleteItem}${id}`),
  getItemBySectionId: async (id) => apiDefault.get(`${ApiConstant.items.getItemBySectionId}${id}`),
})
export const { getAllItem, createItem, deleteItem,getItemBySectionId } = coursesApi()
