import { useRef } from 'react'
import fetchItems from '../../hooks/server'
import './ClassesItem.scss'

const ClassesItem = ({ title, api }) => {
  const { data: films } = fetchItems(`https://phimapi.com/v1/api/danh-sach/${api}?limit=12&page=2`)
  console.log(films)
  const inputElement = useRef()
  const handleRight = () => {
    inputElement.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  const handleLeft = () => {
    inputElement.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }
  return (
    <>
      <div className='films'>
        <div className='title-list'>
          <h1 className='title-films'>{title}</h1>
          <p className='view-all'>Xem tất cả</p>
        </div>
        <div ref={inputElement} className='film-list'>
          {films &&
            films.data &&
            films.data.data &&
            films.data.data.items.map((item, idx) => (
              <div key={idx} className='film-item'>
                <img className='poster' src={`https://img.phimapi.com/${item.poster_url}`} alt='' />
                <p className='film-title'>{item.origin_name}</p>
                <p className='film-year'>{item.year}</p>
                <p className='film-quality'>{item.quality}</p>
              </div>
            ))}
        </div>
        <i className='fa-solid fa-chevron-left' onClick={handleLeft}></i>
        <i className='fa-solid fa-chevron-right' onClick={handleRight}></i>
      </div>
    </>
  )
}
export default ClassesItem
