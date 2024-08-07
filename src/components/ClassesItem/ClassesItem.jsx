import { useRef } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './ClassesItem.scss'
import { useNavigate } from 'react-router-dom'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { IconClockHour9 } from '@tabler/icons-react';
const ClassesItem = ({ title, courses, handleClickEdit, handleDelete, handleSeeMore }) => {
  const navigate = useNavigate()
  const inputElement = useRef()

  const handleRight = () => {
    inputElement.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }
  console.log(courses)
  const handleLeft = () => {
    inputElement.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
  const determineMediaType = (url = '') => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv']
    const isImage = imageExtensions.some((ext) => url.endsWith(ext))
    if (isImage) {
      return 'image'
    }

    const isVideo = videoExtensions.some((ext) => url.endsWith(ext))
    if (isVideo) {
      return 'video'
    }
    return 'empty'
  }
  return (
    <div className='courses'>
      <div className='more'>
        <h2>{title}</h2>
        <p className='xem_them' onClick={() => handleSeeMore(courses)}>
          Xem thêm &gt;
        </p>
      </div>
      <div ref={inputElement} className='course-list'>
        {courses.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className='course-item'
            onClick={() => navigate(`/detail-course/${item.id}`)}>
            {determineMediaType(item.videoId) === 'video' && (
              <video controls width='600' className='course-img'>
                <source
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                  type='video/mp4'
                />
              </video>
            )}
            {determineMediaType(item.videoId) === 'image' && (
              <img
                className='course-img'
                src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                alt='Khóa học'
              />
            )}
            {determineMediaType(item.videoId) === 'empty' && (
              <img src={CourseList1} alt='Khóa học' className='course-img' />
            )}
            <div className="infor-container">
              <p className='course-name'>{item.name}</p>
              <div className='infor'>
                <IconClockHour9 stroke={2} />
                <p>{isoDayMonthYear(item.createdAt)}</p>
              </div>
            </div>
            {/* <div className='button-course-leader-item'>
              <button
                className='edit'
                onClick={(e) => {
                  handleClickEdit(item.id)
                  e.stopPropagation()
                }}>
                Chỉnh sửa
              </button>
              <button
                className='delete'
                onClick={(e) => {
                  handleDelete(item.id)
                  e.stopPropagation()
                }}>
                Xoá
              </button>
            </div> */}
          </div>
        ))}
      </div>
      {/* <i className='fa-solid fa-chevron-left' onClick={handleLeft}></i>
      <i className='fa-solid fa-chevron-right' onClick={handleRight}></i> */}
    </div>
  )
}

export default ClassesItem
