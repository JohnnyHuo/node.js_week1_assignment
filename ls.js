#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = process.argv
let co = require('co')
let length = argv.length


function* ls() {
    let fileNames =  yield fs.readdir(argv[2])

    if(length == 3){ //no -R
        for(let fileName of fileNames){
            let curPath = path.join(argv[2], fileName)
            let stats = yield fs.stat(curPath)
            if(stats.isDirectory()){
                continue;
            }
            process.stdout.write(path.basename(curPath + '\n'))
        }
    }

    if(length == 4){ //with -R
        for(let fileName of fileNames){
            let curPath = path.join(argv[2], fileName)
            let stats = yield fs.stat(curPath)
            if(stats.isDirectory()) {
                lls(curPath)
            }else {
                process.stdout.write(path.basename(curPath + '\n'))
            }
        }
    }
}

let lls = co.wrap(function* (rootPath){
    let fileNames = yield fs.readdir(rootPath)
    for (let fileName of fileNames){
        let curPath = path.join(rootPath, fileName)
        let stats = yield fs.stat(curPath)
        if(stats.isDirectory()){
            lls(curPath)
        }else{
            process.stdout.write(curPath + '\n')
        }
    }
})

module.exports = ls
