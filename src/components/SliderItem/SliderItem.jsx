import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SliderItem.scss'
import { getAllCourse } from '../../apis/courses.api'
import toast from 'react-hot-toast'

const SliderItem = ({ films }) => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [index, setIndex] = useState(0)
  const loadAllCourse = async () => {
    try {
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    loadAllCourse()
  }, [])
  const handleRight = () => {
    if (index === courses.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  const handleLeft = () => {
    setIndex(index === 0 ? courses.length - 1 : index - 1)
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
    <div className='banner-container'>
      <div className='banner-slider' style={{ transform: `translateX(${-index * 100}%)` }}>
        {courses.map((item, idx) => (
          <div key={item.id} className='banner-item'>
            {determineMediaType(item.videoId) === 'video' && (
              <video controls width='600' className='banner-image'>
                <source
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                  type='video/mp4'
                />
              </video>
            )}
            {determineMediaType(item.videoId) === 'image' && (
              <img
                className='banner-image'
                src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                alt='Khóa học'
              />
            )}
            {determineMediaType(item.videoId) === 'empty' && (
              <img src={CourseList1} alt='Khóa học' className='banner-image' />
            )}
          </div>
        ))}
      </div>
      <div className="btn-arrow-container">
        <div className="btn-arrow" onClick={handleLeft}>
          <i className='fa-solid fa-arrow-left' ></i>
        </div>
        <div className="btn-arrow" onClick={handleRight}>
          <i className='fa-solid fa-arrow-right' ></i>
        </div>
      </div>

    </div>
  )
}

export default SliderItem
