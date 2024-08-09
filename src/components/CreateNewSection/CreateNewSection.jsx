import { useEffect, useRef, useState } from 'react'
import './CreateNewSection.scss'
import { IconUpload } from '@tabler/icons-react'
import { createItem, updateItem } from '../../apis/item.api'
import { TextField } from '@mui/material'
import toast from 'react-hot-toast'

const CreateSubFolder = ({ itemId, onCancel, editingItemData, onCreate }) => {
  const [itemName, setItemName] = useState(editingItemData ? editingItemData.name : '')
  const [describeItem, setDescribeItem] = useState(
    editingItemData ? editingItemData.description : '',
  )
  const [uploadItem, setUploadItem] = useState(null)

  const inputRef = useRef()

  useEffect(() => {
    if (editingItemData) {
      setItemName(editingItemData.name)
      setDescribeItem(editingItemData.description)
      setUploadItem(editingItemData.file)
    }
  }, [editingItemData])

  const handleFileChangeItem = (e) => {
    const file = e.target.files[0]
    setUploadItem(file)
  }

  const handleSubmitItem = async () => {
    if (itemName && describeItem && (uploadItem || editingItemData)) {
      const itemData = {
        name: itemName,
        description: describeItem,
        sectionId: itemId,
        file: uploadItem,
      }
      try {
        if (editingItemData) {
          await updateItem(itemId, itemData)
        } else {
          await createItem(itemData)
        }
        onCreate()
        onCancel()
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi sửa tạo dữ liệu video buổi học')
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
            <div className='new-infor-folder'>
              <TextField
                sx={{ width: '100%' }}
                id='outlined-folder-input'
                label='Tên video buổi học'
                type='text'
                autoComplete='off'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                rows={1}
                className='new-textarea'
                InputProps={{
                  style: { height: '50px' },
                }}
              />
            </div>
            <div className='new-infor-describe'>
              <TextField
                sx={{ width: '100%', height: '125px' }}
                id='outlined-describe-input'
                label='Mô tả video buổi học'
                type='text'
                autoComplete='off'
                value={describeItem}
                onChange={(e) => setDescribeItem(e.target.value)}
                rows={4}
                className='new-textarea'
                InputProps={{
                  style: { height: '125px' },
                }}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSubFolder
