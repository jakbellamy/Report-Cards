import _ from 'lodash';

const filterForAccount = (data, account) => {
  return _.filter(data, { 'Account': account });
}

export { filterForAccount }

