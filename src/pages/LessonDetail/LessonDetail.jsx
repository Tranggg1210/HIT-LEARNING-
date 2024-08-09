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

const LessonDetail = () => {

  const { lessonId, courseId } = useParams()
  const navigate = useNavigate()
  // const [downloadUrl, setDownloadUrl] = useState('')
  const [currentItem, setCurrentItem] = useState({})

  const currentUser = useAuth()
  console.log('current User', currentUser)


  // const handleURLImage = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     console.log('url',url)
  //     const blob = await response.blob();
  //     const imageUrl = URL.createObjectURL(blob);
  //     setDownloadUrl(imageUrl);
  //   } catch (error) {
  //     console.error('Lỗi khi tải ảnh:', error);
  //   }
  // };

  // const handleDownload = async (url, fileName) => {
  //   try {
  //     const response = await fetch(url)
  //     const blob = await response.blob()
  //     const downloadUrl = URL.createObjectURL(blob)


  //     // Tạo một thẻ a ẩn để kích hoạt tải xuống
  //     const a = document.createElement('a')
  //     a.href = downloadUrl
  //     a.download = fileName // Tên file sẽ tải xuống, có thể là 'file.jpg', 'video.mp4', v.v.
  //     document.body.appendChild(a)
  //     a.click()
  //     document.body.removeChild(a)

  //     // Giải phóng
  //     URL.revokeObjectURL(downloadUrl)
  //   } catch (error) {
  //     console.error('Lỗi khi tải file:', error)
  //   }
  // } 


  const loadCurrentItem = async () => {
    try {
      const items = await getAllItem(lessonId)
      const commentRes = await getComment(lessonId)
      console.log('commentRes', commentRes)

      setCurrentItem(items.data.data)
      setComments(commentRes.data.data)
    } catch (error) {
      toast.error(error.message)
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
      const res = await createComment(lessonId, {
        username: currentUser?.user?.userName,
        comment,
      })
      console.log('res', res)
      if (res.data) {
        loadCurrentItem()
        setComment('')
        setShowAddComment(false)
        toast.success('Gửi thành công')
      }
    } catch (error) {
      toast.error(error.message)
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

  // const getDownloadLink = () => {
  //   const mediaType = determineMediaType(currentItem?.videoId)
  //   const extension = mediaType === 'video' ? '.mp4' : mediaType === 'image' ? '.jpg' : ''
  //   return `${import.meta.env.VITE_API_SERVER}/stream/${currentItem?.videoId}${extension}`
  // }
  useEffect(() => {
    loadCurrentItem()
    // if (currentItem?.videoName) {
    //   handleDownload(currentItem?.videoName)
    // }
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
              <>
                {determineMediaType(currentItem.videoId) === 'video' && (
                  <video controls width='600'>
                    <source
                      src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoId}`}
                      type='video/mp4'
                    />
                  </video>
                )}
                {determineMediaType(currentItem.videoId) === 'image' && (
                  <img width='500' height='600' className='showImage'
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoId}`}
                    alt='Khóa học'
                  />
                )}
                {determineMediaType(currentItem.videoId) === 'empty' && (
                  <img src={CourseList1} alt='Khóa học' />
                )}
              </>
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
                <div className="button-dis">
                  <button className='' onClick={() => setShowAddComment(false)}>Hủy</button>
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
