import { useRef } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './CourseLeaderClass.scss'
import { useNavigate } from 'react-router-dom'

const CourseLeaderClass = ({ courses, onCancel }) => {
  const navigate = useNavigate()
  const inputElement = useRef()

  return (
    <div className='courses'>
      <div className='back'>
        <p className='xem_them' onClick={onCancel}>
          Quay lại
        </p>
      </div>
      <div>
        <h1>DANH SÁCH LỚP HỌC PRIVATE</h1>
      </div>
      <div ref={inputElement} className='course-list'>
        {courses.map((item, idx) => (
          <div
            key={idx}
            className='course-item'
            onClick={() => navigate(`/detail-course/${item.id}`)}>
            <div>
              <img
                className='course-img'
                src={`https://hitproduct2024-production-a244.up.railway.app/stream/${item.videoId}`}
                alt=''
              />
            </div>
            <p className='course-name'>{item.name}</p>
            <div className='infor'>
              <p className='luot-xem'>Lượt xem</p>
              <p className='icon'>
                <IconMessageCircle></IconMessageCircle>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseLeaderClass
