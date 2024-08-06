import "./EditProfile.scss";

import { useRef, useState } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { createCourse } from '../../apis/courses.api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const EditProfile = () => {
  const [folderName, setFolderName] = useState('');
  const [describe, setDescribe] = useState('');
  const [upload, setUpload] = useState(null);
    const inputRef = useRef();
 const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpload(file);
  };

  //

  return (
    <>
      <div className='edit-profile-container'>
        <h2>CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
        <div className='edit-profile-header'>
          <div className='edit-profile-upload'>
            <div className='edit-profile-icon'>
              {upload ? (
                <p>File name: {upload?.name}</p>
              ) : (
                <div className='edit-profile-box-upload'>
                  <div className='edit-profile-box-icon'>
                    <IconUpload
                      className='edit-profile-icon-upload'
                      onClick={() => inputRef.current.click()}
                    />
                  </div>
                  <p>Kéo ảnh để tải lên</p>
                </div>
              )}
            </div>
            <div className='edit-profile-input-upload'>
              <input type='file' onChange={handleFileChange} ref={inputRef} />
              <button className='edit-profile-button-upload' onClick={() => inputRef.current.click()}>
                Chọn tệp
              </button>
            </div>
          </div>
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
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
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
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
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
                label='Gmail'
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
        <div className='edit-profile-actions'>
          <div className='edit-profile-cancel'>
            <button className='edit-profile-cancel-button' onClick={() => navigate(-1)}>
              HUỶ BỎ
            </button>
          </div>
          <div className='edit-profile-submit'>
            <button className='edit-profile-submit-button'>
              CẬP NHẬT
            </button>
            {/* <Result status={status} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
