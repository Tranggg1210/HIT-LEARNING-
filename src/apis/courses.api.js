import { apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const coursesApi = () => ({
  getAllCourse: async () => apiDefault.get(ApiConstant.courses.getAll),
  createCourse: async (courseData) =>
    apiDefaultUpload.post(ApiConstant.courses.createCourse, courseData),
  deleteCourse: async (id) => apiDefault.delete(`${ApiConstant.courses.deleteCourse}${id}`),
  getCourseById: async (id) => apiDefault.get(ApiConstant.courses.getId + '/' + id),
})
export const { getAllCourse, createCourse, deleteCourse, getCourseById } = coursesApi()
