import { useRef } from 'react'
import './CourseUserClass.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconClockHour9 } from '@tabler/icons-react'
import math from '../../assets/images/maths.png'

const CourseUserClass = () => {
  const navigate = useNavigate()
  const inputElement = useRef()
  const location = useLocation()
  const { courses, title } = location.state || { courses: [], title: '' }
  const handleCancel = () => {
    navigate(-1)
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
      <div className='back'>
        <p className='xem_them' onClick={handleCancel}>
          &lt; Quay lại
        </p>
      </div>
      <div>
        <h1>
          {title === 'Lớp học Private' ? 'DANH SÁCH LỚP HỌC PRIVATE' : 'DANH SÁCH LỚP HỌC PUBLIC'}
        </h1>
      </div>
      <div ref={inputElement} className='course-list'>
        {courses.length ? (
          courses.map((item, idx) => (
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
          ))
        ) : (
          <div className='box-not-courses'>
            <div className='not-courses'>
              <img src={math} alt='' />
            </div>
            <p>Hiện tại chưa có khoá học nào!!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseUserClass
