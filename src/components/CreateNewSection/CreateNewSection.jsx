import { useEffect, useRef, useState } from 'react'
import './CreateNewSection.scss'
import { IconUpload } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../../apis/item.api'

const CreateSubFolder = ({ itemId, onCancel, editingItemData }) => {
  // const [itemName, setItemName] = useState('')
  // const [describeItem, setDescribeItem] = useState('')
  const [itemName, setItemName] = useState(editingItemData ? editingItemData.name : '')
  const [describeItem, setDescribeItem] = useState(
    editingItemData ? editingItemData.description : '',
  )
  const [uploadItem, setUploadItem] = useState(null)

  const navigate = useNavigate()
  const inputRef = useRef()

  // console.log('Item id', itemId)

  useEffect(() => {
    if (editingItemData) {
      setItemName(editingItemData.name)
      setDescribeItem(editingItemData.description)
      // Assuming the file URL or file itself is stored in editingItemData
      setUploadItem(editingItemData.file)
    }
  }, [editingItemData])
  const handleFileChangeItem = (e) => {
    const file = e.target.files[0]
    setUploadItem(file)
    console.log(file)
  }
  const handleSubmitItem = async () => {
    // if (itemName && describeItem && uploadItem) {
    if (itemName && describeItem && (uploadItem || editingItemData)) {
      const itemData = {
        name: itemName,
        description: describeItem,
        sectionId: itemId,
        file: uploadItem,
      }
      console.log(itemData)
      try {
        if (editingItemData) {
          await updateItem(itemId, itemData)
        } else {
          await createItem(itemData)
        }
        // await createItem(itemData)
        // onCreate(courseData)
        // onCancel()
        navigate(onCancel)
      } catch (error) {
        console.log('Error creating course:', error)
      }
    }
  }

  return (
    <>
      <div className='create-new-section'>
        <h2>{editingItemData ? 'SỬA VIDEO BUỔI HỌC' : 'TẠO VIDEO BUỔI HỌC'}</h2>
        <div className='new-section-header'>
          <div className='new-upload-file'>
            <div className='new-icon-upload'>
              {uploadItem ? (
                <p>File name: {uploadItem?.name}</p>
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
              <input type='file' onChange={handleFileChangeItem} ref={inputRef} />
              <button className='new-button-upload' onClick={() => inputRef.current.click()}>
                Chọn tệp
              </button>
            </div>
          </div>

          <div className='new-infors'>
            <h2>Tên Video</h2>
            <div className='new-infor-folder'>
              <textarea
                placeholder='Tên video buổi học'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                rows={1}
                className='new-textarea'
              />
            </div>
            <div className='new-infor-describe'>
              <h2>Mô tả Video</h2>
              <textarea
                placeholder='Mô tả video buổi học'
                value={describeItem}
                onChange={(e) => setDescribeItem(e.target.value)}
                rows={4}
                className='new-textarea'
              />
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
            <button className='new-post-button' onClick={handleSubmitItem}>
              {editingItemData ? 'CẬP NHẬT VIDEO' : 'ĐĂNG VIDEO'}
            </button>
            {/* <Result status={status} /> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateSubFolder
