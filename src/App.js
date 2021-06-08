// import logo from './logo.svg';



import React, { Component } from 'react'

import ReactDOM from 'react-dom'

import { connect } from "react-redux"
import {app_state,add_user_token,remove_user_token} from "./redux/app/actions"

import './App.css';


export const mapDispatchToProps = dispatch =>{
  return {
    app_state: (bool) => {
      dispatch(app_state(bool));
    },
    addtoken: (obj) => {
      dispatch(add_user_token(obj));
    }, 
    removetoken: (id) => {
      dispatch(remove_user_token(id));
    },
  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,
  };
};

export const tokensObject = (newid,newname,newsecret) => {
  return {
    id: newid,
    name: newname,
    secret: newsecret
  }
}


class App extends React.Component {

  constructor() {
      super();
  }


  componentDidMount() {
    console.log('--Start App--')
    console.log(this.props)

    this.props.addtoken(tokensObject(1,"google","aasss334543"))
    this.props.addtoken(tokensObject(2,"microsoft","sdafadfasfd34"))
    this.props.addtoken(tokensObject(3,"blipblob","123412341234"))

    this.props.removetoken(1)
    this.props.removetoken(2)

    console.log(`Actual status ${this.props.app.loaded}`)
    console.log(`====`)
    this.props.app_state(true)
    console.log(`Actual status ${this.props.app.loaded}`)
    console.log(`====`)
    

  }



  render() {
    
      /* html div in which leaflet will load */
      return (
        <div className="App">
          <header className="App-header">
            Hello world
          </header>
        </div>

      )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(App);