import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import AppModal from '../component/Modal';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByOwner } from '../redux/data/GetProductByOwnerData';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductListByOwner() {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const { products, loading, error } = useSelector((state: RootState) => state.productByOwnerSlice);

  // const navigate = useNavigate()

  const userId = JSON.stringify(localStorage.getItem('userId'))
  console.log(userId , 'helleo ');
  

  React.useEffect(() => {
    dispatch(fetchProductsByOwner(userId as string));
    console.log(products);
    
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <div style={{
        paddingBottom: 15
      }}>Product list by User user name</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">description</TableCell>
              <TableCell align="center">createdAt</TableCell>
              <TableCell align="center">updatedAt</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">
                  <div>
                    <Button sx={{ color: '#000' }} onClick={handleClick}>
                      <MoreVertIcon />
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <Button sx={{ p: 1, color: '#000' }}>Edit</Button>
                      <Divider />
                      <AppModal open={openModal} handleOpen={handleOpenModal} handleClose={handleCloseModal} />
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AppModal open={openModal} handleOpen={handleOpenModal} handleClose={handleCloseModal} />
    </div>
  );
}
