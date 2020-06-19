/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { snackbarContext } from '../../../../contexts/SnackBarProvidor';
import callApi from '../../../../libs/utils/api';


class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loader: false,
    };
  }

    onClickHandler = async (value) => {
      const token = localStorage.getItem('token');
      const { remove, data } = this.props;
      const { originalId: deleteId } = data;
      await this.setState({
        loader: true,
        disabled: true,
      });
      const response = await callApi(
        'delete',
        `/trainee/${deleteId}`,
        {},
        {
          headers: {
            authorization: token,
            Accept: 'application/json',
          },
        },
      );
      if (response.status === 'ok') {
        remove();
        value(response.message, 'success');
      } else {
        value(response.message, 'error');
      }

      this.setState({
        disabled: false,
        loader: false,
      });
    };

    render() {
      const { openRemove, onClose } = this.props;
      const { loader, disabled } = this.state;
      return (
        <div>
          <Dialog
            open={openRemove}
            variant="outlined"
            color="primary"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
            Do you really want to remove Trainee ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
            Cancel
              </Button>
              <snackbarContext.Consumer>
                {(snackDelete) => (
                  <Button
                    onClick={() => this.onClickHandler(snackDelete)}
                    color="primary"
                    disabled={disabled}
                    autoFocus
                  >
                    <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                Delete
                  </Button>
                )}
              </snackbarContext.Consumer>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'white',
  },
});
export default withStyles(useStyles)(DeleteDialog);
