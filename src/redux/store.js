import { createStore, applyMiddleware } from "redux";
import reducers from "./index"; // Gets the State from the reducer(s)
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

let rootReducer = createStore(reducers,composeEnhancers(
    applyMiddleware(thunk),
    
)); // Creates the store from the State received from the reducer(s)

export default rootReducer;