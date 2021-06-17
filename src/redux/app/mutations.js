  const SetAppState = data => ({
    type: "SET_APP_STATE",
    data
  })

  const SetUserTokens = data => ({
    type: "SET_USER_TOKENS",
    data
  })
  const RenameUserTokens = (id,data) => ({
    type: "RENAME_USER_TOKENS",
    id,
    data
  })
  
  const RemoveUserTokens = data => ({
    type: "REMOVE_USER_TOKENS",
    data
  })
  
  const UpdateTokenDate = (id,code) => ({
    type: "UPDATE_DATE_TOKEN",
    id,
    code
  })

  const UpdateScannerString = (data) => ({
    type: "UPDATE_SCANNER_STRING",
    data
  })
  
  const IncreaseTokenCount = () => ({
    type: "INCREASE_COUNTER"    
  })
  
  const InitCounter = (data) => ({
    type: "INIT_COUNTER",
    data
  })
  


  export const mutation = {
    SetAppState, 
    SetUserTokens,
    RenameUserTokens,
    RemoveUserTokens,
    UpdateTokenDate,
    UpdateScannerString,
    IncreaseTokenCount,
    InitCounter
  };