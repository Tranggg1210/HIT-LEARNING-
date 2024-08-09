import { useEffect, useState } from 'react'
import './CouresUserPrivate.scss'
import { useNavigate } from 'react-router-dom'
import { getAllCourse } from '../../apis/courses.api'
import ClassesItem from '../ClassesItem/ClassesItem'
import toast from 'react-hot-toast'
const CouresUserPrivate = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])

  const loadAllCourse = async () => {
    try {
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải dữ liệu khóa học')
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
