/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import { Avatar, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { snackbarContext } from '../../contexts/index';

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string().trim().email().required('Email Address is a required field'),
    password: yup.string().required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      disabled: true,
      redirect: false,
      email: '',
      password: '',
      touched: {
        email: false,
        password: false,
      },
      error: {
        email: '',
        password: '',
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
      this.schema.validateAt(param, this.state)
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

  onClickHandler = async (value) => {
    const { email, password } = this.state;
    const { loginUser } = this.props;
    await this.setState({
      disabled: true,
      loader: true,
    });
    const response = await loginUser({ variables: { email, password } });
    if (response.data.loginUser) {
      localStorage.setItem("token", response.data.loginUser);
      this.setState({
        redirect: true,
      });
    } else {
      value("login failed", "error");
    }
    this.setState({
      disabled: false,
      loader: false,
    });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
  };

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  handleOnBlur = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { disabled, loader, error } = this.state;
    return (
      <>
        <div className={classes.main}>
          <CssBaseline />
          <Card open aria-labelledby="form-dialog-title">
            <Avatar className={classes.icon}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4" className={classes.title}>Login</Typography>
            <CardContent>
              <form>
                <div>
                  <TextField
                    helperText={this.getError('email')}
                    error={!!error.email}
                    required
                    id="email"
                    label="Email Address"
                    defaultValue=" "
                    variant="outlined"
                    fullWidth
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
                <div>
                  <TextField
                    type="password"
                    helperText={this.getError('password')}
                    error={!!error.password}
                    required
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
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
                &nbsp;
              </form>
            </CardContent>
            <CardActions>
              <snackbarContext.Consumer>
                {(value) => (
                  <Button
                    id="button"
                    color="primary"
                    variant="contained"
                    onClick={() => this.onClickHandler(value)}
                    disabled={disabled}
                    fullWidth
                  >
                    {this.renderRedirect()}
                    <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                  SIGN IN
                  </Button>
                )}
              </snackbarContext.Consumer>
            </CardActions>
          </Card>
        </div>
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const ParentDesign = (theme) => ({
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  main: {
    width: 400,
    marginLeft: '35%',
    marginTop: '10%',
  },
});

export default withStyles(ParentDesign)(Login);
