// import { useParams } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './EditCourse.scss'

// const EditCourse = () => {
//   const { id } = useParams()
//   const [course, setCourse] = useState(null)

//   useEffect(() => {
//     // Fetch course data by id
//     const fetchCourse = async () => {
//       try {
//         const response = await axios.get(`https://phimapi.com/v1/api/phim/${id}`)
//         setCourse(response.data)
//       } catch (error) {
//         console.error('Error fetching course:', error)
//       }
//     }

//     fetchCourse()
//   }, [id])

//   const handleSave = async () => {
//     try {
//       await axios.put(`https://phimapi.com/v1/api/phim/${id}`, course)
//       // handle success, e.g., navigate back to the course list
//     } catch (error) {
//       console.error('Error saving course:', error)
//     }
//   }

//   return (
//     <div className='edit-course'>
//       {course ? (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             handleSave()
//           }}>
//           <input
//             type='text'
//             value={course.title}
//             onChange={(e) => setCourse({ ...course, title: e.target.value })}
//           />
//           {/* Add other form fields as necessary */}
//           <button type='submit'>Lưu</button>
//         </form>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// export default EditCourse
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconPencil } from '@tabler/icons-react'
import './EditCourse.scss'

const EditCourse = () => {
  const navigate = useNavigate()

  const handleEditCourse = (id) => {
    navigate(`/edit-course/${id}`)
  }

  return (
    <div className='course-list-container'>
      <div className='course-header'>
        <img src='react-logo.png' alt='React JS' className='course-logo' />
        <h2>REACTJS</h2>
        <p>Tổng số video hiện có: 12</p>
        <button className='edit-course-button'>SỬA KHÓA HỌC</button>
      </div>
      <div className='course-content'>
        <div className='folder'>
          <div className='folder-header'>
            <h3>1. Giới thiệu</h3>
            <div className='folder-actions'>
              <IconPencil onClick={() => handleEditCourse(1)} className='edit-icon' />
              <button className='add-button'>+</button>
            </div>
          </div>
          <div className='folder-items'>
            <div className='folder-item'>
              <p>1. Giới thiệu</p>
              <IconPencil onClick={() => handleEditCourse(1)} className='edit-icon' />
            </div>
            <div className='folder-item'>
              <p>2. Giới thiệu về React</p>
              <IconPencil onClick={() => handleEditCourse(2)} className='edit-icon' />
            </div>
            <div className='folder-item'>
              <p>3. Cách cài đặt</p>
              <IconPencil onClick={() => handleEditCourse(3)} className='edit-icon' />
            </div>
          </div>
        </div>
        <div className='folder'>
          <div className='folder-header'>
            <h3>2. Bài 2</h3>
          </div>
          <div className='folder-items'>
            <div className='folder-item'>
              <p>2. Bài 2</p>
            </div>
          </div>
        </div>
        <div className='folder'>
          <div className='folder-header'>
            <h3>3. Bài 3</h3>
          </div>
          <div className='folder-items'>
            <div className='folder-item'>
              <p>3. Bài 3</p>
            </div>
          </div>
        </div>
        <button className='create-folder-button'>TẠO FOLDER</button>
      </div>
    </div>
  )
}

export default EditCourse
