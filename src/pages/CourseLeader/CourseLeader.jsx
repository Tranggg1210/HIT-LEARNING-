import { useEffect, useState } from 'react'
import { getAllCourse } from '../../apis/courses.api'
import CourseLeaderItem from '../../components/CourseLeaderItem/CourseLeaderItem'
import './CourseLeader.scss'

import Button from '../../components/Button/Button'
const CourseLeader = () => {
  // const [courses, setCourses] = useState([])

  // const loadAllCourse = async () => {
  //   try {
  //     const result = await (await getAllCourse()).data.data
  //     setCourses(result.content)
  //     console.log('Result', result)
  //     console.log(courses)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   loadAllCourse()
  // }, [])
  const course_leader = [{ title: 'Cartoons', api: 'hoat-hinh' }]
  return (
    <>
      {/* {course_leader.map((cl) => (
        <div key={cl.title} className='course_leader_container'>
          <CourseLeaderItem className='courses-leader' title={cl.title} api={cl.api} />
        </div>
      ))} */}

      <div className='course_leader_container'>
        <CourseLeaderItem />
        
        
      </div>

      
    </>
  )
}
export default CourseLeader
