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
import { Mutation } from '@apollo/react-components';
import {
  AddDialog, WrapTable, EditDialog,
  DeleteDialog,
} from './components/index';
import { getDateFormatted } from './data/trainee';
import { snackbarContext } from '../../contexts/SnackBarProvidor';
import GET_TRAINEE from './query';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscription';

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
      traineeData: {},
      deleteData: {},
    };
  }

  componentDidMount() {
    const {
      data: { subscribeToMore },
    } = this.props;
    subscribeToMore({
      document: UPDATE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const {
          getTrainee: { records },
        } = prev;
        const {
          data: { traineeUpdated },
        } = subscriptionData;
        const updateRecords = [...records].map((record) => {
          if (record.originalId === traineeUpdated.id) {
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getTrainee: {
            ...prev.getTrainee,
            count: prev.getTrainee.count,
            records: updateRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: DELETE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const {
          getTrainee: { records, count },
        } = prev;
        const {
          data: { traineeDeleted },
        } = subscriptionData;
        const updateRecords = [...records].filter(
          (record) => traineeDeleted !== record.originalId,
        );
        return {
          getTrainee: {
            ...prev.getTrainee,
            count: count - 1,
            records: updateRecords,
          },
        };
      },
    });
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

  handleChangeRowsPerPage = (refetch) => (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    },
    ({ rowsPerPage, page } = this.state) => refetch({
      skip: page * rowsPerPage,
      limit: rowsPerPage,
    }));
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
    const { rowsPerPage, page } = this.state;
    console.log('here is the value at first', rowsPerPage, page);
    const {
      data: { getTrainee: { count = 0 } = {}, refetch },
    } = this.props;
    if (count - page * rowsPerPage === 0 && page > 0) {
      this.setState({
        page: page - 1,
      },
      () => {
        const { page, rowsPerPage } = this.state;
        console.log('here is the value at first', rowsPerPage, page);
        refetch({ skip: (page) * rowsPerPage, limit: rowsPerPage });
      });
    }
    this.setState({
      RemoveOpen: false,
    });
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

  handleEdit = () => {
    this.setState(
      {
        EditOpen: false,
      },
    );
  };

  submitData = () => {
    this.setState(
      {
        open: false,
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

    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    const {
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch, loading,
      },
    } = this.props;
    return (
      <Mutation
        mutation={DELETE_TRAINEE}
        refetchQueries={[{ query: GET_TRAINEE, variables }]}
      >
        {(deleteTrainee) => (
          <Mutation
            mutation={CREATE_TRAINEE}
            refetchQueries={[{ query: GET_TRAINEE, variables }]}
          >
            {(createTrainee) => (
              <Mutation
                mutation={UPDATE_TRAINEE}
                refetchQueries={[{ query: GET_TRAINEE, variables }]}
              >
                {(updateTrainee) => (

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
                      createTrainee={createTrainee}
                      open={open}
                      onClose={this.handleClose}
                      onSubmit={this.submitData}
                    />

                    <EditDialog
                      updateTrainee={updateTrainee}
                      Editopen={EditOpen}
                      handleEditClose={this.handleEditClose}
                      handleEdit={this.handleEdit}
                      data={editData}
                    />
                    <DeleteDialog
                      deleteTrainee={deleteTrainee}
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
                      onChangeRowsPerPage={this.handleChangeRowsPerPage(refetch)}
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
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
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
