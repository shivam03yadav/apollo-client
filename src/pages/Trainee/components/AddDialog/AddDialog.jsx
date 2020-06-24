/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import dailogSchema from '../../../helper';
import { snackbarContext } from '../../../../contexts/SnackBarProvidor/snackBarProvider';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loader: false,
      disabled: true,
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  }

  hasErrors = () => {
    const { error, touched } = this.state;
    let hastouched = Object.values(touched);
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    hastouched = hastouched.every((value) => value);
    iserror = iserror.every((value) => value === '');
    if (iserror && hastouched) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  getError = (param) => {
    const { touched, error } = this.state;
    if (touched[param]) {
      dailogSchema.validateAt(param, this.state)
        .then(() => {
          if (error[param] !== '') {
            this.setState({
              error: {
                ...error,
                [param]: '',
              },
            },
            () => {
              this.hasErrors();
            });
          }
        })
        .catch((err) => {
          if (err.message !== error[param]) {
            this.setState({
              error: {
                ...error,
                [param]: err.message,
              },
            },
            () => {
              this.hasErrors();
            });
          }
        });
    }
    return error[param];
  };

  handleOnBlur = (field) => {
    const { touched } = this.state;
    this.setState(
      {
        touched: {
          ...touched,
          [field]: true,
        },
      },
      () => {
        this.getError(field);
      },
    );
  };

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  onClickHandler = async (snackValue) => {
    const { name, email, password } = this.state;
    const { onSubmit, createTrainee } = this.props;
    await this.setState({
      loader: true,
      disabled: true,
    });

    const response = await createTrainee({
      variables: { name, email, password },
    });
    if (response.status === 'ok') {
      onSubmit({ name, email, password });
      snackValue('Trainee Added Successfully', 'success');
    } else {
      snackValue('Trainee Added Failed', 'error');
    }

    this.setState({
      loader: false,
      disabled: false,
    });
  };

  render() {
    const {
      open, onClose, classes,
    } = this.props;
    const { disabled, loader, error } = this.state;
    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your trainee details.</DialogContentText>
            <div>
              <TextField
                required
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                helperText={this.getError('name')}
                error={!!error.name}
                onChange={this.handleChange('name')}
                onBlur={() => this.handleOnBlur('name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            &nbsp;
            <div>
              <TextField
                required
                id="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                helperText={this.getError('email')}
                error={!!error.email}
                onChange={this.handleChange('email')}
                onBlur={() => this.handleOnBlur('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            &nbsp;
            <div className={classes.parentStyle}>
              <div className={classes.childStyle}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  helperText={this.getError('password')}
                  error={!!error.password}
                  onChange={this.handleChange('password')}
                  onBlur={() => this.handleOnBlur('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}

                />
              </div>
              &nbsp; &nbsp;
              <div className={classes.childStyle}>
                <TextField
                  required
                  id="confirm_password"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  helperText={this.getError('confirmPassword')}
                  error={!!error.confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={() => this.handleOnBlur('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCEL
            </Button>
            <snackbarContext.Consumer>
              {(snackLoader) => (
                <Button
                  onClick={() => this.onClickHandler(snackLoader)}
                  color="primary"
                  disabled={disabled}
                >
                  <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                  Submit
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
const passwordStyle = () => ({
  parentStyle: {
    display: 'flex',
    flexdirection: 'row',
  },
  childStyle: {
    flex: 1,
  },
});

export default withStyles(passwordStyle)(AddDialog);
