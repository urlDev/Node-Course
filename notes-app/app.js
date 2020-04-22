const chalk = require('chalk');
const validator = require("validator")
const getNotes = require('./notes');

console.log(getNotes())

console.log(validator.isURL("can-ural.com"))
console.log(chalk.blue.inverse("Success"))