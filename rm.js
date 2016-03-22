#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = process.argv
let co = require('co')


function* main() {
    rm(argv[2])
    //let fileName =  argv[2]
    //let stats = yield fs.stat(fileName)
    //if(!stats.isDirectory()) {
    //    yield fs.unlink(fileName)
    //}else{
    //    rmall(fileName)
    //}
}

//let rmall = co.wrap(function* (rootPath){
//    let fileNames = yield fs.readdir(rootPath)
//
//    for (let fileName of fileNames){
//        let curPath = path.join(rootPath, fileName)
//        let stats = yield fs.stat(curPath)
//        if(stats.isDirectory()){
//            rmall(curPath)
//        }else{
//            yield fs.unlink(curPath)
//        }
//    }
//    yield fs.rmdir(rootPath)
//})
let rm = co.wrap(function* (inpath){
    let stat = yield fs.stat(inpath);
    if (stat.isDirectory()) {
        let fileNames = yield fs.readdir(inpath);
        for (let fileName of fileNames) {
            let curPath = path.join(inpath, fileName);
            yield rm(curPath);
        }
        yield fs.rmdir(inpath)
    } else {
        yield fs.unlink(inpath)
    }
})
module.exports = main
