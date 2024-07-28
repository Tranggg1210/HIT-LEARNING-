import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IconChevronDown,
  IconChevronRight,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import './SectionList.scss'
import CreateSubFolder from '../../components/CreateNewSection/CreateNewSection'
import { getCourseById } from '../../apis/courses.api'
import { getAllSection } from '../../apis/section.api'
import { deleteItem, getAllItem } from '../../apis/item.api'

const CourseList = () => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [isCreatingSubFolder, setIsCreatingSubFolder] = useState(false)
  const [section, setSection] = useState([])
  const [course, setCourse] = useState([])
  const [sectionItems, setSectionItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState('')
  const [openSection, setOpenSection] = useState(null)
  const [isEditingItem, setIsEditingItem] = useState(false)
  const [editingItemData, setEditingItemData] = useState(null)
  const navigate = useNavigate()

  // const [items, setItems] = useState([])
  // const [folders, setFolders] = useState([])
  // const [parentFolderId, setParentFolderId] = useState(null)
  console.log(sectionItems)
  const handleToggle = async (index, sectionId) => {
    setOpenSection(openSection === index ? null : index)
    if (openSection !== index) {
      try {
        const items = await getAllItem(sectionId)

        if (items) {
          setSectionItems(items.data.data.content)
        } else {
          setSectionItems([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  let { id } = useParams()
  const loadSectionCourse = async () => {
    try {
      const result = await getCourseById(id)
      setCourse(result.data.data)
      const resultSection = await (await getAllSection(id)).data.data
      setSection(resultSection.content)
      // const resultItem = await getAllItem(section)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteItem = async (sectionId, itemId) => {
    try {
      await deleteItem(itemId)
      setSectionItems((prevItems) => {
        const updatedItems = { ...prevItems }
        updatedItems[sectionId] = updatedItems[sectionId].filter((item) => item.id !== itemId)
        return updatedItems
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleEditItem = (itemId, itemData) => {
    setSelectedItemId(itemId)
    setEditingItemData(itemData)
    setIsEditingItem(true)
  }
  const handleCreateSection = () => {
    setIsCreatingFolder(true)
  }

  const handleCreateItem = (itemId) => {
    setSelectedItemId(itemId)
    setIsCreatingSubFolder(true)
  }

  useEffect(() => {
    loadSectionCourse()
  }, [])
  return (
    <>
      {isCreatingFolder && <CreateFolder onCancel={() => setIsCreatingFolder(false)} />}
      {(isCreatingSubFolder || isEditingItem) && (
        <CreateSubFolder
          itemId={selectedItemId}
          onCancel={() => {
            setIsCreatingSubFolder(false)
            setIsEditingItem(false)
          }}
          editingItemData={editingItemData}
        />
      )}
      {!isCreatingFolder && !isCreatingSubFolder && (
        <div className='course-list-containers'>
          <div className='course-header'>
            <img
              src={`https://hitproduct2024-production-a244.up.railway.app/stream/${course.videoId}`}
              alt=''
              className='course-logo'
            />
            <h2>{course.name}</h2>
            <p>Tổng số video hiện có: 12</p>
            <button className='edit-course-button'>SỬA KHOÁ HỌC</button>
            <button className='cancel-course-button' onClick={() => navigate('/')}>
              HUỶ BỎ
            </button>
          </div>
          <div className='row2'>
            <div className='course-contents'>
              <div className='sections'>
                {section.map((sec, idx) => (
                  <div key={sec.id} className='section'>
                    <div className='section-header' onClick={() => handleToggle(idx, sec?.id)}>
                      <div className='section-folder-header'>
                        {openSection === idx ? <IconChevronDown /> : <IconChevronRight />}
                        <h3>{sec.name}</h3>
                        <div className='section-actions'>
                          <IconPencil className='edit-icon' />
                          <IconPlus
                            className='add-icon'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCreateItem(sec.id)
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {openSection === idx && sectionItems.length > 0 && (
                      <div className='section-items'>
                        {sectionItems.map((item) => (
                          <div key={item.id} className='section-item'>
                            <p>{item.name}</p>
                            <div className='item-actions'>
                              <IconPencil
                                onClick={() => handleEditItem(item.id, item)}
                                className='edit-icon'
                              />
                              <IconTrash
                                onClick={() => handleDeleteItem(sec.id, item.id)}
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
                  // handleClickCreateFolder()
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
