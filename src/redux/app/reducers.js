import { initialState } from "./states";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_APP_STATE": {
        console.log(`Received status ${action.data}`)
        if(action.data === true){
            state.loaded = true;
        }else{
            state.loaded = false;
        }

        console.log(`New status ${state.loaded}`)

        return Object.assign({}, state, {
            loaded: state.loaded
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
    case "REMOVE_USER_TOKENS": {
        // console.log(`REMOVE_USER_TOKENS data ${action.data}`)
        let tokens = state.tokens;
        let index = -1; 
        tokens.forEach(x=>{
            if(x.id === action.data){
                tokens.splice(tokens.indexOf(x),1);
            }            
        })
        // if (index > -1) {
        //     tokens.splice(index, 1);
        // }

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
    
    default:
      return state;
  }
};
