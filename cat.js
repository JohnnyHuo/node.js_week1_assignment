#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise

if (process.argv.length < 3) {
  // console.log('Usage: ./' + process.argv[1] + ' FILENAME');
    console.log('Usage: ' + __filename + ' FILENAME');
    process.exit(1);
}

let fileName = process.argv[2]

function* cat() {
    let data = yield fs.readFile(fileName, 'utf8') 
    console.log(data)
}

module.exports = cat
