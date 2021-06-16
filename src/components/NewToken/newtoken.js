// import logo from './logo.svg';



import React, { Component } from 'react'

import { connect } from "react-redux"
import {add_user_token} from "../../redux/app/actions"





export const mapDispatchToProps = dispatch =>{
  return {
    addtoken: (obj) => {
      dispatch(add_user_token(obj));
    },
  };
}

export const mapStateToProps = store => {
  return {
    app: store.app,
  };
};

export const tokensObject = (newid,newname,newsecret,newcode) => {
  return {
    id: newid,
    name: newname,
    secret: newsecret,
    code: newcode,
  }
}


class NewToken extends React.Component {

  constructor() {
      super();
      this.handleScan = this.handleScan.bind(this)
  }
  
  

  componentDidMount() {
    
    this.props.addtoken(tokensObject(1,"google","st7h2hydzkrcyb65","000000"))
    this.props.addtoken(tokensObject(2,"microsoft","7bfhyn5svj6jkh52","000000"))
    this.props.addtoken(tokensObject(3,"blipblob","23TplPdS46Juzcyx","000000"))

  }

  handleScan = (result) => {
    console.log('scanned: ' + result);
  }

  handleError = (e) => {
    console.log('error:' + e);
  }
  
  handleLoad = () => {
    console.log('ready!');
  }

  render() {
      return (
        <div className="NewToken">
        
        NewToken
        
        </div>
      )
  }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(NewToken);