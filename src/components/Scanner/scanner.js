import React, { Component } from 'react'
import QrReader from 'modern-react-qr-reader'
import { connect } from "react-redux"
import { app_state,set_scanner_string } from "../../redux/app/actions"
import Button from '@material-ui/core/Button';

// import {app_state} from "../../redux/app/actions"

export const mapDispatchToProps = dispatch => {
  return {
    app_state: (string) => {
      dispatch(app_state(string));
    },
    scan: (data) => {
      dispatch(set_scanner_string(data));
    },
  };
}

export const mapStateToProps = store => {
  return {
    appstate: store.app.appstate,
    tokens: store.app.tokens,
  };
};



class Scanner extends Component {
  constructor(props) {
        super(props);

        this.state = {
            result: 'No result'
        }

        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

  handleScan = data => {
    if (data) {
      this.state.result = data;
      console.log(data);
      this.props.scan(data);
      this.props.app_state("NEW")
    }
  }
  
  handleError = err => {
    console.error(err)
  }
  
  render() {
    return (
      <div>
        <Button variant="contained" color="primary" component="span" onClick={() => { this.props.app_state("NEW") }}>
            CLOSE SCANNER
        </Button>
        <QrReader
          delay={0}
          facingMode={"environment"}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '500px' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(Scanner);