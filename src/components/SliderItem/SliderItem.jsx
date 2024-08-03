import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SliderItem.scss'
import { getAllCourse } from '../../apis/courses.api'

const SliderItem = ({ films }) => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [index, setIndex] = useState(0)
  const loadAllCourse = async () => {
    try {
      const result = await (await getAllCourse()).data.data
      setCourses(result.content)
    } catch (error) {
      console.log(error)
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

  return (
    <div className='banner-container'>
      <div className='banner-slider' style={{ transform: `translateX(${-index * 100}%)` }}>
        {courses.map((item, idx) => (
          <div key={item.id} className='banner-item'>
            <img
              className='banner-image'
              src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
              // alt={film.origin_name}
              loading='lazy'
            />
            <div className='banner-overlay'>
              <h4 className='banner-watch'>Watch now</h4>
            </div>
          </div>
        ))}
      </div>

      <i className='fa-solid fa-arrow-left' onClick={handleLeft}></i>
      <i className='fa-solid fa-arrow-right' onClick={handleRight}></i>
    </div>
  )
}

export default SliderItem
