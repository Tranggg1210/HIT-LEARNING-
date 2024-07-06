import { useRef, useState } from 'react'
import './EditSubFolder.scss'
import { IconUpload } from '@tabler/icons-react'

const EditSubFolder = ({ onCreate, onCancel }) => {
  const [subFolderName, setSubFolderName] = useState('')
  const [describe, setDescribe] = useState('')
  const [upload, setUpload] = useState([])
  const [status, setStatus] = useState('initial')
  const [files, setFiles] = useState(null)

  const handleFileChage = (e) => {
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
      <div className='edit-sub-folder'>
        <h2>SỬA FOLDER CON</h2>
        <div className='edit-sub-folder-header'>
          <div className='edit-upload-file'>
            <div className='edit-icon-upload'>
              {files ? (
                [...files].map((file, idx) => (
                  <section key={file.name} className='edit-nameFile'>
                    <ul>
                      <li>File name: {file.name}</li>
                    </ul>
                  </section>
                ))
              ) : (
                <div className='edit-boxUpload'>
                  <div className='edit-boxIcon'>
                    <IconUpload
                      className='edit-iconUpload'
                      onClick={() => inputRef.current.click()}
                    />
                  </div>

                  <p>Kéo ảnh, video demo để tải lên</p>
                </div>
              )}
            </div>
            <div className='edit-input-upload'>
              <input type='file' multiple onChange={handleFileChage} ref={inputRef} />
              <button className='edit-button-upload' onClick={() => inputRef.current.click()}>
                Chọn tệp
              </button>
            </div>
          </div>
          <div className='edit-infors'>
            <div className='edit-infor-folder'>
              <input
                type='text'
                placeholder='Tên folder con'
                value={subFolderName}
                onChange={(e) => setSubFolderName(e.target.value)}
              />
            </div>
            <div className='edit-infor-describe'>
              <input
                type='text'
                placeholder='Mô tả folder con'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='pots-edit'>
          <button className='edit-post-button' onClick={handleSubmit}>
            CẬP NHẬT
          </button>
          <button className='edit-post-button-cancel' onClick={onCancel}>
            HUỶ BỎ
          </button>
          <Result status={status} />
        </div>
      </div>
    </>
  )
}
export default EditSubFolder
