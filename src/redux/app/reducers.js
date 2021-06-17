import { initialState } from "./states";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_APP_STATE": {
        // console.log(`Received new state ${action.data}`)
        let newState;
        switch(action.data){
            case "HOME":{
                newState = "home";
                break;
            }
            case "NEW":{
                newState = "new";
                break;
            }
            case "SCAN":{
                newState = "scan";
                break;
            }
            default: {
                newState = "ERROR";
                break;
            }
        }

        state.appstate = newState

        return Object.assign({}, state, {
            appstate: state.appstate
        });
    }
    case "SET_USER_TOKENS": {
        // console.log(`SET_USER_TOKENS data ${action.data}`)
        const tokens = state.tokens;
        tokens.push(action.data);
        state.tokens = tokens;
        return Object.assign({}, state, {
            tokens: state.tokens
        });
    }
    case "RENAME_USER_TOKENS": {
        // console.log(`RENAME_USER_TOKENS data ${action.data}`)
        const tokens = state.tokens;
        console.log(action);
        let index = -1; 
        tokens.forEach(x=>{
            if(x.id === action.id){
                tokens[tokens.indexOf(x)].name = action.data;
            }            
        })
        state.tokens = tokens;
        return Object.assign({}, state, {
            tokens: state.tokens
        });
    }
    case "REMOVE_USER_TOKENS": {
        // console.log(`REMOVE_USER_TOKENS data ${action.data}`)
        let tokens = state.tokens;
        tokens.forEach(x=>{
            if(x.id === action.data){
                tokens.splice(tokens.indexOf(x),1);
            }            
        })

        state.tokens = tokens;
        
        return Object.assign({}, state, {
            tokens: state.tokens
        });
    }
    case "UPDATE_DATE_TOKEN": {
        // console.log(`UPDATE_DATE_TOKEN data ${action}`)
        let tokens = state.tokens;
        let index = -1; 
        tokens.forEach(x=>{
            if(x.id === action.id){
                index = tokens.indexOf(x);
            }            
        })

        if (index > -1) {
            tokens[index].code = action.code;
        }


        state.tokens = tokens;
        
        return Object.assign({}, state, {
            tokens: state.tokens
        });
    }
    case "UPDATE_SCANNER_STRING": {
        // console.log(`UPDATE_SCANNER_STRING data ${action.data}`)

        state.scannerString = action.data;
        
        return Object.assign({}, state, {
            scannerString: state.scannerString
        });
    }
    case "INCREASE_COUNTER": {
        // console.log(`UPDATE_SCANNER_STRING data ${action.data}`)
        let counter = state.tokenCount
        counter++
        state.tokenCount = counter;
        
        return Object.assign({}, state, {
            tokenCount: state.tokenCount
        });
    }
    case "INIT_COUNTER": {
        // console.log(`UPDATE_SCANNER_STRING data ${action.data}`)
        let counter = action.data
              
        state.tokenCount = counter;
        
        return Object.assign({}, state, {
            tokenCount: state.tokenCount
        });
    }
    
    default:
      return state;
  }
};
