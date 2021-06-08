  const SetAppState = data => ({
    type: "SET_APP_STATE",
    data
  })

  const SetUserTokens = data => ({
    type: "SET_USER_TOKENS",
    data
  })
  
  const RemoveUserTokens = data => ({
    type: "REMOVE_USER_TOKENS",
    data
  })
  

  
    export const mutation = {
      SetAppState, 
      SetUserTokens,
      RemoveUserTokens 
    };