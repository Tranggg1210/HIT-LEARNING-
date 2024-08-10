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

  const [itemNameError, setItemNameError] = useState(false)
  const [describeItemError, setDescribeItemError] = useState(false)
  const [uploadItemError, setUploadItemError] = useState(false)

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
    let check = false

    if (!itemName.trim()) {
      setItemNameError(true)
      check = true
    } else {
      setItemNameError(false)
    }

    if (!describeItem.trim()) {
      setDescribeItemError(true)
      check = true
    } else {
      setDescribeItemError(false)
    }

    if (!uploadItem) {
      setUploadItemError(true)
      check = true
    } else {
      setUploadItemError(false)
    }

    if (check) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc.')
      return
    }
    if (uploadItem.size > 1050000000) {
      toast.error('Video không được vượt quá 1GB')
      return
    }
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
        if (error.mesaage) {
          toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
        } else if (error?.code === 'ERR_NETWORK') {
          toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
        } else {
          toast.error(error.message)
        }
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
                  <p>Video không được vượt quá 1GB</p>
                  {uploadItemError && (
                    <p className='error-text'>Vui lòng chọn video/ảnh dưới 1GB</p>
                  )}
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
                error={itemNameError}
                helperText={itemNameError ? 'Tên video buổi học không được để trống' : ''}
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
                error={describeItemError}
                helperText={describeItemError ? 'Mô tả video buổi học không được để trống' : ''}
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
