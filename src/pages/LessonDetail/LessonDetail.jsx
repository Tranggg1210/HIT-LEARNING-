import './LessonDetail.scss'
import '../../styles/index.scss'
import { Typography, List, ListItem, ListItemText, IconButton } from '@mui/material'
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
import { createComment, getComment, deleteComment } from '../../apis/comment.api'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { getAllItem } from '../../apis/item.api'
import Loading from '../../components/Loading/Loading'
import { IconTrash } from '@tabler/icons-react'
import { current } from '@reduxjs/toolkit'
import Avatar from  '../../assets/images/user.png'

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

      setCurrentItem(items.data.data)

      const sortedComments = commentRes.data.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setComments(sortedComments)
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [like, setLike] = useState(false)

  const handleBack = () => navigate('/')
  const handleLike = () => setLike(!like)

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      toast.error('Vui lòng nhập bình luận trước khi gửi')
      return
    }

    try {
      setLoading(true)
      const res = await createComment(lessonId, {
        username: currentUser?.user?.userName,
        comment,
      })
      if (res.data) {
        const newComment = {
          comment: comment,
          createdAt: new Date().toISOString(),
        }

        setComments((prevComments) => {
          const updatedComments = [newComment, ...prevComments]
          return updatedComments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
        })

        setComment('')
        toast.success('Gửi thành công')
      }
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteCom = async (commentId) => {
    try {
      setLoading(true)
      await deleteComment(commentId)
      setComments(comments.filter((comment) => comment.id !== commentId))
      toast.success('Xóa bình luận thành công')
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      } else if (error?.code === 'ERR_NETWORK') {
        toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
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

  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <>
      {loading && <Loading />}
      <div className='lesson-detail'>
        <div className='lesson-box'>
          <div className='lesson-left'>
            <div className='goback' onClick={handleBack}>
              <IconChevronLeft stroke={2} width={20} height={48} />
              <Typography variant='h6' component='h6' sx={{ fontSize: '16px' }}>
                Quay lại
              </Typography>
            </div>
            <div className='player'>
              {currentItem && (
                <div className='player-banner'>
                  {determineMediaType(currentItem.videoId) === 'video' && (
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <video controls width='fit-content' className='showVideo'>
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
                      <h2 style={{ color: "#f37335" }}>{currentItem?.name}</h2>
                      <span className='sub eye'>
                        <IconEye /> {currentItem.view || 0} lượt xem
                      </span>
                      <br />
                      <span style={{ color: 'rgba(0, 0, 0, 0.544)' }}>
                        Người đăng: {currentItem?.section?.course?.user?.name || 'Không xác định'}
                      </span>
                      <br />
                      <span style={{ color: 'rgba(0, 0, 0, 0.544)' }}>
                        Ngày đăng: {isoDayMonthYear(currentItem.createdAt)}
                      </span>
                      <br />
                      <br />
                      <p>{currentItem.description}</p>

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
              <div className='text-comment'>
                <h3>Bình luận</h3>
                <form className='button-dis' onSubmit={addComment}>
                  <div
                    style={{
                       
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                    }}> <img src={Avatar} alt="" style={{width:'100%', }} /></div>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Nhập bình luận của bạn'
                  ></input>
                  <button id='send' onClick={addComment}>
                    Gửi
                  </button>
                </form>
              </div>
            </div>
            <div className='comment-box'>
              <List sx={{ mt: 2 }}>
                {comments.map((cmt, index) => (
                  <ListItem
                    key={index}
                    alignItems='flex-start'
                    className='comment-item'
                    sx={{
                      '&:hover .delete-comment': {
                        display: 'block',
                      },
                    }}>
                    <div
                      style={{
                        overflow:'hidden',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        marginTop:'8px',
                      }}>
                        <img src="https://picsum.photos/200/300" alt="" style={{width:'100%',objectPosition:'center'}} />
                      </div>
                    <ListItemText
                      primary={currentItem?.section?.course?.user?.name}
                      secondary={
                        <>
                          {cmt.comment}
                          <Typography variant='caption' display='block' gutterBottom>
                            {formatDate(cmt?.createdAt)}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton
                      className='delete-comment'
                      onClick={() => deleteCom(cmt?.id)}
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                      }}>
                      <IconTrash size={18} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
          <div className='lesson-right'>
            <LessonBar param={courseId} highLightItem={lessonId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonDetail
