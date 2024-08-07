import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import {getAdminCourse} from '../../apis/courses.api'


import './AdminCourse.scss'
import AdminCreateCourse from '../../components/AdminCreateCourse/AdminCreateCourse';

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#000',
    color: '#fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});

const AdminCourse = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const size= 2;
  const isoDayMonthYear = (isoString) => {
    const date = new Date(isoString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
  const fetchData = async () => {
    const dataPage = {
      pageIndex: page,
      pageSize: size,
    }
    try {
      const response = await (await getAdminCourse(dataPage)).data.data
      console.log("result", response)
      setRows(response.content);
      setTotalRows(response.content.length);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
  };

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
    <div className="box-add">
      <Button variant='contained' onClick={handleOpen}>Thêm khoá học</Button>
      {open ? <AdminCreateCourse opens={open} handleCloses={handleClose}/> : ""}
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '400px' }}>Tên khoá học</StyledTableCell>
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
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.name}</StyledTableCell>
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
                  <Button variant='contained' sx={{ width: '80px', fontSize: '10px' }}>
                    Sửa
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ width: '80px', fontSize: '10px', backgroundColor: 'silver' }}>
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
    
  );
};

export default AdminCourse;
