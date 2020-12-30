const data = require('./data.json')

const print = (x) => console.log(x)

const accounts = new Set(data.map(rec => rec['Account']))

export { accounts };
