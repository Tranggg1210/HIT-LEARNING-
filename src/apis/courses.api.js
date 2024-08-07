import { apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const coursesApi = () => ({
  getAllCourse: async () => apiDefault.get(ApiConstant.courses.getAll),
  createCourse: async (courseData) =>
    apiDefaultUpload.post(ApiConstant.courses.createCourse, courseData),
  deleteCourse: async (id) => apiDefault.delete(`${ApiConstant.courses.deleteCourse}${id}`),
  getCourseById: async (id) => apiDefault.get(`${ApiConstant.courses.getCourseById}${id}`),
  editCourse: async (id, courseData) =>
    apiDefault.put(`${ApiConstant.courses.editCourse}${id}`, courseData),
  getAdminCourse: async (dataPage) => apiDefault.get(ApiConstant.courses.getAll, dataPage),
})
export const { getAllCourse, createCourse, deleteCourse, getCourseById, editCourse, getAdminCourse} = coursesApi()

