import ClassesItem from '../ClassesItem/ClassesItem'
import './Classess.scss'

const Classess = () => {
  const access_token = localStorage.getItem('access_token')
  // const classs = [
  //   { title: 'TV Series', api: 'phim-bo' },
  //   // { title: 'Movies', api: 'phim-le' },
  // ]
  const c = [
    { title: 'TV Series', api: 'phim-bo' },
    { title: 'Movies', api: 'phim-le' },
  ]
  return (
    <>
      {/* <div>
        {access_token
          ? c.map((claases) => (
              <div key={claases.title} className='category-container'>
                <ClassesItem className='relative' title={claases.title} api={claases.api} />
              </div>
            ))
          : classs.map((claass) => (
              <div key={claass.title} className='category-container'>
                <ClassesItem className='relative' title={claass.title} api={claass.api} />
              </div>
            ))}
      </div> */}
      {c.map((claases) => (
        <div key={claases.title} className='category-container'>
          <ClassesItem className='relative' title={claases.title} api={claases.api} />
        </div>
      ))}
    </>
  )
}
export default Classess
