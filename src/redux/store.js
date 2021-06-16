import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import app from "./app/reducers";

const combindedReducers = combineReducers({ 
    app,
});

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

let rootReducer = createStore(combindedReducers,composeEnhancers(
    applyMiddleware(thunk),
    
)); // Creates the store from the State received from the reducer(s)

export default rootReducer;