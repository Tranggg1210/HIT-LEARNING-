import { Typography, Button } from '@mui/material'
import { IconChevronUp, IconChevronDown, IconChevronLeft } from '@tabler/icons-react'
import './BasicCourse.scss'
import { useState } from 'react'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../../layouts/Layout/MainLayout'
import { getCourseById } from '../../apis/courses.api'

const sections = [
  {
    title: '1. Giới thiệu',
    lessons: [
      { name: '1. Giới thiệu', duration: '6:00' },
      { name: '2. ReactJS là gì', duration: '6:00' },
      { name: '3. Giới thiệu', duration: '6:00' },
    ],
  },
  {
    title: '2. Bài 2',
    lessons: [
      { name: '1. Giới thiệu', duration: '6:00' },
      { name: '2. ReactJS là gì', duration: '6:00' },
      { name: '3. Giới thiệu', duration: '6:00' },
      { name: '4. Bài học khác', duration: '6:00' },
    ],
  },
  {
    title: '3. Bài 3',
    lessons: [],
  },
  {
    title: '4. Bài 4',
    lessons: [],
  },
  {
    title: '5. Bài 5',
    lessons: [],
  },
  {
    title: '6. Bài 6',
    lessons: [],
  },
]

const BasicCourse = () => {
  const navigate = useNavigate()
  // const handleBack = () => {
  //   navigate(-1)
  // }
  const param = useParams()
  const handleCourse = () => {
    navigate(`/lesson/${param.id}`)
  }
  const [openSection, setOpenSection] = useState(null)

  const handleToggle = (index) => {
    setOpenSection(openSection === index ? null : index)
  }

  const [courseDescription, setCourseDescription] = useState('')

  console.log('param: ',param?.id)

  const loadDataCoures = async () => {
    try {
      const result = await getCourseById(param.id)
      console.log('result: ',result)
    } catch (error) {
      // console.log(error)
      // alert(error.response.data.message)
    }
  }
  loadDataCoures()

  //   useEffect(() => {
  //     // Call API to fetch course description
  //     fetchCourseDescription().then((data) => {
  //       setCourseDescription(data.description);
  //     }).catch((error) => {
  //       console.error('Error fetching course description:', error);
  //     });
  //   }, []);

  //   const fetchCourseDescription = async () => {
  //     // Replace with actual API endpoint
  //     const response = await fetch('');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch course description');
  //     }
  //     const data = await response.json();
  //     return data;
  //   };

  return (
    <>
      {/* <MainLayout /> */}
      <div className='course-page'>
        <div className='course-basic-left'>
          <div className='course-header'>
            <h1>Lớp học React cơ bản, nâng cao</h1>
            <p className='describe'>
              Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm
              hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án
              giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia
              sẻ trong khóa học này.
            </p>
          </div>
          <div className='course-content'>
            <div className='lesson-content'>
              <h2>Nội dung khóa học</h2>
              <br />
              {sections.map((section, index) => (
                <div key={index} className='section'>
                  <div className='section-header' onClick={() => handleToggle(index)}>
                    <div className='title'>
                      <span>{section.title}</span>
                      <span className='arrow'>
                        {openSection === index ? <IconChevronUp /> : <IconChevronDown />}
                      </span>
                    </div>
                  </div>
                  {openSection === index && (
                    <div className='section-content'>
                      {section.lessons.length > 0 ? (
                        section.lessons.map((lesson, idx) => (
                          <div key={idx} className='lesson'>
                            <span>{lesson.name}</span>
                            <span className='duration'>{lesson.duration}</span>
                          </div>
                        ))
                      ) : (
                        <div className='no-lesson'>Không có bài học</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='course-basic-right'>
          <div className='course-video'>
            <img src={CourseList1} alt='Khóa học' />
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
