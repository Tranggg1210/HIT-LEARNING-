import { useEffect, useState } from 'react'
import './CourseLeaderList.scss'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse, getCourseByUserId } from '../../apis/courses.api'
import CourseLeaderItem from '../CourseLeaderItem/CourseLeaderItem'
import CourseLeaderClass from '../CourseLeaderClass/CourseLeaderClass'
import toast from 'react-hot-toast'
import Loading from '../Loading/Loading'
import math from '../../assets/images/maths.png'
import useAuth from '../../hooks/useAuth'

const CourseLeaderList = () => {
  const [courses, setCourses] = useState([])
  const [classPrivate, setClassPrivate] = useState([])
  const [classPublic, setClassPublic] = useState([])
  const [isSeeMore, setIsSeeMore] = useState(false)
  const [currentCourses, setCurrentCourses] = useState([])
  const [titles, setTitles] = useState('')
  const [loading, setLoading] = useState(false)
  const current = useAuth()
  const id_access_token = current?.user.id

  const loadAllCourse = async () => {
    try {
      setLoading(true)
      const result = await (await getCourseByUserId(id_access_token)).data
      console.log('123456', result)
      setCourses(result)
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

  const handleClickEdit = (id) => {
    navigate(`/editCourse/${id}`)
  }

  const handleClickNewFolder = () => {
    navigate('/createNewCourse')
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
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
      {loading && <Loading />}
      {courses?.length > 0 ? (
        !isSeeMore ? (
          <>
            <div className='more-course'></div>
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
        )
      ) : (
        <div className='box-not-courses'>
          <div className='not-courses'>
            <img src={math} alt='' />
          </div>
          <p>Hiện tại chưa có khoá học nào!!</p>
        </div>
      )}
    </>
  )
}

export default CourseLeaderList
