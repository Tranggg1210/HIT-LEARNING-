import { useRef } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './CourseLeaderItem.scss'
import { useNavigate } from 'react-router-dom'

const CourseLeaderItem = ({ title, courses, handleClickEdit, handleDelete, handleSeeMore }) => {
  const navigate = useNavigate()
  const inputElement = useRef()

  const handleRight = () => {
    inputElement.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  const handleLeft = () => {
    inputElement.current?.scrollBy({ left: -300, behavior: 'smooth' })
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
            <img
              className='course-img'
              src={`https://hitproduct2024-production-a244.up.railway.app/stream/${item.videoId}`}
              alt=''
            />
            <p className='course-name'>{item.name}</p>
            <div className='infor'>
              <p className='luot-xem'>Lượt xem</p>
              <p className='icon'>
                <IconMessageCircle></IconMessageCircle>
              </p>
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
                  handleDelete(item.id)
                  e.stopPropagation()
                }}>
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <i className='fa-solid fa-chevron-left' onClick={handleLeft}></i>
      <i className='fa-solid fa-chevron-right' onClick={handleRight}></i> */}
    </div>
  )
}

export default CourseLeaderItem
