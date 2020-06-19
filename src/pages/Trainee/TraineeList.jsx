/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import {
  AddDialog, WrapTable, EditDialog,
  DeleteDialog,
} from './components/index';
import { getDateFormatted } from './data/trainee';
import { snackbarContext } from '../../contexts/SnackBarProvidor';
import GET_TRAINEE from './query';

// import {
//   Link, BrowserRouter as Router,
// } from 'react-router-dom';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      editData: {},
      page: 0,
      rowsPerPage: 20,
      EditOpen: false,
      RemoveOpen: false,
      loader: false,
      traineeData: {},
      deleteData: {},
    };
  }

  handleState = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSort = (field) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleSelect = (element) => {
    this.setState({
      traineeData: element,
    });
  };

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    },
    () => refetch({
      skip: newPage * rowsPerPage,
      limit: rowsPerPage,
    }));
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  handleDeleteDialogOpen = (element) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    const {
      count, rowsPerPage, page, data,
    } = this.state;
    const mod = count % rowsPerPage;
    if (mod === 1 && data.length !== 1) {
      this.setState({
        page: page - 1,
      });
    }
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('DELETE ITEM');
    console.log(deleteData);
  };


  handleEditDialogOpen = (element) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (data) => {
    this.setState(
      {
        EditOpen: false,
      },
      () => {
        console.log('Edit Data');
        console.log(data);
      },
    );
  };

  submitData = (data) => {
    this.setState(
      {
        open: false,
      },
      () => {
        console.log(data);
      },
    );
  };

  render() {
    const {
      open,
      orderBy,
      order,
      page,
      rowsPerPage,
      EditOpen,
      RemoveOpen,
      editData,
      deleteData,
    } = this.state;
    const {
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch, loading,
      },
    } = this.props;
    return (
      <>
        <Button
          className={classes.parent}
          variant="outlined"
          color="primary"
          onClick={this.handleState}
        >
          ADD TRAINEE LIST
        </Button>
        &nbsp;
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.submitData}
        />

        <EditDialog
          Editopen={EditOpen}
          handleEditClose={this.handleEditClose}
          handleEdit={this.handleEdit}
          data={editData}
        />
        <DeleteDialog
          openRemove={RemoveOpen}
          onClose={this.handleRemoveClose}
          remove={this.handleRemove}
          data={deleteData}
        />
        <br />
        <br />
        <WrapTable
          loader={loading}
          datalength={records.length}
          data={records}
          column={[
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email-Address',
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
          ]}
          actions={[
            {
              Icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              Icon: <DeleteIcon />,
              handler: this.handleDeleteDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage(refetch)}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        {/* <Router>
          <ul>
            {trainees.map(({ name, id }) => (
              <li key={id}>
                <Link to={`${url}/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </Router> */}
      </>
    );
  }
}
TraineeList.propTypes = {
  // match: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,

};
const styles = (theme) => ({
  parent: {
    marginLeft: theme.spacing(130),
  },
});

export default Compose(
  withStyles(styles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 20 } },
  }),
)(TraineeList);
TraineeList.contextType = snackbarContext;
