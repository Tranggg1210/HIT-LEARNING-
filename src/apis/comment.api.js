import { ApiConstant } from '../constants/api.constant'
import { api, apiDefault } from '.'

const commentApi = () => ({
  getComment: async (itemId) => await apiDefault.get(`${ApiConstant.comment.getComment}${itemId}`),
  createComment: async (itemId, data) =>
    api.post(`${ApiConstant.comment.createComment}${itemId}`, data),
  deleteComment: async (itemId, commentId) =>
    await api.delete(`${ApiConstant.comment.deleteComment}${commentId}`),
})

export const { getComment, createComment, deleteComment } = commentApi()
