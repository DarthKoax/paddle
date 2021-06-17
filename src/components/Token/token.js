// import logo from './logo.svg';



import React, { Component } from 'react'
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Button } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import EditAttributesIcon from '@material-ui/icons/EditAttributes';

import { connect } from "react-redux"


import { app_state, set_token_update, remove_user_token, rename_user_token } from "../../redux/app/actions"



export const mapDispatchToProps = dispatch => {
  return {
    app_state: (bool) => {
      dispatch(app_state(bool));
    },
    update_token: (id, code) => {
      dispatch(set_token_update(id, code));
    },
    remove_user_token: (id) => {
      dispatch(remove_user_token(id));
    },
    rename_user_token: (id,data) => {
      dispatch(rename_user_token(id,data));
    },

    


  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,

  };
};



class Token extends React.Component {


  constructor() {
    super();
  }

  componentDidMount() {
    this.refreshTimer = 18000;
    this.totp = new window.jsOTP.totp();
    this.code = this.totp.getOtp(this.props.secret);

    console.log(this.totp);

    this.props.update_token(this.props.id, this.code);

    this.timer = setInterval(() => {
      this.code = this.totp.getOtp(this.props.secret);
      this.props.update_token(this.props.id, this.code);

    }, this.refreshTimer)

    this.anchorEl = null;
    this.openDeletePopper = false;
    this.openRenamePopper = false;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleDelete = (event) => {
    this.anchorEl = event.currentTarget;
    this.openDeletePopper = true;
    this.forceUpdate();
  };

  handleRename = (event) => {
    this.anchorEl = event.currentTarget;
    this.openRenamePopper = true;
    this.forceUpdate();
  };

  handleCloseDeletePopper = (event) => {
    this.anchorEl = null;
    this.openDeletePopper = false;
    this.forceUpdate();
  };

  handleCloseRenamePopper = (event) => {
    this.anchorEl = null;
    this.openRenamePopper = false;
    this.forceUpdate();
  };


  DeleteToken = (id) => {
    this.props.remove_user_token(this.props.id)
    this.saveTokens();
  }

  saveTokens() {
    const currentState = JSON.stringify(this.props.app);
    window.localStorage.setItem('paddleState', currentState);
  }


  onSubmit = (e) => {
    console.log(e);
    this.props.rename_user_token(this.props.id,e.ApplicationName);
    
    this.handleCloseRenamePopper();
    this.saveTokens();
  }//onSubmit



  render() {


    let inital = {
      ApplicationName: (this.props.name ? this.props.name : ""),
    }


    return (
      <div className="Token">
        {this.props.secret && this.props.code && this.props.name && (
          <div className="tokenCard">
            <div className="tokenDetails">
              <h2 className="token-service-name">{this.props.name}</h2>
              <h2 className="token-code">{this.props.code}</h2>
            </div>
            <div className="tokenFunctions">

              <IconButton className="iconbutton renameTokenIcon"
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={this.handleRename}>
                <EditAttributesIcon />
              </IconButton>

              <IconButton className="iconbutton renameTokenIcon"
                color="primary"
                aria-label="delete token"
                component="span"
                onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>

              {this.openDeletePopper && (
                <Popper id={this.props.name} open={this.openDeletePopper} anchorEl={this.anchorEl} placement="right">
                  <div className="deleteMessage">
                    <p>This action will delete the code forever. </p>
                    <p>Are you sure you want to proceed?</p>
                    <Button variant="contained" color="primary" component="span" onClick={this.handleCloseDeletePopper}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" component="span" onClick={this.DeleteToken}>
                      Delete
                    </Button>
                  </div>
                </Popper>
              )}

              {this.openRenamePopper && (
                <Popper id={this.props.name} open={this.openRenamePopper} anchorEl={this.anchorEl} placement="right">
                  <div className="deleteMessage">
                    <p>Rename this token</p>
                    <Form
                      onSubmit={this.onSubmit}
                      initialValues={inital}
                      render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                          <Field
                            fullWidth
                            required
                            name="ApplicationName"
                            component={TextField}
                            type="text"
                            label="Name"
                          />

                          <Button variant="contained" color="primary" component="span" onClick={this.handleCloseRenamePopper}>
                            Cancel
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={submitting}
                          >
                            Submit
                          </Button>
                        </form>
                      )} />


                  </div>
                </Popper>
              )}


            </div>
          </div>
        )}
      </div >

    )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(Token);