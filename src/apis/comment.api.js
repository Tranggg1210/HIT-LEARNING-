import { ApiConstant } from "../constants/api.constant";
import { apiDefault } from ".";

const commentApi =() =>  ({
    getComment: async (videoId) => {
        const response = await apiDefault.get(`${ApiConstant.comment.getComment}${videoId}`);
        return response.data;
    },
    createComment: async (videoId) => {
        const response = await apiDefault.post(`${ApiConstant.comment.getComment}${videoId}`);
        return response.data;
    },
    deleteComment: async (commentId) => {
        const response = await apiDefault.delete(`${ApiConstant.comment.deleteComment}${commentId}`);
        return response.data;
    },

})

export const { getComment, createComment, deleteComment } = commentApi();