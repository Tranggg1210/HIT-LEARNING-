import './LessonDetail.scss'
import '../../styles/index.scss'
import { Typography, Button, Box, TextField, List, ListItem, ListItemText, Avatar } from '@mui/material'
import Modal from '@mui/material/Modal'
import { IconChevronLeft, IconHeart, IconHeartFilled, IconEye, IconDownload, IconBubbleText } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LessonBar from '../../components/LessonBar/LessonBar'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { useSelector } from 'react-redux'
import { createComment, getComment } from '../../apis/comment.api'
import moment from 'moment'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const LessonDetail = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const items = useSelector((state) => state.items.itemsBySectionId)
  const currentUser = useAuth()
 

  let currentItem = null
  for (const sectionId in items) {
    const itemArray = items[sectionId]
    currentItem = itemArray.find((item) => item.id === lessonId)
    if (currentItem) break
  }

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false)
  const [like, setLike] = useState(false)

  const addComment = async () => {
    if (!comment.trim()) return
    try {
      const newComment = {
        itemId: lessonId,
        userId: currentUser?.user?.id,
        comment: comment,
      }
      const res = await createComment(newComment)
      if (res.success) {
        setComment('')
        getComments()
        toast.success('Comment added successfully')
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getComments = async () => {
    try {
      const res = await getComment(lessonId)
      if (res.success) {
        setComments(res.data)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const handleBack = () => navigate('/')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleLike = () => setLike(!like)

  const handleSubmit = () => {
    addComment()
    handleClose()
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

  const getDownloadLink = () => {
    const mediaType = determineMediaType(currentItem?.videoId)
    const extension = mediaType === 'video' ? '.mp4' : mediaType === 'image' ? '.jpg' : ''
    return `${import.meta.env.VITE_API_SERVER}/stream/${currentItem?.videoId}${extension}`
  }

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
                  <img className='showImage'
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
                      <IconEye /> {currentItem?.views || 0} lượt xem
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
                      <a href={getDownloadLink()} download={currentItem?.name} className='btn-des'>
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
          <div className='lesson-comment'>
            <button onClick={handleOpen}>
              <IconBubbleText />
              Bình luận
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-title'
              aria-describedby='modal-description'>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}>
                <Typography id='modal-title' variant='h6' component='h2'>
                  Thêm bình luận
                </Typography>
                <TextField
                  id='modal-description'
                  label='Bình luận'
                  multiline
                  rows={4}
                  variant='outlined'
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Button variant='contained' color='primary' onClick={handleSubmit}>
                  Gửi
                </Button>
              </Box>
            </Modal>
          </div>
          <div className='comment-box'>
            <List sx={{ mt: 2 }}>
              {comments.map((cmt, index) => (
                <ListItem key={index} alignItems='flex-start'>
                  <div style={{backgroundColor: 'gray', width:'2rem', height:'2rem', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', marginRight:'1rem'}}>
                    <img src="https://picsum.photos/200/300/?blur" alt={currentUser?.user?.name} />
                  </div>
                  <ListItemText
                    primary={cmt.userName}
                    secondary={
                      <>
                        {cmt.comment}
                        <Typography variant="caption" display="block" gutterBottom>
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
          <LessonBar param={lessonId} />
        </div>
      </div>
    </div>
  )
}

export default LessonDetail
