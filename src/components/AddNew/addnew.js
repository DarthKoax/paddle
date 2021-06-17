// import logo from './logo.svg';



import React from 'react'
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// import { Form } from 'react-final-form';


import { connect } from "react-redux"
import { app_state, add_user_token, remove_user_token, increase_token_count,set_scanner_string } from "../../redux/app/actions"
import {tokensObject} from "../../util/script"

import Scanner from '../Scanner/scanner';





export const mapDispatchToProps = dispatch => {
  return {
    app_state: (bool) => {
      dispatch(app_state(bool));
    },
    addtoken: (obj) => {
      dispatch(add_user_token(obj));
    },
    increase_token_count: () => {
      dispatch(increase_token_count());
  },
  scan: (data) => {
    dispatch(set_scanner_string(data));
  },
  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,
    tokencount: store.app.tokenCount,
    appstate: store.app.appstate,
    qrcode: store.app.scannerString,
  };
};




class AddNew extends React.Component {

  constructor() {
    super();

  }

  componentDidMount() {
  }
  
  saveTokens(){
    const currentState = JSON.stringify(this.props.app);
    window.localStorage.setItem('paddleState',currentState);
  }


  onSubmit = (e) => {
    this.props.addtoken(tokensObject(this.props.tokencount,e.ApplicationName,e.ApplicationSecret,"000000"))
    this.props.increase_token_count();
    this.props.scan("");
    this.props.app_state("HOME");
    this.saveTokens();
  }//onSubmit

  Validate = values => {
    const errors = {};
    if (!values.ApplicationName) {
      errors.ApplicationName = 'Required';
    }
    if (!values.ApplicationSecret) {
      errors.ApplicationSecret = 'Required';
    }
    try{
        this.totp = new window.jsOTP.totp();
        this.code = this.totp.getOtp(values.ApplicationSecret);   
    }
    catch(e){
      errors.ApplicationSecret = "Invalid Secret";
    }

    return errors;
  };

  render() {

    let inital = { 
      ApplicationName: "", 
      ApplicationSecret: ""
    }

    /* html div in which leaflet will load */
    return (
      <div className="NewToken">

        {this.props.appstate && this.props.appstate == "new" && (
          <div><Button variant="contained" color="primary" component="span" onClick={() => { this.props.app_state("SCAN") }}>
            SCAN QR
          </Button>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => { this.props.app_state("SCAN") }}>
              <PhotoCamera />
            </IconButton>

            {this.props.qrcode && (
              <p>Scanned Code: {this.props.qrcode}</p>
            )}

            <Form
              onSubmit={this.onSubmit}
              initialValues={inital}
              validate={this.Validate}
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

                  <Field
                    fullWidth
                    required
                    name="ApplicationSecret"
                    component={TextField}
                    type="text"
                    label="Secret"
                  />

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
        )}

        {this.props.appstate && this.props.appstate == "scan" && (
          <Scanner />
        )}

      </div>

    )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(AddNew);