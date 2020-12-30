const data = require('./data.json')

const print = (x) => console.log(x)

const accounts = Array.from(new Set(data.map(rec => rec['Account'])))

export { accounts, data };
