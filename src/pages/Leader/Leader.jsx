import './Leader.scss'
import CourseLeader from '../../pages/CourseLeader/CourseLeader'
import EditSubFolder from '../../components/EditListSection/EditListSection'
const Leader = () => {
  //   const access_token = localStorage.getItem('access_token')
  return (
    <>
      <div className='content'>
        <CourseLeader />
        {/* <EditSubFolder /> */}
      </div>
    </>
  )
}
export default Leader
