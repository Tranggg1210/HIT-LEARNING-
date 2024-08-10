import { useRef, useState } from 'react'
import './CreateNewCourse.scss'
import { IconUpload } from '@tabler/icons-react'
import { createCourse } from '../../apis/courses.api'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const CreateNewCourse = ({ onCreate, onCancel }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [classType, setClassType] = useState('Public')
  const inputRef = useRef()
  const userAccess = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [folderNameError, setFolderNameError] = useState(false)
  const [describeError, setDescribeError] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
  }
  console.log('video', upload)
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
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
      return
    }
    if (upload.size > 52428800) {
      toast.error('Video không được vượt quá 50MB')
      return
    }
    if (folderName && describe && upload) {
      const courseData = {
        userId: id_access_token,
        name: folderName,
        description: describe,
        file: upload,
        isPrivate: classType === 'Private',
      }

      try {
        setLoading(true)
        await createCourse(courseData)
      } catch (error) {
        if (error.mesaage) {
          toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
        } else if (error?.code === 'ERR_NETWORK') {
          toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
        } else {
          toast.error(error.message)
        }
      } finally {
        setLoading(false)
      }
      navigate('/')
    }
  }

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value)
  }

  return (
    <>
      {loading && <Loading />}
      <div className='create-new-course'>
        <h2>TẠO KHOÁ HỌC MỚI</h2>
        <div className='new-courser-header'>
          <div className='new-upload-file'>
            <div className='new-icon-upload'>
              {upload ? (
                <p>File name: {upload?.name}</p>
              ) : (
                <div className='new-boxUpload'>
                  <div className='new-boxIcon'>
                    <IconUpload
                      className='new-iconUpload'
                      onClick={() => inputRef.current.click()}
                    />
                  </div>
                  <p style={{ marginTop: '12px' }}>Ảnh và video tải lên không quá 50MB </p>
                  {uploadError && <p className='error-text'>Vui lòng chọn một ảnh hoặc video</p>}
                </div>
              )}
            </div>
            <div className='new-input-upload'>
              <input type='file' onChange={handleFileChange} ref={inputRef} />
              <button className='new-button-upload' onClick={() => inputRef.current.click()}>
                Chọn tệp
              </button>
            </div>
          </div>
          <div className='new-infors'>
            <div className='new-infor-folder'>
              <TextField
                error={folderNameError}
                helperText={folderNameError ? 'Tên khoá học không được để trống' : ''}
                sx={{ width: '100%', marginBottom: '24px' }}
                id='outlined-folder-input'
                label='Tên khoá học'
                type='text'
                size='medium'
                autoComplete='on'
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                rows={1}
                className='new-textarea'
                multiline
                InputProps={{
                  style: { height: '50px', alignItems: 'flex-start' },
                }}
              />
            </div>
            <div className='new-infor-describe'>
              <TextField
                error={describeError}
                helperText={describeError ? 'Mô tả khoá học không được để trống' : ''}
                sx={{ width: '100%', height: '125px', marginBottom: '24px' }}
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
            </div>
            <div className='new-button-class-type'>
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
            </div>
          </div>
        </div>
        <div className='new-pots'>
          <div className='new-pots2'>
            <button className='new-post-button-cancel' onClick={() => navigate('/')}>
              HUỶ BỎ
            </button>
          </div>
          <div className='new-pots1'>
            <button className='new-post-button' onClick={handleSubmit}>
              ĐĂNG BÀI
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNewCourse
