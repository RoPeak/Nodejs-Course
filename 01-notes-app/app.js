const chalk = require('chalk')

const happy = chalk.green.bold;
const warning = chalk.red.bold;

console.log(happy('Success!'))
console.log(warning('Warning!'))