export const ApiConstant = {
  auth: {
    login: '/login',
  },
  courses: {
    getAll: '/course',
    createCourse: '/course',
    deleteCourse: '/course/',
    getId: '/course',
  },
  sections: {
    getAll: '/section/course/',
    createSection: '/section',
    deleteSection: '/section/',
    getSectionByCourseId: '/section/course/',
  },
  items: {
    getAll: '/item',
    createItem: '/item',
    deleteItem: '/item/',
    getItemBySectionId: '/item/section/',
  },
}
