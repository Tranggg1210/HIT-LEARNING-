import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useState, useEffect } from 'react'
import './AdminAccount.scss'
import { useNavigate } from 'react-router-dom'
import { deleteAccount, getAllAccount } from '../../apis/user.api'
import AdminCreateAccount from '../../components/AdminCreateAccount/AdminCreateAccount'
import { getAdminUser } from '../../apis/search.api'
import { IconButton } from '@mui/material'
import { IconCircleX } from '@tabler/icons-react'
import toast from 'react-hot-toast'

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#000',
    color: '#fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
})

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
})

const AdminAccount = () => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [totalRows, setTotalRows] = useState(0)
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [searchInputAA, setSearchInputAA] = useState('')
  const [searchClick, setSearchClick] = useState(false)
  const navigate = useNavigate()

  const handleOpen = (account = null) => {
    setIsEditing(!!account)
    setCurrentAccount(account)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setCurrentAccount(null)
  }

  const size = 3

  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  const loadData = async (term = '') => {
    try {
      let response
      if (term) {
        response = await (await getAdminUser(term)).data.data
      } else {
        response = await (await getAllAccount()).data.data
      }
      setTotalRows(response.length)
      if (term) {
        setRows(response.content.slice((page - 1) * size, page * size))
      } else {
        setRows(response.slice((page - 1) * size, page * size))
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải dữ liệU người dùng')
    }
  }
  // useEffect(() => {
  //   loadData(searchInputAA)
  // }, [page, searchInputAA])
  useEffect(() => {
    loadData(searchInputAA)
  }, [])

  useEffect(() => {
    if (searchClick) {
      loadData(searchInputAA)
      setSearchClick(false)
    }
  }, [page, searchClick])

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  const handleEdit = (account) => {
    handleOpen(account)
  }

  const handleDeleteAccount = async (id) => {
    try {
      await deleteAccount(id)
      setRows(rows.filter((account) => account.id !== id))
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xoá dữ liệu người dùng')
    }
  }
  // const handleSearch = () => {
  //   loadData(searchInputAA)
  // }

  // const handleClearSearch = () => {
  //   setSearchInputAA('')
  //   loadData()
  // }
  const handleSearch = () => {
    setSearchClick(true)
  }

  const handleClearSearch = () => {
    setSearchInputAA('')
    setSearchClick(true)
  }
  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
  }

  return (
    <>
      <h1 className='name-course-admin'>Quản trị tài khoản</h1>
      <div className='box-add'>
        <div className='search-admin'>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              className='input-admin'
              type='text'
              value={searchInputAA}
              onChange={(e) => setSearchInputAA(e.target.value)}
              placeholder='Nhập tìm kiếm bằng tên khoá học ...'
              style={{ paddingRight: '40px' }}
            />
            <Button
              variant='contained'
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                height: '35px',
                minWidth: '100px',
                borderRadius: '5px',
                background: 'linear-gradient(94deg, #f4b81e 78.55%, #f67102 106.63%)',
                fontSize: '14px',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <IconButton
              sx={{
                position: 'absolute',
                right: 120,
                top: '50%',
                transform: 'translateY(-50%)',
                height: '35px',
                width: '35px',
                borderRadius: '5px',
                color: '#f4b81e',
                cursor: 'pointer',
              }}
              onClick={handleClearSearch}>
              <IconCircleX />
            </IconButton>
          </div>
        </div>
        <Button
          variant='contained'
          onClick={() => handleOpen()}
          sx={{
            Height: '48px',
            background: 'linear-gradient(94deg, #f4b81e 78.55%, #f67102 106.63%)',
          }}>
          Thêm tài khoản
        </Button>
        {open && (
          <AdminCreateAccount
            opens={open}
            handleCloses={handleClose}
            accountData={currentAccount}
            isEditing={isEditing}
            onEditSuccess={loadData}
          />
        )}
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead
              sx={{
                background: 'linear-gradient(94deg, #f4b81e 78.55%, #f67102 106.63%)',
              }}>
              <TableRow
                sx={{
                  background: 'linear-gradient(94deg, #f4b81e 78.55%, #f67102 106.63%)',
                }}>
                <StyledTableCell align='center' sx={{ width: '100px' }}>
                  STT
                </StyledTableCell>
                <StyledTableCell
                  align='center'
                  sx={{
                    width: '400px',
                  }}>
                  ID
                </StyledTableCell>
                <StyledTableCell align='center' sx={cellStyle}>
                  Tên người dùng
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ width: '300px' }}>
                  Email
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ width: '200px' }}>
                  Ngày tạo
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ width: '200px' }}>
                  Button
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align='center'>{idx + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{row.id}</StyledTableCell>
                  <StyledTableCell align='center' sx={cellStyle}>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{row.email}</StyledTableCell>
                  <StyledTableCell align='center'>{isoDayMonthYear(row.createdAt)}</StyledTableCell>
                  <StyledTableCell
                    align='center'
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      alignItems: 'center',
                    }}>
                    <Button
                      variant='contained'
                      sx={{
                        width: '80px',
                        fontSize: '10px',
                        background: 'linear-gradient(94deg, #f4b81e 78.55%, #f67102 106.63%)',
                      }}
                      onClick={() => handleEdit(row)}>
                      Sửa
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ width: '80px', fontSize: '10px', backgroundColor: 'silver' }}
                      onClick={() => handleDeleteAccount(row.id)}>
                      Xoá
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} sx={{ margin: '20px', alignItems: 'end' }}>
          <Pagination
            count={Math.ceil(totalRows / size)}
            page={page}
            onChange={handleChangePage}
            color='primary'
          />
        </Stack>
      </Paper>
    </>
  )
}

export default AdminAccount
