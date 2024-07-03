import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SliderItem.scss'

const SliderItem = ({ films }) => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const handleRight = () => {
    if (index === films.data.items.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  const handleLeft = () => {
    setIndex(index === 0 ? films.data.items.length - 1 : index - 1)
  }

  return (
    <div className='banner-container'>
      <div className='banner-slider' style={{ transform: `translateX(${-index * 100}%)` }}>
        {films.data.items.map((film, idx) => (
          <div key={film._id} className='banner-item'>
            <img
              className='banner-image'
              src={film.thumb_url}
              alt={film.origin_name}
              loading='lazy'
            />
            <h1 className='banner-title'>{film.origin_name}</h1>
            <p className='banner-year'>{film.year}</p>
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
