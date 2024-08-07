import { useEffect, useState } from 'react'
import './CouresUserPrivate.scss'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse } from '../../apis/courses.api'
import ClassesItem from '../ClassesItem/ClassesItem'
const CouresUserPrivate = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])

  const loadAllCourse = async () => {
    try {
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadAllCourse()
  }, [])

  useEffect(() => {
    const privateCourses = []
    const publicCourses = []

    courses.forEach((item) => {
      if (item.isPrivate) {
        privateCourses.push(item)
      } else {
        publicCourses.push(item)
      }
    })

    setClassPrivate(privateCourses)
    setClassPublic(publicCourses)
  }, [courses])

  const navigate = useNavigate()

  const handleSeeMore = (courses, title) => {
    navigate('/list-course', { state: { courses, title } })
  }

  return (
    <>
      <>
        <div className='more-course'>
          <h1>Danh sách các khoá học</h1>
        </div>
        <ClassesItem
          title='Lớp học Private'
          courses={classPrivate}
          handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Private')}
        />
        <ClassesItem
          title='Lớp học Public'
          courses={classPublic}
          handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Public')}
        />
      </>
    </>
  )
}

export default CouresUserPrivate
