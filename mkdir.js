#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = process.argv
let co = require('co')

function* main(){
    let foldernames = argv[2]
    let currentpath = ''
    let names = foldernames.split('/')
    for(let curFolderName of names){
        currentpath+=curFolderName
        //fs.stat(currentpath, function(err, stat){
        //    if(err == null){
        //        //    file exists
        //        currentpath += '/'
        //        return
        //    }else{
        //        fs.mkdir(currentpath)
        //        currentpath+='/'
        //    }
        //})
        try {
            let stats = yield fs.stat(currentpath)
        //    if no error, the folder exists,
            currentpath += '/'
        }catch(e){
        //    file not exist, create it
            fs.mkdir(currentpath)
            currentpath+='/'
        }
        //if(stats){
        //    currentpath += '/'
        //    continue
        //}
        //fs.mkdir(currentpath)
        //currentpath+='/'
    }
}

module.exports = main