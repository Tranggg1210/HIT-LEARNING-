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


const CreateNewCourse = ({ onCreate, onCancel }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [classType, setClassType] = useState('Public')
  const inputRef = useRef()
  const userAccess = useAuth()
  const [status, setStatus] = useState('initial')
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
  }
  
  const id_access_token = userAccess.user?.id ;
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

  return (
    <>
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
                  <p style={{marginTop:'12px'}}>Ảnh và video tải lên không quá 250MB </p>
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
                sx={{ width: '100%', marginBottom:'24px', }}
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
            </div>
            <div className='new-infor-describe'>
              <TextField
                sx={{ width: '100%', height: '125px' ,marginBottom:'24px'}}
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
              
            </div>
            <div className='new-button-class-type'>
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
            {/* <Result status={status} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNewCourse
