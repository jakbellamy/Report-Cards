import _ from 'lodash'

const searchData = (data, search, key='Account') => {
  return _.filter(data, x => _.lowerCase(x['Account'])
    .includes(_.lowerCase(search)))
}

export { searchData }
