import './LessonDetail.scss'
import '../../styles/index.scss'
import ReactPlayer from 'react-player'
import { Typography, Button, Box, TextField, List, ListItem, ListItemText } from '@mui/material'
import Modal from '@mui/material/Modal'

import { IconChevronLeft } from '@tabler/icons-react'
import { IconChevronRight } from '@tabler/icons-react'
import { IconHeart } from '@tabler/icons-react'
import { IconHeartFilled } from '@tabler/icons-react'
import { IconEye } from '@tabler/icons-react'
import { IconDownload } from '@tabler/icons-react'
import { IconBubbleText } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LessonBar from '../LessonBar/LessonBar'
const LessonDetail = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);  
  const handleCommentChange = (event) => setComment(event.target.value);

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
      handleClose();
    }
  };

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [like, setLike] = useState(false)
  const handleLike = () => {
    setLike(!like)
  }
  return (
    <>
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
              <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' controls width='80%' />
              <div className='player-des'>
                <div className='des-container'>
                  <div className='des-box'>
                    <div className='des-left'>
                      <h2>Giới thiệu</h2>
                      <span className='sub eye'>
                        <IconEye /> 100 lượt xem
                      </span>
                      <br />
                      <span style={{ color: 'rgba(0, 0, 0, 0.544)' }}>
                        Người đăng: Trang Nguyễn
                      </span>
                    </div>
                    <div className='des-right'>
                      <div className='button-des'>
                        <button className='btn-des' onClick={handleLike}>
                          {like ? <IconHeartFilled /> : <IconHeart />}30
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
                  <div className="comment-box">
                    <List sx={{ mt: 2 }}>
                      {comments.map((cmt, index) => (
                        <ListItem key={index} alignItems="flex-start">
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
            <LessonBar />
          </div>
        </div>
        <footer className='lesson-footer'>
          <div className='button-footer'>
            <Button sx={{ color: 'gray' }} className='prev'>
              <IconChevronLeft />
              BÀI TRƯỚC
            </Button>
            <Button
              sx={{
                borderColor: 'orange',
                color: 'orange',
                '&:hover': {
                  borderColor: 'orange',
                  backgroundColor: 'rgba(17, 82, 147, 0.04)',
                },
              }}
              variant='outlined'
              className='next btn'>
              BÀI TIẾP THEO
              <IconChevronRight />
            </Button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default LessonDetail
