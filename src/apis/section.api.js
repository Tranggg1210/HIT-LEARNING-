import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const sectionsApi = () => ({
  getAllSection: async (id) => apiDefault.get(`${ApiConstant.sections.getAll}${id}`),
  createSection: async (sectionData) =>
    apiDefault.post(ApiConstant.sections.createSection, sectionData),
  deleteSection: async (id) => apiDefault.delete(`${ApiConstant.sections.deleteSection}${id}`),
  updateSection: async (id, sectionData) =>
    apiDefaultUpload.put(`${ApiConstant.sections.updateSection}${id}`, sectionData),
})
export const { getAllSection, createSection, deleteSection, updateSection } = sectionsApi()
