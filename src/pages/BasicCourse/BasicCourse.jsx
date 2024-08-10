import { Button } from '@mui/material'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import './BasicCourse.scss'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getCourseById } from '../../apis/courses.api'
import { getSectionByCourseId } from '../../apis/section.api'
import { getItemBySectionId } from '../../apis/item.api'
import toast from 'react-hot-toast'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import Loading from '../../components/Loading/Loading'

const BasicCourse = () => {
  const [basicCourses, setBasicCourses] = useState([])
  const [openSection, setOpenSection] = useState(null)
  const [sections, setSections] = useState([])
  const [items, setItems] = useState([])
  const [firstItemId, setFirstItemId] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const param = useParams()
  const loadDataCourses = async () => {
    try {
      setLoading(true)
      const response = await getCourseById(param.id)
      console.log('')
      const result = response.data.data
      setBasicCourses(result)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const loadDataSections = async () => {
    try {
      setLoading(true)
      const response = await getSectionByCourseId(param.id)
      if (response && response.data && response.data.data) {
        const result = response.data.data.content
        if (result && result.length > 0) {
          const res = await getItemBySectionId(result[0].id)
          setSections(result)
          if (res.data.data.content.length > 0) {
            setFirstItemId(res.data.data.content[0].id)
          }
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadDataItem = async (id) => {
    try {
      setLoading(true)
      const response = await getItemBySectionId(id)

      const result = response.data.data.content
      setItems(result)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (index, id) => {
    setOpenSection(openSection === index ? null : index)
    loadDataItem(id)
  }
  console.log('sections', sections)
  const handleCourse = () => {
    if (firstItemId) {
      navigate(`/lesson/${param.id}/detail-lesson/${firstItemId}`)
    } else {
      toast('Khóa học này sẽ sớm được hoàn thành. Vui lòng quay lại sau một khoảng thời gian nữa', {
        icon: '🔥',
      })
    }
  }
  const determineMediaType = (url = '') => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv']
    const isImage = imageExtensions.some((ext) => url.endsWith(ext))
    if (isImage) return 'image'
    const isVideo = videoExtensions.some((ext) => url.endsWith(ext))
    if (isVideo) return 'video'
    return 'empty'
  }
  useEffect(() => {
    if (param.id) {
      loadDataCourses()
      loadDataSections()
    }
  }, [param.id])

  return (
    <>
      {loading && <Loading />}
      <div className='course-page'>
        <div className='course-basic-left'>
          <div className='course-header'>
            <h1>{basicCourses?.name}</h1>
            <p className='describe'>{basicCourses?.description}</p>
          </div>

          <div className='course-content'>
            <div className='lesson-content'>
              <h2>Nội dung khóa học</h2>
              <br />
              {Array.isArray(sections) && sections.length > 0 ? (
                sections.map((section, index) => (
                  <div key={section.id} className='section'>
                    <div className='section-header' onClick={() => handleToggle(index, section.id)}>
                      <div className='title'>
                        <span>{section.name}</span>
                        <span className='arrow'>
                          {openSection === index ? <IconChevronUp /> : <IconChevronDown />}
                        </span>
                      </div>
                    </div>
                    {openSection === index && (
                      <div className='section-content'>
                        {items.length > 0 ? (
                          items.map((item) => (
                            <div key={item.id} className='item'>
                              <NavLink to={`/lesson/${param.id}/detail-lesson/${item.id}`}>
                                {item.name}
                              </NavLink>
                            </div>
                          ))
                        ) : (
                          <div className='no-lesson'>Không có bài học</div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h3 style={{ color: 'gray' }}>
                  Đang cập nhật khóa học....Hãy chờ đón trong tương lai gần nhé
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className='course-basic-right'>
          <div className='course-video'>
            {determineMediaType(basicCourses.videoId) === 'video' && (
              <video controls width='1000'>
                <source
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${basicCourses.videoId}`}
                  type='video/mp4'
                />
              </video>
            )}
            {determineMediaType(basicCourses.videoId) === 'image' && (
              <img
                src={`${import.meta.env.VITE_API_SERVER}/stream/${basicCourses.videoId}`}
                alt='Khóa học'
              />
            )}
            {determineMediaType(basicCourses.videoId) === 'empty' && (
              <img src={CourseList1} alt='Khóa học' />
            )}
            <Button variant='contained' color='primary' onClick={handleCourse}>
              Xem tài liệu
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicCourse
