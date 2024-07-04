import { useState } from 'react'
import './CreateFolder.scss'

const CreateFolder = ({ onCreate, onCancel }) => {
  const [folderName, setFolderName] = useState('')
  const handleCreate = () => {
    if (folderName.trim() !== '') {
      onCreate(folderName)
      setFolderName('')
    }
  }
  return (
    <>
      <div className='create-folder-container'>
        <h2>TẠO FOLDER</h2>
        <input
          type='text'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder='Tên Folder'
        />
        <div className='buttons'>
          <button className='cancel-button' onClick={onCancel}>
            CANCEL
          </button>
          <button className='create-button' onClick={handleCreate}>
            TẠO FOLDER
          </button>
        </div>
      </div>
    </>
  )
}
export default CreateFolder
