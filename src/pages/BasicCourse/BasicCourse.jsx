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
  const [basicCourses, setBasicCourses] = useState([])
  const [openSection, setOpenSection] = useState(null)
  const [firstItemId, setFirstItemId] = useState(null);
  console.log('firstItemId',firstItemId)
  // const [sections, setSections] = useState([])
  // const [items, setItems] = useState([])
  const navigate = useNavigate()
  const id = useParams().id
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.sections.sections)
  console.log('>>>section', sections)
  const items = useSelector((state) => state.items.itemsBySectionId)
  console.log('>>>items', items)

  const handleCourse = () => {
    if (firstItemId) {
      navigate(`/lesson/${firstItemId}`)
    } else {
      // Fallback nếu không có item nào
      alert('Không có item nào')
    }
  }
  const param = useParams()
  const loadDataCourses = async () => {
    try {
      const response = await getCourseById(param.id)
      response && response.data && response.data.data
      const result = response.data.data
      setBasicCourses(result)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  const loadDataSections = async () => {
    try {
      const response = await getSectionByCourseId(param.id);
      console.log('response', response)
      if (response && response.data && response.data.data) {
        dispatch(setSections(response.data.data.content))
      }
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  // const loadDataSections = async () => {
  //   try {
  //     const response = await getSectionByCourseId(param.id)
  //     if (response && response.data && response.data.data) {
  //       dispatch(setSections(response.data.data.content))
  //       // Lấy section đầu tiên
  //       const firstSection = response.data.data.content[0]
  //       if (firstSection) {
  //         // Load items của section đầu tiên
  //         loadDataItem(firstSection.id)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.response?.data?.message)
  //   }
  // }
  useEffect(() => {
    if (param.id) {
      loadDataCourses()
      loadDataSections()
    }
  }, [param.id])

  // const loadDataItem = async (sectionId) => {
  //   try {
  //     const response = await getItemBySectionId(sectionId)
  //     if (response && response.data && response.data.data) {
  //       const result = response.data.data.content
  //       dispatch(setItems({ sectionId, items: result }))
  //     }
  //   } catch (error) {
  //     console.log(error.response?.data?.message)
  //   }
  // }
  const loadDataItem = async (sectionId) => {
    try {
      const response = await getItemBySectionId(sectionId)
      if (response && response.data && response.data.data) {
        const result = response.data.data.content
        dispatch(setItems({ sectionId, items: result }))
        // Lưu ID của item đầu tiên
        if (result.length > 0) {
          setFirstItemId(result[0].id)
        }
      }
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  const handleToggle = (index) => {
    setOpenSection(openSection === index ? null : index)
    // if (!items.itemsBySectionId[sectionId]) {
    //   loadDataItem(sectionId)
    // }
  }
  

  const determineMediaType = (url = '') => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv']
    const isImage = imageExtensions.some((ext) => url.endsWith(ext))
    if (isImage) {
      return 'image'
    }

    const isVideo = videoExtensions.some((ext) => url.endsWith(ext))
    if (isVideo) {
      return 'video'
    }
    return 'empty'
  }

  return (
    <div className='course-page-container'>
      <div className='course-page'>
        <div className='course-basic-left'>
          <div className='course-header'>
            <h1>{basicCourses?.name}</h1>
            <p className='describe'>{basicCourses?.description}</p>
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
                      <div className="item">
                        <p>Tên: {section.name}</p>
                        <p>Mô tả: {section.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='course-basic-right'>
          <div className="course-bsic-right-container">
          <div className='course-video'>
            {determineMediaType(basicCourses.videoId) === 'video' && (
              <video controls width='600'>
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
      </div>
    </div>
  )
}

export default BasicCourse
