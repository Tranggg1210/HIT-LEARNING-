import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const sectionsApi = () => ({
  getAllSection: async (id) => apiDefault.get(`${ApiConstant.sections.getAll}${id}`),
  createSection: async (sectionData) => api.post(ApiConstant.sections.createSection, sectionData),
  deleteSection: async (id) => api.delete(`${ApiConstant.sections.deleteSection}${id}`),
  updateSection: async (id, sectionData) =>
    apiDefaultUpload.put(`${ApiConstant.sections.updateSection}${id}`, sectionData),
  getSectionByCourseId: async (id) =>
    apiDefault.get(`${ApiConstant.sections.getSectionByCourseId}${id}`),
})
export const { getAllSection, createSection, deleteSection, updateSection, getSectionByCourseId } =
  sectionsApi()
