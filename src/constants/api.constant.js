
export const ApiConstant = {
  auth: {
    login: '/login',
    sendCode: '/mail/',
    resetPassword: '/user/password/reset',
    changePassword: 'user/password/change',

    refreshToken: '/refresh/',
    verify: '/verify/',
    resendOTP: '/mail/',
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
    getAllBySection:'/item/section/',
    getAll: '/item/',
    createItem: '/item',
    deleteItem: '/item/',
    updateItem: '/item/',
    getItemBySectionId: '/item/section/',
  },
  users: {
    getUserById: '/user',
    getAllAccount: '/users',
    createAccount: '/add',
    deteleAccount: '/user/',
    updateAccount: '/user/',
    editUser: '/user/',
  },
  searchs: {
    getAllSuggest: '/search/suggest/',
    getAllSection: '/search/section/',
    getAllItem: '/search/item/',
    getAllCourse: '/search/course/',
    getAdminCourse: '/search/course/filter-name/',
    getAdminUser: '/search/user/filter-name/',
  },
  comment: {
    getComment: '/comment/',
    createComment: '/comment/',
    deleteComment: '/comment/',
  },
}
