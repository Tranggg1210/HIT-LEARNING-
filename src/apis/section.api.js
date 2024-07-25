import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const sectionsApi = () => ({
  getAllSection: async (id) => apiDefault.get(`${ApiConstant.sections.getAll}${id}`),
  createSection: async (sectionData) =>
    apiDefault.post(ApiConstant.sections.createSection, sectionData),
  deleteSection: async (id) => apiDefault.delete(`${ApiConstant.sections.deleteSection}${id}`),
  getSectionByCourseId: async (id) => apiDefault.get(`${ApiConstant.sections.getSectionByCourseId}${id}`),
})
export const { getAllSection, createSection, deleteSection, getSectionByCourseId} = sectionsApi()
