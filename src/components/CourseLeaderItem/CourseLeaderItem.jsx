import fetchItems from '../../hooks/server'
import { useRef } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './CourseLeaderItem.scss'
import { useNavigate } from 'react-router-dom'
const CourseLeaderItem = ({ title, api }) => {
  const { data: course } = fetchItems(`https://phimapi.com/v1/api/danh-sach/${api}?limit=12&page=2`)
  // console.log(course.data.data.items)
  const navigate = useNavigate()
  const handleClickEdit = () => {
    navigate('/editCours')
  }
  const inputElement = useRef()
  return (
    <>
      <div className='more-course'>
        <p className='name'>Danh sách các khoá học</p>
        <button className='button-course'>Tạo khoá học</button>
      </div>
      <div className='courses'>
        <div className='more'>
          {/* <h1 className='title-films'>{title}</h1> */}
          <p className='xem_them'>Xem thêm &gt;</p>
        </div>
        <div ref={inputElement} className='course-list'>
          {course &&
            course.data &&
            course.data.data &&
            course.data.data.items.slice(0, 8).map((item, idx) => (
              <div key={idx} className='course-item'>
                <img
                  className='course-img'
                  src={`https://img.phimapi.com/${item.poster_url}`}
                  alt=''
                />
                <div className='infor'>
                  <p className='luot-xem'>Lượt xem</p>
                  <p className='icon'>
                    <IconMessageCircle></IconMessageCircle>
                  </p>
                </div>
                <div className='button'>
                  <button className='edit' onClick={handleClickEdit}>
                    Chỉnh sửa
                  </button>
                  <button className='delete'>Xoá</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
export default CourseLeaderItem
