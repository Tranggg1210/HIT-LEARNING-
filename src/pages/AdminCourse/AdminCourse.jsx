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
import { deleteCourse, getAllCourse } from '../../apis/courses.api'
import { getAdminCourse } from '../../apis/search.api'
import './AdminCourse.scss'
import AdminCreateCourse from '../../components/AdminCreateCourse/AdminCreateCourse'
import { useNavigate } from 'react-router-dom'
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

const AdminCourse = () => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [totalRows, setTotalRows] = useState(0)
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCourse, setCurrentCourse] = useState(null)
  const [searchInputCA, setSearchInputCA] = useState('')
  const [searchClick, setSearchClick] = useState(false)
  const navigate = useNavigate()

  const handleOpen = (course = null) => {
    setIsEditing(!!course)
    setCurrentCourse(course)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setCurrentCourse(null)
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
        response = await (await getAdminCourse(term)).data.data
      } else {
        response = await (await getAllCourse()).data.data
      }
      setTotalRows(response.content.length)
      setRows(response.content.slice((page - 1) * size, page * size))
    } catch (error) {
      console.error('Error:  ', error)
    }
  }

  useEffect(() => {
    loadData(searchInputCA)
  }, [])

  useEffect(() => {
    if (searchClick) {
      loadData(searchInputCA)
      setSearchClick(false)
    }
  }, [page, searchClick])

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  const handleEdit = (course) => {
    handleOpen(course)
  }

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id)
      setRows(rows.filter((course) => course.id !== id))
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xoá dữ liệu khoá học')
    }
  }

  const handleSearch = () => {
    setSearchClick(true)
  }

  const handleClearSearch = () => {
    setSearchInputCA('')
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
      <h1 className='name-course-admin'>Quản trị khoá học</h1>
      <div className='box-add'>
        <div className='search-admin'>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              className='input-admin'
              type='text'
              value={searchInputCA}
              onChange={(e) => setSearchInputCA(e.target.value)}
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
          Thêm khoá học
        </Button>
        {open && (
          <AdminCreateCourse
            opens={open}
            handleCloses={handleClose}
            courseData={currentCourse}
            isEditing={isEditing}
            onEditSuccess={() => loadData(searchInputCA)} // Reload data after editing
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
                  Tên khoá học
                </StyledTableCell>
                <StyledTableCell align='center' sx={cellStyle}>
                  Mô tả
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ width: '300px' }}>
                  Tên leader
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
                  <StyledTableCell align='center'>{row.name}</StyledTableCell>
                  <StyledTableCell align='center' sx={cellStyle}>
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{row.leaderName}</StyledTableCell>
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
                      onClick={() => handleDeleteCourse(row.id)}>
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

export default AdminCourse
