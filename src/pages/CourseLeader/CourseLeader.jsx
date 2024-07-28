import { useEffect, useState } from 'react'
import { getAllCourse } from '../../apis/courses.api'
import CourseLeaderItem from '../../components/CourseLeaderItem/CourseLeaderItem'
import './CourseLeader.scss'

import Button from '../../components/Button/Button'
const CourseLeader = () => {
  return (
    <>
      <div className='course_leader_container'>
        <CourseLeaderItem />
        
        
      </div>

      
    </>
  )
}
export default CourseLeader
