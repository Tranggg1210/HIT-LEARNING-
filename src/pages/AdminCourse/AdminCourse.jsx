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
import { useState } from 'react'

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
  const createData = (name, description, leader, date) => {
    return { name, description, leader, date }
  }

  const rows = [
    createData(
      'java nâng cao',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam, ratione impedit, dolore sit laudantium vero temporibus dignissimos nisi necessitatibus itaque mollitia similique, tempora at quis. Eligendi tempora laborum cumque',
      'Nguyễn Thanh Tùng',
      '24/4/2002',
    ),
    createData('Ice cream sandwich', 'Short description', 'John Doe', '01/01/2023'),
    createData('Eclair', 'Another description', 'Jane Doe', '02/02/2023'),
    createData('Cupcake', 'Some description here', 'Jack Smith', '03/03/2023'),
    createData('Gingerbread', 'A different description', 'Emily Johnson', '04/04/2023'),
    createData('Frozen yoghurt', 'Another description', 'Doe John', '05/05/2023'),
    createData('Strawberry', 'Another description', 'Doe Jane', '06/06/2023'),
    createData('Cheesecake', 'Another description', 'Smith Jack', '07/07/2023'),
    createData('Chocolate', 'Another description', 'Johnson Emily', '08/08/2023'),
    createData('Candy', 'Another description', 'Tung Nguyen', '09/09/2023'),
    createData('Pie', 'Another description', 'Doe Jon', '10/10/2023'),
  ]

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px',
  }

  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
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
            {displayedRows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align='center' sx={cellStyle}>
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align='center'>{row.leader}</StyledTableCell>
                <StyledTableCell align='center'>{row.date}</StyledTableCell>
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
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color='primary'
        />
      </Stack>
    </Paper>
  )
}

export default AdminCourse
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { useState, useEffect } from 'react';
// import axios from 'axios'; // Add axios for API calls

// const StyledTableCell = styled(TableCell)({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#000',
//     color: '#fff',
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// });

// const StyledTableRow = styled(TableRow)({
//   '&:nth-of-type(odd)': {
//     backgroundColor: '#f5f5f5',
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// });

// const AdminCourse = () => {
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);
//   const rowsPerPage = 10;

//   const fetchData = async (pageIndex, pageSize) => {
//     try {
//       const response = await axios.get(`https://api.example.com/courses?page=${pageIndex}&pageSize=${pageSize}`);
//       setRows(response.data.courses);
//       setTotalRows(response.data.total);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(page, rowsPerPage);
//   }, [page]);

//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   const cellStyle = {
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     maxWidth: '100px',
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer>
//         <Table sx={{ minWidth: 700 }} aria-label='customized table'>
//           <TableHead>
//             <TableRow>
//               <StyledTableCell sx={{ width: '400px' }}>Tên khoá học</StyledTableCell>
//               <StyledTableCell align='center' sx={cellStyle}>
//                 Mô tả
//               </StyledTableCell>
//               <StyledTableCell align='center' sx={{ width: '300px' }}>
//                 Tên leader
//               </StyledTableCell>
//               <StyledTableCell align='center' sx={{ width: '200px' }}>
//                 Ngày tạo
//               </StyledTableCell>
//               <StyledTableCell align='center' sx={{ width: '200px' }}>
//                 Button
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell>{row.name}</StyledTableCell>
//                 <StyledTableCell align='center' sx={cellStyle}>
//                   {row.description}
//                 </StyledTableCell>
//                 <StyledTableCell align='center'>{row.leader}</StyledTableCell>
//                 <StyledTableCell align='center'>{row.date}</StyledTableCell>
//                 <StyledTableCell
//                   align='center'
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '10px',
//                     alignItems: 'center',
//                   }}>
//                   <Button variant='contained' sx={{ width: '80px', fontSize: '10px' }}>
//                     Sửa
//                   </Button>
//                   <Button
//                     variant='contained'
//                     sx={{ width: '80px', fontSize: '10px', backgroundColor: 'silver' }}>
//                     Xoá
//                   </Button>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Stack spacing={2} sx={{ margin: '20px', alignItems: 'end' }}>
//         <Pagination
//           count={Math.ceil(totalRows / rowsPerPage)}
//           page={page}
//           onChange={handleChangePage}
//           color='primary'
//         />
//       </Stack>
//     </Paper>
//   );
// };

// export default AdminCourse;
