export const calculatePercentChange = (key, compareSet, originalSet) => {
  return (compareSet[key] - originalSet[key]) /originalSet[key]
}
