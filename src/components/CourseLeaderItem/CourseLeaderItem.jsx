import { useRef } from 'react'
import './CourseLeaderItem.scss'
import { useNavigate } from 'react-router-dom'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { IconClockHour9 } from '@tabler/icons-react'
import math from '../../assets/images/maths.png'
import { confirmAlert } from 'react-confirm-alert'

const CourseLeaderItem = ({ title, courses, handleClickEdit, handleDelete, handleSeeMore }) => {
  const navigate = useNavigate()
  const inputElement = useRef()

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

  const confirmDeleteCourse = (courseId) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa khoá học này không?',
      buttons: [
        {
          label: 'Không',
          onClick: () => {},
        },
        {
          label: 'Có',
          onClick: () => handleDelete(courseId),
        },
      ],
    })
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
        {courses?.length > 0 ? (
          courses?.slice(0, 4).map((item, idx) => (
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
              <div className='button-course-leader-item'>
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
                    confirmDeleteCourse(item.id)
                    e.stopPropagation()
                  }}>
                  Xoá
                </button>
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

export default CourseLeaderItem
