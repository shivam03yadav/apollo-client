import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const handleLogout = () => {
  localStorage.removeItem('token');
};

function Navbar(props) {
  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button color="inherit" href="/trainee">
            TRAINEE
          </Button>
          <Button color="inherit" href="/textfield-demo">
            TEXTFIELD DEMO
          </Button>
          <Button color="inherit" href="/input-demo">
            INPUT DEMO
          </Button>
          <Button color="inherit" href="/children-demo">
            CHILDREN DEMO
          </Button>
          <Button color="inherit" href="/login" onClick={() => handleLogout()}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
const navbarPos = () => ({
  title: {
    flexGrow: 1,
  },
});

export default withStyles(navbarPos)(Navbar);
