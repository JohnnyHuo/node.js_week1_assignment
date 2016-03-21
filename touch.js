#!/usr/bin/env node --use_strict

require('./helper')

let fs = require('fs').promise

if (process.argv.length < 3) {
    // console.log('Usage: ./' + process.argv[1] + ' FILENAME');
    console.log('Usage: ' + __filename + ' FILENAME');
    process.exit(1);
}

let fileName = process.argv[2]

function* touch() {
    let fd = yield fs.open(fileName, 'a+')
    let now = Math.round(new Date().getTime()/1000)   //http://stackoverflow.com/a/221297/2345313
    fs.futimes(fd, now, now)
}

module.exports = touch
