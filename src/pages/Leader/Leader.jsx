import './Leader.scss'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import CourseList from '../CourseList/CourseList'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import CreateSubFolder from '../../components/CreateSubFolder/CreateSubFolder'
import CreateNewCourse from '../../components/CreateNewCourse/CreateNewCourse'
import EditSubFolder from '../../components/EditSubFolder/EditSubFolder'
const Leader = () => {
  //   const access_token = localStorage.getItem('access_token')
  return (
    <>
      <div className='content'>
        <CourseLeader />
        {/* <CourseList /> */}
        {/* <CreateFolder /> */}
        {/* <CreateSubFolder /> */}
        {/* <CreateNewCourse /> */}
        {/* <EditSubFolder /> */}
      </div>
    </>
  )
}
export default Leader
