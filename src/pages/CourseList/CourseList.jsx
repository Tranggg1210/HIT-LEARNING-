import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconChevronDown,
  IconChevronRight,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import './CourseList.scss'
import CreateSubFolder from '../../components/CreateSubFolder/CreateSubFolder'
const CourseList = () => {
  const [folders, setFolders] = useState([])
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [parentFolderId, setParentFolderId] = useState(null)
  const [isCreatingSubFolder, setIsCreatingSubFolder] = useState(false)
  const navigate = useNavigate()
  // const handleClickCreateFolder = () => {
  //   setIsCreatingFolder(false)
  //   {
  //     isCreatingFolder == false && <CreateFolder onCreate={handleCreateFolder} />
  //   }
  //   navigate('/createFolder')
  // }
  const handleCreateSubFolder = (subFolder) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === parentFolderId) {
          return {
            ...folder,
            subFolders: [...folder.subFolders, { id: Date.now(), ...subFolder }],
          }
        }
        return folder
      }),
    )
    setIsCreatingSubFolder(false)
    setParentFolderId(null)
  }
  const handleCreateFolder = (folderName) => {
    if (parentFolderId === null) {
      setFolders([...folders, { id: Date.now(), name: folderName, subFolders: [], isOpen: false }])
    } else {
      setFolders(
        folders.map((folder) => {
          if (folder.id === parentFolderId) {
            return {
              ...folder,
              subFolders: [...folder.subFolders, { id: Date.now(), name: folderName }],
            }
          }
          return folder
        }),
      )
    }
    console.log('Updated folders:', folders)
    setIsCreatingFolder(false)
    setParentFolderId(null)
  }
  const handleOpenCreateFolder = (parentId = null) => {
    setParentFolderId(parentId)
    setIsCreatingFolder(true)
  }
  const handleOpenCreateSubFolder = (parentId) => {
    setParentFolderId(parentId)
    setIsCreatingSubFolder(true)
  }
  const toggleFolder = (id) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === id) {
          return { ...folder, isOpen: !folder.isOpen }
        }
        return folder
      }),
    )
  }
  const handleDeleteSubFolder = (parentId, subFolderId) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === parentId) {
          return {
            ...folder,
            subFolders: folder.subFolders.filter((subFolder) => subFolder.id !== subFolderId),
          }
        }
        return folder
      }),
    )
  }
  return (
    <>
      {isCreatingFolder && (
        <CreateFolder onCreate={handleCreateFolder} onCancel={() => setIsCreatingFolder(false)} />
      )}
      {isCreatingSubFolder && (
        <CreateSubFolder
          onCreate={handleCreateSubFolder}
          onCancel={() => setIsCreatingSubFolder(false)}
        />
      )}
      {!isCreatingFolder && !isCreatingSubFolder && (
        <div className='course-list-containers'>
          <div className='course-header'>
            <img src='react-logo.png' alt='' className='course-logo' />
            <h2>REACTJS</h2>
            <p>Tổng số video hiện có: 12</p>
            <button className='edit-course-button'>SỬA KHOÁ HỌC</button>
            <button className='cancel-course-button' onClick={() => navigate('/')}>
              HUỶ BỎ
            </button>
          </div>
          <div className='row2'>
            <div className='course-contents'>
              <div className='folders'>
                {folders.map((folder) => (
                  <div key={folder.id} className='folder'>
                    <div className='folder-header' onClick={() => toggleFolder(folder.id)}>
                      {folder.isOpen ? <IconChevronDown /> : <IconChevronRight />}
                      <h3>{folder.name}</h3>
                      <div className='folder-actions'>
                        <IconPencil className='edit-icon' />
                        <IconPlus
                          className='add-icon'
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenCreateSubFolder(folder.id)
                          }}
                        />
                      </div>
                    </div>
                    {folder.isOpen && (
                      <div className='folder-items'>
                        {folder.subFolders.map((subFolder) => (
                          <div key={subFolder.id} className='folder-item'>
                            <p>{subFolder.name}</p>
                            <div className='subfolder-actions'>
                              <IconPencil
                                // onClick={() => handleEditCourse(subFolder.id)}
                                className='edit-icon'
                              />
                              <IconTrash
                                onClick={() => handleDeleteSubFolder(folder.id, subFolder.id)}
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
                className='create-folder-button'
                onClick={() => {
                  handleOpenCreateFolder()
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
