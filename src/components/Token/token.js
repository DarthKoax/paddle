// import logo from './logo.svg';



import React, { Component } from 'react'
import ScriptTag from 'react-script-tag';

import { connect } from "react-redux"


import { app_state, set_token_update } from "../../redux/app/actions"
import { appendScript, removeScript, $ } from "../../util/script"


export const mapDispatchToProps = dispatch => {
    return {
        app_state: (bool) => {
            dispatch(app_state(bool));
        },
        update_token: (id, code) => {
            dispatch(set_token_update(id, code));
        },
    };
}

export const mapStateToProps = store => {
    return {
        app: store.app,
        token_name: store.app,
        token_id: store.app,
        token_secret: store.app,
        token_update: store.app.tokens,
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
        this.props.update_token(this.props.id,this.code);

        this.timer = setInterval(() => {
            this.code = this.totp.getOtp(this.props.secret);
            this.props.update_token(this.props.id,this.code);
            
        }, this.refreshTimer)
    }

    componentWillUnmount() {
        
        clearInterval(this.timer);
    }



    render() {

        return (
            <div className="Token">
                {this.props.secret && this.props.code && this.props.name && (
                    <div className="authenticater-card">
                        {/* <p>Secret: {this.props.secret}</p> */}
                        
                        <h2 className="token-service-name">{this.props.name}</h2>
                        <h2 className="token-code">{this.props.code}</h2>
                    </div>
                )}
            </div >

        )
    }

};

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(Token);