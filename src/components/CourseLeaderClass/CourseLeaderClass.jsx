import { useRef } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './CourseLeaderClass.scss'
import { useNavigate } from 'react-router-dom'
import { IconClockHour9 } from '@tabler/icons-react'

const CourseLeaderClass = ({ courses, title, onCancel }) => {
  const navigate = useNavigate()
  const inputElement = useRef()
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
  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
  return (
    <div className='courses'>
      <div className='back'>
        <p className='xem_them' onClick={onCancel}>
          Quay lại
        </p>
      </div>
      <div>
        <h1>
          {title === 'Lớp học Private' ? 'DANH SÁCH LỚP HỌC PRIVATE' : 'DANH SÁCH LỚP HỌC PUBLIC'}
        </h1>
      </div>
      <div ref={inputElement} className='course-list'>
        {courses.map((item, idx) => (
          <div
            key={idx}
            className='course-item'
            onClick={() => navigate(`/detail-course/${item.id}`)}>
            <div>
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
            </div>
            <div className='infor-container'>
              <div className='box-course-name'>
                <p className='course-name'>{item.name}</p>
              </div>
              <p className='course-leader-name'>{item.leaderName}</p>
              <div className='infor'>
                <IconClockHour9 stroke={2} />
                <p>{isoDayMonthYear(item.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseLeaderClass
