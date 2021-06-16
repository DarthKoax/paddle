// import logo from './logo.svg';



import React, { Component } from 'react'

import { connect } from "react-redux"
import { app_state, add_user_token, remove_user_token } from "./redux/app/actions"


import AddNew from './components/AddNew/addnew';
import Token from './components/Token/token';

import './App.css';


export const mapDispatchToProps = dispatch => {
  return {
    app_state: (bool) => {
      dispatch(app_state(bool));
    },
  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,
  };
};



class App extends React.Component {

  constructor() {
    super();

  }



  componentDidMount() {
    console.log('--Start App--')
    console.log(this.props)


  }


  render() {


    let tokenIndex = -1;
    const tokens = this.props.app.tokens.map((i) => {
      tokenIndex++;
      return (<Token
        index={tokenIndex}
        id={i.id}
        name={i.name}
        code={i.code}
        secret={i.secret}
        key={i.id}
      />
      )
      
    });

    /* html div in which leaflet will load */
    return (
      <div className="App">
        <header className="App-header">
          <h1>Paddle</h1>
          <p>World Class authenticater</p>
          </header>
        <AddNew />
        {this.props.app && this.props.app.tokens && this.props.app.tokens[0] && (
          <div>
            {tokens}
          </div>
        )}
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