import "./EditProfile.scss";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField} from '@mui/material';
import Button from '@mui/material/Button';
import useAuth from "../../hooks/useAuth";
import { editUser } from "../../apis/user.api";
import toast from "react-hot-toast";

const EditProfile = (opens,userData,onClose) => {
  const userAccess = useAuth();
  const [folderName, setFolderName] = useState(userAccess?.user?.name || '');
  const [describe, setDescribe] = useState(userAccess?.user?.username || '');
  const [linkFb, setLinkFb] = useState(userAccess?.user?.linkFb || '');
  const [linkEmail, setLinkEmail] = useState(userAccess?.user?.email || '');
  const [className, setClassName] = useState(userAccess?.user?.className || '');
  

  
  useEffect(() => {
    if (userData) {
      setFolderName(userData.name || '');
      setLinkEmail(userData.email || '');
      setLinkFb(userData.linkFb || '');
      setDescribe(userData.description || '');
      setClassName(userData.className || '');
      
    }
  }, [userData]);

  const handleUpdateUser = async () => {
    if (folderName && describe && linkFb && linkEmail && className) {
      const newUserData = {
        name: folderName,
        username: describe,
        linkFb: linkFb,
        email: linkEmail,
        className: className,
        password: 'string',
        
      };
      const userId = userAccess?.user?.id;
      try {
        await editUser(userId, newUserData);
        toast.success('Cập nhật thông tin người dùng thành công')
        onClose();
      } catch (error) {
        if(error?.code === "ERR_NETWORK"){
          toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn');
          return
        }
        toast.error('Cập nhật thông tin người dùng thất bại')
        
      }
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    height: 630,
  };

  const formGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  };


  return (
    <Modal
      open={opens}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{ marginBottom: '5px', lineHeight: '3rem' }}>
          Chỉnh sửa thông tin
        </Typography>
        <Box sx={formGrid}>
          <TextField
            sx={{ width: '100%' }}
            id='outlined-username-input'
            label='Họ và Tên'
            type='text'
            size='medium'
            autoComplete='on'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            rows={1}
            className='new-textarea'
            InputProps={{
              style: { height: '50px' },
            }}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-email-input'
            label='Email'
            type='email'
            autoComplete='off'
            value={linkEmail}
            onChange={(e) => setLinkEmail(e.target.value)}
            rows={4}
            className='new-textarea'
            InputProps={{
              style: { height: '50px' },
            }}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-linkFb-input'
            label='Link Facebook'
            type='text'
            autoComplete='off'
            value={linkFb}
            onChange={(e) => setLinkFb(e.target.value)}
            rows={4}
            className='new-textarea'
            InputProps={{
              style: { height: '50px' },
            }}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-description-input'
            label='Mô tả người dùng'
            type='text'
            autoComplete='off'
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            rows={4}
            className='new-textarea'
            InputProps={{
              style: { height: '50px' },
            }}
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-className-input'
            label='Lớp học'
            type='text'
            autoComplete='off'
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            rows={4}
            className='new-textarea'
            InputProps={{
              style: { height: '50px' },
            }}
          />
        </Box>
        <div className='btn-admin-click-account'>
          <Button
            variant='contained'
            sx={{ width: '145px', height: '45px' }}
            onClick={onClose}>
            HUỶ BỎ
          </Button>
          <Button
            variant='contained'
            sx={{ width: '145px', height: '45px' }}
            onClick={handleUpdateUser}>
            Cập Nhật
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProfile;
