import { useEffect } from 'react'
import { getAllCourse } from '../../apis/courses.api'
import CourseLeaderItem from '../../components/CourseLeaderItem/CourseLeaderItem'
import './CourseLeader.scss'
const CourseLeader = () => {
  // const [courses, setCourses] = useState([])
  const loadAllCourse = async () => {
    try {
      const result = await getAllCourse()

      console.log('Result', result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadAllCourse()
  })
  const course_leader = [{ title: 'Cartoons', api: 'hoat-hinh' }]
  return (
    <>
      {course_leader.map((cl) => (
        <div key={cl.title} className='course_leader_container'>
          <CourseLeaderItem className='courses-leader' title={cl.title} api={cl.api} />
        </div>
      ))}
    </>
  )
}
export default CourseLeader
