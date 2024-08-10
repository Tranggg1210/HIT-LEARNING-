import { useState } from 'react'
import './CreateFolder.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { createSection } from '../../apis/section.api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const CreateFolder = ({ onCreate, onCancel }) => {
  const [locationClass, setLocationClass] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [describeSection, setDescribeSection] = useState('')
  const [loading, setLoading] = useState(false)

  const [locationClassError, setLocationClassError] = useState(false)
  const [sectionNameError, setSectionNameError] = useState(false)
  const [describeSectionError, setSescribeSectionError] = useState(false)

  const navigate = useNavigate()
  let { id } = useParams()
  const handleCreateSection = async () => {
    let check = false

    if (!locationClass.trim()) {
      setLocationClassError(true)
      check = true
    } else {
      setLocationClassError(false)
    }

    if (!sectionName.trim()) {
      setSectionNameError(true)
      check = true
    } else {
      setSectionNameError(false)
    }

    if (!describeSection) {
      setSescribeSectionError(true)
      check = true
    } else {
      setSescribeSectionError(false)
    }

    if (check) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
      return
    }
    if (sectionName && describeSection && location) {
      const sectionData = {
        location: locationClass,
        name: sectionName,
        description: describeSection,
        courseId: id,
      }

      try {
        setLoading(true)
        await createSection(sectionData)
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
          <h2>TẠO BUỔI HỌC</h2>
          <div className='new-button-location-type'>
            <FormControl
              sx={{ m: 1, width: '100%', margin: '24px 0px' ,height:'max-content' }}
              size='small'
              error={locationClassError}
              helperText={locationClassError ? 'Vị trí buổi học không được để trống' : ''}>
              <InputLabel className='location-type-select-label'>Loại thứ tự</InputLabel>
              <Select
                labelId='location-type-select-label'
                className='location-type-select'
                sx={{marginBottom:'16px'}}
                value={locationClass}
                label='Số thứ tự'
                onChange={handleLocationChange}>
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='6'>6</MenuItem>
                <MenuItem value='7'>7</MenuItem>
                <MenuItem value='8'>8</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='new-infors'>
            <div className='new-infor-folder'>
              <TextField
                error={sectionNameError}
                helperText={sectionNameError ? 'Tên buổi học không được để trống' : ''}
                sx={{ width: '100%' ,marginBottom:'16px' }}
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
                error={describeSectionError}
                helperText={describeSectionError ? 'Mô tả buổi học không được để trống' : ''}
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
              TẠO BUỔI HỌC
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateFolder
