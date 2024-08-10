import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IconChevronDown,
  IconChevronRight,
  IconClockHour9,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { toast } from 'react-hot-toast'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import './SectionList.scss'
import CreateSubFolder from '../../components/CreateNewSection/CreateNewSection'
import { getCourseById } from '../../apis/courses.api'
import { deleteSection, getAllSection } from '../../apis/section.api'
import { deleteItem, getItemById } from '../../apis/item.api'
import EditListSection from '../../components/EditListSection/EditListSection'
import EditCourse from '../../components/EditCourse/EditCourse'
import Loading from '../../components/Loading/Loading'
import math from '../../assets/images/maths.png'
import CourseList1 from '../../assets/images/course-list-basic-1.png'

const CourseList = () => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [isCreatingSubFolder, setIsCreatingSubFolder] = useState(false)
  const [isEditingItem, setIsEditingItem] = useState(false)
  const [isEditingSection, setIsEditingSection] = useState(false)
  const [course, setCourse] = useState([])
  const [sections, setSections] = useState([])
  const [sectionItems, setSectionItems] = useState({})
  const [selectedItemId, setSelectedItemId] = useState('')
  const [openSection, setOpenSection] = useState(null)
  const [editingItemData, setEditingItemData] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  const loadSectionCourse = async () => {
    try {
      setLoading(true)
      const result = await getCourseById(id)
      setCourse(result.data.data)
      const resultSection = await getAllSection(id)
      setSections(resultSection.data.data.content)
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

  useEffect(() => {
    loadSectionCourse()
  }, [])

  const handleToggle = async (index, sectionId) => {
    setOpenSection(openSection === index ? null : index)
    if (openSection !== index) {
      try {
        setLoading(true)
        const items = await getItemById(sectionId)
        setSectionItems((prevItems) => ({
          ...prevItems,
          [sectionId]: items.data.data.content,
        }))
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
  }
  const handleDeleteSection = async (id) => {
    try {
      setLoading(true)
      await deleteSection(id)
      setSections(sections.filter((section) => section.id !== id))
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

  const confirmDeleteSection = (sectionId) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa buổi học này không?',
      buttons: [
        {
          label: 'Không',
          onClick: () => {},
        },
        {
          label: 'Có',
          onClick: () => handleDeleteSection(sectionId),
        },
      ],
    })
  }
  const handleDeleteItem = async (sectionId, itemId) => {
    try {
      setLoading(true)
      await deleteItem(itemId)
      setSectionItems((prevItems) => ({
        ...prevItems,
        [sectionId]: prevItems[sectionId].filter((item) => item.id !== itemId),
      }))
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

  const confirmDeleteItem = (sectionId, itemId) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa video buổi học này không?',
      buttons: [
        {
          label: 'Không',
          onClick: () => {},
        },
        {
          label: 'Có',
          onClick: () => handleDeleteItem(sectionId, itemId),
        },
      ],
    })
  }

  const handleEditItem = (itemId, itemData) => {
    setSelectedItemId(itemId)
    setEditingItemData(itemData)
    setIsEditingItem(true)
    setIsCreatingSubFolder(true)
  }

  const handleCreateSection = () => {
    setIsCreatingFolder(true)
  }

  const handleEditSection = () => {
    setIsCreatingFolder(false)
    setIsCreatingSubFolder(false)
    setIsEditingItem(false)
    setEditingItemData(null)
    setIsEditingSection(true)
  }

  const handleCreateItem = (itemId) => {
    setSelectedItemId(itemId)
    setIsEditingItem(false)
    setEditingItemData(null)
    setIsCreatingSubFolder(true)
  }

  const handleSectionCreated = () => {
    loadSectionCourse()
  }
  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
  return (
    <>
      {loading && <Loading />}
      {isCreatingFolder && (
        <CreateFolder onCancel={() => setIsCreatingFolder(false)} onCreate={handleSectionCreated} />
      )}
      {isEditingSection && (
        <EditListSection
          onCancel={() => setIsEditingSection(false)}
          onCreate={handleSectionCreated}
        />
      )}
      {(isCreatingSubFolder || isEditingItem) && (
        <CreateSubFolder
          itemId={selectedItemId}
          onCancel={() => {
            setIsCreatingSubFolder(false)
            setIsEditingItem(false)
          }}
          editingItemData={editingItemData}
          onCreate={handleSectionCreated}
        />
      )}
      {!isCreatingFolder && !isCreatingSubFolder && !isEditingSection && (
        <div className='course-list-containers'>
          <div className='course-header'>
            <div className='course-img'>
              {determineMediaType(course.videoId) === 'video' && (
                <video controls width='600' className='course-img'>
                  <source
                    src={`${import.meta.env.VITE_API_SERVER}/stream/${course.videoId}`}
                    type='video/mp4'
                  />
                </video>
              )}
              {determineMediaType(course.videoId) === 'image' && (
                <img
                  className='course-img'
                  src={`${import.meta.env.VITE_API_SERVER}/stream/${course.videoId}`}
                  alt='Khóa học'
                />
              )}
              {determineMediaType(course.videoId) === 'empty' && (
                <img src={CourseList1} alt='Khóa học' className='course-img' />
              )}
            </div>
            <h2>{course.name}</h2>
            <p className='course-leader-name'>{course.user?.name}</p>
            <div className='infor'>
              <IconClockHour9 stroke={2} />
              <p>{isoDayMonthYear(course.createdAt)}</p>
            </div>
            <button className='edit-course-button' onClick={() => handleOpen()}>
              SỬA KHOÁ HỌC
            </button>
            {open && <EditCourse opens={open} handleCloses={handleClose} courseData={course} />}
            <button className='cancel-course-button' onClick={() => navigate('/')}>
              HUỶ BỎ
            </button>
          </div>
          <div className='row2'>
            <div className='course-contents'>
              <div className='sections'>
                {sections.length > 0 ? (
                  sections.map((sec, idx) => (
                    <div key={sec.id} className='section'>
                      <div className='section-header' onClick={() => handleToggle(idx, sec?.id)}>
                        <div className='section-folder-header'>
                          {openSection === idx ? <IconChevronDown /> : <IconChevronRight />}
                          <h3>{sec.name}</h3>
                          <div className='section-actions'>
                            <IconPencil
                              className='edit-icon'
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditSection()
                              }}
                            />
                            <IconPlus
                              className='add-icon'
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCreateItem(sec.id)
                              }}
                            />
                            <IconTrash
                              className='delete-icon'
                              onClick={(e) => {
                                e.stopPropagation()
                                confirmDeleteSection(sec.id)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {openSection === idx && sectionItems[sec.id] && (
                        <div className='section-items'>
                          {sectionItems[sec.id].map((item) => (
                            <div key={item.id} className='section-item'>
                              <p>{item.name}</p>
                              <div className='item-actions'>
                                <IconPencil
                                  onClick={() => handleEditItem(item.id, item)}
                                  className='edit-icon'
                                />
                                <IconTrash
                                  onClick={() => confirmDeleteItem(sec.id, item.id)}
                                  className='delete-icon'
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className='box-not-courses'>
                    <p>Các buổi học sẽ được cập nhật sớm nhất !!!</p>
                  </div>
                )}
              </div>
            </div>
            <div className='buttons'>
              <button
                className='create-section-button'
                onClick={() => {
                  handleCreateSection()
                }}>
                TẠO FOLDER
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseList
