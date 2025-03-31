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
    backgroundColor: "#2c4770", // Deep navy blue for header
    color: theme.palette.common.white,
    fontWeight: "bold", // Make header text bold
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#0F2D6B", // Lighter navy blue for body rows
    color: theme.palette.common.white, // White text for body
  },
  // Ensure white text color for links or any other elements inside cells
  "& a": {
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // Removing the odd/even row styling as we now have a consistent background
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Default data for the table
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// Default data for the table - now using direct object format
const defaultRows = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

// Default columns configuration
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
  minWidth = 700
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth }} aria-label="customized table">
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
            <StyledTableRow key={rowIndex}>
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