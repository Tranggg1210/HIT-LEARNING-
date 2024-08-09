import { apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const itemsApi = () => ({
  getAllItem: async (id) => apiDefault.get(`${ApiConstant.items.getAll}${id}`),
  getItemById: async (id) => apiDefault.get(`${ApiConstant.items.getAll}${id}`),
  createItem: async (itemData) => apiDefaultUpload.post(ApiConstant.items.createItem, itemData),
  deleteItem: async (id) => apiDefault.delete(`${ApiConstant.items.deleteItem}${id}`),
  updateItem: async (id, itemData) =>
    apiDefaultUpload.put(`${ApiConstant.items.updateItem}${id}`, itemData),
  getItemBySectionId: async (id) => apiDefault.get(`${ApiConstant.items.getItemBySectionId}${id}`),
})
export const { getItemById, createItem, deleteItem,updateItem,getItemBySectionId, getAllItem } =  itemsApi()

