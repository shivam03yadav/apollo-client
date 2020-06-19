/* eslint-disable react/no-unused-state */
import React from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  AddDialog, WrapTable, EditDialog,
  DeleteDialog,
} from './components/index';
import { getDateFormatted } from './data/trainee';
import callApi from '../../libs/utils/api';
import { snackbarContext } from '../../contexts/SnackBarProvidor';

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
      count: 100,
      data: [],
      editData: {},
      page: 0,
      rowsPerPage: 10,
      EditOpen: false,
      RemoveOpen: false,
      loader: false,
      traineeData: {},
      deleteData: {},
    };
  }

  componentDidMount() {
    this.handleFetchData();
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

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
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
    this.handleFetchData();
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
    this.handleFetchData();
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
    this.handleFetchData();
    this.setState(
      {
        open: false,
      },
      () => {
        console.log(data);
      },
    );
  };

  async handleFetchData() {
    const token = localStorage.getItem('token');
    this.setState({
      loader: true,
    });
    const response = await callApi(
      'get',
      '/trainee',
      {
        params: {
          skip: 0,
          limit: 1000,
        },
      },
      {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 'ok') {
      this.setState({
        data: response.data.records,
        loader: false,
        count: response.data.records.length,
      });
    } else {
      const value = this.context;
      value(response.message, 'error');
      this.setState({
        loader: false,
      });
    }
  }

  render() {
    const {
      open,
      orderBy,
      order,
      page,
      rowsPerPage,
      loader,
      data,
      EditOpen,
      RemoveOpen,
      editData,
      deleteData,
    } = this.state;
    const { classes } = this.props;
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
          loader={loader}
          datalength={data.length}
          data={data}
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
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
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

export default withStyles(styles)(TraineeList);
TraineeList.contextType = snackbarContext;
