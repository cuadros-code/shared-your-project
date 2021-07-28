import React from 'react';
import styled from 'styled-components'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TableHead } from '@material-ui/core';
import { primary } from '../../config/colors';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  tableHead: {
    backgroundColor: primary,
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
// sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 'auto',
    borderTopLeftRadius: 30,
    minHeight: '100%'
  },
});

 const CustomPaginationActionsTable = ({ projects }) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer style={{boxShadow: '0px 0px 25px rgba(0,0,0,0.418)'}} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table" >
        <TableHead>
         <TableRow style={{background: primary}}>
             <TableCell style={{color: 'white', fontWeight: 'bold'}}>
                Nombre del proyecto
              </TableCell>
             <TableCell style={{color: 'white', fontWeight: 'bold'}}>
                Fecha de publicación
              </TableCell>
             <TableCell style={{color: 'white', fontWeight: 'bold'}}>
                 Votos
              </TableCell>
           </TableRow>
         </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : projects
          ).map((project) => (
            <TableRowHover key={project.id}>
              <TableCell className="cell" component="th" scope="row">
                {project.projectName}
              </TableCell>
              <TableCell className="cell">
                {project.create}
              </TableCell>
              <TableCell className="cell">
                {project.votes}
              </TableCell>
            </TableRowHover>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter >
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={projects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count !== -1 && count}`}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CustomPaginationActionsTable

const TableRowHover = styled(TableRow)`
  
  :hover {
    background: ${primary};
    cursor: pointer;
    .cell{
      color: white;
      font-weight: bold;
    }
  }
`