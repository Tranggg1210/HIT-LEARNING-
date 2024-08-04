import axios from 'axios'
import { LocalStorage } from '../constants/localStorage.constant'
import { useNavigate } from 'react-router-dom'
import { refreshToken } from './auth.api'
import toast from 'react-hot-toast'
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'Application/json',
  },
})

api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}, Promise.reject)

api.interceptors.response.use(
  (value) => value.data,
  async (error) => {
    if (error.code === 401) {
      const navigate = useNavigate()
      const currentUser = JSON.parse(localStorage.getItem(LocalStorage.auth));
      if(!currentUser){
        navigate("/login")
        localStorage.removeItem(LocalStorage.auth)
      }else{
        try {
          const result = await refreshToken(currentUser.refreshToken)
          currentUser.token = result.data.refreshToken
          localStorage.setItem(LocalStorage.auth, JSON.stringify(currentUser))
          error.config.header.Authorization = `Bearer ${currentUser.token}`
          return axios(error.config)
        } catch (err) {
          toast.error('Phiên đăng nhập đã hết hạn')
          navigate("/login")
          localStorage.removeItem(LocalStorage.auth)
        }
      }
    }
    return Promise.reject(error)
  },
)

const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}`,
  headers: {
    'Content-Type': 'Application/json',
  },
})


export async function loginUser(login){
  try{

    const response = await api.post('/user', login)
    if(response.status >= 200 && response.status < 300){
      return response.data
    }else{
      return null
    }
  }catch(error){
    console.error(error)
    return null
  }
}

const apiDefaultUpload = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export { apiDefault, api, apiDefaultUpload }
