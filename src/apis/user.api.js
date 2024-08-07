import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const usersApi =()=>({
    getUserById: async(id) => apiDefault.get(`${ApiConstant.users.getUserById}/${id}`),
    editUser: async(id,userData)=>
        apiDefault.put(`${ApiConstant.users.editUser}${id}`,userData),
})

export const{getUserById,editUser} =usersApi();