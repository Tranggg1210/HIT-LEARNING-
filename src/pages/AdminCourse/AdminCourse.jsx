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
import './AdminCourse.scss'
import AdminCreateCourse from '../../components/AdminCreateCourse/AdminCreateCourse'
import { useNavigate } from 'react-router-dom'

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

  const loadData = async () => {
    try {
      const response = await (await getAllCourse()).data.data
      setTotalRows(response.content.length)
      setRows(response.content.slice((page - 1) * size, page * size))
    } catch (error) {
      console.error('Error loadData data: ', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [page])

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
      console.log(error)
    }
  }

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
  }

  return (
    <>
      <div className='box-add'>
        <h1>Quản trị khoá học</h1>
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
