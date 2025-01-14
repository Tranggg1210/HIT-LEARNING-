import { useState } from 'react'
import './EditListSection.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { updateSection } from '../../apis/section.api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const EditListSection = ({ onCreate, onCancel }) => {
  const [locationClass, setLocationClass] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [describeSection, setDescribeSection] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  let { id } = useParams()
  const handleCreateSection = async () => {
    if (sectionName && describeSection && location) {
      const sectionData = {
        location: locationClass,
        name: sectionName,
        description: describeSection,
        courseId: id,
      }

      try {
        setLoading(true)
        await updateSection(id, sectionData)
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
      } finally {
        setLoading(false)
      }
    }
  }
  const handleLocationChange = (event) => {
    setLocationClass(event.target.value)
  }
  return (
    <>
      {loading && <Loading />}
      <div className='flex-center'>
        <div className='create-folder-container'>
          <h2>SỬA BUỔI HỌC</h2>
          <div className='new-button-location-type'>
            <FormControl sx={{ m: 1, width: '100%', margin: '8px 0px' }} size='small'>
              <InputLabel className='location-type-select-label'>Loại Thứ tự</InputLabel>
              <Select
                labelId='location-type-select-label'
                className='location-type-select'
                value={locationClass}
                label='Số thứ tự'
                onChange={handleLocationChange}>
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='new-infors'>
            <div className='new-infor-folder'>
              <TextField
                sx={{ width: '100%' }}
                id='outlined-password-input'
                label='Tên buổi học'
                type='text'
                autoComplete='off'
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                rows={1}
                className='new-textarea'
                InputProps={{
                  style: { height: '45px' },
                }}
              />
            </div>
            <div className='new-infor-describe'>
              <TextField
                sx={{ width: '100%' }}
                id='outlined-password-input'
                label='Mô tả buổi học'
                type='text'
                autoComplete='off'
                value={describeSection}
                onChange={(e) => setDescribeSection(e.target.value)}
                rows={4}
                className='new-textarea'
                multiline
                InputProps={{
                  style: { height: '125px', alignItems: 'flex-start' },
                }}
              />
            </div>
          </div>
          <div className='buttons'>
            <button className='cancel-button' onClick={onCancel}>
              HUỶ
            </button>
            <button className='create-button' onClick={handleCreateSection}>
              SỬA BUỔI HỌC
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default EditListSection
