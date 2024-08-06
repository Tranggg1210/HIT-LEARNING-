import './LessonDetail.scss'
import '../../styles/index.scss'
import { Typography, Button, Box, TextField, List, ListItem, ListItemText } from '@mui/material'
import Modal from '@mui/material/Modal'
import { IconChevronLeft, IconHeart, IconHeartFilled, IconEye, IconDownload, IconBubbleText } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LessonBar from '../../components/LessonBar/LessonBar'
import CourseList1 from '../../assets/images/course-list-basic-1.png'
import { useSelector } from 'react-redux'

const LessonDetail = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const items = useSelector((state) => state.items.itemsBySectionId)
  const currentItem = items[lessonId] ? items[lessonId][0] : null

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false)
  const [like, setLike] = useState(false)

  const handleCommentChange = (event) => setComment(event.target.value)
  const handleBack = () => navigate('/')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleLike = () => setLike(!like)

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment('')
      handleClose()
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
                {determineMediaType(currentItem.videoName) === 'video' && (
                  <video controls width='600'>
                    <source
                      src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoName}`}
                      type='video/mp4'
                    />
                  </video>
                )}
                {determineMediaType(currentItem.videoName) === 'image' && (
                  <img
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${currentItem.videoName}`}
                    alt='Khóa học'
                  />
                )}
                {determineMediaType(currentItem.videoName) === 'empty' && (
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
                      <button className='btn-des'>
                        <IconDownload /> Tải xuống
                      </button>
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
                  onChange={handleCommentChange}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Button variant='contained' color='primary' onClick={handleSubmit}>
                  Gửi
                </Button>
                <div className='comment-box'>
                  <List sx={{ mt: 2 }}>
                    {comments.map((cmt, index) => (
                      <ListItem key={index} alignItems='flex-start'>
                        <ListItemText primary={cmt} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Box>
            </Modal>
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