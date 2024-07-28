import { useState } from 'react'
import fetchItems from '../../hooks/server'
import SliderItem from '../SliderItem/SliderItem'
import './Slider.scss'

const Slider = () => {
  const { data: bannerFilms } = fetchItems(
    'https://phimapi.com/danh-sach/phim-moi-cap-nhat?limit=6',
  )

  return (
    <div className='banner-sileders'>
      <div className='banner-container'>
        {/* {bannerFilms && bannerFilms.data && <SliderItem films={bannerFilms} />} */}
        <SliderItem />
      </div>
    </div>
  )
}

export default Slider
