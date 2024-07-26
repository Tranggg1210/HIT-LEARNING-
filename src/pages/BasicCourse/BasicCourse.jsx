import { Typography, Button } from '@mui/material'
import { IconChevronUp, IconChevronDown, IconChevronLeft } from '@tabler/icons-react'
import './BasicCourse.scss'
import { useEffect, useState } from 'react'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../../layouts/Layout/MainLayout'
import { getCourseById } from '../../apis/courses.api'
import { getSectionByCourseId } from '../../apis/section.api'


const BasicCourse = () => {
  const [basicCourses, setBasicCourses] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const handleCourse = () => {
    navigate('/courseLeader')
  }
  const handleToggle = (index) => {
    setOpenSection(openSection === index ? null : index)
  }



  const param = useParams();


  const loadDataCourses = async () => {
    try {
      const response = await getCourseById(param.id);
      (response && response.data && response.data.data)
      const result = response.data.data;
      setBasicCourses([result]);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };


  const loadDataSections = async () => {
    try {
      const response1 = await getSectionByCourseId(param.id);
      if (response1 && response1.data && response1.data.data) {
        setSections(response1.data.data);
      }
    } catch (error) {
      alert(error.response1?.data?.message);
    }
  };
  // const loadDataItem =async () =>{
  //   try{
  //     const response2 = await getSectionByCourseId(param.id);
  //     (response2 && response2.data && response2.data.data)
  //     const result2= response2.data.data;
  //     setItems(result2);
  //   }catch(error){
  //     alert(error.response2?.data?.message);
  //   }
  // };



  useEffect(() => {
    if (param.id) {
      loadDataCourses();
      loadDataSections();
    }
  }, [param.id]);
  console.log("Course ID:", param.id);
  console.log("Sections: ", sections);
  // console.log("Items: ", items);



  return (
    <>

      <div className='course-page'>
        <div className='course-basic-left'>
          {Array.isArray(basicCourses) && basicCourses.map((i, index) => (
            <div key={index} className='course-header'>
              <h1>{i.name}</h1>
              <p className='describe'>
                {i.description}
              </p>
            </div>

          ))}

          <div className='course-content'>
            <div className='lesson-content'>
              <h2>Nội dung khóa học</h2>
              <br />
              {Array.isArray(sections) && sections.map((section, index) => (
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
                      {/* {items.length > 0 ? (
                      items.map((item, idx) => (
                        <div key={idx} className='item'>
                          <span>{item.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className='no-lesson'>Không có bài học</div>
                    )} */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {Array.isArray(basicCourses) && basicCourses.map((i, index) => (
          <div className='course-basic-right' key={index}>
            <div className='course-video'>
              <img src={`https://hitproduct2024-production-a244.up.railway.app/stream/${i.videoId}`} alt='Khóa học' />
              <Button variant='contained' color='primary' onClick={handleCourse}>
                Xem tài liệu
              </Button>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default BasicCourse
