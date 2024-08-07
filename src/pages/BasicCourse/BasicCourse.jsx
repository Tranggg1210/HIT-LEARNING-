import { Button } from '@mui/material'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import './BasicCourse.scss'
import { useEffect, useState } from 'react'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseById } from '../../apis/courses.api'
import { getSectionByCourseId } from '../../apis/section.api'
import { getItemBySectionId } from '../../apis/item.api'

import { useDispatch, useSelector } from 'react-redux'
import { setSections } from '../../store/sections.store'
import { setItems } from '../../store/items.store'

const BasicCourse = () => {
  const [basicCourse, setBasicCourse] = useState([])
  const [openSection, setOpenSection] = useState(null)
  const [firstItemId, setFirstItemId] = useState(null)
  console.log('>>>>>firstItem', firstItemId)


  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.sections.sections)
  const items = useSelector((state) => state.items.itemsBySectionId)

  const loadDataCourses = async () => {
    try {
      const response = await getCourseById(id)
      if (response && response.data && response.data.data) {
        setBasicCourse(response.data.data)
      }
      console.log('basicCourse', basicCourse)
    } catch (error) {
      console.error('Error loading course:', error.response?.data?.message)
    }
  }

  const loadDataSections = async () => {
    try {
      const response = await getSectionByCourseId(id)
      if (response && response.data && response.data.data) {
        dispatch(setSections(response.data.data.content))
        const firstSection = response.data.data.content[0]
        if (firstSection) {
          loadDataItem(firstSection.id)
        }
      }
    } catch (error) {
      console.error('Error loading sections:', error.response?.data?.message)
    }
  }

  const loadDataItem = async (sectionId) => {
    try {
      const response = await getItemBySectionId(sectionId)
      console.log('response', response)
      if (response && response.data && response.data.data) {
        const result = response.data.data.content
        dispatch(setItems({ sectionId, items: result }))
        console.log('itemsss', items)
        if (result.length > 0) {
          setFirstItemId(result[0].id)
        }
        console.log('firstItem', firstItemId)
      }
    } catch (error) {
      console.error('Error loading items:', error.response?.data?.message)
    }
  }

  useEffect(() => {
    if (id) {
      loadDataCourses()
      loadDataSections()
    }
  }, [id])

  const handleToggle = (index, sectionId) => {
    setOpenSection(openSection === index ? null : index)
    if (!items[sectionId]) {
      loadDataItem(sectionId)
    }
  }

  const handleCourse = () => {
    console.log('firstItem',firstItemId)
    if (firstItemId) {
      navigate(`/lesson/${firstItemId}`)
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

  return (
    <div className='course-page-container'>
      <div className='course-page'>
        <div className='course-basic-left'>
          <div className='course-header'>
            <h1>{basicCourse.name}</h1>
            <p className='describe'>{basicCourse.description}</p>
          </div>
          <div className='course-content'>
            <div className='lesson-content'>
              <h2>Nội dung khóa học</h2>
              {sections.map((section, index) => (
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
                      
                        {items[section.id] && Array.isArray(items[section.id]) ? (
                          items[section.id].map((item) => (
                            <div key={item.id} className='item'>
                              <p>{item.name}</p>
                              <p>Description: {item.description}</p>
                            </div>
                          ))
                        ) : (
                          <p>No items available for this section.</p>
                        )}
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='course-basic-right'>
          <div className='course-bsic-right-container'>
            <div className='course-video'>
              {determineMediaType(basicCourse.videoId) === 'video' && (
                <video controls width='600'>
                  <source
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${basicCourse.videoId}`}
                    type='video/mp4'
                  />
                </video>
              )}
              {determineMediaType(basicCourse.videoId) === 'image' && (
                <img
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${basicCourse.videoId}`}
                  alt='Khóa học'
                />
              )}
              {determineMediaType(basicCourse.videoId) === 'empty' && (
                <img src={CourseList1} alt='Khóa học' />
              )}

              <Button variant='contained' color='primary' onClick={handleCourse}>
                Xem tài liệu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicCourse
