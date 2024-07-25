import fetchItems from '../../hooks/server'
import { useEffect, useRef, useState } from 'react'
import { IconMessageCircle } from '@tabler/icons-react'
import './CourseLeaderItem.scss'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse } from '../../apis/courses.api'
const CourseLeaderItem = () => {
  const [courses, setCourses] = useState([])

  const loadAllCourse = async () => {
    try {
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
      console.log('Result', result)
      console.log(courses)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadAllCourse()
  }, [])
  console.log(courses)
  const navigate = useNavigate()
  // const handleClickEdit = (id) => {
  //   navigate(`/editCours/${id}`)
  // }
  const handleClickEdit = () => {
    navigate('/editCours')
  }
  const handleClickNewFolder = () => {
    navigate('/createNewCourse')
  }
  const inputElement = useRef()
  // console.log(course)
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='more-course'>
        <p className='name'>Danh sách các khoá học</p>
        <button className='button-course' onClick={handleClickNewFolder}>
          Tạo khoá học
        </button>
      </div>
      <div className='courses'>
        <div className='more'>
          <p className='xem_them'>Xem thêm &gt;</p>
        </div>
        <div ref={inputElement} className='course-list'>
          {courses.map((item, idx) => (
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
                <button className='edit' onClick={handleClickEdit}>
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
      </div>
    </>
  )
}
export default CourseLeaderItem
