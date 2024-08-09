import './LessonDetail.scss'
import '../../styles/index.scss'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import {
  IconChevronLeft,
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconDownload,
} from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LessonBar from '../../components/LessonBar/LessonBar'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { createComment, getComment } from '../../apis/comment.api'
import moment from 'moment'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { getAllItem } from '../../apis/item.api'
import Loading from '../../components/Loading/Loading'

const LessonDetail = () => {
  const { lessonId, courseId } = useParams()
  const navigate = useNavigate()
  const [currentItem, setCurrentItem] = useState({})
  const currentUser = useAuth()
  const [loading, setLoading] = useState(false)

  const loadCurrentItem = async () => {
    try {
      setLoading(true)
      const items = await getAllItem(lessonId)
      const commentRes = await getComment(lessonId)
      console.log('commentRes', commentRes)

      setCurrentItem(items.data.data)
      setComments(commentRes.data.data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [showAddComment, setShowAddComment] = useState(false)
  const [like, setLike] = useState(false)

  const handleBack = () => navigate('/')
  const handleLike = () => setLike(!like)

  const addComment = async () => {
    try {
      setLoading(true)
      const res = await createComment(lessonId, {
        username: currentUser?.user?.userName,
        comment,
      })
      if (res.data) {
        loadCurrentItem()
        setComment('')
        setShowAddComment(false)
        toast.success('Gửi thành công')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const determineMediaType = (url = '') => {
    if (!url) return 'empty'
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv']
    const isImage = imageExtensions.some((ext) => url.toLowerCase().endsWith(ext))
    if (isImage) return 'image'
    const isVideo = videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))
    if (isVideo) return 'video'
    return 'empty'
  }

  useEffect(() => {
    loadCurrentItem()
  }, [lessonId])
  console.log('currentItem', currentItem)

  return (
    <div className='lesson-detail'>
      <div className='lesson-box'>
        <div className='lesson-left'>
          <div className='goback' onClick={handleBack}>
            <IconChevronLeft stroke={2} width={40} height={64} />
            <Typography variant='h6' component='h6'>
              QUAY LẠI
            </Typography>
          </div>
          <div className='player'>
            {currentItem && (
              <div className='player-banner'>
                {determineMediaType(currentItem.videoId) === 'video' && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <video controls width='fit-content'>
                      <source
                        src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoId}`}
                        alt='Khóa học'
                      />
                    </video>
                  </div>
                )}
                {determineMediaType(currentItem.videoId) === 'image' && (
                  <img
                    width='500'
                    height='600'
                    className='showImage'
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoId}`}
                    alt='Khóa học'
                  />
                )}
                {determineMediaType(currentItem.videoId) === 'empty' && (
                  <img src={CourseList1} alt='Khóa học' />
                )}
              </div>
            )}
            <div className='player-des'>
              <div className='des-container'>
                <div className='des-box'>
                  <div className='des-left'>
                    <h2>{currentItem?.name}</h2>
                    <span className='sub eye'>
                      <IconEye /> {currentItem.view || 0} lượt xem
                    </span>
                    <br />
                    <span style={{ color: 'rgba(0, 0, 0, 0.544)' }}>
                      Người đăng: {currentItem?.author || 'Không xác định'}
                    </span>
                  </div>
                  <div className='des-right'>
                    <div className='button-des'>
                      <button className='btn-des' onClick={handleLike}>
                        {like ? <IconHeartFilled /> : <IconHeart />}
                      </button>

                      <a href={'hello'} download className='btn-des'>
                        <IconDownload /> Tải xuống
                      </a>
                    </div>
                  </div>
                </div>
                <div className='list-box'>
                  <ul>
                    <li>
                      Fanpage: <span className='link'>https://web.facebook.com/HITClub.HaUI</span>
                    </li>
                    <li>
                      Website: <span className='link'>https://web.facebook.com/HITClub.HaUI</span>
                    </li>
                    <li>
                      Group: <span className='link'>https://web.facebook.com/HITClub.HaUI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            {!showAddComment && (
              <div className='lesson-comment' onClick={() => setShowAddComment(!showAddComment)}>
                <div
                  className='comment'
                  style={{ border: '1px solid black', padding: '1rem', cursor: 'pointer' }}>
                  <h3>Binh luan</h3>
                </div>
              </div>
            )}
            {showAddComment && (
              <div className='text-comment'>
                <textarea
                  value={comment}
                  rows={4}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1px solid black',
                    padding: '1rem',
                    marginTop: '1rem',
                  }}></textarea>
                <div className='button-dis'>
                  <button className='' onClick={() => setShowAddComment(false)}>
                    Hủy
                  </button>
                  <button onClick={addComment}>Gửi</button>
                </div>
              </div>
            )}
          </div>
          <div className='comment-box'>
            <List sx={{ mt: 2 }}>
              {comments.map((cmt, index) => (
                <ListItem key={index} alignItems='flex-start'>
                  <div
                    style={{
                      backgroundColor: 'gray',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                    }}></div>
                  <ListItemText
                    primary={cmt?.user.username}
                    secondary={
                      <>
                        {cmt.comment}
                        <Typography variant='caption' display='block' gutterBottom>
                          {moment(cmt.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <div className='lesson-right'>
          <LessonBar param={courseId} />
        </div>
      </div>
    </div>
  )
}

export default LessonDetail
