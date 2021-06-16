// import logo from './logo.svg';



import React, { Component } from 'react'

import { connect } from "react-redux"
import {app_state} from "../../redux/app/actions"


import Scanner from '../Scanner/scanner';
import NewToken from '../NewToken/newtoken';



export const mapDispatchToProps = dispatch =>{
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



class AddNew extends React.Component {

  constructor() {
      super();
      
  }
  
  

  componentDidMount() {
  }


  render() {    
 
    
      /* html div in which leaflet will load */
      return (
        <div className="App">
          <Scanner/>
          <NewToken />
        </div>

      )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(AddNew);