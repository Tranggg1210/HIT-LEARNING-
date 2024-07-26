import { useRef, useState } from 'react'
import './CreateNewCourse.scss'
import { IconUpload } from '@tabler/icons-react'
import { createCourse } from '../../apis/courses.api'
import LinearProgress from '@mui/material/LinearProgress'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'

const CreateNewCourse = ({ onCreate, onCancel }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [classType, setClassType] = useState('Public')
  const inputRef = useRef()

  const [status, setStatus] = useState('initial')
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
    console.log(file)
  }

  const handleSubmit = async () => {
    if (folderName && describe && upload) {
      const courseData = {
        userId: '0b602036-814e-4f53-8ee5-1f0b2e12452b',
        name: folderName,
        description: describe,
        file: upload,
        isPrivate: classType === 'Private',
      }
      try {
        await createCourse(courseData)
        onCreate(courseData)
        onCancel()
      } catch (error) {
        console.log('Error creating course:', error)
      }
    }
    navigate('/')
  }

  // const Result = ({ status }) => {
  //   if (status === 'Success') {
  //     return <p>✅ Uploaded successfully!</p>
  //   } else if (status === 'Fails') {
  //     return <p>❌ Upload failed!</p>
  //   } else if (status === 'Upload') {
  //     return <p>⏳ Uploading started...</p>
  //   } else {
  //     return null
  //   }
  // }

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value)
  }

  return (
    <>
      {/* {status === 'Upload' && (
        <div className='progress-bar'>
          <LinearProgress variant='determinate' value={progress} />
        </div>
      )} */}
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
                  <p>Kéo ảnh, video demo để tải lên</p>
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
            <h2>Tên khoá học</h2>
            <div className='new-infor-folder'>
              <textarea
                placeholder='Tên khoá học'
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                rows={1}
                className='new-textarea'
              />
            </div>
            <div className='new-infor-describe'>
              <h2>Mô tả khoá học</h2>
              <textarea
                placeholder='Mô tả khoá học'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                rows={4}
                className='new-textarea'
              />
            </div>
            <div className='new-button-class-type'>
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
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
            <button className='new-post-button-cancel' onClick={onCancel}>
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
