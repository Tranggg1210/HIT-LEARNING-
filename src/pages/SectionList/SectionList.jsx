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
  const navigate = useNavigate()

  const { id } = useParams()

  const loadSectionCourse = async () => {
    try {
      const result = await getCourseById(id)
      setCourse(result.data.data)
      const resultSection = await getAllSection(id)
      setSections(resultSection.data.data.content)
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải dữ liệu khóa học')
    }
  }

  useEffect(() => {
    loadSectionCourse()
  }, [])

  const handleToggle = async (index, sectionId) => {
    setOpenSection(openSection === index ? null : index)
    if (openSection !== index) {
      try {
        const items = await getItemById(sectionId)
        setSectionItems((prevItems) => ({
          ...prevItems,
          [sectionId]: items.data.data.content,
        }))
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi tải dữ liệu mục')
      }
    }
  }
  const handleDeleteSection = async (id) => {
    try {
      await deleteSection(id)
      setSections(sections.filter((section) => section.id !== id))
      toast.success('Xóa v\buổi học thành công')
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa buổi học')
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
      await deleteItem(itemId)
      setSectionItems((prevItems) => ({
        ...prevItems,
        [sectionId]: prevItems[sectionId].filter((item) => item.id !== itemId),
      }))
      toast.success('Xóa video buổi học thành công')
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa video buổi học')
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
  return (
    <>
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
              <img
                src={`${import.meta.env.VITE_API_SERVER}/stream/${course.videoId}`}
                alt=''
                className='course-logo'
              />
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
                {sections.map((sec, idx) => (
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
                ))}
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
