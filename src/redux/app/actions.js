import { mutation } from "./mutations";

export const app_state = (state) => async dispatch => {
  dispatch(mutation.SetAppState(state))
};

export const add_user_token = (tokens) => async dispatch => {
  dispatch(mutation.SetUserTokens(tokens))
};

export const rename_user_token = (id,data) => async dispatch => {
  dispatch(mutation.RenameUserTokens(id,data))
};


export const remove_user_token = (id) => async dispatch => {
  dispatch(mutation.RemoveUserTokens(id))
};

export const set_token_update = (id,code) => async dispatch => {
  dispatch(mutation.UpdateTokenDate(id,code))
};

export const set_scanner_string = (data) => async dispatch => {
  dispatch(mutation.UpdateScannerString(data))
};

export const increase_token_count = () => async dispatch => {
  dispatch(mutation.IncreaseTokenCount())
};

export const init_counter = (data) => async dispatch => {
  dispatch(mutation.InitCounter(data))
};




// //#########################---LOADED---############################################
// export const setLoaded = () => dispatch => {
//     dispatch(mutation.setLoaded())
// }

// export const unsetLoaded = () => dispatch => {
//   dispatch(mutation.unsetLoaded())
// }

