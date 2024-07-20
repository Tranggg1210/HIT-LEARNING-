import { apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const coursesApi = () => ({
  getAllCourse: async () => apiDefault.get(ApiConstant.courses.getAll),
  createCourse: async (courseData) =>
    apiDefaultUpload.post(ApiConstant.courses.createCourse, courseData),
  deleteCourse: async (id) => apiDefault.delete(`${ApiConstant.courses.deleteCourse}${id}`),
})
export const { getAllCourse, createCourse, deleteCourse } = coursesApi()
