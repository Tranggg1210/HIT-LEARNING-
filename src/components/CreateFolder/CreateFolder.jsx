import { useState } from 'react'
import './CreateFolder.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { createSection } from '../../apis/section.api'

const CreateFolder = ({ onCreate, onCancel }) => {
  const [locationClass, setLocationClass] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [describeSection, setDescribeSection] = useState('')
  // const handleCreate = () => {
  //   if (folderName.trim() !== '') {
  //     onCreate(folderName)
  //     setFolderName('')
  //   }
  // }
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
        // onCreate(courseData)
        // onCancel()
        navigate(-1)
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
      <div className='create-folder-container'>
        <h2>TẠO BUỔI HỌC</h2>
        <div className='new-button-location-type'>
          <h3>Vị trí buổi học</h3>
          <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
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
          <h3>Tên buổi học</h3>
          <div className='new-infor-folder'>
            <textarea
              placeholder='Tên buổi học'
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              rows={1}
              className='new-textarea'
            />
          </div>
          <div className='new-infor-describe'>
            <h3>Mô tả buổi học</h3>
            <textarea
              placeholder='Mô tả buổi học'
              value={describeSection}
              onChange={(e) => setDescribeSection(e.target.value)}
              rows={4}
              className='new-textarea'
            />
          </div>
        </div>
        {/* <input
          type='text'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder='Tên Folder'
        /> */}
        <div className='buttons'>
          <button className='cancel-button' onClick={onCancel}>
            CANCEL
          </button>
          <button className='create-button' onClick={handleCreateSection}>
            TẠO BUỔI HỌC
          </button>
        </div>
      </div>
    </>
  )
}
export default CreateFolder
