import { useRef, useState } from 'react'
import './CreateNewCourse.scss'
import { IconUpload } from '@tabler/icons-react'

const CreateNewCourse = ({ onCreate, onCancel }) => {
  const [subFolderName, setSubFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState([])
  const [status, setStatus] = useState('initial')
  const [files, setFiles] = useState(null)
  const [classType, setClassType] = useState('Public')
  const [location, setLocation] = useState('Hà Nội')

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus('initial')
      setFiles(e.target.files)
    }
  }
  const inputRef = useRef()

  const handleUpload = async () => {
    if (files) {
      setStatus('Upload')
      const formData = new FormData()

      ;[...files].forEach((file) => {
        formData.append('files', file)
      })
      try {
        const result = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        })
        const data = await result.json()
        setUpload(data.files)
        setStatus('Success')
        return data.files
      } catch (error) {
        setStatus('Fails')
        return null
      }
    }
    return null
  }
  const handleSubmit = async () => {
    if (subFolderName && describe && files) {
      const uploadedFiles = await handleUpload()
      if (uploadedFiles) {
        onCreate({
          name: subFolderName,
          describe,
          files: uploadedFiles,
          classType,
          location,
        })
        onCancel()
      }
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
      <div className='create-new-course'>
        <h2>TẠO KHOÁ HỌC MỚI</h2>
        <div className='new-courser-header'>
          <div className='new-upload-file'>
            <div className='new-icon-upload'>
              {files ? (
                [...files].map((file, idx) => (
                  <section key={file.name} className='new-nameFile'>
                    <ul>
                      <li>File name: {file.name}</li>
                    </ul>
                  </section>
                ))
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
              <input type='file' multiple onChange={handleFileChange} ref={inputRef} />
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
                value={subFolderName}
                onChange={(e) => setSubFolderName(e.target.value)}
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
            <div className='new-button-location'>
              <h2>Địa Chỉ Lớp học</h2>
              <div className='new-box-button-location'>
                <button
                  className={`button-${location === 'Hà Nội' ? 'active' : ''}`}
                  onClick={() => setLocation('Hà Nội')}>
                  HÀ NỘI
                </button>
                <button
                  className={`button-${location === 'Hà Nam' ? 'active' : ''}`}
                  onClick={() => setLocation('Hà Nam')}>
                  HÀ NAM
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='new-pots'>
          <button className='new-post-button' onClick={handleSubmit}>
            ĐĂNG BÀI
          </button>
          <button className='new-post-button-cancel' onClick={onCancel}>
            HUỶ BỎ
          </button>
          <Result status={status} />
        </div>
      </div>
    </>
  )
}
export default CreateNewCourse
