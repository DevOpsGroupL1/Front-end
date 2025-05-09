import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2c4770",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#0F2D6B",
    color: theme.palette.common.white,
  },
  "& a": {
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultRows = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

const defaultColumns = [
  { id: 'name', label: 'Sickness', align: 'left' },
  { id: 'calories', label: 'Doctor', align: 'right' },
  { id: 'fat', label: 'Start Date', align: 'right' },
  { id: 'carbs', label: 'End Date', align: 'right' },
  { id: 'protein', label: 'Cost', align: 'right' },
];

export const GTable = ({
  columns = defaultColumns,
  data = defaultRows,
  minWidth = 700,
  pressable = false,
  onRowClick = (row) => {}
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: 'auto' }}
    >
      <Table sx={{
        minWidth,
        overflowX: 'auto'
      }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align || 'left'}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow 
              key={rowIndex}
              onClick={pressable ? () => onRowClick(row) : undefined}
              sx={pressable ? { 
                cursor: 'pointer', 
                '&:hover': { 
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                } 
              } : {}}
            >
              {columns.map((column) => (
                <StyledTableCell
                  key={`${rowIndex}-${column.id}`}
                  align={column.align || 'left'}
                  component={column.id === columns[0].id ? 'th' : 'td'}
                  scope={column.id === columns[0].id ? 'row' : undefined}
                >
                  {typeof row[column.id] === 'function' ? row[column.id]() : row[column.id]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};