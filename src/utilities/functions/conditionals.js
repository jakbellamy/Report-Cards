
export const ifExists = (conditionalVar, defaultVar) => {
  if(conditionalVar){
    return conditionalVar
  } else {
    return defaultVar
  }
}
