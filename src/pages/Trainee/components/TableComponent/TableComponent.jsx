/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import withLoaderandMessage from '../../../../components/HOC/withLoaderandMessage';

function TableComponent(props) {
  const {
    classes, data, column, onSort, orderBy, order,
    onSelect, count,
    page,
    rowsPerPage,
    actions,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  return (
    <TableContainer component={Paper} className={classes.table} elevation={3}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {column.map((colData) => (
              <TableCell
                className={classes.head}
                align={colData.align}
                sortDirection={orderBy === colData.label ? order : false}
              >
                <TableSortLabel
                  active={orderBy === colData.label}
                  direction={orderBy === colData.label ? order : 'asc'}
                  onClick={() => onSort(colData.label)}
                >
                  {colData.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .map((arrData) => (
              <TableRow key={arrData.id} className={classes.block} hover>
                {column.map(({ field, align, format }) => (
                  <TableCell align={align} onClick={() => onSelect(arrData)}>
                    {format !== undefined
                      ? format(arrData[field])
                      : arrData[field]}
                  </TableCell>
                ))}
                {actions.map(({ Icon, handler }) => (
                  <IconButton onClick={() => handler(arrData)} className={classes.action}>
                    {Icon}
                  </IconButton>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        className={classes.pages}
        rowsPerPageOptions={[5, 10, 20, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
}
TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onSort: PropTypes.func,
};

TableComponent.defaultProps = {
  orderBy: '',
  order: 'asc',
  onSort: () => {},
};
const useStyles = (theme) => ({
  table: {
    width: '1250px',
    marginLeft: '20px',
  },
  head: {
    color: 'grey',
  },
  block: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    pages: {
      color: 'grey',
    },
    action: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 30,
      marginLeft: theme.spacing(10),
    },
  },
});
const WrapTable = withLoaderandMessage(TableComponent);
export default withStyles(useStyles)(WrapTable);
