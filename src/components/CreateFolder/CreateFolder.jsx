import { useState } from 'react'
import './CreateFolder.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { createSection } from '../../apis/section.api'

const CreateFolder = ({ onCreate, onCancel }) => {
  const [locationClass, setLocationClass] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [describeSection, setDescribeSection] = useState('')
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
        await createSection(sectionData)
        onCreate()
        onCancel()
      } catch (error) {
        console.log('Error creating course:', error)
      }
    }
  }
  const handleLocationChange = (event) => {
    setLocationClass(event.target.value)
  }
  return (
    <>
      <div className='flex-center'>
        <div className='create-folder-container'>
          <h2>TẠO BUỔI HỌC</h2>
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
                sx={{ width: '100%', height: '125px' }}
                id='outlined-password-input'
                label='Mô tả buổi học'
                type='text'
                autoComplete='off'
                value={describeSection}
                onChange={(e) => setDescribeSection(e.target.value)}
                rows={4}
                className='new-textarea'
                InputProps={{
                  style: { height: '125px' },
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
