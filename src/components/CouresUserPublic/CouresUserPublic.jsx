import { useEffect, useState } from 'react'
import './CouresUserPublic.scss'
import { useNavigate } from 'react-router-dom'
import { getAllCourse } from '../../apis/courses.api'
import ClassesItem from '../ClassesItem/ClassesItem'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const CouresUserPublic = () => {
  const [courses, setCourses] = useState([])
  const [classPublic, setClassPublic] = useState([])
  const [loading, setLoading] = useState(false)

  const loadAllCourse = async () => {
    try {
      setLoading(true)
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
      toast.success('Lấy dữ liệu khoá học thành công')
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải dữ liệu khóa học')
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
        <h1>Danh sách các khoá học</h1>
      </div>
      <ClassesItem
        title='Lớp học Public'
        courses={classPublic}
        handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Public')}
      />
    </>
  )
}

export default CouresUserPublic
