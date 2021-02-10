
export const ifExists = (conditionalVar, defaultVar) => {
  try{
    if(conditionalVar){
      return conditionalVar
    } else {
      return defaultVar
    }
  } catch {
    return defaultVar
  }
}

export const doIfExists = (func, conditionalVar, defaultVar) => {
  try{
    if (conditionalVar) {
      return func(conditionalVar)
    } else {
      return defaultVar
    }
  }  catch {
    return defaultVar
  }
}
