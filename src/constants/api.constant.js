export const ApiConstant = {
  auth: {
    // login: '',
    // forgotPassword: '/',
    // resetPassword:,
    
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
  comment: {
    getComment: '/comment/',
    createComment: '/comment/',
    deleteComment: '/comment/',
  },

}
