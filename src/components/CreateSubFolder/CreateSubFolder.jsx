import { useRef, useState } from 'react'
import './CreateSubFolder.scss'
import { IconUpload } from '@tabler/icons-react'

const CreateSubFolder = () => {
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
    }
    try {
      const result = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      })
      const data = await result.json()
      setUpload(data.files)
      setStatus('Sucssec')
    } catch (error) {
      setStatus('Fails')
    }
  }
  const Result = ({ status }) => {
    if (status === 'success') {
      return <p>✅ Uploaded successfully!</p>
    } else if (status === 'fail') {
      return <p>❌ Upload failed!</p>
    } else if (status === 'uploading') {
      return <p>⏳ Uploading started...</p>
    } else {
      return null
    }
  }
  return (
    <>
      <div className='create-sub-folder'>
        <h2>TẠO FOLDER CON</h2>
        <div className='sub-folder-header'>
          <div className='upload-file'>
            <div>
              {' '}
              {files ? '' : <IconUpload onClick={() => inputRef.current.click()} />}
              {files &&
                [...files].map((file, idx) => {
                  ;<section key={file.name}>
                    <ul>
                      <li>Name: {file.name}</li>
                    </ul>
                  </section>
                })}
            </div>
            <div>
              <input type='file' multiple onChange={handleFileChage} ref={inputRef} />
            </div>
          </div>
          <div className='infors'>
            <div className='infor-folder'>
              <input
                type='text'
                placeholder='Tên folder con'
                value={subFolderName}
                onChange={(e) => setSubFolderName(e.target.value)}
              />
            </div>
            <div className='infor-describe'>
              <input
                type='text'
                placeholder='Mô tả folder con'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='pots'>
          <button className='post-button' onClick={handleUpload}>
            ĐĂNG
          </button>
          <Result status={status} />
        </div>
      </div>
    </>
  )
}
export default CreateSubFolder
