import { useEffect, useState } from 'react'
import './CourseLeaderList.scss'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse } from '../../apis/courses.api'
import CourseLeaderItem from '../CourseLeaderItem/CourseLeaderItem'
import CourseLeaderClass from '../CourseLeaderClass/CourseLeaderClass'
import toast from 'react-hot-toast'

const CourseLeaderList = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])
  const [isSeeMore, setIsSeeMore] = useState(false)
  const [currentCourses, setCurrentCourses] = useState([])
  const [titles, setTitles] = useState('')
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

  const handleClickEdit = (id) => {
    navigate(`/editCourse/${id}`)
  }

  const handleClickNewFolder = () => {
    navigate('/createNewCourse')
  }

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xoá dữ liệu khóa học')
    }
  }

  const handleSeeMore = (courses, title) => {
    setCurrentCourses(courses)
    setTitles(title)
    setIsSeeMore(true)
  }

  const handleCancel = () => {
    setIsSeeMore(false)
  }

  return (
    <>
      {!isSeeMore ? (
        <>
          
          <CourseLeaderItem
            title='Lớp học Private'
            courses={classPrivate}
            handleClickEdit={handleClickEdit}
            handleDelete={handleDelete}
            handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Private')}
          />
          <CourseLeaderItem
            title='Lớp học Public'
            courses={classPublic}
            handleClickEdit={handleClickEdit}
            handleDelete={handleDelete}
            handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Public')}
          />
        </>
      ) : (
        <CourseLeaderClass courses={currentCourses} onCancel={handleCancel} title={titles} />
      )}
    </>
  )
}

export default CourseLeaderList
