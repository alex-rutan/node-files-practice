"use strict"

const fsP = require('fs/promises')
const axios = require("axios");

/* 
takes in a local path, outputs the contents to the console.
 */
async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        return contents
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


/* 
takes in a URL path, outputs the contents to the console.
 */
async function webCat(url) {
    // if(!url.startsWith("http")){
    //     url = "http://"+url
    // }
    let content;
    try {
        content = await axios.get(url);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    return content.data;
}

/* 
Function to determine if the argument given is a local path or web path
then runs cat function or webCat respectively.
 */
async function catOrWebCat(path) {
    
    // let path = process.argv[2];
    //regex to determine if the argument is website or relative path
    // let regex = /^(www|http|https)*.(\w+)/g;
    // let matches = path.match(regex);
    // let isWebsite = matches instanceof Array;
    
    // if (isWebsite){
    if(path.startsWith("http")){
        return await webCat(path);
    }else{
        return await cat(path);        
    }   
}

async function catOrWebCatWithWrite() {
    
    let args=[];
    let argv = process.argv;
    for(let i=2; i < argv.length; i++){
        args.push(argv[i]);
    }
    
    if(args[0] === "--out"){
        let content = await catOrWebCat(args[2]);
        fsP.writeFile(args[1], content ,"utf8");
    }else{
        let content = await catOrWebCat(args[0]);
        console.log(content);
    }
}


catOrWebCatWithWrite()
