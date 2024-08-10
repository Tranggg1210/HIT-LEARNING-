import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import './AdminCreateAccount.scss'
import { createAccount, updateAccount } from '../../apis/user.api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading/Loading'

const AdminCreateAccount = ({ opens, handleCloses, accountData, isEditing, onEditSuccess }) => {
  const [userNames, setUserNames] = useState('')
  const [passwords, setPasswords] = useState('')
  const [classNames, setClassNames] = useState('')
  const [names, setNames] = useState('')
  const [emails, setEmails] = useState('')
  const [linkFbs, setLinkFbs] = useState('')
  const [descriptions, setDescriptions] = useState('')
  const [linkAvatars, setLinkAvatars] = useState('')
  const [availables, setAvailables] = useState(true)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditing && accountData) {
      setUserNames(accountData.username || '')
      setPasswords(accountData.password || '')
      setNames(accountData.name || '')
      setEmails(accountData.email || '')
      setLinkFbs(accountData.linkFb || '')
      setDescriptions(accountData.description || '')
      setLinkAvatars(accountData.linkAvatar || '')
      setClassNames(accountData.className || '')
      setAvailables(accountData.available ?? true)
    }
  }, [isEditing, accountData])

  const handleSubmit = async () => {
    const newAccountData = {
      username: userNames,
      password: passwords,
      name: names,
      email: emails,
      linkFb: linkFbs,
      description: descriptions,
      linkAvatar: linkAvatars,
      className: classNames,
      available: availables,
    }

    try {
      if (isEditing) {
        setLoading(true)
        await updateAccount(accountData.id, newAccountData)
      } else {
        setLoading(true)
        await createAccount(newAccountData)
      }
      handleCloses()
      if (onEditSuccess) onEditSuccess()
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

  const handleAvailableTypeChange = (event) => {
    setAvailables(event.target.value === 'True')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    height: 630,
  }

  const formGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={opens}
        onClose={handleCloses}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: '5px', lineHeight: '3rem' }}>
            {isEditing ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản'}
          </Typography>
          <Box sx={formGrid}>
            <TextField
              sx={{ width: '100%' }}
              id='outlined-username-input'
              label='Tên đăng nhập'
              type='text'
              size='medium'
              autoComplete='on'
              value={userNames}
              onChange={(e) => setUserNames(e.target.value)}
              rows={1}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-password-input'
              label='Mật khẩu'
              type='password'
              autoComplete='off'
              value={passwords}
              onChange={(e) => setPasswords(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-name-input'
              label='Tên người dùng'
              type='text'
              autoComplete='off'
              value={names}
              onChange={(e) => setNames(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-email-input'
              label='Email'
              type='email'
              autoComplete='off'
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-linkFb-input'
              label='Link Facebook'
              type='text'
              autoComplete='off'
              value={linkFbs}
              onChange={(e) => setLinkFbs(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-description-input'
              label='Mô tả người dùng'
              type='text'
              autoComplete='off'
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-linkAvatar-input'
              label='Link avatar'
              type='text'
              autoComplete='off'
              value={linkAvatars}
              onChange={(e) => setLinkAvatars(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <TextField
              sx={{ width: '100%' }}
              id='outlined-className-input'
              label='Lớp học'
              type='text'
              autoComplete='off'
              value={classNames}
              onChange={(e) => setClassNames(e.target.value)}
              rows={4}
              className='new-textarea'
              InputProps={{
                style: { height: '50px' },
              }}
            />
            <FormControl sx={{ width: '100%' }} size='medium'>
              <InputLabel className='available-type-select-label'>Available</InputLabel>
              <Select
                labelId='available-type-select-label'
                className='available-type-select'
                value={availables ? 'True' : 'False'}
                label='Available'
                onChange={handleAvailableTypeChange}>
                <MenuItem value='True'>True</MenuItem>
                <MenuItem value='False'>False</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className='btn-admin-click-account'>
            <Button
              variant='contained'
              sx={{ width: '145px', height: '45px' }}
              onClick={handleCloses}>
              HUỶ BỎ
            </Button>
            <Button
              variant='contained'
              sx={{ width: '145px', height: '45px', whiteSpace: 'nowrap' }}
              onClick={handleSubmit}>
              {isEditing ? 'Sửa tài khoản' : 'Tạo tài khoản'}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default AdminCreateAccount
