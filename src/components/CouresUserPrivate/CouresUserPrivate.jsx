import { useEffect, useState } from 'react'
import './CouresUserPrivate.scss'
import { useNavigate } from 'react-router-dom'
import { getAllCourse } from '../../apis/courses.api'
import ClassesItem from '../ClassesItem/ClassesItem'
import toast from 'react-hot-toast'
import Loading from '../Loading/Loading'
const CouresUserPrivate = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])
  const [loading, setLoading] = useState(false)
  const loadAllCourse = async () => {
    try {
      setLoading(true)
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
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
      {loading && <Loading />}
      <div className='more-course'>
      </div>
      {}
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
  )
}

export default CouresUserPrivate
