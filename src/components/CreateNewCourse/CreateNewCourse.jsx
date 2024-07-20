import { useRef, useState } from 'react'
import './CreateNewCourse.scss'
import { IconUpload } from '@tabler/icons-react'
import { createCourse } from '../../apis/courses.api'
import LinearProgress from '@mui/material/LinearProgress'

const CreateNewCourse = ({ onCreate, onCancel }) => {
  const [folderName, setFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState(null)
  const [status, setStatus] = useState('initial')
  // const [files, setFiles] = useState(null)
  const [classType, setClassType] = useState('Public')
  const [progress, setProgress] = useState(0) // Thêm state cho progress

  // const handleFileChange = (e) => {
  //   if (e.target.files) {
  //     setStatus('initial')
  //     setFiles(e.target.files)
  //   }
  // }
  const inputRef = useRef()

  // const handleUpload = async () => {
  //   if (files) {
  //     setStatus('Upload')
  //     const formData = new FormData()

  //     ;[...files].forEach((file) => {
  //       formData.append('files', file)
  //     })
  //     try {
  //       // Giả lập tiến trình upload
  //       for (let i = 0; i <= 100; i++) {
  //         await new Promise((resolve) => setTimeout(resolve, 50))
  //         setProgress(i)
  //       }

  //       const result = await fetch('https://httpbin.org/post', {
  //         method: 'POST',
  //         body: formData,
  //       })
  //       const data = await result.json()
  //       setUpload(data.files)
  //       setStatus('Success')
  //       return data.files
  //     } catch (error) {
  //       setStatus('Fails')
  //       return null
  //     }
  //   }
  //   return null
  // }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUpload(file)
    console.log(file)
  }

  const handleSubmit = async () => {
    if (folderName && describe && upload) {
      // const uploadedFiles = await handleUpload()
      // if (uploadedFiles) {
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
      // }
    }
  }

  const Result = ({ status }) => {
    if (status === 'Success') {
      return <p>✅ Uploaded successfully!</p>
    } else if (status === 'Fails') {
      return <p>❌ Upload failed!</p>
    } else if (status === 'Upload') {
      return <p>⏳ Uploading started...</p>
    } else {
      return null
    }
  }
  return (
    <>
      {status === 'Upload' && (
        <div className='progress-bar'>
          <LinearProgress variant='determinate' value={progress} />
        </div>
      )}
      <div className='create-new-course'>
        <h2>TẠO KHOÁ HỌC MỚI</h2>
        <div className='new-courser-header'>
          <div className='new-upload-file'>
            <div className='new-icon-upload'>
              {upload ? (
                // [...files].map((file, idx) => (
                //   <section key={file.name} className='new-nameFile'>
                //     <ul>
                //       <li>File name: {file.name}</li>
                //     </ul>
                //   </section>
                // ))
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
            <div className='new-infor-folder'>
              <input
                type='text'
                placeholder='Tên folder con'
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <div className='new-infor-describe'>
              <input
                type='text'
                placeholder='Mô tả folder con'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
            </div>
            <div className='new-button-class-type'>
              <h2>Loại lớp học</h2>
              <div className='new-box-button-type'>
                <button
                  className={`button-${classType === 'Public' ? 'active' : ''}`}
                  onClick={() => setClassType('Public')}>
                  PUBLIC
                </button>
                <button
                  className={`button-${classType === 'Private' ? 'active' : ''}`}
                  onClick={() => setClassType('Private')}>
                  PRIVATE
                </button>
              </div>
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
            <Result status={status} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNewCourse
