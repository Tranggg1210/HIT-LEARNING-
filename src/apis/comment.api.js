import { ApiConstant } from '../constants/api.constant'
import { apiDefault } from '.'

const commentApi =() =>  ({
    getComment: async (itemId) => await apiDefault.get(`${ApiConstant.comment.getComment}${itemId}`),
    createComment: async (itemId, data) => apiDefault.post(`${ApiConstant.comment.createComment}${itemId}`,
            data
    ),
    deleteComment: async (commentId) => await apiDefault.delete(`${ApiConstant.comment.deleteComment}${commentId}`),

})

export const { getComment, createComment, deleteComment } = commentApi()
