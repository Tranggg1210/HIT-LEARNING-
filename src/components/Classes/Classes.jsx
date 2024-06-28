import ClassesItem from '../ClassesItem/ClassesItem'
import './Classes.scss'

const Classes = () => {
  const access_token = localStorage.getItem('access_token')
  const classs = [{ title: 'TV Series', api: 'phim-bo' }]

  return (
    <>
      {classs.map((claass) => (
        <div key={claass.title} className='category-container'>
          <ClassesItem className='relative' title={claass.title} api={claass.api} />
        </div>
      ))}
    </>
  )
}
export default Classes
