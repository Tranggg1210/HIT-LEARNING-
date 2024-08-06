import { useNavigate } from 'react-router-dom'
import './SearchResultList.scss'
const SearchResultList = ({ result, clearSearch }) => {
  const navigate = useNavigate()
  const handleItemClick = (id) => {
    clearSearch()
    navigate(`/detail-course/${id}`)
  }
  return (
    <>
      <div className='result-list'>
        {result.map((item, idx) => (
          <div key={idx} className='search-result' onClick={() => handleItemClick(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  )
}
export default SearchResultList
