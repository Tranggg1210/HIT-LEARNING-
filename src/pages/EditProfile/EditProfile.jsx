import "./EditProfile.scss";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import useAuth from "../../hooks/useAuth";
import { editUser } from "../../apis/user.api";
import toast from "react-hot-toast";

const EditProfile = () => {
  const userAccess = useAuth();
  const [folderName, setFolderName] = useState(userAccess?.user?.name || '');
  const [describe, setDescribe] = useState(userAccess?.user?.username || '');
  const [linkFb, setLinkFb] = useState(userAccess?.user?.linkFb || '');
  const [linkEmail, setLinkEmail] = useState(userAccess?.user?.email || '');
  const [className, setClassName] = useState(userAccess?.user?.className || '');
  
  
  const handleUpdateUser = async () => {
    if (folderName && describe && linkFb && linkEmail && className) {
      const userData = {
        name: folderName,
        username: describe,
        linkFb: linkFb,
        email: linkEmail,
        className: className,
        password: 'string',
        
      };
      const userId = userAccess?.user?.id;
      try {
        await editUser(userId, userData);
        toast.success('Cập nhật thông tin người dùng thành công')
      } catch (error) {
        if(error?.code === "ERR_NETWORK"){
          toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn');
          return
        }
        toast.error('Cập nhật thông tin người dùng thất bại')
        
      }
    }
  };

  return (
    <>
      <div className='edit-profile-container'>
        <h2>CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
        <div className='edit-profile-header'>
          <div className="edit-profile-infos-container">
            <div className='edit-profile-infos'>
              <div className='edit-profile-info-folder'>
                <TextField
                  sx={{ width: '100%' }}
                  id='outlined-folder-input'
                  label='Họ Và Tên'
                  type='text'
                  autoComplete='off'
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  rows={1}
                  className='edit-profile-textarea'
                  InputProps={{
                    style: { height: '50px' },
                  }}
                />
              </div>
              <div className='edit-profile-info-folder1'>
                <TextField
                  sx={{ width: '100%' }}
                  id='outlined-folder-input'
                  label='FaceBook'
                  type='text'
                  autoComplete='off'
                  value={linkFb}
                  onChange={(e) => setLinkFb(e.target.value)}
                  rows={1}
                  className='edit-profile-textarea'
                  InputProps={{
                    style: { height: '50px' },
                  }}
                />
              </div>
              <div className='edit-profile-info-folder2'>
                <TextField
                  sx={{ width: '100%' }}
                  id='outlined-folder-input'
                  label='Gmail'
                  type='text'
                  autoComplete='off'
                  value={linkEmail}
                  onChange={(e) => setLinkEmail(e.target.value)}
                  rows={1}
                  className='edit-profile-textarea'
                  InputProps={{
                    style: { height: '50px' },
                  }}
                />
              </div>
              <div className='edit-profile-info-folder3'>
                <TextField
                  sx={{ width: '100%' }}
                  id='outlined-folder-input'
                  label='Lớp'
                  type='text'
                  autoComplete='off'
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  rows={1}
                  className='edit-profile-textarea'
                  InputProps={{
                    style: { height: '50px' },
                  }}
                />
              </div>
              <div className='edit-profile-info-describe'>
                <TextField
                  sx={{ width: '100%', height: '125px' }}
                  id='outlined-describe-input'
                  label='Mô tả khoá học'
                  type='text'
                  autoComplete='off'
                  value={describe}
                  onChange={(e) => setDescribe(e.target.value)}
                  rows={4}
                  className='edit-profile-textarea'
                  InputProps={{
                    style: { height: '125px' },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='edit-profile-actions'>
          <div className='edit-profile-submit'>
            <button className='edit-profile-submit-button' onClick={handleUpdateUser}>
              CẬP NHẬT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
