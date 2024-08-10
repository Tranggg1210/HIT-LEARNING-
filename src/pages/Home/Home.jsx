import Slider from '../../components/Slider/Slider'
import CouresUserPublic from '../../components/CouresUserPublic/CouresUserPublic'
import './Home.scss'
import CouresUserPrivate from '../../components/CouresUserPrivate/CouresUserPrivate'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCourse } from '../../apis/courses.api'
import ClassesItem from '../../components/ClassesItem/ClassesItem'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'
import math from '../../assets/images/maths.png'

const Home = () => {
  const currentUser = useAuth()
  const access_token = currentUser.user?.role
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
      {courses?.length > 0 ? (
        <div className='content'>
          <Slider />
          <div className='more-course'>
          </div>
          {access_token?.includes('USER') && (
            <ClassesItem
              title='Lớp học Private'
              courses={classPrivate}
              handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Private')}
            />
          )}

          <ClassesItem
            title='Lớp học Public'
            courses={classPublic}
            handleSeeMore={(courses) => handleSeeMore(courses, 'Lớp học Public')}
          />
        </div>
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
export default Home
