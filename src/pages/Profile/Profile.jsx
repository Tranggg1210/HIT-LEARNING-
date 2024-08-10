import './Profile.scss'
import React, { useEffect, useState } from 'react'
import BackgroundProfile from '../../assets/images/F8.png'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IconChevronLeft,
  IconSchool,
  IconBrandFacebook,
  IconMail,
  IconId,
  IconUserCircle,
} from '@tabler/icons-react'
import { Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import EditProfile from '../EditProfile/EditProfile'
import { getUserById } from '../../apis/user.api'
import toast from 'react-hot-toast'

const Profile = () => {
  const [userDatas, setUserDatas] = useState(null)
  const navigate = useNavigate()
  const currentUser = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const id = currentUser?.user?.id
  const getDataUserById = async () => {
    try {
      const reslut = await (await getUserById(id)).data.data
      setUserDatas(reslut)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }
  const handleCloseEditModal = async () => {
    try{

        await getDataUserById();
        setIsEditModalOpen(false);

    }catch(error){
        toast.error('Lấy dữ liệu thất bại')
    }
    

  }

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  useEffect(() => {
    getDataUserById()
  }, [])

  return (
    <div className='profile-container'>
      <div className='back-button' onClick={() => navigate(-1)}>
        <IconChevronLeft stroke={2} className='icon-chevron-left' />
        <span>Quay Lại</span>
      </div>
      <div className='header-profile'>
        <div className='background-profile'>
          <img src={BackgroundProfile} alt='Background' />
        </div>
        <button className='edit-button' onClick={handleOpenEditModal}>
          <IconUserCircle stroke={2} />
          Chỉnh sửa thông tin
        </button>
        <div className='profile'>
          <div className='profile-pic'>
            <div className='profile-img'>
              <img src={"https://picsum.photos/200/300"} alt='Profile' />
            </div>
          </div>
        </div>
      </div>
      <div className='profile-name'>
        <h1>{userDatas?.name || 'Chưa có dữ liệu'}</h1>
      </div>
      <div className='content-profile'>
        <div className='intro'>
          <h3>Giới thiệu</h3>
          <div className='infor-profile'>
            <p>
              <IconBrandFacebook stroke={2} className='icon' />
              <a href={userDatas?.linkFb}>{userDatas?.linkFb || 'Chưa có dữ liệu'}</a>
            </p>
            <p>
              <IconMail stroke={2} />
              <span>{userDatas?.email || 'Chưa có dữ liệu'}</span>
            </p>
            <p>
              <IconSchool stroke={2} />
              <span>{userDatas?.className || 'Chưa có dữ liệu'}</span>
            </p>
          </div>
          <h3 className='mysefl'>Mô tả bản thân </h3>
          <p>{userDatas?.description || 'Chưa có dữ liệu'} </p>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProfile open={isEditModalOpen} userData={userDatas} onClose={handleCloseEditModal} />
      )}
    </div>
  )
}

export default Profile
