/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  InputAdornment,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import { snackbarContext } from '../../../../contexts/SnackBarProvidor';


class EditDialog extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3),
    email: yup.string().email().required('Email is required'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loader: false,
      disabled: true,
      error: {
        name: '',
        email: '',
      },
    };
  }

  handleSet = () => {
    const { data } = this.props;
    this.setState({
      name: data.name,
      email: data.email,
    });
  };

  handleOnChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    const { error } = this.state;
    this.schema
      .validateAt(field, this.state)
      .then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          },
          () => {
            this.hasErrors();
          });
        }
      })
      .catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          },
          () => {
            this.hasErrors();
          });
        }
      });
    return error[field];
  };

  hasErrors = () => {
    const { name, email, error } = this.state;
    const { data } = this.props;
    const { name: editName, email: editEmail } = data;
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    iserror = iserror.every((value) => value === '');
    if (!iserror || (name === editName && email === editEmail)) {
      this.setState({
        disabled: true,
      });
    }
    if (iserror && (name !== editName || email !== editEmail)) {
      this.setState({
        disabled: false,
      });
    }
  };

  onClickHandler = async (snackValue) => {
    const { name, email } = this.state;
    const {
      handleEdit, data, handleEditClose, updateTrainee,
    } = this.props;
    const { originalId: id } = data;
    await this.setState({
      loader: true,
      disabled: true,
    });
    const response = await updateTrainee({ variables: { id, name, email } });
    if (response.data.updateTrainee) {
      handleEdit({
        name,
        email,
      });
      snackValue('Trainee Updated Successfully', 'success');
      handleEditClose();
    } else {
      snackValue('Trainee Updation failed', 'error');
    }

    this.setState({
      disabled: false,
      loader: false,
    });
  };

  render() {
    const { Editopen, handleEditClose, data } = this.props;
    const { error, loader, disabled } = this.state;
    const { name: editName, email: editEmail } = data;
    return (
      <div>
        <Dialog
          open={Editopen}
          onClose={handleEditClose}
          onMouseEnter={this.handleSet}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit your trainee details</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={!!error.name}
                  id="name"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={editName}
                  helperText={this.getError('name')}
                  onChange={this.handleOnChange('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12}>
                <TextField
                  error={!!error.email}
                  id="email"
                  type="email"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={editEmail}
                  helperText={this.getError('email')}
                  onChange={this.handleOnChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(setSnackBar) => (
                <Button
                  onClick={() => this.onClickHandler(setSnackBar)}
                  color="primry"
                  disabled={disabled}
                >
                  <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                  Submit
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditDialog.propTypes = {
  Editopen: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
export default EditDialog;
