import * as React from 'react';
import { useState, useRef } from 'react';
import {getAdminCourse} from '../../apis/courses.api'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AdminCreateCourse.scss'
import { createCourse } from '../../apis/courses.api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AdminCreateCourse = ({ opens, handleCloses}) => {
    const [folderName, setFolderName] = useState('')
    const [describe, setDescribe] = useState('')
    const [upload, setUpload] = useState(null)
    const [classType, setClassType] = useState('Public')

    const navigate = useNavigate()

    const handleFileChange = (e) => {
      const file = e.target.files[0]
      setUpload(file)
    }

    const handleSubmit = async () => {
      if (folderName && describe && upload) {
        const courseData = {
          userId: id_access_token,
          name: folderName,
          description: describe,
          file: upload,
          isPrivate: classType === 'Private',
        }
        try {
          await createCourse(courseData)
          // onCreate(courseData)
          // onCancel()
        } catch (error) {
          console.log('Error creating course:', error)
        }
      }
      navigate('/')
    }
  
    const handleClassTypeChange = (event) => {
      setClassType(event.target.value)
    }
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 480,
  };

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    marginBottom: 10
  });
  return (
      <Modal
        open={opens}
        onClose={handleCloses}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:'24px'}}>
            Tạo khoá học
          </Typography>

          <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
          <TextField
                sx={{ width: '100%', marginBottom:'24px', marginTop: '24px'}}
                id='outlined-folder-input'
                label='Tên khoá học'
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
                sx={{ width: '100%', height: '50px' ,marginBottom:'24px'}}
                id='outlined-describe-input'
                label='Mô tả khoá học'
                type=''
                autoComplete='off'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                rows={4}
                className='new-textarea'
                InputProps={{
                  style: { height: '125px' },
                }}
              />
               <FormControl sx={{ width: '100%' ,marginBottom:'24px' }} size='medium'>
                <InputLabel className='class-type-select-label'>Loại lớp học</InputLabel>
                <Select
                  labelId='class-type-select-label'
                  className='class-type-select'
                  value={classType}
                  label='Loại lớp học'
                  onChange={handleClassTypeChange}>
                  <MenuItem value='Public'>PUBLIC</MenuItem>
                  <MenuItem value='Private'>PRIVATE</MenuItem>
                </Select>
              </FormControl>
        </Box>
      </Modal> 
  );
};

export default AdminCreateCourse;
