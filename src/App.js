// import logo from './logo.svg';



import React, { Component } from 'react'

import { connect } from "react-redux"
import { app_state, add_user_token, init_counter } from "./redux/app/actions"

import AddNew from './components/AddNew/addnew';
import Token from './components/Token/token';
import { tokensObject } from "./util/script"

import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';


import './App.css';


export const mapDispatchToProps = dispatch => {
  return {
    app_state: (string) => {
      dispatch(app_state(string));
    },
    addtoken: (obj) => {
      dispatch(add_user_token(obj));
    },
    initcounter: (data) => {
      dispatch(init_counter(data));
    },
  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,
    appstate: store.app.appstate,
    tokens: store.app.tokens,
  };
};



class App extends React.Component {

  constructor() {
    super();

  }



  componentDidMount() {
    console.log('--App Mounted--')
    // this.props.app_state("SCAN");

    const currentPaddleState = localStorage.getItem('paddleState');

    if (currentPaddleState) {
      const values = JSON.parse(currentPaddleState);
      let counter = 0;
      this.props.initcounter(values.tokenCount);
      values.tokens.forEach(element => {
        this.props.addtoken(tokensObject(counter, element.name, element.secret, element.code))
        counter++;
      });

    } else {
      console.log("No state");
    }

    this.menuOpen = false;
  }

  toggleDrawer = (open) => (event) => {
    this.menuOpen = open;
    this.forceUpdate();
  };


  render() {

    let tokenIndex = -1;
    const tokens = this.props.tokens.map((i) => {
      tokenIndex++;
      return (
        <Paper className="card" elevation={3} key={i.id}>
          <Token
            index={tokenIndex}
            id={i.id}
            name={i.name}
            code={i.code}
            secret={i.secret}

          />
        </Paper>
      )
    });

    /* html div in which leaflet will load */
    return (
      <div className="App">
        <React.Fragment key="left">
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" className="menubarIcon" color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" onClick={() => { this.props.app_state("HOME") }}>
                Paddle
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={this.menuOpen} onClose={this.toggleDrawer(false)}>
            <Button color="primary" onClick={() => { this.props.app_state("HOME") }}>HOME</Button>
            <Button varient="contained" color="primary" onClick={() => { this.props.app_state("NEW") }}>Add New</Button>
          </Drawer>
        </React.Fragment>

        <div className="appBody">

          {/* <p>World Class authenticater</p> */}

          {this.props.appstate && (this.props.appstate == "new" || this.props.appstate == "scan") && (
            <div>
              <div><AddNew /></div>
            </div>
          )}


          {this.props.appstate && this.props.appstate == "home" && this.props.tokens && this.props.tokens[0] && (
            <div className="tokensList">
              {tokens}
            </div>
          )}

          {this.props.appstate && this.props.appstate == "home" && this.props.tokens.length == 0 && (
            <div>
              <h2>You currently have no tokens set. Click Add New to get started</h2>
              <div>
                <Button varient="contained" color="primary" onClick={() => { this.props.app_state("NEW") }}>Add New</Button>
              </div>
            </div>
          )}

        </div>

        {/* <Token id={1}
                updated={1623808589430}
                secret={"sadfasdfasdf"}
                   /> */}

      </div>

    )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(App);