import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { editCourse } from '../../apis/courses.api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const EditCourse = ({ opens, handleCloses, courseData }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [classType, setClassType] = useState('Public')
  const inputRef = useRef()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [folderNameError, setFolderNameError] = useState(false)
  const [describeError, setDescribeError] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  useEffect(() => {
    if (courseData) {
      setFolderName(courseData.name || '')
      setDescribe(courseData.description || '')
      setClassType(courseData.isPrivate ? 'Private' : 'Public')
    }
  }, [courseData])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
  }

  const userAccess = useAuth()
  const id_access_token = userAccess.user?.id

  const handleSubmit = async () => {
    let check = false

    if (!folderName.trim()) {
      setFolderNameError(true)
      check = true
    } else {
      setFolderNameError(false)
    }

    if (!describe.trim()) {
      setDescribeError(true)
      check = true
    } else {
      setDescribeError(false)
    }

    if (!upload) {
      setUploadError(true)
      check = true
    } else {
      setUploadError(false)
    }

    if (check) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc.')
      return
    }
    if (folderName && describe && upload) {
      const baseCourseData = {
        userId: id_access_token,
        name: folderName,
        description: describe,
        file: upload,
        isPrivate: classType === 'Private',
      }

      try {
        setLoading(true)
        await editCourse(courseData.id, baseCourseData)
        handleCloses()
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi sửa dữ liệu khoá học')
      } finally {
        setLoading(false)
      }
      // handleCloses()
      navigate('/')
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
    height: 640,
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
            Chỉnh sửa khoá học
          </Typography>

          <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type='file' ref={inputRef} onChange={handleFileChange} />
          </Button>
          {upload ? <p>Tên tệp: {upload?.name}</p> : <p>Chưa chọn tệp</p>}
          {uploadError && <p className='error-text'>Vui lòng chọn một ảnh hoặc video</p>}
          <TextField
            error={folderNameError}
            helperText={folderNameError ? 'Tên khoá học không được để trống' : ''}
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
            error={describeError}
            helperText={describeError ? 'Mô tả khoá học không được để trống' : ''}
            sx={{ width: '100%', height: '50px', marginBottom: '95px' }}
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
              Sửa khoá học
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditCourse
