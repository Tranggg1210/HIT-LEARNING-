import { useEffect, useState } from 'react'
import './CourseLeaderList.scss'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse } from '../../apis/courses.api'
import CourseLeaderItem from '../CourseLeaderItem/CourseLeaderItem'
import CourseLeaderClass from '../CourseLeaderClass/CourseLeaderClass'

const CourseLeaderList = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])
  const [isSeeMore, setIsSeeMore] = useState(false)
  const [currentCourses, setCurrentCourses] = useState([])

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
      console.log(error)
    }
  }

  const handleSeeMore = (courses) => {
    setCurrentCourses(courses)
    setIsSeeMore(true)
  }

  const handleCancel = () => {
    setIsSeeMore(false)
  }

  return (
    <>
      {!isSeeMore ? (
        <>
          <div className='more-course'>
            <h1>Danh sách các khoá học</h1>
            <button className='button-course' onClick={handleClickNewFolder}>
              Tạo khoá học
            </button>
          </div>
          <CourseLeaderItem
            title='Lớp học Private'
            courses={classPrivate}
            handleClickEdit={handleClickEdit}
            handleDelete={handleDelete}
            handleSeeMore={handleSeeMore}
          />
          <CourseLeaderItem
            title='Lớp học Public'
            courses={classPublic}
            handleClickEdit={handleClickEdit}
            handleDelete={handleDelete}
            handleSeeMore={handleSeeMore}
          />
        </>
      ) : (
        <CourseLeaderClass courses={currentCourses} onCancel={handleCancel} />
      )}
    </>
  )
}

export default CourseLeaderList
