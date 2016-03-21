#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise

function* echo() {
    // Use 'yield' in here
    // Your implementation here
    console.log(process.argv[2] || 'Hello World')
}

module.exports = echo
