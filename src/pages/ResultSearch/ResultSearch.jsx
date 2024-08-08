import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './ResultSearch.scss'
import { IconClockHour9 } from '@tabler/icons-react'
import useAuth from '../../hooks/useAuth'

const ResultSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { results } = location.state || []
  const currentUser = useAuth()

  useEffect(() => {
    if (!results.length) {
      navigate('/')
    }
  }, [results, navigate])

  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
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

  const filteredResults = currentUser.user ? results : results.filter((item) => !item.isPrivate)

  return (
    <div className='result-search-container'>
      <h2>Kết quả tìm kiếm</h2>
      <div className='result-list-search'>
        {filteredResults.length ? (
          filteredResults.map((item, idx) => (
            <div
              key={idx}
              className='course-item-result'
              onClick={() => navigate(`/detail-course/${item.id}`)}>
              {determineMediaType(item.videoId) === 'video' && (
                <video controls width='600' className='course-img'>
                  <source
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                    type='video/mp4'
                  />
                </video>
              )}
              {determineMediaType(item.videoId) === 'image' && (
                <img
                  className='course-img'
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${item.videoId}`}
                  alt='Khóa học'
                />
              )}
              {determineMediaType(item.videoId) === 'empty' && (
                <img src={CourseList1} alt='Khóa học' className='course-img' />
              )}
              <div className='infor-container'>
                <p className='course-name'>{item.name}</p>
                <p className='course-class-type'>
                  {item.isPrivate ? 'Tag: Private' : 'Tag: Public'}
                </p>
                <p className='course-leader-name'>{item.leaderName}</p>
                <div className='infor'>
                  <IconClockHour9 stroke={2} />
                  <p>{isoDayMonthYear(item.createdAt)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy khoá học nào!!</p>
        )}
      </div>
    </div>
  )
}

export default ResultSearch
