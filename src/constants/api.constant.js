export const ApiConstant = {
  auth: {
    login: '/login',
    forgotPassword: '/',
    resetPassword:'',
    
  },
  courses: {
    getAll: '/course',
    createCourse: '/course',
    deleteCourse: '/course/',
    editCourse: '/course/',
    getCourseById: '/course/',
    getId: '/course',
  },
  sections: {
    getAll: '/section/course/',
    createSection: '/section',
    deleteSection: '/section/',
    updateSection: '/section/',
    getSectionByCourseId: '/section/course/',
  },
  items: {
    getAll: '/item/section/',
    createItem: '/item',
    deleteItem: '/item/',
    updateItem: '/item/',
    getItemBySectionId: '/item/section/',
  },
  comment: {
    getComment: '/comment/',
    createComment: '/comment/',
    deleteComment: '/comment/',
  },

}
