import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { createCourse, editCourse } from '../../apis/courses.api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import './AdminCreateCourse.scss'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const AdminCreateCourse = ({ opens, handleCloses, courseData, isEditing, onEditSuccess }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [classType, setClassType] = useState('Public')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditing && courseData) {
      setFolderName(courseData.name || '')
      setDescribe(courseData.description || '')
      setClassType(courseData.isPrivate ? 'Private' : 'Public')
    }
  }, [isEditing, courseData])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
  }

  const userAccess = useAuth()
  const id_access_token = userAccess.user?.id

  const handleSubmit = async () => {
    if (folderName && describe && (upload || isEditing)) {
      const baseCourseData = {
        userId: id_access_token,
        name: folderName,
        description: describe,
        file: upload,
        isPrivate: classType === 'Private',
      }

      try {
        if (isEditing) {
          setLoading(true)
          await editCourse(courseData.id, baseCourseData)
        } else {
          setLoading(true)
          await createCourse(baseCourseData)
        }
        if (isEditing) {
          toast.success('Sửa khoá học thành công')
        } else {
          toast.success('Tạo khoá học thành công')
        }
        handleCloses()
        if (onEditSuccess) onEditSuccess()
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi sửa tạo dữ liệu khóa học')
      } finally {
        setLoading(false)
      }
      handleCloses()
    }
  }

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    height: 550,
  }

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
    marginBottom: 10,
  })

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={opens}
        onClose={handleCloses}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: '5px', lineHeight: '3rem' }}>
            {isEditing ? 'Chỉnh sửa khoá học' : 'Tạo khoá học'}
          </Typography>

          <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type='file' ref={inputRef} onChange={handleFileChange} />
          </Button>
          {upload ? <p>Tên tệp: {upload?.name}</p> : <p>Chưa chọn tệp</p>}
          <TextField
            sx={{ width: '100%', marginBottom: '24px', marginTop: '24px' }}
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
            sx={{ width: '100%', marginBottom: '24px' }}
            id='outlined-describe-input'
            label='Mô tả khoá học'
            type=''
            autoComplete='off'
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            rows={4}
            className='new-textarea'
            multiline
            InputProps={{
              style: { height: '125px', alignItems: 'flex-start' },
            }}
          />
          <FormControl sx={{ width: '100%', marginBottom: '24px' }} size='medium'>
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

          <div className='btn-admin-click-course'>
            <Button
              variant='contained'
              sx={{ width: '145px', height: '45px' }}
              onClick={handleCloses}>
              HUỶ BỎ
            </Button>
            <Button
              variant='contained'
              sx={{ width: '145px', height: '45px' }}
              onClick={handleSubmit}>
              {isEditing ? 'Sửa khoá học' : 'Tạo khoá học'}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default AdminCreateCourse
