import './SearchResultList.scss'
const SearchResultList = ({ result }) => {
  return (
    <>
      <div className='result-list'>
        {result.map((item, idx) => (
          <div key={idx} className='search-result'>
            {item.name}
          </div>
        ))}
      </div>
    </>
  )
}
export default SearchResultList
