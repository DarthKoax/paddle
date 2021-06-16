import { mutation } from "./mutations";

export const app_state = (bool) => async dispatch => {
  dispatch(mutation.SetAppState(bool))
};

export const add_user_token = (tokens) => async dispatch => {
  dispatch(mutation.SetUserTokens(tokens))
};

export const remove_user_token = (id) => async dispatch => {
  dispatch(mutation.RemoveUserTokens(id))
};

export const set_token_update = (id,code) => async dispatch => {
  dispatch(mutation.UpdateTokenDate(id,code))
};




// //#########################---LOADED---############################################
// export const setLoaded = () => dispatch => {
//     dispatch(mutation.setLoaded())
// }

// export const unsetLoaded = () => dispatch => {
//   dispatch(mutation.unsetLoaded())
// }

