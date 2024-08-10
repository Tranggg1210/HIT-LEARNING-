import { useEffect, useRef, useState } from 'react'
import './CreateNewSection.scss'
import { IconUpload } from '@tabler/icons-react'
import { createItem, updateItem } from '../../apis/item.api'
import { TextField } from '@mui/material'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'
import { Field, Formik, Form } from 'formik'
import { createNewSectionValidate } from '../../utils/createNewSectionValidate'
const CreateSubFolder = ({ itemId, onCancel, editingItemData, onCreate }) => {
  // const [itemName, setItemName] = useState()
  // const [describeItem, setDescribeItem] = useState(
  //  ,
  // )
  const [uploadItem, setUploadItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initial, setInitial] = useState({
    name: editingItemData ? editingItemData.name : '',
    description: editingItemData ? editingItemData.description : '',
  })
  const inputRef = useRef()

  useEffect(() => {
    if (editingItemData) {
      setInitial({
        name: editingItemData.name,
        description: editingItemData.description,
      })
    }
  }, [editingItemData])

  const handleFileChangeItem = (e) => {
    const file = e.target.files[0]
    setUploadItem(file)
  }

  const handleSubmitItem = async (value) => {
    console.log('123')
    if (uploadItem) {
      toast.error('Vui lòng chọn video/ảnh cho viedo buỏi học')
      return
    }
    if (value.name?.trim() && value.description?.trim() && (uploadItem || editingItemData)) {
      const itemData = {
        name: value.name,
        description: value.description,
        sectionId: itemId,
        file: uploadItem,
      }

      try {
        setLoading(true)
        if (editingItemData) {
          await updateItem(itemId, itemData)
        } else {
          await createItem(itemData)
        }
        if (editingItemData) {
          toast.success('Sửa video buổi học thành công')
        } else {
          toast.success('Tạo video buổi học thành công')
        }
        onCreate()
        onCancel()
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi sửa tạo dữ liệu video buổi học')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className='create-new-section'>
        <h2>{editingItemData ? 'SỬA VIDEO BUỔI HỌC' : 'TẠO VIDEO BUỔI HỌC'}</h2>
        <div className='new-section-header'>
          <div className='new-upload-file'>
            <div className='new-icon-upload'>
              {uploadItem ? (
                <p>File name: {uploadItem?.name}</p>
              ) : (
                <div className='new-boxUpload'>
                  <div className='new-boxIcon'>
                    <IconUpload
                      className='new-iconUpload'
                      onClick={() => inputRef.current.click()}
                    />
                  </div>
                  <p>Kéo ảnh, video demo để tải lên</p>
                </div>
              )}
            </div>
            <div className='new-input-upload'>
              <input type='file' onChange={handleFileChangeItem} ref={inputRef} />
              <button className='new-button-upload' onClick={() => inputRef.current.click()}>
                Chọn tệp
              </button>
            </div>
          </div>
          <Formik
            initialValues={initial}
            validationSchema={createNewSectionValidate}
            onSubmit={(value) => handleSubmitItem(value)}>
            {({ errors, touched }) => (
              <Form className='form-group'>
                <div className='input-group-field input-group'>
                  <Field
                    type='text'
                    placeholder='Tên video buổi học'
                    name='name'
                    autoComplete='off'
                  />
                </div>
                {errors.name && touched.name ? <p className='errorMsg'>{errors.name}</p> : null}
                <br />
                <div className='input-group-field input-group'>
                  <Field type='textarea' placeholder='Mô tả video buổi học' name='description' />
                </div>
                {errors.description && touched.description ? (
                  <p className='errorMsg'>{errors.description}</p>
                ) : null}

                <div className='new-pots'>
                  <div className='new-pots2'>
                    <button className='new-post-button-cancel' onClick={onCancel}>
                      HUỶ BỎ
                    </button>
                  </div>
                  <div className='new-pots1'>
                    <button className='new-post-button' type='submit'>
                      {editingItemData ? 'CẬP NHẬT VIDEO' : 'ĐĂNG VIDEO'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* <div className='new-infors'>
            <div className='new-infor-folder'>
              <TextField
                sx={{ width: '100%' }}
                id='outlined-folder-input'
                label='Tên video buổi học'
                type='text'
                autoComplete='off'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                rows={1}
                className='new-textarea'
                InputProps={{
                  style: { height: '50px' },
                }}
              />
            </div>
            <div className='new-infor-describe'>
              <TextField
                sx={{ width: '100%' }}
                id='outlined-describe-input'
                label='Mô tả video buổi học'
                type='text'
                autoComplete='off'
                value={describeItem}
                onChange={(e) => setDescribeItem(e.target.value)}
                rows={4}
                className='new-textarea'
                multiline
                InputProps={{
                  style: { height: '125px', alignItems: 'flex-start' },
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default CreateSubFolder
// import { useEffect, useRef, useState } from 'react'
// import './CreateNewSection.scss'
// import { IconUpload } from '@tabler/icons-react'
// import { createItem, updateItem } from '../../apis/item.api'
// import { TextField } from '@mui/material'
// import toast from 'react-hot-toast'
// import Loading from '../../components/Loading/Loading'

//  const CreateSubFolder = ({ itemId, onCancel, editingItemData, onCreate }) => {
//     const [itemName, setItemName] = useState(editingItemData ? editingItemData.name : '')
//     const [describeItem, setDescribeItem] = useState(
//       editingItemData ? editingItemData.description : '',
//     )
//     const [uploadItem, setUploadItem] = useState(null)
//     const [loading, setLoading] = useState(false)

//     const inputRef = useRef()

//     useEffect(() => {
//       if (editingItemData) {
//         setItemName(editingItemData.name)
//         setDescribeItem(editingItemData.description)
//         setUploadItem(editingItemData.file)
//       }
//     }, [editingItemData])

//     const handleFileChangeItem = (e) => {
//       const file = e.target.files[0]
//       setUploadItem(file)
//     }

//     const handleSubmitItem = async () => {
//       if (itemName && describeItem && (uploadItem || editingItemData)) {
//         const itemData = {
//           name: itemName,
//           description: describeItem,
//           sectionId: itemId,
//           file: uploadItem,
//         }

//         try {
//           setLoading(true)
//           if (editingItemData) {
//             await updateItem(itemId, itemData)
//           } else {
//             await createItem(itemData)
//           }
//           if (editingItemData) {
//             toast.success('Sửa video buổi học thành công')
//           } else {
//             toast.success('Tạo video buổi học thành công')
//           }
//           onCreate()
//           onCancel()
//         } catch (error) {
//           toast.error('Đã xảy ra lỗi khi sửa tạo dữ liệu video buổi học')
//         } finally {
//           setLoading(false)
//         }
//       }
//     }

//   return (
//     <>
//       <div className='container'>
//         <div className='box'>
//           <div className='back'>
//             <span onClick={goBack}>
//               <IoIosArrowBack /> QUAY LẠI
//             </span>
//           </div>
//           <div className='logo'>
//             <img src={logo} alt='HIT Logo' />
//           </div>
//           <Formik
//             initialValues={{
//               username: '',
//               password: '',
//             }}
//             validationSchema={loginValidate()}
//             onSubmit={async (values) => {
//               try {
//                 const res = await login(values)
//                 if (res.data.data.tokenContent) {
//                   const roles = res.data.data.roleName
//                   const userCurrent = await getUserById(res.data.data.userId)
//                   if (userCurrent) {
//                     authen.saveUser({
//                       token: res.data.data.tokenContent,
//                       role: roles,
//                       id: res.data.data.userId,
//                       refreshToken: res.data.data.refreshToken,
//                       userName: userCurrent.data.data.username,
//                       linkAvatar: userCurrent.data.data.linkAvatar,
//                       className:userCurrent.data.data.className,
//                       linkFb: userCurrent.data.data.linkFb,
//                       email:userCurrent.data.data.email,
//                       name:userCurrent.data.data.name,
//                       description:userCurrent.data.data.description,
//                     })
//                   }

//                   if (roles.includes('ADMIN')) return navigate('/admin')
//                   if (roles.includes('USER')) {
//                     return navigate('/')
//                   }
//                 } else {
//                   toast.error('Lỗi token')
//                 }
//               } catch (error) {
//                 toast.error('Đăng nhập thất bại')
//                 console.error('API error:', error.response || error.message)
//               }
//             }}>
//             {({ errors, touched }) => (
//               <Form>
//                 <div className='input-group'>
//                   <Field type='text' placeholder='Username' name='username' autoComplete='off' />
//                   <span className='icon'>
//                     <FaUser />
//                   </span>
//                 </div>
//                 {errors.username && touched.username ? (
//                   <p className='errorMsg'>{errors.username}</p>
//                 ) : null}
//                 <br />
//                 <div className='input-group pass'>
//                   <Field type='password' placeholder='Mật khẩu' name='password' />
//                   <span className='icon'>
//                     <FaLock />
//                   </span>
//                 </div>
//                 {errors.password && touched.password ? (
//                   <p className='errorMsg'>{errors.password}</p>
//                 ) : null}
//                 <div className='forgot-password'>
//                   <Link to='/forgot-password's>
//                     <i>Quên mật khẩu ?</i>
//                   </Link>
//                 </div>
//                 <button type='submit' className='button'>
//                   ĐĂNG NHẬP
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CreateSubFolder
